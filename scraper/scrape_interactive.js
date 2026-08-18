const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    console.log(`🌐 Opening browser... Please log in if prompted.\n`);
    
    const browser = await puppeteer.launch({
      headless: false,  // SHOW the browser window
      defaultViewport: null,
      args: [
        '--start-maximized',
        '--disable-blink-features=AutomationControlled'
      ]
    });
    
    const page = await browser.newPage();
    
    const url = 'https://share.gemini.google/FHDWfH0eK0De';
    
    console.log(`📍 Navigating to: ${url}\n`);
    console.log(`⏳ Waiting... The browser will open.`);
    console.log(`✓ If prompted to sign in, please log in with your Google account.`);
    console.log(`⏰ Waiting 30 seconds for you to authenticate...\n`);
    
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
    } catch (e) {
      console.log('Navigation note:', e.message);
    }
    
    // Wait for user to authenticate
    await new Promise(r => setTimeout(r, 30000));
    
    console.log(`\n📸 Capturing content...\n`);
    
    // Extract content
    const content = await page.evaluate(() => {
      return {
        title: document.title,
        url: window.location.href,
        allText: document.body.innerText,
        htmlSize: document.documentElement.outerHTML.length
      };
    });
    
    console.log(`✓ Page title: ${content.title}`);
    console.log(`✓ Current URL: ${content.url}`);
    console.log(`✓ Text content: ${content.allText.length} characters`);
    console.log(`✓ HTML size: ${content.htmlSize} characters\n`);
    
    // Save the content
    fs.writeFileSync('gemini_authenticated_content.txt', content.allText);
    console.log(`✓ Saved: gemini_authenticated_content.txt`);
    
    const html = await page.evaluate(() => document.documentElement.outerHTML);
    fs.writeFileSync('gemini_authenticated_content.html', html);
    console.log(`✓ Saved: gemini_authenticated_content.html`);
    
    // Try to find and click through any view/tab elements
    const tabs = await page.$$('[role="tab"], .view-item, [aria-label*="view"]');
    console.log(`\n🔍 Found ${tabs.length} possible tabs/views`);
    
    if (tabs.length > 0) {
      for (let i = 0; i < Math.min(tabs.length, 5); i++) {
        try {
          const tabText = await page.evaluate(el => el.innerText, tabs[i]);
          console.log(`  Clicking tab ${i + 1}: ${tabText.substring(0, 40)}`);
          
          await page.evaluate(el => el.click(), tabs[i]);
          await new Promise(r => setTimeout(r, 2000));
          
          const viewContent = await page.evaluate(() => document.body.innerText);
          fs.writeFileSync(`view_${i + 1}.txt`, viewContent);
          console.log(`  ✓ Saved view_${i + 1}.txt`);
        } catch (err) {
          console.log(`  ⚠ Error on tab ${i + 1}: ${err.message}`);
        }
      }
    }
    
    console.log(`\n✅ Content capture complete!`);
    console.log(`📁 Files saved to: ${process.cwd()}`);
    
    // Keep browser open for 10 more seconds then close
    await new Promise(r => setTimeout(r, 10000));
    await browser.close();
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
})();
