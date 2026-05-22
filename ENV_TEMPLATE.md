# Environment Variables Template

Copy this file to `.env.local` and fill in your actual values.

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/stonecanvas"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Cloudinary (Image Storage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Razorpay (Indian Payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"

# Stripe (International Payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## How to Get These Values

### Database
- For development: Use SQLite with `DATABASE_URL="file:./dev.db"`
- For production: Get PostgreSQL connection string from Neon, Supabase, or your database provider

### Clerk Authentication
1. Sign up at https://clerk.com
2. Create a new application
3. Copy Publishable Key and Secret Key from dashboard
4. Configure redirect URLs in Clerk dashboard

### Cloudinary
1. Sign up at https://cloudinary.com
2. Get Cloud Name, API Key, and API Secret from dashboard
3. Configure upload presets for image uploads

### Razorpay
1. Sign up at https://razorpay.com
2. Get Key ID and Key Secret from dashboard
3. Configure webhook URLs and payment settings

### Stripe
1. Sign up at https://stripe.com
2. Get Publishable Key and Secret Key from dashboard
3. Configure webhook endpoints and payment settings

### Application URL
- Development: `http://localhost:3000`
- Production: `https://your-domain.com`
