const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const os = require('os');
const child_process = require('child_process');

(async () => {
  try {
    // Create temp directory for Edge profile copy
    const tempDir = path.join(os.tmpdir(), 'edge_temp_profile_' + Date.now());
    const sourceProfile = path.join(process.env.USERPROFILE, 'AppData/Local/Microsoft/Edge/User Data/Default');
    
    console.log(`Creating temporary profile copy...`);
    child_process.execSync(`xcopy "${sourceProfile}" "${tempDir}" /E /I /Y /Q 2>nul`, { stdio: 'inherit' });
    
    console.log(`Launching Chrome/Edge with temporary profile from: ${tempDir}\n`);
    
    // Try using Chrome instead since it's easier
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        `--user-data-dir=${tempDir}`,
        '--no-default-browser-check',
        '--disable-sync'
      ]
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    const url = 'https://share.gemini.google/FHDWfH0eK0De';
    
    console.log(`Navigating to ${url}...\n`);
    try {
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 60000 
      });
    } catch (err) {
      console.log("Navigation note:", err.message);
    }
    
    await new Promise(r => setTimeout(r, 3000));
    
    // Check page content
    const pageContent = await page.evaluate(() => ({
      title: document.title,
      bodyText: document.body.innerText.substring(0, 200),
      hasSignIn: !!document.querySelector('button[aria-label*="Sign"], a[href*="signin"]')
    }));
    
    console.log(`✓ Page title: ${pageContent.title}`);
    console.log(`✓ Needs sign-in: ${pageContent.hasSignIn}`);
    console.log(`✓ Content preview: ${pageContent.bodyText.substring(0, 100)}\n`);
    
    // Extract content
    const allText = await page.evaluate(() => document.body.innerText);
    fs.writeFileSync('gemini_scraped.txt', allText);
    console.log(`✓ Saved gemini_scraped.txt (${allText.length} characters)`);
    
    // Save HTML
    const allHtml = await page.evaluate(() => document.documentElement.outerHTML);
    fs.writeFileSync('gemini_scraped.html', allHtml);
    console.log(`✓ Saved gemini_scraped.html (${allHtml.length} characters)`);
    
    // Try to find and extract JSON data
    const pageScripts = await page.$$eval('script', scripts => {
      return scripts
        .map(s => s.innerText)
        .filter(t => t && t.includes('{'))
        .slice(0, 3)
        .map(t => t.substring(0, 500));
    });
    
    if (pageScripts.length > 0) {
      fs.writeFileSync('page_data.txt', pageScripts.join('\n\n---\n\n'));
      console.log(`✓ Saved page_data.txt`);
    }
    
    await browser.close();
    
    // Cleanup
    console.log(`\nCleaning up temporary profile...`);
    child_process.execSync(`rmdir "${tempDir}" /S /Q`, { stdio: 'inherit' });
    
    console.log("\n✅ Scraping complete!");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
})();
