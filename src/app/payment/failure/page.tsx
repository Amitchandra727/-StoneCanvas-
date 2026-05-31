"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { X, RefreshCw, Home, ShoppingBag, AlertCircle } from "lucide-react"

export default function PaymentFailurePage() {
  const router = useRouter()
  const [errorDetails, setErrorDetails] = useState<any>(null)

  useEffect(() => {
    // Get pending order details if available
    const pendingOrder = localStorage.getItem('pendingOrder')
    if (pendingOrder) {
      setErrorDetails(JSON.parse(pendingOrder))
    }
  }, [])

  const handleRetryPayment = () => {
    router.push('/checkout')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Failure Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-500/30"
            >
              <X className="h-12 w-12 text-white" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Payment Failed
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We're sorry, but your payment could not be processed. Please try again or contact support.
            </p>
          </motion.div>

          {/* Error Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="mb-6 dark:bg-gray-800 shadow-xl border-red-200 dark:border-red-900">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      What Happened?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Your payment transaction was not successful. This could be due to:
                    </p>
                  </div>
                </div>

                <ul className="space-y-3 text-gray-600 dark:text-gray-400 ml-16">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Insufficient funds in your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Network connectivity issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Card declined by the bank</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Expired or invalid payment method</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Transaction timeout</span>
                  </li>
                </ul>

                {errorDetails && (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Order ID:</span> {errorDetails.orderId || 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      <span className="font-semibold">Amount:</span> ₹{errorDetails.amount ? errorDetails.amount.toFixed(2) : '0.00'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* What You Can Do */}
            <Card className="mb-6 dark:bg-gray-800 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  What You Can Do
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Try Again</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Click the "Retry Payment" button below to attempt the payment again with a different method.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Check Your Payment Method</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ensure your card has sufficient funds and is not expired. Try using a different payment method.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Contact Support</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        If the problem persists, please contact our support team for assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

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
              onClick={handleRetryPayment}
              className="flex items-center justify-center"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Retry Payment
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => router.push("/")}
              className="flex items-center justify-center border-2 border-gray-700 dark:border-gray-500 text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => router.push("/cart")}
              className="flex items-center justify-center border-2 border-gray-700 dark:border-gray-500 text-gray-700 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              View Cart
            </Button>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Need help? Contact our support team at{' '}
              <a href="mailto:support@stonecanvas.com" className="text-amber-600 dark:text-amber-400 hover:underline">
                support@stonecanvas.com
              </a>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Or call us at{' '}
              <a href="tel:+919876543210" className="text-amber-600 dark:text-amber-400 hover:underline">
                +91 98765 43210
              </a>
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
