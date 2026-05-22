# Environment Variables Setup

Copy the following environment variables to your `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/stonecanvas"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Cloudinary (Image Upload)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Razorpay (Indian Payments)
NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"

# Stripe (International Payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"

# UploadThing (Alternative Image Upload)
UPLOADTHING_SECRET="your_uploadthing_secret"
UPLOADTHING_APP_ID="your_uploadthing_app_id"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Setup Instructions

1. **PostgreSQL Database**: Set up a PostgreSQL database and update `DATABASE_URL`
2. **Clerk**: Create account at clerk.com, get API keys
3. **Cloudinary**: Create account at cloudinary.com, get API credentials
4. **Razorpay**: Create account at razorpay.com, get API keys
5. **Stripe**: Create account at stripe.com, get API keys
6. **UploadThing**: Create account at uploadthing.com (optional alternative to Cloudinary)

## Running Prisma Migrations

After setting up the database:

```bash
npx prisma generate
npx prisma db push
```
