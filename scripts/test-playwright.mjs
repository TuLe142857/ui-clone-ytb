import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function run() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-US'
  });
  
  const page = await context.newPage();
  console.log('Navigating to https://www.youtube.com/...');
  await page.goto('https://www.youtube.com/', { waitUntil: 'networkidle', timeout: 60000 });
  
  // Wait a bit for dynamic content or consent popups
  await page.waitForTimeout(5000);
  
  // Check for consent dialog
  console.log('Checking for consent buttons...');
  const consentButtons = await page.$$('button');
  for (const btn of consentButtons) {
    const text = await btn.textContent();
    if (text && (
      text.includes('Accept all') || 
      text.includes('Agree') || 
      text.includes('Tôi đồng ý') || 
      text.includes('Chấp nhận tất cả') || 
      text.includes('I agree')
    )) {
      console.log(`Clicking consent button with text: "${text.trim()}"`);
      await btn.click();
      await page.waitForTimeout(5000);
      break;
    }
  }
  
  // Take screenshot of desktop
  console.log('Taking desktop screenshot...');
  await page.screenshot({ path: 'docs/design-references/youtube/desktop_raw.png', fullPage: false });
  
  // Let's see if we have ytd-app or similar
  const content = await page.content();
  const hasMasthead = content.includes('ytd-masthead');
  const hasSidebar = content.includes('ytd-guide-renderer') || content.includes('ytd-mini-guide-renderer');
  const hasRichGrid = content.includes('ytd-rich-grid-renderer');
  
  console.log('Page checks:', {
    hasMasthead,
    hasSidebar,
    hasRichGrid,
    title: await page.title()
  });
  
  await browser.close();
  console.log('Done!');
}

run().catch(console.error);
