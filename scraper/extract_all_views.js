const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    console.log(`\n📊 GEMINI VIEWS EXTRACTOR\n${'='.repeat(60)}\n`);
    
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--start-maximized']
    });
    
    const page = await browser.newPage();
    const shareUrl = 'https://share.gemini.google/FHDWfH0eK0De';
    
    console.log(`📍 Loading: ${shareUrl}`);
    console.log(`⏳ Please authenticate if prompted...\n`);
    
    try {
      await page.goto(shareUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    } catch (e) {
      console.log('Navigation note:', e.message);
    }
    
    // Wait for page to fully load
    await new Promise(r => setTimeout(r, 5000));
    
    // Check if authenticated
    const pageUrl = page.url();
    const isAuthNeeded = pageUrl.includes('signin') || pageUrl.includes('accounts');
    
    console.log(`✓ Current URL: ${pageUrl}`);
    console.log(`✓ Auth needed: ${isAuthNeeded}\n`);
    
    if (!isAuthNeeded) {
      console.log(`✅ Authenticated! Extracting content...\n`);
      
      // Extract all text
      const allText = await page.evaluate(() => document.body.innerText);
      fs.writeFileSync('gemini_share_full_text.txt', allText);
      console.log(`✓ Saved: gemini_share_full_text.txt (${allText.length} chars)`);
      
      // Extract HTML
      const allHtml = await page.evaluate(() => document.documentElement.outerHTML);
      fs.writeFileSync('gemini_share_full.html', allHtml);
      console.log(`✓ Saved: gemini_share_full.html (${allHtml.length} chars)`);
      
      // Look for tabs/views
      const views = await page.evaluate(() => {
        const tabs = Array.from(document.querySelectorAll('[role="tab"], .view, [data-view]'));
        return tabs.map((t, i) => ({
          index: i,
          text: (t.innerText || t.textContent || '').substring(0, 100),
          selector: t.className
        }));
      });
      
      console.log(`\n🔍 Found ${views.length} views:`);
      views.forEach(v => console.log(`   ${v.index + 1}. ${v.text}`));
      
      // Click through views
      if (views.length > 0) {
        console.log(`\n📸 Capturing each view...\n`);
        const tabs = await page.$$('[role="tab"]');
        
        for (let i = 0; i < Math.min(tabs.length, 10); i++) {
          try {
            await tabs[i].click();
            await new Promise(r => setTimeout(r, 2000));
            
            const viewText = await page.evaluate(() => document.body.innerText);
            const viewName = views[i]?.text || `View ${i + 1}`;
            const filename = `view_${i + 1}_${viewName.substring(0, 20).replace(/[^a-z0-9]/gi, '_')}.txt`;
            
            fs.writeFileSync(filename, viewText);
            console.log(`✓ Saved: ${filename} (${viewText.length} chars)`);
          } catch (err) {
            console.log(`⚠ Error on view ${i + 1}: ${err.message}`);
          }
        }
      }
    } else {
      console.log(`⚠️  PLEASE LOG IN WITH YOUR GOOGLE ACCOUNT`);
      console.log(`   The browser will stay open for 3 minutes`);
      console.log(`   Waiting...\n`);
      
      // Wait 3 minutes for user to login
      await new Promise(r => setTimeout(r, 180000));
      
      // Try to extract again
      console.log(`\n📸 Attempting to capture content...\n`);
      
      const finalText = await page.evaluate(() => document.body.innerText);
      const finalUrl = page.url();
      
      console.log(`✓ Current URL: ${finalUrl}`);
      console.log(`✓ Text length: ${finalText.length} chars`);
      
      if (finalText.length > 500) {
        fs.writeFileSync('gemini_share_content.txt', finalText);
        console.log(`✓ Saved: gemini_share_content.txt`);
      } else {
        console.log(`⚠️  Content too small (${finalText.length} chars) - may not be fully loaded`);
      }
    }
    
    console.log(`\n✅ Complete! Closing browser...\n`);
    await new Promise(r => setTimeout(r, 5000));
    await browser.close();
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
})();
