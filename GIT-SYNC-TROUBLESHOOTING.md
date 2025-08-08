# 🔧 VS Code to GitHub Desktop Sync Troubleshooting

## Common Issues & Solutions

### 1. **Check Git Repository Status**
First, verify your repository is properly initialized:

```bash
# In VS Code terminal, run:
git status
git remote -v
```

### 2. **Initialize Git Repository (if needed)**
If no repository exists:

```bash
git init
git add .
git commit -m "Initial commit"
```

### 3. **Add Remote Repository**
If remote is missing:

```bash
# Replace with your actual GitHub repository URL
git remote add origin https://github.com/yourusername/barracks-media-frontend.git
git branch -M main
git push -u origin main
```

### 4. **VS Code Git Settings**
Check these VS Code settings:

1. **File → Preferences → Settings**
2. Search for "git"
3. Ensure these are enabled:
   - ✅ `Git: Enabled`
   - ✅ `Git: Auto Fetch`
   - ✅ `Git: Auto Repository Detection`

### 5. **Refresh GitHub Desktop**
In GitHub Desktop:
1. **File → Add Local Repository**
2. Navigate to your project folder
3. Click **Add Repository**

### 6. **Check File Changes**
In VS Code:
1. Open **Source Control** panel (Ctrl+Shift+G)
2. You should see changed files listed
3. Stage files by clicking the **+** icon
4. Enter commit message and click **✓ Commit**

### 7. **Manual Sync Steps**

#### Option A: Via VS Code
```bash
# In VS Code terminal:
git add .
git commit -m "Update Barracks Media frontend"
git push origin main
```

#### Option B: Via GitHub Desktop
1. Open GitHub Desktop
2. Select your repository
3. Review changes in left panel
4. Enter commit message
5. Click **Commit to main**
6. Click **Push origin**

### 8. **Common File Issues**

#### Large Files
If you have large files (>100MB), they might be blocked:
```bash
# Check for large files
find . -size +50M -type f
```

#### File Permissions
On Windows, check file permissions:
```bash
# Reset file permissions
git config core.filemode false
```

### 9. **Reset Git Configuration**
If all else fails, reset Git config:

```bash
# Set user info
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Reset repository
git remote remove origin
git remote add origin https://github.com/yourusername/barracks-media-frontend.git
```

### 10. **VS Code Extensions**
Install helpful extensions:
- **GitLens** - Enhanced Git capabilities
- **Git Graph** - Visualize Git history
- **GitHub Pull Requests** - GitHub integration

## Quick Fix Commands

Run these in VS Code terminal:

```bash
# 1. Check status
git status

# 2. Stage all changes
git add .

# 3. Commit changes
git commit -m "Fix: Update Barracks Media frontend files"

# 4. Push to GitHub
git push origin main
```

## Still Not Working?

### Create New Repository
1. **GitHub.com** → **New Repository**
2. Name: `barracks-media-frontend`
3. **Don't** initialize with README
4. Copy the repository URL

### Connect Local to Remote
```bash
git remote add origin https://github.com/yourusername/barracks-media-frontend.git
git branch -M main
git push -u origin main
```

### Force Push (Last Resort)
⚠️ **Warning**: Only use if you're sure about losing remote changes
```bash
git push --force-with-lease origin main
```

## Verification Steps

After fixing:
1. ✅ VS Code shows clean working directory
2. ✅ GitHub Desktop shows latest commits
3. ✅ GitHub.com shows updated files
4. ✅ All team members can see changes

## Need Help?

If issues persist:
1. Check VS Code **Output** panel → **Git** for error messages
2. Restart VS Code and GitHub Desktop
3. Try cloning the repository fresh in a new folder
4. Contact your team's Git administrator

---

**Pro Tip**: Always commit and push changes frequently to avoid large sync issues!