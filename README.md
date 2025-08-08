# Barracks Frontend
This is the frontend for BarracksMedia powered by Next.js.

## 🚀 Deployment Guide

### Prerequisites
1. Node.js 18+ installed
2. WordPress backend with "Seriously Simple Podcasting" plugin
3. WordPress Application Password configured

### Environment Variables Required
Copy `.env.example` to `.env.local` and fill in:
- `WORDPRESS_APP_PASSWORD` - Your WordPress app password
- `WORDPRESS_USERNAME` - Your WordPress username (usually 'admin')
- `NEXT_PUBLIC_SITE_URL` - Your domain URL

### Deploy to Netlify
1. Push code to GitHub/GitLab
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy!

### Deploy to Vercel
1. Push code to GitHub/GitLab
2. Import project in Vercel dashboard
3. Set environment variables
4. Deploy!

### Local Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## 🧪 Testing Features

### Test Podcast Creation
1. Visit `/apply-podcast`
2. Select a hosting plan
3. Fill out the form
4. Submit (will create podcast in WordPress)

### Test Guest Directory
1. Visit `/directory`
2. Browse guest profiles
3. Test connection requests

### Test Content Upload
1. Visit `/upload` or `/account`
2. Upload content (requires Mux configuration)

## 🔧 WordPress Integration

Your WordPress backend needs:
- "Seriously Simple Podcasting" plugin installed
- Application password generated for API access
- REST API enabled (default in WordPress)

## 📞 Support

For deployment issues, check:
1. Environment variables are set correctly
2. WordPress API is accessible
3. Build logs for any errors
