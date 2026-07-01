import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import https from 'https';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (!url || url.startsWith('data:')) {
      resolve(false);
      return;
    }
    
    // Ensure URL has a protocol
    if (url.startsWith('//')) {
      url = 'https:' + url;
    }

    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => resolve(false));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(true);
      });
    }).on('error', (err) => {
      file.close();
      fs.unlink(dest, () => resolve(false));
    });
  });
}

async function run() {
  const queries = ['lofi hip hop', 'programming tutorial', 'popular music'];
  const allVideos = [];

  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-US',
    colorScheme: 'dark'
  });

  const page = await context.newPage();

  // Create directories
  fs.mkdirSync('public/images/youtube', { recursive: true });
  fs.mkdirSync('docs/research/youtube', { recursive: true });

  for (const query of queries) {
    console.log(`Searching for "${query}"...`);
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(4000);

    // Consent bypass (just in case)
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await btn.textContent();
      if (text && (
        text.includes('Accept all') || 
        text.includes('Tôi đồng ý') || 
        text.includes('Chấp nhận tất cả')
      )) {
        await btn.click();
        await page.waitForTimeout(4000);
        break;
      }
    }

    // Extract videos from this query page
    const videos = await page.evaluate(() => {
      return [...document.querySelectorAll('ytd-video-renderer')].slice(0, 8).map((item) => {
        const titleEl = item.querySelector('#video-title');
        const title = titleEl?.textContent?.trim() || '';
        
        const thumbEl = item.querySelector('#thumbnail img');
        const thumbnail = thumbEl?.src || thumbEl?.currentSrc || '';
        
        const channelEl = item.querySelector('ytd-channel-name #text');
        const channelName = channelEl?.textContent?.trim() || '';
        
        const avatarEl = item.querySelector('#avatar-link img, #avatar img, yt-img-shadow img');
        const avatar = avatarEl?.src || avatarEl?.currentSrc || '';
        
        const metaSpans = item.querySelectorAll('#metadata-line span');
        const views = metaSpans[0]?.textContent?.trim() || '';
        const time = metaSpans[1]?.textContent?.trim() || '';
        
        const durationEl = item.querySelector('ytd-thumbnail-overlay-time-status-renderer span, #length, badge-shape');
        const duration = durationEl?.textContent?.trim() || '';

        return {
          title,
          thumbnail,
          channelName,
          avatar,
          views,
          time,
          duration
        };
      }).filter(v => v.title);
    });

    console.log(`Found ${videos.length} videos for query "${query}"`);
    allVideos.push(...videos);
  }

  // Deduplicate by title
  const uniqueVideos = [];
  const titles = new Set();
  for (const v of allVideos) {
    if (!titles.has(v.title)) {
      titles.add(v.title);
      uniqueVideos.push(v);
    }
  }

  console.log(`Total unique videos collected: ${uniqueVideos.length}`);

  // Download thumbnails & avatars
  const mockVideos = [];
  for (let i = 0; i < Math.min(uniqueVideos.length, 24); i++) {
    const video = uniqueVideos[i];
    const thumbName = `thumb_${i}.webp`;
    const avatarName = `avatar_${i}.jpg`;
    
    const thumbDest = path.join('public/images/youtube', thumbName);
    const avatarDest = path.join('public/images/youtube', avatarName);
    
    console.log(`Downloading assets for [${i}]: ${video.title.slice(0, 40)}...`);
    
    // Download thumbnail
    let localThumbnail = '/images/placeholder-thumbnail.webp';
    if (video.thumbnail) {
      const ok = await downloadFile(video.thumbnail, thumbDest);
      if (ok) localThumbnail = `/images/youtube/${thumbName}`;
    }
    
    // Download avatar
    let localAvatar = '/images/placeholder-avatar.jpg';
    if (video.avatar) {
      const ok = await downloadFile(video.avatar, avatarDest);
      if (ok) localAvatar = `/images/youtube/${avatarName}`;
    }

    mockVideos.push({
      id: `vid_${i}`,
      title: video.title,
      channelName: video.channelName,
      views: video.views,
      time: video.time,
      duration: video.duration || '10:00',
      thumbnail: localThumbnail,
      avatar: localAvatar
    });
  }

  // Save mockData
  const mockChips = [
    { text: 'All', isActive: true },
    { text: 'Music', isActive: false },
    { text: 'Lo-Fi', isActive: false },
    { text: 'Gaming', isActive: false },
    { text: 'Live', isActive: false },
    { text: 'Coding', isActive: false },
    { text: 'Podcasts', isActive: false },
    { text: 'Mixes', isActive: false },
    { text: 'Gadgets', isActive: false },
    { text: 'Comedy', isActive: false },
    { text: 'Cooking', isActive: false },
    { text: 'Animation', isActive: false },
    { text: 'Recently uploaded', isActive: false },
    { text: 'Watched', isActive: false },
    { text: 'New to you', isActive: false }
  ];

  fs.writeFileSync('docs/research/youtube/mockData.json', JSON.stringify({
    chips: mockChips,
    videos: mockVideos
  }, null, 2));

  console.log('Saved mockData.json with local assets!');
  await browser.close();
}

run().catch(console.error);
