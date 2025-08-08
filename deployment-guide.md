# 🚀 Deployment Guide for Barracks Media Frontend

## Quick Start - GitHub to Netlify Deployment

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and create a new repository
2. Name it something like `barracks-media-frontend`
3. Make it public or private (your choice)
4. Don't initialize with README (we already have one)

### Step 2: Upload Your Code
Since you're working in a development environment, you have two options:

#### Option A: Upload via GitHub Web Interface
1. Download all project files from this environment
2. Go to your new GitHub repository
3. Click "uploading an existing file"
4. Drag and drop all your project files
5. Commit the files

#### Option B: Use Git Commands (if you have Git locally)
```bash
git init
git add .
git commit -m "Initial commit - Barracks Media Frontend"
git branch -M main
git remote add origin https://github.com/yourusername/barracks-media-frontend.git
git push -u origin main
```

### Step 3: Deploy to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with your GitHub account
3. Click "New site from Git"
4. Choose GitHub and select your repository
5. Netlify will auto-detect Next.js settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy site"

### Step 4: Configure Environment Variables
In Netlify dashboard, go to Site settings → Environment variables and add:

```
WORDPRESS_APP_PASSWORD=BSgV KnTe nYWN TG3e pTTZ 7GNZ
WORDPRESS_USERNAME=admin
NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
```

### Step 5: Test Your Features
1. **Podcast Application**: Visit `/apply-podcast`
2. **Guest Directory**: Visit `/directory`
3. **Content Pages**: Visit `/content`
4. **Account System**: Visit `/account`

## Alternative: Vercel Deployment
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add the same environment variables
4. Deploy!

## Troubleshooting
- Check build logs in Netlify/Vercel dashboard
- Verify WordPress API is accessible
- Test environment variables are set correctly
- Check browser console for errors

Your site will be live at: `https://your-site-name.netlify.app`