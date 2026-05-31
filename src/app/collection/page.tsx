"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Heart, Star, ShoppingCart, Filter, Grid, Heart as HeartFilled, Sparkles } from "lucide-react"
import Link from "next/link"
import { useCartStore } from "@/stores/cart-store"
import { useWishlistStore } from "@/stores/wishlist-store"

const products = [
  {
    id: "1",
    productId: "prod-1",
    name: "Romantic Couple Stone",
    price: 699,
    originalPrice: 899,
    rating: 4.8,
    reviews: 124,
    bestseller: true,
    category: "Couple Stones",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "2",
    productId: "prod-2",
    name: "Divine Ganesh Stone",
    price: 899,
    originalPrice: 1099,
    rating: 4.9,
    reviews: 89,
    bestseller: true,
    category: "God Stone Art",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "3",
    productId: "prod-3",
    name: "Wedding Anniversary Gift",
    price: 999,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 67,
    bestseller: false,
    category: "Wedding Gifts",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "4",
    productId: "prod-4",
    name: "Memorial Stone Pet",
    price: 599,
    originalPrice: 799,
    rating: 4.9,
    reviews: 156,
    bestseller: true,
    category: "Pet Memorial",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "5",
    productId: "prod-5",
    name: "Motivational Desk Stone",
    price: 499,
    originalPrice: 699,
    rating: 4.8,
    reviews: 92,
    bestseller: false,
    category: "Desk Stones",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "6",
    productId: "prod-6",
    name: "Home Decor Stone Art",
    price: 799,
    originalPrice: 999,
    rating: 4.7,
    reviews: 78,
    bestseller: false,
    category: "Home Decor",
    color: "from-rose-500 to-red-500",
  },
]

export default function CollectionPage() {
  const addItem = useCartStore((state) => state.addItem)
  const addItemToWishlist = useWishlistStore((state) => state.addItem)
  const isInWishlist = useWishlistStore((state) => state.isInWishlist)

  const handleAddToCart = (product: any) => {
    addItem({
      id: Date.now().toString(),
      productId: product.productId,
      quantity: 1,
      price: product.price,
      customImage: undefined,
    })
  }

  const handleAddToWishlist = (product: any) => {
    addItemToWishlist({
      id: Date.now().toString(),
      productId: product.productId,
      name: product.name,
      price: product.price,
      category: product.category,
    })
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-700 via-orange-600 to-rose-700 bg-clip-text text-transparent">
            Our Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our complete range of personalized stone art products
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="shadow-md hover:shadow-lg transition-shadow">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="shadow-md hover:shadow-lg transition-shadow">
              <Grid className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
          <p className="text-gray-600 font-medium">Showing {products.length} products</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group">
                <div className="relative">
                  <div className={`aspect-square bg-gradient-to-br ${product.color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <Heart className="h-24 w-24 text-white/80 group-hover:scale-110 transition-transform drop-shadow-lg" />
                    </motion.div>
                  </div>
                  {product.bestseller && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Bestseller
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-rose-600 shadow-lg">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <p className="text-sm font-semibold text-amber-700 mb-2">{product.category}</p>
                  <h3 className="text-lg font-bold mb-3 text-gray-900">{product.name}</h3>
                  <div className="flex items-center mb-3">
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
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleAddToWishlist(product)}
                      className={isInWishlist(product.productId) ? "text-rose-500 border-rose-500 hover:bg-rose-50" : "hover:bg-rose-50"}
                    >
                      {isInWishlist(product.productId) ? (
                        <HeartFilled className="h-4 w-4" />
                      ) : (
                        <Heart className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="luxury"
                      className="flex-1 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                    <Link href="/customize" className="flex-1">
                      <Button variant="outline" className="w-full hover:bg-amber-50">
                        <Sparkles className="mr-2 h-4 w-4" />
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
