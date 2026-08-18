const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--disable-web-security', '--disable-features=IsolateOrigins,site-per-process']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1920, height: 2000 });
  
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
  } catch(e) {}
  
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
      await new Promise(r => setTimeout(r, 5000));
  } catch(e) {}
  
  // Find iframe
  const frames = page.frames();
  console.log("Found " + frames.length + " frames");
  let targetFrame = null;
  for (const f of frames) {
      if (f.url().includes('gemini-code-immersive') || f.url().includes('usercontent.goog')) {
          targetFrame = f;
          break;
      }
  }
  
  if (targetFrame) {
      console.log("Found target frame: " + targetFrame.url());
      
      const tabs = ['Home', 'Expense', 'Revenue', 'Unexpected', 'Reports'];
      for (const tab of tabs) {
          console.log("Clicking tab: " + tab);
          try {
              // Click the tab in the frame
              await targetFrame.evaluate((tabName) => {
                  const links = Array.from(document.querySelectorAll('a, button, div, span'));
                  for (const link of links) {
                      if (link.innerText && link.innerText.trim() === tabName) {
                          link.click();
                          return true;
                      }
                  }
                  return false;
              }, tab);
              
              await new Promise(r => setTimeout(r, 2000));
              await page.screenshot({ path: `view_${tab}.png`, fullPage: true });
          } catch(e) {
              console.log("Error clicking tab " + tab + ": " + e);
          }
      }
  } else {
      console.log("Could not find the immersive frame");
  }

  await browser.close();
})();
