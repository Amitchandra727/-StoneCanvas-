"use client"

import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Heart, Star, Gift, Sparkles, Award, Truck, Shield, Clock, Gem, Palette, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100 dark:bg-gray-800 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(244,114,182,0.2),transparent_50%)]" />
        
        {/* Floating Particles */}
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-30 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 40, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full opacity-30 blur-2xl"
        />
        <motion.div
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full opacity-30 blur-2xl"
        />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-amber-200 to-orange-200 dark:bg-gray-700 text-amber-900 dark:text-amber-400 rounded-full text-sm font-semibold shadow-lg shadow-amber-200/50">
                ✨ Premium Personalized Stone Art
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-700 via-orange-600 to-rose-700 dark:from-amber-400 dark:via-orange-400 dark:to-rose-400 bg-clip-text text-transparent leading-tight drop-shadow-sm">
              Turn Your Memories Into<br />Timeless Stone Art
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your precious moments into beautiful, handcrafted stone gifts that last forever. Perfect for couples, families, and special occasions.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/customize">
                <Button variant="luxury" size="xl" className="text-lg shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Customize Now
                </Button>
              </Link>
              <Link href="/collection">
                <Button variant="outline" size="xl" className="text-lg border-2 border-amber-700 dark:border-amber-500 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800 hover:border-amber-800 transition-all">
                  Explore Collection
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-gradient-to-b from-white to-amber-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-rose-700 bg-clip-text text-transparent">
              Our Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handcrafted stone art collections
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Couple Stones", icon: Heart, color: "from-pink-500 via-rose-500 to-red-500", link: "/categories/couple", desc: "Celebrate your love" },
              { name: "God Stone Art", icon: Sparkles, color: "from-amber-500 via-orange-500 to-yellow-500", link: "/categories", desc: "Divine blessings" },
              { name: "Wedding Gifts", icon: Gift, color: "from-purple-500 via-violet-500 to-indigo-500", link: "/categories", desc: "Perfect for couples" },
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
              >
                <Link href={category.link}>
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group border-0 shadow-lg">
                    <div className={`h-56 bg-gradient-to-br ${category.color} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <category.icon className="h-20 w-20 text-white group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                      </motion.div>
                    </div>
                    <CardContent className="p-6 bg-white">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{category.name}</h3>
                      <p className="text-gray-600">{category.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-b from-amber-50/50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple 4-step process to create your custom stone art
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Upload Photo", desc: "Share your favorite memory", icon: Gem },
              { step: "2", title: "Customize", desc: "Add names, text & design", icon: Palette },
              { step: "3", title: "We Print", desc: "Our artists craft your art", icon: Sparkles },
              { step: "4", title: "Delivered", desc: "Receive your timeless gift", icon: Truck },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-amber-500/30">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-amber-700 font-bold">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-24 bg-gradient-to-b from-white to-amber-50/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Award, title: "Premium Quality", desc: "Handcrafted with love", color: "from-amber-500 to-orange-500" },
              { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999", color: "from-green-500 to-emerald-500" },
              { icon: Shield, title: "Secure Payment", desc: "100% safe transactions", color: "from-blue-500 to-indigo-500" },
              { icon: Zap, title: "Fast Delivery", desc: "Within 5-7 business days", color: "from-purple-500 to-pink-500" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-${feature.color.split('-')[1]}-500/30`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-rose-700 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real stories from real customers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul Sharma", location: "Mumbai", rating: 5 },
              { name: "Priya Patel", location: "Delhi", rating: 5 },
              { name: "Amit Kumar", location: "Bangalore", rating: 5 },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
              >
                <Card className="p-8 hover:shadow-2xl transition-all duration-500 border-0 shadow-lg bg-gradient-to-br from-white to-amber-50/30">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    "Absolutely stunning! The stone art exceeded my expectations. My wife cried when she saw our wedding photo on the stone. Perfect anniversary gift!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full mr-4 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-amber-700 via-orange-600 to-rose-700 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
                Ready to Create Your Timeless Gift?
              </h2>
            </motion.div>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of happy customers who have preserved their memories in beautiful stone art
            </p>
            <Link href="/customize">
              <Button size="xl" variant="secondary" className="text-lg shadow-xl hover:shadow-2xl transition-all bg-white text-amber-700 hover:bg-amber-50">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Customizing Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
