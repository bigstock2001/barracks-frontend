# 🔧 Vercel Environment Variables Setup

## Required Environment Variables

Copy these into your Vercel project settings under **Settings → Environment Variables**:

### WordPress Integration (REQUIRED)
```
WORDPRESS_APP_PASSWORD=BSgV KnTe nYWN TG3e pTTZ 7GNZ
WORDPRESS_USERNAME=admin
```

### Site Configuration
```
NEXT_PUBLIC_SITE_URL=https://your-vercel-app-name.vercel.app
```

### Optional Services (Set to placeholder values for now)

#### Stripe (for payments)
```
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=your_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key_here
```

#### Mux (for video uploads)
```
MUX_TOKEN_ID=your_mux_token_id
MUX_SECRET=your_mux_secret
```

#### Supabase (for user auth - optional)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## How to Add in Vercel

1. **Go to your Vercel project dashboard**
2. **Click Settings**
3. **Click Environment Variables**
4. **Add each variable:**
   - Name: `WORDPRESS_APP_PASSWORD`
   - Value: `BSgV KnTe nYWN TG3e pTTZ 7GNZ`
   - Environment: **Production, Preview, Development** (check all)
   - Click **Save**

5. **Repeat for each variable above**

## Critical Variables for Basic Functionality

**Minimum required for deployment:**
- ✅ `WORDPRESS_APP_PASSWORD` - For podcast creation
- ✅ `WORDPRESS_USERNAME` - For WordPress API
- ✅ `NEXT_PUBLIC_SITE_URL` - For proper redirects

**The rest can be placeholder values** - your app will work in demo mode without them.

## After Adding Variables

1. **Trigger a new deployment** (Vercel will automatically redeploy)
2. **Or go to Deployments → Click "Redeploy"**

Your Barracks Media platform will then have full functionality! 🚀