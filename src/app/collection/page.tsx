"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Heart, Star, ShoppingCart, Filter, Grid } from "lucide-react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "Romantic Couple Stone",
    price: 699,
    originalPrice: 899,
    rating: 4.8,
    reviews: 124,
    bestseller: true,
    category: "Couple Stones",
  },
  {
    id: 2,
    name: "Divine Ganesh Stone",
    price: 899,
    originalPrice: 1099,
    rating: 4.9,
    reviews: 89,
    bestseller: true,
    category: "God Stone Art",
  },
  {
    id: 3,
    name: "Wedding Anniversary Gift",
    price: 999,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 67,
    bestseller: false,
    category: "Wedding Gifts",
  },
  {
    id: 4,
    name: "Memorial Stone Pet",
    price: 599,
    originalPrice: 799,
    rating: 4.9,
    reviews: 156,
    bestseller: true,
    category: "Pet Memorial",
  },
  {
    id: 5,
    name: "Motivational Desk Stone",
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviews: 92,
    bestseller: false,
    category: "Desk Stones",
  },
  {
    id: 6,
    name: "Home Decor Stone Art",
    price: 799,
    originalPrice: 999,
    rating: 4.7,
    reviews: 78,
    bestseller: false,
    category: "Home Decor",
  },
]

export default function CollectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            Our Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our complete range of personalized stone art products
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Grid className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
          <p className="text-gray-600">Showing {products.length} products</p>
        </div>

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
                  <p className="text-sm text-amber-700 mb-1">{product.category}</p>
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
      </div>

      <Footer />
    </div>
  )
}
