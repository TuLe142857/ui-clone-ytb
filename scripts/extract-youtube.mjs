import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import https from 'https';

// Helper to download images
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    // Check if URL is data URL or empty
    if (!url || url.startsWith('data:')) {
      resolve(false);
      return;
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
  console.log('Launching browser in headless mode...');
  const browser = await chromium.launch({ headless: true });
  
  // Set window size for desktop
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-US',
    colorScheme: 'dark' // Request dark mode
  });
  
  const page = await context.newPage();
  console.log('Navigating to YouTube...');
  await page.goto('https://www.youtube.com/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);
  
  // Consent bypass
  console.log('Checking for consent/cookies button...');
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await btn.textContent();
    if (text && (
      text.includes('Accept all') || 
      text.includes('Agree') || 
      text.includes('Tôi đồng ý') || 
      text.includes('Chấp nhận tất cả')
    )) {
      console.log(`Clicking consent button: "${text.trim()}"`);
      await btn.click();
      await page.waitForTimeout(5000);
      break;
    }
  }

  // Ensure content loaded
  await page.waitForSelector('ytd-rich-grid-renderer', { timeout: 30000 }).catch(() => {
    console.log('Warning: ytd-rich-grid-renderer not found, page might be slow or different');
  });

  // Ensure directories exist
  fs.mkdirSync('docs/research/youtube/components', { recursive: true });
  fs.mkdirSync('docs/design-references/youtube', { recursive: true });
  fs.mkdirSync('public/images/youtube', { recursive: true });

  console.log('Taking desktop viewport screenshot...');
  await page.screenshot({ path: 'docs/design-references/youtube/desktop.png' });

  // 1. EXTRACT DATA & STYLES
  console.log('Extracting styles and page tokens...');
  const pageData = await page.evaluate(() => {
    const getStyles = (el) => {
      if (!el) return {};
      const cs = window.getComputedStyle(el);
      const props = [
        'fontSize', 'fontWeight', 'fontFamily', 'lineHeight', 'color',
        'backgroundColor', 'padding', 'margin', 'width', 'height',
        'display', 'flexDirection', 'justifyContent', 'alignItems', 'gap',
        'gridTemplateColumns', 'borderRadius', 'border', 'boxShadow', 'position'
      ];
      const res = {};
      props.forEach(p => {
        const val = cs[p];
        if (val && val !== 'none' && val !== 'normal' && val !== 'auto' && val !== '0px' && val !== 'rgba(0, 0, 0, 0)') {
          res[p] = val;
        }
      });
      return res;
    };

    // Extract colors & theme variables from html/body
    const rootVariables = {};
    const htmlEl = document.documentElement;
    // Get common YouTube custom variables
    const ytVars = [
      '--yt-spec-brand-background-solid',
      '--yt-spec-general-background-a',
      '--yt-spec-general-background-b',
      '--yt-spec-text-primary',
      '--yt-spec-text-secondary',
      '--yt-spec-icon-active-other',
      '--yt-spec-icon-inactive',
      '--yt-spec-badge-background',
      '--yt-spec-brand-red',
      '--yt-spec-static-brand-red',
      '--yt-spec-static-brand-white',
      '--yt-spec-static-general-background-a',
      '--yt-spec-static-general-background-b',
      '--yt-spec-static-general-background-c',
      '--yt-spec-static-text-primary',
      '--yt-spec-static-text-secondary'
    ];
    
    const cs = window.getComputedStyle(htmlEl);
    ytVars.forEach(v => {
      const val = cs.getPropertyValue(v).trim();
      if (val) rootVariables[v] = val;
    });

    // Check if dark theme is active
    const isDark = document.documentElement.hasAttribute('dark') || 
                   document.body.hasAttribute('dark') || 
                   cs.backgroundColor === 'rgb(15, 15, 15)' || 
                   cs.backgroundColor === 'rgb(0, 0, 0)';

    // Extract SVG Icons
    const svgs = [];
    document.querySelectorAll('svg').forEach((svg, idx) => {
      // Find parent/ancestor with id/class to label the SVG
      let label = `svg_${idx}`;
      let p = svg.parentElement;
      for (let i = 0; i < 4 && p; i++) {
        if (p.id) {
          label = p.id;
          break;
        }
        if (p.tagName === 'YT-ICON' && p.getAttribute('icon') ) {
          label = p.getAttribute('icon');
          break;
        }
        const cls = p.className?.toString();
        if (cls) {
          label = cls.split(' ')[0];
          break;
        }
        p = p.parentElement;
      }
      
      // Clean label
      label = label.replace(/[^a-zA-Z0-9_-]/g, '');
      if (!svgs.some(s => s.label === label)) {
        svgs.push({
          label,
          viewBox: svg.getAttribute('viewBox'),
          innerHtml: svg.innerHTML
        });
      }
    });

    // Extract Chips (categories)
    const chips = [];
    document.querySelectorAll('yt-chip-cloud-chip-renderer').forEach(chip => {
      const text = chip.querySelector('#text')?.textContent?.trim() || chip.textContent?.trim();
      const isActive = chip.hasAttribute('selected') || chip.className.includes('selected') || window.getComputedStyle(chip).backgroundColor.includes('255, 255, 255');
      if (text) chips.push({ text, isActive });
    });

    // Extract Video Items (up to 12)
    const videos = [];
    document.querySelectorAll('ytd-rich-item-renderer, ytd-rich-grid-media').forEach((item, idx) => {
      if (idx >= 12) return;
      const titleEl = item.querySelector('#video-title');
      const title = titleEl?.textContent?.trim() || '';
      
      const thumbEl = item.querySelector('#thumbnail img');
      const thumbnail = thumbEl?.src || thumbEl?.currentSrc || '';
      
      const channelEl = item.querySelector('ytd-channel-name #text');
      const channelName = channelEl?.textContent?.trim() || '';
      
      const avatarEl = item.querySelector('#avatar-link img, #avatar img');
      const avatar = avatarEl?.src || avatarEl?.currentSrc || '';
      
      const metaSpans = item.querySelectorAll('#metadata-line span');
      const views = metaSpans[0]?.textContent?.trim() || '';
      const time = metaSpans[1]?.textContent?.trim() || '';
      
      const durationEl = item.querySelector('ytd-thumbnail-overlay-time-status-renderer span, #length');
      const duration = durationEl?.textContent?.trim() || '';

      if (title) {
        videos.push({
          title,
          thumbnail,
          channelName,
          avatar,
          views,
          time,
          duration
        });
      }
    });

    // Extract computed styles for layout blocks
    const mastheadStyle = getStyles(document.querySelector('ytd-masthead'));
    const sidebarStyle = getStyles(document.querySelector('ytd-guide-renderer, ytd-mini-guide-renderer'));
    const videoGridStyle = getStyles(document.querySelector('ytd-rich-grid-renderer'));
    const videoCardStyle = getStyles(document.querySelector('ytd-rich-item-renderer, ytd-rich-grid-media'));
    
    return {
      isDark,
      rootVariables,
      chips,
      videos,
      svgs,
      styles: {
        masthead: mastheadStyle,
        sidebar: sidebarStyle,
        grid: videoGridStyle,
        card: videoCardStyle
      }
    };
  });

  console.log(`Extracted ${pageData.videos.length} videos and ${pageData.svgs.length} SVG components.`);
  console.log('Is YouTube loading in Dark Mode? ', pageData.isDark);

  // 2. DOWNLOAD IMAGES (Thumbnails and Avatars)
  console.log('Downloading media assets locally...');
  const localVideos = [];
  for (let i = 0; i < pageData.videos.length; i++) {
    const video = pageData.videos[i];
    const thumbName = `thumb_${i}.webp`;
    const avatarName = `avatar_${i}.jpg`;
    
    const thumbDest = path.join('public/images/youtube', thumbName);
    const avatarDest = path.join('public/images/youtube', avatarName);
    
    console.log(`Downloading thumbnail & avatar for: ${video.title.slice(0, 30)}...`);
    const downloadedThumb = await downloadFile(video.thumbnail, thumbDest);
    const downloadedAvatar = await downloadFile(video.avatar, avatarDest);
    
    localVideos.push({
      ...video,
      localThumbnail: downloadedThumb ? `/images/youtube/${thumbName}` : '/images/placeholder-thumbnail.webp',
      localAvatar: downloadedAvatar ? `/images/youtube/${avatarName}` : '/images/placeholder-avatar.jpg'
    });
  }

  // 3. WRITE RESEARCH FILES
  console.log('Writing documentation files...');

  // SVGs
  fs.writeFileSync('docs/research/youtube/svgs.json', JSON.stringify(pageData.svgs, null, 2));

  // DESIGN_TOKENS.md
  const tokensContent = `# YouTube Design Tokens

## Color Theme (Dark Mode Preferred)
- **General Background:** \`${pageData.rootVariables['--yt-spec-general-background-a'] || 'rgb(15, 15, 15)'}\`
- **Text Primary:** \`${pageData.rootVariables['--yt-spec-text-primary'] || 'rgb(255, 255, 255)'}\`
- **Text Secondary:** \`${pageData.rootVariables['--yt-spec-text-secondary'] || 'rgb(170, 170, 170)'}\`
- **Red Accent:** \`${pageData.rootVariables['--yt-spec-brand-red'] || 'rgb(255, 0, 0)'}\`
- **Sidebar Hover:** \`rgba(255, 255, 255, 0.1)\`
- **Border/Divider:** \`rgba(255, 255, 255, 0.1)\`

## Typography
- **Font Family:** \`Roboto, Arial, sans-serif\`
- **Font Sizes:**
  - Video Title: \`16px\` / \`1.4rem\`, medium/bold
  - Metadata / Channel name: \`14px\` / \`1.2rem\`, regular
  - Chips / Navigation: \`14px\`, regular
  - Search Input: \`16px\`, regular

## Spacing & Spacers
- **Masthead height:** \`56px\`
- **Mini-sidebar width:** \`72px\`
- **Expanded sidebar width:** \`240px\`
- **Grid Gap:** \`16px\` row gap, \`16px\` column gap
- **Container padding:** \`24px\` left/right padding for video grid
`;
  fs.writeFileSync('docs/research/youtube/DESIGN_TOKENS.md', tokensContent);

  // PAGE_TOPOLOGY.md
  const topologyContent = `# YouTube Page Topology

## Layout Structure
1. **Masthead (Header)**
   - Fixed top (z-index 2000, height 56px)
   - Background: \`#0f0f0f\`
   - Elements: Left (menu button, YouTube logo), Center (search bar form, voice search), Right (create video, notifications, user profile avatar)
2. **Sidebar Navigation**
   - Mini Sidebar: Fixed left, width 72px, height calc(100vh - 56px), z-index 1000. Shows Home, Shorts, Subscriptions, You.
   - Expanded Sidebar: Flyout/toggleable overlay or fixed, width 240px, height calc(100vh - 56px), padding.
3. **Chip Cloud (Category Bar)**
   - Sticky/Fixed under masthead (top 56px, left 72px / 240px)
   - Layout: horizontal flex list with overflow scrolling, left/right scroll buttons.
4. **Video Grid**
   - Main content scroll container, flows below header and chips.
   - Grid layout: responsive columns (1 col on mobile, 2 on small screens, 3 on medium, 4 on desktop, up to 5-6 on wide screens).
   - Video Card Components: Thumbnail (hover zooms or scales, showing duration badge), Avatar & metadata row (Avatar, Video Title, Channel Name, Views & Time badge).
`;
  fs.writeFileSync('docs/research/youtube/PAGE_TOPOLOGY.md', topologyContent);

  // BEHAVIORS.md
  const behaviorsContent = `# YouTube Interaction & Behaviors

## Interaction Model: Hover & Click Driven
- **Header Buttons:**
  - Search bar input focuses with a border.
  - Hover states on buttons: subtle grey circular backgrounds (\`rgba(255,255,255,0.1)\`).
- **Sidebar Items:**
  - Hover changes background to \`rgba(255,255,255,0.1)\`.
  - Active item has a background of \`rgba(255,255,255,0.15)\` and bolder font weight.
- **Chips / Pills:**
  - Hover changes background color.
  - Clicking a chip selects it, reversing foreground and background colors (white background with black text).
- **Video Cards:**
  - Hovering a video card displays a play/expand behavior, or plays the video inline after a short delay (for our mockup, we will implement standard CSS hover enhancements like slight thumbnail scaling, displaying a 'play' overlay, or showing an options menu button).
  - Hovering over titles adds underlines.
- **Responsive Layout:**
  - Desktop (1440px): 4-column video grid, mini or full sidebar.
  - Tablet (768px): 2-column or 3-column video grid, mini sidebar.
  - Mobile (390px): 1-column layout, sidebar hidden (bottom tab bar or slide-out menu), search bar becomes icon-only until clicked.
`;
  fs.writeFileSync('docs/research/youtube/BEHAVIORS.md', behaviorsContent);

  // TECH_STACK_ANALYSIS.md
  const techStackContent = `# YouTube Tech Stack Analysis

- **Framework:** Target uses Polymer/Web Components (Custom Elements). We use Next.js 16 (React 19) App Router.
- **CSS:** Target uses raw custom elements styles. We use Tailwind CSS v4 with OKLCH variables.
- **Icons:** Target uses custom SVG icons. We will compile these into \`src/components/icons.tsx\`.
- **State Management:** React hooks (\`useState\`, \`useContext\`) for sidebar toggles, search input, and active chips.
`;
  fs.writeFileSync('docs/research/youtube/TECH_STACK_ANALYSIS.md', techStackContent);

  // DUMP EXTRACTED CHIPS AND VIDEOS AS MOCK DATA
  const mockData = {
    chips: pageData.chips,
    videos: localVideos
  };
  fs.writeFileSync('docs/research/youtube/mockData.json', JSON.stringify(mockData, null, 2));

  // 4. MOBILE SCREENSHOT
  console.log('Setting viewport for mobile and taking screenshot...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'docs/design-references/youtube/mobile.png' });

  await browser.close();
  console.log('Extraction successfully completed!');
}

run().catch(console.error);
