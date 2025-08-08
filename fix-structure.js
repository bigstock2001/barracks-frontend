const fs = require('fs');
const path = require('path');

console.log('🔍 Scanning for nested app directories...');

// Function to find all directories named 'app'
function findAppDirectories(dir, depth = 0) {
  if (depth > 5) return []; // Prevent infinite recursion
  
  const results = [];
  
  try {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      
      try {
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // If this is an 'app' directory and not the root app directory
          if (item === 'app' && dir !== '.') {
            results.push(fullPath);
            console.log(`❌ Found nested app directory: ${fullPath}`);
          }
          
          // Recursively search subdirectories
          results.push(...findAppDirectories(fullPath, depth + 1));
        }
      } catch (err) {
        console.log(`⚠️  Cannot access: ${fullPath}`);
      }
    }
  } catch (err) {
    console.log(`⚠️  Cannot read directory: ${dir}`);
  }
  
  return results;
}

// Find all nested app directories
const nestedAppDirs = findAppDirectories('.');

if (nestedAppDirs.length === 0) {
  console.log('✅ No nested app directories found!');
} else {
  console.log(`\n🚨 Found ${nestedAppDirs.length} nested app directories:`);
  nestedAppDirs.forEach(dir => console.log(`   ${dir}`));
  
  console.log('\n🔧 To fix this, run:');
  nestedAppDirs.forEach(dir => {
    console.log(`   rm -rf "${dir}"`);
  });
}

console.log('\n📁 Current project structure:');
try {
  const appContents = fs.readdirSync('./app');
  console.log('app/');
  appContents.forEach(item => {
    const itemPath = path.join('./app', item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      console.log(`├── ${item}/`);
    } else {
      console.log(`├── ${item}`);
    }
  });
} catch (err) {
  console.log('❌ Cannot read ./app directory');
}