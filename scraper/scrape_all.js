const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 5000 }); // Very tall viewport
  
  console.log("Navigating to URL...");
  await page.goto('https://gemini.google.com/share/97d366ee6a77?skid=8a065ec7-441e-4714-ab74-8f940efbba55', { waitUntil: 'networkidle2' });
  
  await new Promise(r => setTimeout(r, 4000));
  
  // Consent
  try {
      await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button'));
          for (const btn of buttons) {
              if (btn.innerText && btn.innerText.includes('Accept all')) {
                  btn.click();
                  break;
              }
          }
      });
      await new Promise(r => setTimeout(r, 4000));
  } catch(e) { }
  
  // Continue
  try {
      await page.evaluate(() => {
          const buttons = Array.from(document.querySelectorAll('button, a, div[role="button"]'));
          for (const btn of buttons) {
              if (btn.innerText && btn.innerText.trim() === 'Continue') {
                  btn.click();
                  break;
              }
          }
      });
      await new Promise(r => setTimeout(r, 6000));
  } catch(e) { }
  
  // Extract all text content
  const textContent = await page.evaluate(() => document.body.innerText);
  fs.writeFileSync('all_text.txt', textContent);
  
  // Extract all code blocks (if any)
  const codeBlocks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('code, pre')).map(el => el.innerText).join('\n\n---CODE BLOCK---\n\n');
  });
  fs.writeFileSync('all_code.txt', codeBlocks);
  
  // Extract all HTML
  const html = await page.content();
  fs.writeFileSync('all_html.html', html);
  
  // Screenshot just in case
  await page.screenshot({ path: 'screenshot3.png', fullPage: true });
  
  console.log("Done scraping full page");
  await browser.close();
})();
