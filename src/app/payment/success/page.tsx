"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Check, ShoppingBag, Home, Mail, Phone, MapPin, Package, Clock } from "lucide-react"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const orderId = searchParams.get('orderId')
    
    if (orderId) {
      // Get the latest order from localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const latestOrder = orders.find((order: any) => order.orderId === orderId) || orders[orders.length - 1]
      
      if (latestOrder) {
        setOrderDetails(latestOrder)
      }
    }
    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30"
            >
              <Check className="h-12 w-12 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Payment Successful!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Thank you for your order. We've received your payment and your order is being processed.
            </p>
          </motion.div>

          {/* Order Details */}
          {orderDetails && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="mb-6 dark:bg-gray-800 shadow-xl">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h2>
                    <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-semibold">
                      Confirmed
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order ID</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{orderDetails.orderId || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Payment ID</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{orderDetails.paymentId || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {orderDetails.createdAt ? new Date(orderDetails.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                      <p className="font-semibold text-amber-700 dark:text-amber-400">
                        ₹{orderDetails.amount ? orderDetails.amount.toFixed(2) : '0.00'}
                      </p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
                      Shipping Address
                    </h3>
                    {orderDetails.shippingAddress && (
                      <div className="text-gray-700 dark:text-gray-300 space-y-1">
                        <p className="font-semibold">{orderDetails.shippingAddress.fullName}</p>
                        <p>{orderDetails.shippingAddress.addressLine1}</p>
                        {orderDetails.shippingAddress.addressLine2 && <p>{orderDetails.shippingAddress.addressLine2}</p>}
                        <p>{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postalCode}</p>
                        <p>{orderDetails.shippingAddress.country}</p>
                        <div className="flex gap-4 mt-2">
                          <p className="flex items-center text-sm">
                            <Phone className="mr-1 h-4 w-4" />
                            {orderDetails.shippingAddress.phone}
                          </p>
                          <p className="flex items-center text-sm">
                            <Mail className="mr-1 h-4 w-4" />
                            {orderDetails.shippingAddress.email}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <Package className="mr-2 h-5 w-5 text-amber-600 dark:text-amber-400" />
                      Order Items
                    </h3>
                    {orderDetails.items && orderDetails.items.length > 0 ? (
                      <div className="space-y-3">
                        {orderDetails.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {item.customImage ? 'Custom Stone Art' : 'Stone Art'}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {item.size && `Size: ${item.size}`}
                                {item.shape && ` • Shape: ${item.shape}`}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900 dark:text-white">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">No items in this order</p>
                    )}
                  </div>

                  {/* Delivery Estimate */}
                  <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 flex items-start gap-3">
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Estimated Delivery</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your order will be delivered within 5-7 business days. You'll receive a tracking number via email once your order ships.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="luxury"
              size="xl"
              onClick={() => router.push("/")}
              className="flex items-center justify-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => router.push("/account")}
              className="flex items-center justify-center border-2 border-amber-700 dark:border-amber-500 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              View Orders
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              A confirmation email has been sent to your email address with all the order details.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              If you have any questions, please contact us at{' '}
              <a href="mailto:hello@stonecanvas.com" className="text-amber-600 dark:text-amber-400 hover:underline">
                hello@stonecanvas.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
