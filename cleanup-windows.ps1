# Windows PowerShell script to fix nested directories and Git issues

Write-Host "🔍 Scanning for nested app directories..." -ForegroundColor Yellow

# Find all directories named "app"
$appDirs = Get-ChildItem -Path . -Recurse -Directory -Name "app" -ErrorAction SilentlyContinue | Select-Object -First 20

Write-Host "Found app directories:" -ForegroundColor Green
$appDirs | ForEach-Object { Write-Host "  $_" }

# Check for deeply nested paths
Write-Host "`n🔍 Checking for problematic nested paths..." -ForegroundColor Yellow

$longPaths = Get-ChildItem -Path . -Recurse -ErrorAction SilentlyContinue | 
    Where-Object { $_.FullName.Length -gt 200 } | 
    Select-Object -First 10

if ($longPaths) {
    Write-Host "⚠️  Found paths longer than 200 characters:" -ForegroundColor Red
    $longPaths | ForEach-Object { 
        Write-Host "  $($_.FullName.Length) chars: $($_.FullName.Substring(0, [Math]::Min(100, $_.FullName.Length)))..." 
    }
} else {
    Write-Host "✅ No problematic long paths found" -ForegroundColor Green
}

# Show current directory structure
Write-Host "`n📁 Current project structure:" -ForegroundColor Cyan
Get-ChildItem -Path . -Directory | ForEach-Object { Write-Host "  $($_.Name)/" }

Write-Host "`n✅ Scan complete" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. If you see nested app/ directories, we need to clean them up"
Write-Host "2. Run: git status"
Write-Host "3. Run: git add ."
Write-Host "4. Run: git commit -m 'Fix directory structure'"