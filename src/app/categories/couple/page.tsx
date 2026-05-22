"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Heart, Star, ShoppingCart } from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Romantic Couple Stone",
    price: 699,
    originalPrice: 899,
    image: "/placeholder-couple-1.jpg",
    rating: 4.8,
    reviews: 124,
    bestseller: true,
  },
  {
    id: 2,
    name: "Anniversary Special",
    price: 899,
    originalPrice: 1099,
    image: "/placeholder-couple-2.jpg",
    rating: 4.9,
    reviews: 89,
    bestseller: true,
  },
  {
    id: 3,
    name: "Love Birds Stone",
    price: 599,
    originalPrice: 799,
    image: "/placeholder-couple-3.jpg",
    rating: 4.7,
    reviews: 67,
    bestseller: false,
  },
  {
    id: 4,
    name: "Eternal Love Stone",
    price: 999,
    originalPrice: 1299,
    image: "/placeholder-couple-4.jpg",
    rating: 4.9,
    reviews: 156,
    bestseller: true,
  },
  {
    id: 5,
    name: "Couple Portrait Stone",
    price: 1199,
    originalPrice: 1499,
    image: "/placeholder-couple-5.jpg",
    rating: 4.8,
    reviews: 92,
    bestseller: false,
  },
  {
    id: 6,
    name: "Wedding Memory Stone",
    price: 799,
    originalPrice: 999,
    image: "/placeholder-couple-6.jpg",
    rating: 4.7,
    reviews: 78,
    bestseller: false,
  },
]

export default function CoupleCategoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mb-6">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Couple Stones Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrate your love with our beautiful personalized couple stone art. Perfect for anniversaries, weddings, and special moments.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                    <Heart className="h-24 w-24 text-stone-400" />
                  </div>
                  {product.bestseller && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Bestseller
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-semibold text-rose-600">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-amber-500 text-amber-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-amber-700">₹{product.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">₹{product.originalPrice}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/customize" className="flex-1">
                      <Button variant="luxury" className="w-full">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Customize
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Create Your Own Couple Stone</h2>
              <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
                Upload your favorite photo and customize it with names, text, and more
              </p>
              <Link href="/customize">
                <Button size="xl" variant="secondary">
                  Start Customizing
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
