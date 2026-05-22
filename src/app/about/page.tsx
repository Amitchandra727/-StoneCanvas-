"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Heart, Award, Users, Target, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            About StoneCanvas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Turning precious memories into timeless stone art since 2024
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-amber-700 to-amber-900 text-white border-0">
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-amber-100 max-w-3xl mx-auto text-lg">
                StoneCanvas was born from a simple idea: every memory deserves to be preserved in something beautiful and lasting. 
                We combine traditional stone art techniques with modern technology to create personalized gifts that tell your unique story.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Our Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Heart,
              title: "Made with Love",
              description: "Every piece is crafted with care and attention to detail",
            },
            {
              icon: Award,
              title: "Premium Quality",
              description: "We use only the finest materials and printing techniques",
            },
            {
              icon: Users,
              title: "Customer First",
              description: "Your satisfaction is our top priority, always",
            },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <value.icon className="h-12 w-12 text-amber-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <Card>
            <CardContent className="p-12">
              <div className="flex items-center gap-4 mb-6">
                <Target className="h-12 w-12 text-amber-700" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be India's most trusted brand for personalized stone art, helping millions of people preserve their most precious memories in beautiful, lasting keepsakes. We believe every moment worth remembering deserves to be preserved in something extraordinary.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300">
            <CardContent className="p-12">
              <Sparkles className="h-16 w-16 text-amber-700 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to Create Your Own?</h2>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Start customizing your own stone art today and turn your memories into something timeless
              </p>
              <Button variant="luxury" size="xl">
                Start Customizing
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
