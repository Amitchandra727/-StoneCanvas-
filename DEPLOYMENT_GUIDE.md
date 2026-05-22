# StoneCanvas Deployment Guide

This guide will help you configure your StoneCanvas eCommerce application with your company data, products, and prepare it for deployment.

## Step 1: Company Branding Configuration

### Update Company Name and Branding

1. **Update metadata in `src/app/metadata.ts`**:
```typescript
export const metadata: Metadata = {
  title: "Your Company Name - Your Tagline",
  description: "Your company description",
  // Update all branding details
}
```

2. **Update Navbar Branding** (`src/components/layout/navbar.tsx`):
   - Replace "StoneCanvas" with your company name
   - Update logo if needed

3. **Update Footer Branding** (`src/components/layout/footer.tsx`):
   - Replace company name and description
   - Update contact information (email, phone, address)
   - Update social media links

4. **Update Color Scheme** (if needed):
   - Current theme uses amber/stone colors
   - Modify Tailwind config or component styles to match your brand

## Step 2: Environment Variables Setup

Create a `.env.local` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"

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
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

## Step 3: Database Setup

### Option A: PostgreSQL (Recommended for Production)

1. **Create a PostgreSQL database**:
   - Use services like Neon, Supabase, or your own PostgreSQL server
   - Get the connection string

2. **Update DATABASE_URL** in `.env.local`

3. **Run database migrations**:
```bash
npx prisma generate
npx prisma db push
```

### Option B: SQLite (For Testing/Development)

1. **Update DATABASE_URL** in `.env.local`:
```env
DATABASE_URL="file:./dev.db"
```

2. **Run migrations**:
```bash
npx prisma generate
npx prisma db push
```

## Step 4: Clerk Authentication Setup

1. **Create a Clerk account** at https://clerk.com
2. **Create a new application** in Clerk dashboard
3. **Get API keys** (Publishable Key and Secret Key)
4. **Add keys to `.env.local`**
5. **Configure allowed redirect URLs** in Clerk dashboard:
   - Add your development URL (http://localhost:3000)
   - Add your production URL (https://your-domain.com)

## Step 5: Cloudinary Setup (Image Storage)

1. **Create a Cloudinary account** at https://cloudinary.com
2. **Get API credentials**:
   - Cloud Name
   - API Key
   - API Secret
3. **Add credentials to `.env.local`**
4. **Configure upload presets** in Cloudinary dashboard for image uploads

## Step 6: Razorpay Setup (Indian Payments)

1. **Create a Razorpay account** at https://razorpay.com
2. **Get API keys**:
   - Key ID
   - Key Secret
3. **Add keys to `.env.local`**
4. **Configure payment settings** in Razorpay dashboard:
   - Webhook URLs
   - Success/failure pages
   - Currency (INR)

## Step 7: Stripe Setup (International Payments)

1. **Create a Stripe account** at https://stripe.com
2. **Get API keys**:
   - Publishable Key
   - Secret Key
3. **Add keys to `.env.local`**
4. **Configure payment settings** in Stripe dashboard:
   - Webhook endpoints
   - Success/failure URLs
   - Currency (USD/EUR/etc.)

## Step 8: Add Product Data

### Option A: Using Prisma Studio (GUI)

1. **Open Prisma Studio**:
```bash
npx prisma studio
```

2. **Add products manually** through the web interface:
   - Navigate to Product model
   - Add product details (name, description, price, images, etc.)
   - Add categories
   - Add any other data

### Option B: Using Database Seed Script

Create a seed script at `prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Add categories
  const category = await prisma.category.create({
    data: {
      name: 'Couple Stones',
      slug: 'couple',
      description: 'Personalized couple stone art',
      order: 1,
    },
  })

  // Add products
  await prisma.product.create({
    data: {
      name: 'Romantic Couple Stone',
      description: 'Beautiful personalized stone art for couples',
      price: 699,
      categoryId: category.id,
      images: ['https://your-image-url.jpg'],
      stock: 100,
      featured: true,
      bestseller: true,
    },
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
```

Run the seed script:
```bash
npx tsx prisma/seed.ts
```

## Step 9: Update Contact Information

Update contact details in:
- `src/components/layout/footer.tsx` - Footer contact info
- `src/app/contact/page.tsx` - Contact page
- `src/app/metadata.ts` - Company metadata

## Step 10: Test Functionality

Before deployment, test all features:

1. **User registration and login** (Clerk authentication)
2. **Product browsing and customization**
3. **Add to cart and checkout**
4. **Payment processing** (test mode)
5. **Order placement and tracking**
6. **Wishlist functionality**
7. **User account dashboard**
8. **Admin dashboard** (if using)

## Step 11: Deployment to Vercel

### Prerequisites
- GitHub account with your code pushed
- Vercel account
- All environment variables configured

### Deployment Steps

1. **Push code to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import project in Vercel**:
   - Go to https://vercel.com
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure environment variables** in Vercel:
   - Add all variables from `.env.local`
   - Use production values (not development keys)

4. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete

5. **Configure custom domain** (optional):
   - Add your domain in Vercel dashboard
   - Update DNS settings

6. **Update NEXT_PUBLIC_APP_URL** to your production URL

## Step 12: Post-Deployment Tasks

1. **Test the live application** thoroughly
2. **Set up monitoring** (Vercel Analytics, error tracking)
3. **Configure email notifications** for orders
4. **Set up backup strategy** for database
5. **Configure CDN** for static assets if needed
6. **Set up SSL certificates** (Vercel provides this automatically)

## Important Notes

- **Never commit `.env.local` to Git**
- **Use different API keys for development and production**
- **Test payment gateways in test mode before going live**
- **Keep your database backed up regularly**
- **Monitor application performance and errors**
- **Update dependencies regularly for security**

## Support

For issues during deployment:
- Check Vercel deployment logs
- Review environment variables
- Verify database connection
- Check API key permissions
- Review Clerk, Cloudinary, Razorpay, and Stripe dashboards for any issues
