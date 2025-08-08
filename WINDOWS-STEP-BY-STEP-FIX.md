# 🪟 Windows Step-by-Step Fix for Vercel Build Error

## Step 1: Open Terminal
1. **Press `Windows Key + R`**
2. **Type `cmd` or `powershell`** 
3. **Press Enter**

## Step 2: Navigate to Your Project Folder
```cmd
cd C:\
```
*(This goes to your C: drive)*

```cmd
dir
```
*(This shows all folders - look for your project folder)*

**If your project is in Documents:**
```cmd
cd C:\Users\%USERNAME%\Documents\barracks_Media_front
```

**If your project is on Desktop:**
```cmd
cd C:\Users\%USERNAME%\Desktop\barracks_Media_front
```

**If you're not sure where it is:**
```cmd
cd C:\Users\%USERNAME%
dir
```
*(Look for your project folder name)*

## Step 3: Verify You're in the Right Place
```cmd
dir
```
**You should see files like:**
- `package.json`
- `app` folder
- `README.md`
- etc.

## Step 4: Delete Problem Folders
```cmd
rmdir /s /q reports
```
*(Deletes the reports folder completely)*

```cmd
rmdir /s /q messages
```
*(Deletes the messages folder completely)*

## Step 5: Check What's Left
```cmd
dir
```
*(Should show your clean project structure)*

## Step 6: Save Changes to GitHub
```cmd
git add .
```
*(Stages all changes)*

```cmd
git commit -m "Fix: Remove nested app directories"
```
*(Saves changes with a message)*

```cmd
git push origin main
```
*(Uploads changes to GitHub)*

## What Each Command Does:
- `cd` = Change Directory (move to a folder)
- `dir` = Directory listing (show what's in current folder)
- `rmdir /s /q` = Remove directory completely
- `git add .` = Stage all changes for commit
- `git commit -m` = Save changes with a message
- `git push` = Upload to GitHub

## After Step 6:
- Vercel will automatically detect the GitHub changes
- Start a new build
- Build should succeed! 🚀

**If you get stuck on any step, just tell me what you see and I'll help!**