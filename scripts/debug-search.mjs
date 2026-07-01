import { chromium } from 'playwright';
import fs from 'fs';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Navigating to Search Results...');
  await page.goto('https://www.youtube.com/results?search_query=lofi+hip+hop', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);
  
  console.log('Current Title:', await page.title());
  console.log('Current URL:', page.url());
  
  // Take screenshot
  await page.screenshot({ path: 'docs/design-references/youtube/search_debug.png' });
  
  const videoCount = await page.evaluate(() => {
    return document.querySelectorAll('ytd-video-renderer').length;
  });
  console.log('Video renderers found:', videoCount);
  
  if (videoCount > 0) {
    const samples = await page.evaluate(() => {
      return [...document.querySelectorAll('ytd-video-renderer')].slice(0, 3).map(item => {
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
