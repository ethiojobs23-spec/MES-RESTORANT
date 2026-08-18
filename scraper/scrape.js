const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 1080 });
  
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
      await new Promise(r => setTimeout(r, 5000));
  } catch(e) {
      console.log("Error clicking consent", e);
  }
  
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
  } catch(e) {
      console.log("Error clicking continue", e);
  }
  
  // If dialogs are still there, delete them from DOM
  await page.evaluate(() => {
      // Find elements with high z-index or fixed position and remove them
      const elements = document.querySelectorAll('*');
      for (const el of elements) {
          const style = window.getComputedStyle(el);
          if (style.position === 'fixed' && parseInt(style.zIndex) > 100) {
              el.remove();
          }
      }
  });
  
  await page.screenshot({ path: 'screenshot2.png', fullPage: true });
  
  const content = await page.evaluate(() => {
    return document.body.innerText;
  });
  
  const fs = require('fs');
  fs.writeFileSync('share_text2.txt', content);
  
  console.log("Done scraping");
  await browser.close();
})();
