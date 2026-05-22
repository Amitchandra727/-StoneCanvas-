"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Heart, Sparkles, Gift, Home, Award, PawPrint } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "couple",
    name: "Couple Stones",
    description: "Celebrate your love with personalized couple stone art",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    productCount: 24,
    featured: true,
  },
  {
    id: "god",
    name: "God Stone Art",
    description: "Sacred divine images beautifully printed on stone",
    icon: Sparkles,
    color: "from-amber-500 to-orange-500",
    productCount: 36,
    featured: true,
  },
  {
    id: "wedding",
    name: "Wedding Gifts",
    description: "Perfect wedding gifts for the special couple",
    icon: Gift,
    color: "from-purple-500 to-indigo-500",
    productCount: 18,
    featured: true,
  },
  {
    id: "memorial",
    name: "Memorial Stones",
    description: "Honor your loved ones with memorial stone art",
    icon: Award,
    color: "from-gray-500 to-slate-500",
    productCount: 12,
    featured: false,
  },
  {
    id: "pet",
    name: "Pet Memorial",
    description: "Remember your furry friends forever",
    icon: PawPrint,
    color: "from-orange-400 to-amber-500",
    productCount: 15,
    featured: false,
  },
  {
    id: "decor",
    name: "Home Decor",
    description: "Beautiful stone art for your home",
    icon: Home,
    color: "from-teal-500 to-cyan-500",
    productCount: 20,
    featured: false,
  },
]

export default function CategoriesPage() {
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
            Our Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of personalized stone art collections, each crafted with love and precision
          </p>
        </motion.div>

        {/* Featured Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.filter((cat) => cat.featured).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/categories/${category.id}`}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group h-full">
                    <div className={`h-64 bg-gradient-to-br ${category.color} flex items-center justify-center relative`}>
                      <category.icon className="h-24 w-24 text-white group-hover:scale-110 transition-transform" />
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                        {category.productCount} Products
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      <Button variant="outline" className="w-full group-hover:bg-amber-50 group-hover:border-amber-500">
                        Explore Collection
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Categories */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">All Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/categories/${category.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div className={`h-48 bg-gradient-to-br ${category.color} flex items-center justify-center relative`}>
                      <category.icon className="h-16 w-16 text-white group-hover:scale-110 transition-transform" />
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                        {category.productCount}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-amber-700 to-amber-900 text-white border-0">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
              <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
                Create your own custom stone art with our easy-to-use customization tool
              </p>
              <Link href="/customize">
                <Button size="xl" variant="secondary">
                  Start Customizing Now
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
