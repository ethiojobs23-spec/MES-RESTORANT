const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

(async () => {
  try {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`  🔐 GEMINI SCRAPER - Manual Login Required`);
    console.log(`${'='.repeat(70)}\n`);
    
    console.log(`📋 Instructions:`);
    console.log(`  1. A browser window will open`);
    console.log(`  2. Log in with your Google account when prompted`);
    console.log(`  3. The browser will stay open for 120 seconds`);
    console.log(`  4. Navigate to the Gemini conversation if needed`);
    console.log(`  5. The script will then capture all content\n`);
    
    const proceed = await prompt(`Press Enter to start, or type 'quit' to exit: `);
    if (proceed.toLowerCase() === 'quit') {
      console.log('Cancelled.');
      rl.close();
      process.exit(0);
    }
    
    console.log(`\n🌐 Launching browser...\n`);
    
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--start-maximized']
    });
    
    const page = await browser.newPage();
    await page.goto('https://gemini.google.com', { waitUntil: 'networkidle2', timeout: 60000 });
    
    console.log(`✅ Browser opened!`);
    console.log(`⏰ Waiting 120 seconds for you to log in and navigate...\n`);
    console.log(`   After logging in:  ✓ Go to your conversation  ✓ Copy the share link`);
    console.log(`   Then paste it when ready (or just let the timer run)\n`);
    
    // Wait with countdown
    let remaining = 120;
    const countdownInterval = setInterval(() => {
      process.stdout.write(`\r⏳ Time remaining: ${remaining} seconds...`);
      remaining--;
      if (remaining < 0) clearInterval(countdownInterval);
    }, 1000);
    
    await new Promise(r => setTimeout(r, 120000));
    clearInterval(countdownInterval);
    
    console.log(`\n\n📸 Capturing page content...\n`);
    
    // Get current URL
    const currentUrl = page.url();
    console.log(`📍 Current URL: ${currentUrl}`);
    
    // Extract content
    const pageInfo = await page.evaluate(() => ({
      title: document.title,
      text: document.body.innerText,
      html: document.documentElement.outerHTML,
      url: window.location.href
    }));
    
    // Save files
    fs.writeFileSync('gemini_content_text.txt', pageInfo.text);
    console.log(`✓ Saved: gemini_content_text.txt (${pageInfo.text.length} chars)`);
    
    fs.writeFileSync('gemini_content.html', pageInfo.html);
    console.log(`✓ Saved: gemini_content.html (${pageInfo.html.length} chars)`);
    
    // Extract any view tabs
    const viewInfo = await page.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('[role="tab"], .view-item, [data-view]'));
      return tabs.map(t => ({
        text: t.innerText || t.textContent,
        ariaLabel: t.getAttribute('aria-label')
      }));
    });
    
    if (viewInfo.length > 0) {
      console.log(`\n🔍 Found ${viewInfo.length} tabs/views:`);
      viewInfo.forEach((v, i) => {
        const label = (v.text || v.ariaLabel || '').substring(0, 50);
        console.log(`   ${i + 1}. ${label}`);
      });
      
      // Try clicking tabs
      for (let i = 0; i < Math.min(viewInfo.length, 10); i++) {
        try {
          const tabs = await page.$$('[role="tab"]');
          if (tabs[i]) {
            await tabs[i].click();
            await new Promise(r => setTimeout(r, 1500));
            
            const viewText = await page.evaluate(() => document.body.innerText);
            fs.writeFileSync(`view_${i + 1}.txt`, viewText);
            console.log(`   ✓ Saved view_${i + 1}.txt`);
          }
        } catch (err) {
          // Ignore errors
        }
      }
    }
    
    console.log(`\n✅ Scraping complete!`);
    console.log(`📁 Files saved to: ${process.cwd()}\n`);
    
    await new Promise(r => setTimeout(r, 5000));
    await browser.close();
    rl.close();
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    rl.close();
    process.exit(1);
  }
})();
