# Windows PowerShell script to find and fix nested app directories

Write-Host "🔍 Scanning for nested app directories..." -ForegroundColor Yellow

# Find all directories named "app"
$appDirs = Get-ChildItem -Path . -Recurse -Directory -Name "app" -ErrorAction SilentlyContinue | Select-Object -First 20

Write-Host "Found app directories:" -ForegroundColor Green
$appDirs | ForEach-Object { Write-Host "  $_" }

# Check for problematic nested paths
Write-Host "`n🔍 Checking for problematic nested paths..." -ForegroundColor Yellow

$problemDirs = @()
Get-ChildItem -Path . -Recurse -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    if ($_.Name -eq "app" -and $_.FullName -notlike "*\.git*" -and $_.FullName -ne ".\app") {
        $problemDirs += $_.FullName
        Write-Host "⚠️  NESTED APP DIR: $($_.FullName)" -ForegroundColor Red
    }
}

if ($problemDirs.Count -eq 0) {
    Write-Host "✅ No problematic nested app directories found" -ForegroundColor Green
} else {
    Write-Host "`n🚨 Found $($problemDirs.Count) problematic directories:" -ForegroundColor Red
    $problemDirs | ForEach-Object { Write-Host "   $_" -ForegroundColor Red }
    
    Write-Host "`n🔧 To fix this, run these commands:" -ForegroundColor Yellow
    $problemDirs | ForEach-Object { 
        Write-Host "   Remove-Item -Recurse -Force '$_'" -ForegroundColor Cyan
    }
}

# Show current directory structure
Write-Host "`n📁 Current project structure:" -ForegroundColor Cyan
if (Test-Path ".\app") {
    Write-Host "app/" -ForegroundColor Green
    Get-ChildItem -Path ".\app" | ForEach-Object { 
        if ($_.PSIsContainer) {
            Write-Host "├── $($_.Name)/" -ForegroundColor White
        } else {
            Write-Host "├── $($_.Name)" -ForegroundColor Gray
        }
    }
} else {
    Write-Host "❌ No ./app directory found" -ForegroundColor Red
}

Write-Host "`n✅ Scan complete" -ForegroundColor Green