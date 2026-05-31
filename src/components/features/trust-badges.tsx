"use client"

import { motion } from "framer-motion"
import { Shield, Truck, Clock, Award, CheckCircle, Star, MessageSquare, ThumbsUp } from "lucide-react"

export default function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "100% secure transactions with SSL encryption",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Nationwide delivery within 5-7 business days",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Clock,
      title: "Quality Guarantee",
      description: "30-day money-back guarantee on all products",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Handcrafted by skilled artisans with love",
      color: "from-purple-500 to-purple-600",
    },
  ]

  const reviews = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "Absolutely stunning quality! The stone art exceeded my expectations. My husband loved our anniversary gift.",
      date: "2 days ago",
    },
    {
      name: "Rahul Patel",
      location: "Delhi",
      rating: 5,
      text: "Perfect customer service and beautiful craftsmanship. Will definitely order again for special occasions.",
      date: "1 week ago",
    },
    {
      name: "Anita Desai",
      location: "Bangalore",
      rating: 5,
      text: "The customization process was so easy and the final product was exactly what I wanted. Highly recommend!",
      date: "2 weeks ago",
    },
  ]

  const guarantees = [
    {
      icon: CheckCircle,
      title: "100% Satisfaction",
      description: "Not happy? Get a full refund within 30 days",
    },
    {
      icon: Shield,
      title: "Secure Checkout",
      description: "Your payment information is always safe",
    },
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On all orders above ₹999",
    },
    {
      icon: MessageSquare,
      title: "24/7 Support",
      description: "We're here to help anytime you need us",
    },
  ]

  return (
    <div className="space-y-16 py-16">
      {/* Trust Badges Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${badge.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <badge.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{badge.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-amber-500 text-amber-500" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Loved by 1000+ Customers
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            4.9/5 average rating from verified reviews
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{review.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.location}</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">{review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our Promise to You
            </h2>
            <p className="text-amber-100 text-lg">
              We stand behind every product we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={guarantee.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <guarantee.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="font-bold text-white mb-2">{guarantee.title}</h3>
                <p className="text-sm text-amber-100">{guarantee.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Social Proof Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
            Trusted by Thousands
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Join our community of happy customers
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {[
            { count: "1000+", label: "Happy Customers" },
            { count: "5000+", label: "Orders Delivered" },
            { count: "4.9/5", label: "Average Rating" },
            { count: "30+", label: "Cities Served" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                {stat.count}
              </div>
              <p className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
