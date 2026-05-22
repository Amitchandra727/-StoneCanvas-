# StoneCanvas - Premium Personalized Stone Art eCommerce Platform

A modern, full-stack eCommerce website for personalized stone printing and custom rock art business. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Premium UI/UX**: Elegant, luxury design with warm earthy color palette
- **Custom Product Builder**: Live preview customization system with image upload, text, fonts, shapes, and sizes
- **Shopping Cart & Checkout**: Smooth checkout flow with coupon system and guest checkout
- **Payment Integration**: Razorpay (India) and Stripe (International) payment gateways
- **Authentication**: Clerk authentication for user accounts
- **Admin Dashboard**: Full CRUD operations for products, orders, and users
- **Image Upload**: Cloudinary integration for image storage
- **SEO Optimized**: Complete SEO setup with sitemap and robots.txt
- **Responsive Design**: Mobile-first, fully responsive across all devices
- **Animations**: Framer Motion animations for smooth transitions

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Payments**: Razorpay + Stripe
- **Image Storage**: Cloudinary
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Clerk account
- Cloudinary account
- Razorpay account (for Indian payments)
- Stripe account (for international payments)

## 🔧 Setup Instructions

### 1. Environment Variables

Copy `ENV_SETUP.md` for reference and create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/stonecanvas"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID="your_razorpay_key_id"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"
STRIPE_SECRET_KEY="your_stripe_secret_key"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
stonecanvas/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── account/           # User account pages
│   │   ├── categories/        # Product categories
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout flow
│   │   └── customize/         # Product builder
│   ├── components/
│   │   ├── features/         # Feature components
│   │   ├── layout/           # Layout components
│   │   └── ui/               # shadcn/ui components
│   ├── lib/                  # Utilities
│   ├── stores/               # Zustand stores
│   └── types/                # TypeScript types
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

The `vercel.json` file is pre-configured for optimal deployment.

### Environment Variables for Production

Make sure to add all environment variables in Vercel:
- DATABASE_URL (use a managed PostgreSQL like Neon or Supabase)
- Clerk keys
- Cloudinary keys
- Razorpay keys
- Stripe keys
- NEXT_PUBLIC_APP_URL (your production URL)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npx prisma generate` - Generate Prisma Client
- `npx prisma db push` - Push schema to database
- `npx prisma studio` - Open Prisma Studio

## 🎨 Key Features Explained

### Custom Product Builder
- Live preview with stone texture mockups
- Image upload with Cloudinary
- Custom text and names
- Multiple font options
- Stone shapes (round, heart, oval, etc.)
- Size options
- Frame/stand selection
- Gift packaging options
- Dynamic pricing

### Admin Dashboard
- Order management
- Product CRUD operations
- User management
- Analytics overview
- Settings configuration

### Payment Integration
- Razorpay for Indian customers (UPI, cards, wallets)
- Stripe for international customers
- Secure payment processing
- Order status updates

## 🤝 Contributing

This is a commercial project. For contributions, please contact the development team.

## 📄 License

Proprietary - All rights reserved.

## 📞 Support

For support, email: hello@stonecanvas.com
