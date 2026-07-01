import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to Trending...');
  await page.goto('https://www.youtube.com/feed/trending', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);
  
  // Consent bypass
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await btn.textContent();
    if (text && (
      text.includes('Accept all') || 
      text.includes('Tôi đồng ý') || 
      text.includes('Chấp nhận tất cả')
    )) {
      await btn.click();
      await page.waitForTimeout(5000);
      break;
    }
  }

  const videoCount = await page.evaluate(() => {
    return document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-item-renderer').length;
  });
  
  console.log('Videos found on trending page:', videoCount);
  
  if (videoCount > 0) {
    const samples = await page.evaluate(() => {
      return [...document.querySelectorAll('ytd-video-renderer, ytd-grid-video-renderer')].slice(0, 3).map(item => {
        return {
          title: item.querySelector('#video-title')?.textContent?.trim(),
          channel: item.querySelector('ytd-channel-name #text')?.textContent?.trim(),
          views: item.querySelector('#metadata-line span')?.textContent?.trim(),
          time: item.querySelectorAll('#metadata-line span')[1]?.textContent?.trim()
        };
      });
    });
    console.log('Sample videos:', samples);
  }
  
  await browser.close();
}

run().catch(console.error);
