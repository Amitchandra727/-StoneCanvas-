"use client"

import { useState } from "react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Heart, Star, ShoppingCart, Filter, Grid, Heart as HeartFilled, Sparkles, Eye, ShoppingCart as CartFilled, X, ChevronDown, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useCartStore } from "@/stores/cart-store"
import { useWishlistStore } from "@/stores/wishlist-store"
import { products } from "@/lib/products"
import Image from "next/image"
import { Slider } from "@/components/ui/slider"
import { generateProductMessage, getWhatsAppPhoneNumber, generateWhatsAppUrl } from "@/lib/whatsapp"

export default function CollectionPage() {
  const addItem = useCartStore((state) => state.addItem)
  const addItemToWishlist = useWishlistStore((state) => state.addItem)
  const removeItemFromWishlist = useWishlistStore((state) => state.removeItem)
  const isInWishlist = useWishlistStore((state) => state.isInWishlist)
  const cartItems = useCartStore((state) => state.items)

  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([2000])
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))]

  const filteredProducts = products
    .filter(product => {
      if (selectedCategory !== "all" && product.category !== selectedCategory) return false
      if (product.price > priceRange[0]) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "featured":
        default:
          return (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0)
      }
    })

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleAddToCart = (product: any) => {
    addItem({
      id: Date.now().toString(),
      productId: product.productId,
      quantity: 1,
      price: product.price,
      name: product.name,
      image: product.image,
    })
  }

  const handleToggleWishlist = (product: any) => {
    if (isInWishlist(product.productId)) {
      removeItemFromWishlist(product.productId)
    } else {
      addItemToWishlist({
        id: Date.now().toString(),
        productId: product.productId,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
      })
    }
  }

  const isInCart = (productId: string) => {
    return cartItems.some((item) => item.productId === productId)
  }

  const resetFilters = () => {
    setSelectedCategory("all")
    setPriceRange([2000])
    setSortBy("featured")
    setCurrentPage(1)
  }

  const handleWhatsAppClick = (product: any) => {
    const phoneNumber = getWhatsAppPhoneNumber()
    const productUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/collection`
    const message = generateProductMessage({
      productName: product.name,
      productUrl,
      productPrice: product.price,
      customMessage: "I'm interested in this product. Please provide more details."
    })
    const whatsappUrl = generateWhatsAppUrl(phoneNumber, message)
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-700 via-orange-600 to-rose-700 dark:from-amber-400 dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent">
            Our Collection
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our complete range of personalized stone art products
          </p>
        </motion.div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex gap-2 w-full md:w-auto">
            <Button 
              variant={showFilters ? "default" : "outline"} 
              size="sm" 
              className="shadow-md hover:shadow-lg transition-shadow"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {showFilters && <X className="ml-2 h-4 w-4" />}
            </Button>
            <div className="relative">
              <Button variant="outline" size="sm" className="shadow-md hover:shadow-lg transition-shadow">
                <Grid className="mr-2 h-4 w-4" />
                Sort
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
            {(selectedCategory !== "all" || priceRange[0] < 2000) && (
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            Showing {paginatedProducts.length} of {filteredProducts.length} products
          </p>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Price Range</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000}
                    min={499}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>₹499</span>
                    <span>₹{priceRange[0]}</span>
                  </div>
                </div>
              </div>

              {/* Bestseller Filter */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Quick Filters</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      const bestsellers = products.filter(p => p.bestseller)
                      setSelectedCategory(bestsellers.length > 0 ? products.find(p => p.bestseller)?.category || "all" : "all")
                    }}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-all"
                  >
                    ⭐ Bestsellers
                  </button>
                  <button
                    onClick={() => setPriceRange([1000])}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50 transition-all"
                  >
                    💰 Under ₹1000
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg group bg-white dark:bg-gray-800">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                        onClick={() => handleToggleWishlist(product)}
                      >
                        {isInWishlist(product.productId) ? (
                          <HeartFilled className="h-4 w-4 text-rose-500" />
                        ) : (
                          <Heart className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {product.bestseller && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      Bestseller
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-rose-600 shadow-lg">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                </div>
                <CardContent className="p-5">
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2 uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="text-base font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < Math.floor(product.rating)
                              ? "fill-amber-500 text-amber-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-amber-700 dark:text-amber-400">₹{product.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">₹{product.originalPrice}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="luxury"
                      className="flex-1 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow text-sm"
                      onClick={() => handleAddToCart(product)}
                      disabled={isInCart(product.productId)}
                    >
                      {isInCart(product.productId) ? (
                        <>
                          <CartFilled className="mr-2 h-4 w-4" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 hover:bg-green-50 dark:hover:bg-green-900/20 border-green-600 text-green-600 text-sm"
                      onClick={() => handleWhatsAppClick(product)}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-gradient-to-r from-amber-600 to-orange-600" : ""}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
