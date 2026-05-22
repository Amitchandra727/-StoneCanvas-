import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StoneCanvas - Turn Your Memories Into Timeless Stone Art",
  description: "Premium personalized stone art gifts. Transform your precious moments into beautiful, handcrafted stone gifts that last forever. Perfect for couples, families, and special occasions.",
  keywords: ["stone art", "personalized gifts", "custom stone printing", "couple stones", "memorial stones", "wedding gifts", "god stone art", "custom photo gifts"],
  authors: [{ name: "StoneCanvas" }],
  creator: "StoneCanvas",
  publisher: "StoneCanvas",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    title: "StoneCanvas - Turn Your Memories Into Timeless Stone Art",
    description: "Premium personalized stone art gifts for every occasion",
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
};

// TODO: Update the following with your company details:
// 1. Replace "StoneCanvas" with your company name in title, description, and all other fields
// 2. Update the description with your company's unique value proposition
// 3. Update keywords to match your products
// 4. Update the Google verification code with your actual verification code
// 5. Update the OpenGraph and Twitter card images with your actual images
