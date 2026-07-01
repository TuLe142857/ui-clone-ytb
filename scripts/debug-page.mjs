import { chromium } from 'playwright';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to Trending...');
  await page.goto('https://www.youtube.com/feed/trending', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  
  console.log('Current Title:', await page.title());
  console.log('Current URL:', page.url());
  
  // Take screenshot
  await page.screenshot({ path: 'docs/design-references/youtube/trending_debug.png' });
  
  // Print button texts
  const buttons = await page.evaluate(() => {
    return [...document.querySelectorAll('button')].map(b => b.textContent?.trim()).filter(Boolean);
  });
  console.log('Buttons on page:', buttons);
  
  // Print forms
  const forms = await page.evaluate(() => {
    return [...document.querySelectorAll('form')].map(f => f.action);
  });
  console.log('Forms on page:', forms);
  
  await browser.close();
}

run().catch(console.error);
