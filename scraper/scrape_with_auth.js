const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const userDataDir = path.join(
      process.env.USERPROFILE,
      'AppData/Local/Microsoft/Edge/User Data'
    );
    
    console.log(`Launching Edge with profile from: ${userDataDir}`);
    
    const browser = await puppeteer.launch({
      headless: false,  // Show browser so you can see what's happening
      executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      userDataDir: userDataDir,  // Use your existing Edge profile with all cookies
      args: [
        '--no-default-browser-check',
        '--disable-extensions',
        '--disable-sync',
        '--disable-default-apps',
        '--disable-extensions-except',
        '--disable-component-extension-with-background-pages'
      ]
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    const url = 'https://share.gemini.google/FHDWfH0eK0De';
    
    console.log(`\nNavigating to ${url}...`);
    try {
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
    } catch (err) {
      console.log("Navigation warning:", err.message);
    }
    
    await new Promise(r => setTimeout(r, 3000));
    
    // Check if we're authenticated
    const isAuthenticated = await page.evaluate(() => {
      const signInButton = document.querySelector('button[aria-label*="Sign in"], a[href*="signin"]');
      return !signInButton;
    });
    
    console.log(`✓ Authenticated: ${isAuthenticated}`);
    
    // Get page title to verify load
    const title = await page.title();
    console.log(`✓ Page title: ${title}`);
    
    // Accept consent if needed
    try {
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));
        for (const btn of buttons) {
          if (btn.innerText && btn.innerText.includes('Accept')) {
            btn.click();
            break;
          }
        }
      });
      await new Promise(r => setTimeout(r, 2000));
    } catch(e) { }
    
    // Extract all text
    const allText = await page.evaluate(() => document.body.innerText);
    fs.writeFileSync('gemini_content.txt', allText);
    console.log(`✓ Saved gemini_content.txt (${allText.length} chars)`);
    
    // Extract HTML
    const allHtml = await page.evaluate(() => document.documentElement.outerHTML);
    fs.writeFileSync('gemini_content.html', allHtml);
    console.log(`✓ Saved gemini_content.html (${allHtml.length} chars)`);
    
    // Look for view tabs/buttons and click through them
    const viewButtons = await page.$$('[role="tab"], button[aria-selected], .view-item, [data-view]');
    console.log(`\nFound ${viewButtons.length} potential views`);
    
    for (let i = 0; i < Math.min(viewButtons.length, 10); i++) {
      try {
        const btnText = await page.evaluate((el) => el.innerText || el.textContent, viewButtons[i]);
        console.log(`  Clicking view ${i}: ${btnText.substring(0, 50)}`);
        
        await page.evaluate((el) => el.click(), viewButtons[i]);
        await new Promise(r => setTimeout(r, 2000));
        
        const viewText = await page.evaluate(() => document.body.innerText);
        if (viewText.length > 100) {
          fs.writeFileSync(`view_${i}.txt`, viewText);
          console.log(`  ✓ Saved view_${i}.txt`);
        }
      } catch (err) {
        console.log(`  ⚠ Error on view ${i}: ${err.message}`);
      }
    }
    
    console.log("\n✅ Scraping complete!");
    await browser.close();
    
  } catch (error) {
    console.error("❌ Fatal error:", error.message);
    process.exit(1);
  }
})();
