@echo off
echo 🔧 Fixing Git configuration for Windows...

REM Enable long paths in Git
git config --global core.longpaths true
echo ✅ Enabled Git long paths support

REM Set safe directory
git config --global --add safe.directory *
echo ✅ Added safe directory configuration

REM Check Git status
echo.
echo 📊 Current Git status:
git status

REM Show current branch and remote
echo.
echo 🌿 Branch and remote info:
git branch -v
git remote -v

echo.
echo ✅ Git configuration updated!
echo Next steps:
echo 1. git add .
echo 2. git commit -m "Fix: Clean up project structure"
echo 3. git push origin main