const fs = require('fs');
const path = require('path');

// Script to fix nested directory structure
function findNestedAppDirs(dir, depth = 0) {
  if (depth > 10) return; // Prevent infinite recursion
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      
      try {
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          console.log(`Directory: ${fullPath}`);
          
          // If we find nested app directories, log them
          if (item === 'app' && dir.includes('app')) {
            console.log(`⚠️  NESTED APP DIR: ${fullPath}`);
          }
          
          findNestedAppDirs(fullPath, depth + 1);
        }
      } catch (err) {
        console.log(`❌ Error accessing: ${fullPath} - ${err.message}`);
      }
    }
  } catch (err) {
    console.log(`❌ Error reading directory: ${dir} - ${err.message}`);
  }
}

console.log('🔍 Scanning for nested directories...');
findNestedAppDirs('./app');
console.log('✅ Scan complete');