"use client"

import { useState } from "react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Search, Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("")
  const [tracking, setTracking] = useState(false)

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault()
    if (orderId) {
      setTracking(true)
    }
  }

  const timeline = [
    {
      status: "Order Placed",
      date: "Jan 20, 2024 - 10:30 AM",
      icon: Package,
      completed: true,
      description: "Your order has been placed successfully",
    },
    {
      status: "Processing",
      date: "Jan 20, 2024 - 2:00 PM",
      icon: Clock,
      completed: true,
      description: "Your order is being processed",
    },
    {
      status: "Shipped",
      date: "Jan 22, 2024 - 11:00 AM",
      icon: Truck,
      completed: true,
      description: "Your order has been shipped via BlueDart",
    },
    {
      status: "Out for Delivery",
      date: "Jan 24, 2024 - 9:00 AM",
      icon: MapPin,
      completed: false,
      description: "Your order is out for delivery",
    },
    {
      status: "Delivered",
      date: "Estimated: Jan 25, 2024",
      icon: CheckCircle,
      completed: false,
      description: "Your order will be delivered soon",
    },
  ]

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
            Track Your Order
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your order ID to track your package in real-time
          </p>
        </motion.div>

        {!tracking ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto"
          >
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleTrack} className="space-y-4">
                  <div>
                    <Label htmlFor="orderId">Order ID *</Label>
                    <Input
                      id="orderId"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="e.g., SC12345678"
                      required
                    />
                  </div>
                  <Button variant="luxury" size="xl" className="w-full">
                    <Search className="mr-2 h-5 w-5" />
                    Track Order
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {/* Order Summary */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">Order #{orderId}</h3>
                    <p className="text-gray-600">Expected Delivery: Jan 25, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-lg font-semibold text-amber-700">In Transit</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Order Timeline</h3>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.status}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            item.completed
                              ? "bg-amber-700 text-white"
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          <item.icon className="h-6 w-6" />
                        </div>
                        {index < timeline.length - 1 && (
                          <div
                            className={`w-0.5 flex-1 ${
                              item.completed ? "bg-amber-700" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                      
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{item.status}</h4>
                          <span className="text-sm text-gray-500">{item.date}</span>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => setTracking(false)}
            >
              Track Another Order
            </Button>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  )
}
