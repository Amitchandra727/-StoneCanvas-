"use client"

import Link from "next/link"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import { useWishlistStore } from "@/stores/wishlist-store"
import { useCartStore } from "@/stores/cart-store"

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const addItem = useCartStore((state: any) => state.addItem)

  const handleAddToCart = (item: any) => {
    addItem({
      id: Date.now().toString(),
      productId: item.productId,
      quantity: 1,
      price: item.price,
      customImage: item.image,
    })
    removeItem(item.id)
  }

  const handleMoveAllToCart = () => {
    items.forEach((item) => {
      addItem({
        id: Date.now().toString(),
        productId: item.productId,
        quantity: 1,
        price: item.price,
        customImage: item.image,
      })
    })
    clearWishlist()
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8">
              Save your favorite items for later by clicking the heart icon
            </p>
            <Link href="/collection">
              <Button variant="luxury" size="xl">
                Explore Collection
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-gray-900">My Wishlist</h1>
          <p className="text-gray-600">{items.length} {items.length === 1 ? "item" : "items"} saved</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Wishlist Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-32 h-32 bg-gradient-to-br from-stone-200 to-stone-300 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt="Product"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Heart className="h-12 w-12 text-stone-400" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        {item.category && (
                          <p className="text-sm text-amber-700 mb-1">{item.category}</p>
                        )}
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <p className="text-lg font-bold text-amber-700">₹{item.price}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="luxury"
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <Button
              variant="outline"
              onClick={clearWishlist}
              className="w-full mt-4"
            >
              Clear Wishlist
            </Button>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Wishlist Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items</span>
                    <span className="font-semibold">{items.length}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Value</span>
                    <span className="font-semibold text-amber-700">
                      ₹{items.reduce((total, item) => total + item.price, 0)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="luxury"
                  size="xl"
                  className="w-full mb-4"
                  onClick={handleMoveAllToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Move All to Cart
                </Button>

                <Link href="/collection" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
