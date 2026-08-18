const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.launch({ 
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1920, height: 1080 });
    
    const url = 'https://share.gemini.google/FHDWfH0eK0De';
    
    console.log(`Navigating to ${url}...`);
    try {
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 60000 
      });
    } catch (err) {
      console.log("Navigation timeout, but continuing...");
    }
    
    await new Promise(r => setTimeout(r, 3000));
    
    // Accept consent
    try {
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        for (const btn of buttons) {
          if (btn.innerText && btn.innerText.includes('Accept all')) {
            console.log("Clicking Accept all");
            btn.click();
            break;
          }
        }
      });
      await new Promise(r => setTimeout(r, 2000));
    } catch(e) { console.log("No accept button"); }
    
    // Click Continue if needed
    try {
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, a, div[role="button"]'));
        for (const btn of buttons) {
          if (btn.innerText && btn.innerText.trim() === 'Continue') {
            console.log("Clicking Continue");
            btn.click();
            break;
          }
        }
      });
      await new Promise(r => setTimeout(r, 3000));
    } catch(e) { console.log("No continue button"); }
    
    // Get all view/tab elements
    const views = await page.evaluate(() => {
      const viewElements = document.querySelectorAll('[role="tab"], .view-item, [data-view], button[aria-selected]');
      return Array.from(viewElements).map((el, idx) => ({
        text: el.innerText || el.textContent,
        index: idx
      }));
    });
    
    console.log(`Found ${views.length} views/tabs:`, views);
    
    // Extract all text
    const allText = await page.evaluate(() => document.body.innerText);
    fs.writeFileSync('all_text_complete.txt', allText);
    console.log("Saved all_text_complete.txt");
    
    // Extract HTML
    const allHtml = await page.evaluate(() => document.documentElement.outerHTML);
    fs.writeFileSync('all_html_complete.html', allHtml);
    console.log("Saved all_html_complete.html");
    
    // Extract JSON-like data
    const scripts = await page.$$eval('script', scripts => {
      return scripts
        .map(s => s.innerText)
        .filter(t => t && (t.includes('{') || t.includes('[')))
        .slice(0, 5);
    });
    
    if (scripts.length > 0) {
      fs.writeFileSync('extracted_json.txt', scripts.join('\n\n---SCRIPT---\n\n'));
      console.log("Saved extracted_json.txt");
    }
    
    // Try to click through each view/tab
    const viewButtons = await page.$$('[role="tab"], button[aria-selected]');
    console.log(`Clicking through ${viewButtons.length} views...`);
    
    for (let i = 0; i < Math.min(viewButtons.length, 10); i++) {
      try {
        await viewButtons[i].click();
        await new Promise(r => setTimeout(r, 2000));
        
        const viewText = await page.evaluate(() => document.body.innerText);
        fs.writeFileSync(`view_${i}.txt`, viewText);
        console.log(`Saved view_${i}.txt`);
        
        const viewHtml = await page.evaluate(() => document.documentElement.outerHTML);
        fs.writeFileSync(`view_${i}.html`, viewHtml);
        console.log(`Saved view_${i}.html`);
      } catch (err) {
        console.log(`Error on view ${i}:`, err.message);
      }
    }
    
    await browser.close();
    console.log("✓ Scraping complete!");
    
  } catch (error) {
    console.error("Fatal error:", error.message);
    process.exit(1);
  }
})();
