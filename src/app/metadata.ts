import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "StoneCanvas - Turn Your Memories Into Timeless Stone Art",
    template: "%s | StoneCanvas"
  },
  description: "Premium personalized stone art gifts. Transform your precious moments into beautiful, handcrafted stone gifts that last forever. Perfect for couples, families, and special occasions. Free shipping on orders above ₹999.",
  keywords: ["stone art", "personalized gifts", "custom stone printing", "couple stones", "memorial stones", "wedding gifts", "god stone art", "custom photo gifts", "anniversary gifts", "birthday gifts", "personalized photo on stone", "custom stone printing India"],
  authors: [{ name: "StoneCanvas" }],
  creator: "StoneCanvas",
  publisher: "StoneCanvas",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "StoneCanvas - Turn Your Memories Into Timeless Stone Art",
    description: "Premium personalized stone art gifts for every occasion. Handcrafted with love in India.",
    siteName: "StoneCanvas",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "StoneCanvas - Premium Personalized Stone Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StoneCanvas - Turn Your Memories Into Timeless Stone Art",
    description: "Premium personalized stone art gifts for every occasion",
    images: ["/og-image.jpg"],
    creator: "@stonecanvas",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

// TODO: Update the following with your company details:
// 1. Replace "StoneCanvas" with your company name in title, description, and all other fields
// 2. Update the description with your company's unique value proposition
// 3. Update keywords to match your products
// 4. Update the Google verification code with your actual verification code
// 5. Update the OpenGraph and Twitter card images with your actual images
// 6. Update the Twitter handle with your actual handle
// 7. Add your actual manifest.json and favicon files
