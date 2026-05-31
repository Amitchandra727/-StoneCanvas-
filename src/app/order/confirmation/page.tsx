"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Check, Home, Download, Share2, Printer } from "lucide-react"

export default function OrderConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const orderId = searchParams.get('orderId')
    
    if (orderId) {
      // Get the order from localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      const order = orders.find((order: any) => order.orderId === orderId)
      
      if (order) {
        setOrderDetails(order)
      }
    }
    setLoading(false)
  }, [searchParams])

  const handleDownloadInvoice = () => {
    // In production, this would generate and download a PDF invoice
    alert('Invoice download feature coming soon!')
  }

  const handleShareOrder = () => {
    if (navigator.share && orderDetails) {
      navigator.share({
        title: 'My StoneCanvas Order',
        text: `I just placed an order with StoneCanvas! Order ID: ${orderDetails.orderId}`,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Order link copied to clipboard!')
    }
  }

  const handlePrintOrder = () => {
    window.print()
  }

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

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Order Not Found</h1>
          <Button onClick={() => router.push("/account")}>View My Orders</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Order Confirmation</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Thank you for your purchase! Here are your order details.
            </p>
          </motion.div>

          {/* Order Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-6 dark:bg-gray-800 shadow-xl">
              <CardContent className="p-8">
                {/* Success Banner */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Check className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Order Confirmed!</h2>
                      <p className="text-white/90">Your order has been successfully placed</p>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order ID</p>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">{orderDetails.orderId || 'N/A'}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Date</p>
                    <p className="font-bold text-gray-900 dark:text-white text-lg">
                      {orderDetails.createdAt ? new Date(orderDetails.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Amount</p>
                    <p className="font-bold text-amber-700 dark:text-amber-400 text-lg">
                      ₹{orderDetails.amount ? orderDetails.amount.toFixed(2) : '0.00'}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Order Items</h3>
                  {orderDetails.items && orderDetails.items.length > 0 ? (
                    <div className="space-y-4">
                      {orderDetails.items.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {item.customImage ? 'Custom Stone Art' : 'Stone Art'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {item.size && `Size: ${item.size}`}
                              {item.shape && ` • Shape: ${item.shape}`}
                              {item.frame && ` • Frame: ${item.frame}`}
                            </p>
                            {item.customText && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Custom Text: {item.customText}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900 dark:text-white">
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

                {/* Shipping Address */}
                {orderDetails.shippingAddress && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Shipping Address</h3>
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="font-semibold text-gray-900 dark:text-white">{orderDetails.shippingAddress.fullName}</p>
                      <p className="text-gray-700 dark:text-gray-300">{orderDetails.shippingAddress.addressLine1}</p>
                      {orderDetails.shippingAddress.addressLine2 && (
                        <p className="text-gray-700 dark:text-gray-300">{orderDetails.shippingAddress.addressLine2}</p>
                      )}
                      <p className="text-gray-700 dark:text-gray-300">
                        {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postalCode}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">{orderDetails.shippingAddress.country}</p>
                      <div className="mt-2 flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <p>{orderDetails.shippingAddress.phone}</p>
                        <p>{orderDetails.shippingAddress.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Payment Information</h3>
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                      <span className="font-semibold text-gray-900 dark:text-white">Razorpay</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Payment ID</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{orderDetails.paymentId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Status</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">Paid</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleDownloadInvoice}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Invoice
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleShareOrder}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share Order
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handlePrintOrder}
                    className="flex items-center gap-2"
                  >
                    <Printer className="h-4 w-4" />
                    Print Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="dark:bg-gray-800 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What's Next?</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Order Processing</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our team will review your order and begin processing within 24 hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Artwork Creation</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Our artists will create your custom stone art with precision and care.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Quality Check & Shipping</p>
                      <p className="text-sm text-gray-600 dark:text-400">
                        Each piece undergoes quality check before being shipped to your address.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">4</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Delivery</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Estimated delivery within 5-7 business days. You'll receive tracking information via email.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <Button
              variant="luxury"
              size="xl"
              onClick={() => router.push("/")}
              className="flex items-center justify-center"
            >
              <Home className="mr-2 h-5 w-5" />
              Continue Shopping
            </Button>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
