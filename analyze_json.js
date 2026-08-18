const fs = require('fs');
const path = require('path');

const jsonFile = 'wiz_data_0.json';

try {
  const data = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
  
  console.log('📋 JSON Structure Analysis\n');
  console.log(`Total keys: ${Object.keys(data).length}`);
  
  // Show first few keys
  const keys = Object.keys(data).slice(0, 20);
  console.log('\nFirst 20 keys:');
  keys.forEach(k => {
    const val = data[k];
    const type = typeof val;
    const preview = type === 'string' 
      ? val.substring(0, 60).replace(/\n/g, ' ') 
      : JSON.stringify(val).substring(0, 60);
    console.log(`  • ${k} (${type}): ${preview}...`);
  });
  
  // Look for views
  console.log('\n\n🔍 Searching for view-like content...');
  for (const [key, val] of Object.entries(data)) {
    if (typeof val === 'string') {
      // Look for common keywords
      if (val.toLowerCase().includes('view') || 
          val.toLowerCase().includes('expense') ||
          val.toLowerCase().includes('home') ||
          val.toLowerCase().includes('revenue')) {
        console.log(`\n  Found: ${key}`);
        console.log(`  Content: ${val.substring(0, 200)}`);
      }
    }
  }
  
  // Save formatted version
  fs.writeFileSync('wiz_data_formatted.json', JSON.stringify(data, null, 2));
  console.log('\n\n✓ Saved wiz_data_formatted.json for inspection');
  
} catch (error) {
  console.error('Error reading JSON:', error.message);
}
