"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight, Heart } from "lucide-react"

const blogPosts = [
  {
    id: 1,
    title: "The Art of Personalized Stone Printing: A Complete Guide",
    excerpt: "Discover how modern technology meets traditional craftsmanship to create stunning personalized stone art pieces that last a lifetime.",
    author: "StoneCanvas Team",
    date: "Jan 15, 2024",
    readTime: "8 min read",
    category: "Guides",
    image: "/placeholder-blog-1.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "5 Perfect Occasions for Custom Stone Art Gifts",
    excerpt: "From anniversaries to weddings, explore the best occasions to gift personalized stone art that will be cherished forever.",
    author: "Priya Sharma",
    date: "Jan 10, 2024",
    readTime: "5 min read",
    category: "Gift Ideas",
    image: "/placeholder-blog-2.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "How to Choose the Perfect Photo for Your Stone Art",
    excerpt: "Tips and tricks for selecting the best photo to ensure your personalized stone art turns out exactly as you envision.",
    author: "Rahul Mehta",
    date: "Jan 5, 2024",
    readTime: "6 min read",
    category: "Tips",
    image: "/placeholder-blog-3.jpg",
    featured: false,
  },
  {
    id: 4,
    title: "Stone Art vs. Traditional Photo Frames: Which is Better?",
    excerpt: "Compare the durability, aesthetics, and sentimental value of stone art versus traditional photo frames.",
    author: "StoneCanvas Team",
    date: "Dec 28, 2023",
    readTime: "7 min read",
    category: "Comparison",
    image: "/placeholder-blog-4.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Caring for Your Stone Art: Maintenance Tips",
    excerpt: "Learn how to keep your personalized stone art looking beautiful for years to come with these simple care instructions.",
    author: "Anjali Patel",
    date: "Dec 20, 2023",
    readTime: "4 min read",
    category: "Care Tips",
    image: "/placeholder-blog-5.jpg",
    featured: false,
  },
  {
    id: 6,
    title: "The Story Behind StoneCanvas: Crafting Memories",
    excerpt: "Learn about our journey, our artisans, and the passion that drives us to create beautiful stone art pieces.",
    author: "StoneCanvas Team",
    date: "Dec 15, 2023",
    readTime: "10 min read",
    category: "Company",
    image: "/placeholder-blog-6.jpg",
    featured: false,
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent dark:from-amber-400 dark:to-amber-600">
            Our Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover tips, guides, and stories about personalized stone art
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="md:flex">
              <div className="md:w-1/2 h-64 md:h-auto bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
                <Heart className="h-24 w-24 text-amber-600" />
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    Featured
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{blogPosts[0].category}</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {blogPosts[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {blogPosts[0].readTime}
                  </span>
                </div>
                <Button variant="luxury">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <div className="h-48 bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                  <Heart className="h-16 w-16 text-stone-400" />
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-amber-700 font-medium">{post.category}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 mt-auto">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="xl">
            Load More Posts
          </Button>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
