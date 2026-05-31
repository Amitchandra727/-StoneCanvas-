"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { CreditCard, Truck, MapPin, Phone, Mail, Lock, Check } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  })

  const [billingAddress, setBillingAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
  })

  const [sameAsShipping, setSameAsShipping] = useState(true)

  const subtotal = getTotal()
  const shipping = subtotal > 999 ? 0 : 99
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => setRazorpayLoaded(true)
      script.onerror = () => console.error('Failed to load Razorpay SDK')
      document.body.appendChild(script)
    }

    loadRazorpayScript()
  }, [])

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value })
    if (sameAsShipping) {
      setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value })
    }
  }

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value })
  }

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked)
    if (checked) {
      setBillingAddress({ ...shippingAddress })
    }
  }

  const handlePlaceOrder = async () => {
    if (!razorpayLoaded) {
      alert('Payment gateway is loading. Please try again.')
      return
    }

    // Validate form
    if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.email || 
        !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode) {
      alert('Please fill in all required shipping address fields')
      return
    }

    setLoading(true)

    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(total),
          currency: 'INR',
          receipt: `receipt_${Date.now()}`
        })
      })

      const orderData = await orderResponse.json()

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order')
      }

      // Store order details in localStorage for verification
      localStorage.setItem('pendingOrder', JSON.stringify({
        orderId: orderData.orderId,
        amount: total,
        items,
        shippingAddress,
        billingAddress: sameAsShipping ? shippingAddress : billingAddress
      }))

      // Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_your_key_here',
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'StoneCanvas',
        description: 'Custom Stone Art Order',
        order_id: orderData.orderId,
        handler: async (response: any) => {
          // Verify payment
          const verifyResponse = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          })

          const verifyData = await verifyResponse.json()

          if (verifyData.success) {
            // Store completed order
            const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder') || '{}')
            const completedOrder = {
              ...pendingOrder,
              paymentId: response.razorpay_payment_id,
              status: 'paid',
              createdAt: new Date().toISOString()
            }
            
            // Store in localStorage (in production, this would go to database)
            const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
            existingOrders.push(completedOrder)
            localStorage.setItem('orders', JSON.stringify(existingOrders))
            
            // Clear pending order and cart
            localStorage.removeItem('pendingOrder')
            clearCart()
            
            // Redirect to success page
            router.push(`/payment/success?orderId=${response.razorpay_order_id}`)
          } else {
            router.push('/payment/failure')
          }
        },
        prefill: {
          name: shippingAddress.fullName,
          email: shippingAddress.email,
          contact: shippingAddress.phone
        },
        theme: {
          color: '#f59e0b'
        },
        modal: {
          ondismiss: function() {
            setLoading(false)
          }
        }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()

    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Checkout</h1>
          <p className="text-gray-600 dark:text-gray-300">Complete your order to receive your custom stone art</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="shipping" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>

              {/* Shipping Address */}
              <TabsContent value="shipping" className="space-y-6">
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <MapPin className="mr-2 h-5 w-5" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-900 dark:text-white">Full Name *</Label>
                        <Input
                          name="fullName"
                          value={shippingAddress.fullName}
                          onChange={handleShippingChange}
                          placeholder="John Doe"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-900 dark:text-white">Phone *</Label>
                        <Input
                          name="phone"
                          value={shippingAddress.phone}
                          onChange={handleShippingChange}
                          placeholder="+91 98765 43210"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-900 dark:text-white">Email *</Label>
                      <Input
                        name="email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={handleShippingChange}
                        placeholder="john@example.com"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-900 dark:text-white">Address Line 1 *</Label>
                      <Input
                        name="addressLine1"
                        value={shippingAddress.addressLine1}
                        onChange={handleShippingChange}
                        placeholder="123 Main Street"
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-900 dark:text-white">Address Line 2</Label>
                      <Input
                        name="addressLine2"
                        value={shippingAddress.addressLine2}
                        onChange={handleShippingChange}
                        placeholder="Apartment, suite, etc."
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-900 dark:text-white">City *</Label>
                        <Input
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleShippingChange}
                          placeholder="Mumbai"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-900 dark:text-white">State *</Label>
                        <Input
                          name="state"
                          value={shippingAddress.state}
                          onChange={handleShippingChange}
                          placeholder="Maharashtra"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-900 dark:text-white">Postal Code *</Label>
                        <Input
                          name="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={handleShippingChange}
                          placeholder="400001"
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-900 dark:text-white">Country *</Label>
                        <Input
                          name="country"
                          value={shippingAddress.country}
                          onChange={handleShippingChange}
                          disabled
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Address */}
              <TabsContent value="billing" className="space-y-6">
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Billing Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="sameAsShipping"
                        checked={sameAsShipping}
                        onChange={(e) => handleSameAsShippingChange(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="sameAsShipping" className="cursor-pointer text-gray-900 dark:text-white">
                        Same as shipping address
                      </Label>
                    </div>

                    {!sameAsShipping && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-900 dark:text-white">Full Name *</Label>
                            <Input
                              name="fullName"
                              value={billingAddress.fullName}
                              onChange={handleBillingChange}
                              placeholder="John Doe"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-900 dark:text-white">Phone *</Label>
                            <Input
                              name="phone"
                              value={billingAddress.phone}
                              onChange={handleBillingChange}
                              placeholder="+91 98765 43210"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-gray-900 dark:text-white">Email *</Label>
                          <Input
                            name="email"
                            type="email"
                            value={billingAddress.email}
                            onChange={handleBillingChange}
                            placeholder="john@example.com"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-900 dark:text-white">Address Line 1 *</Label>
                          <Input
                            name="addressLine1"
                            value={billingAddress.addressLine1}
                            onChange={handleBillingChange}
                            placeholder="123 Main Street"
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>

                        <div>
                          <Label className="text-gray-900 dark:text-white">Address Line 2</Label>
                          <Input
                            name="addressLine2"
                            value={billingAddress.addressLine2}
                            onChange={handleBillingChange}
                            placeholder="Apartment, suite, etc."
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-900 dark:text-white">City *</Label>
                            <Input
                              name="city"
                              value={billingAddress.city}
                              onChange={handleBillingChange}
                              placeholder="Mumbai"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-900 dark:text-white">State *</Label>
                            <Input
                              name="state"
                              value={billingAddress.state}
                              onChange={handleBillingChange}
                              placeholder="Maharashtra"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-900 dark:text-white">Postal Code *</Label>
                            <Input
                              name="postalCode"
                              value={billingAddress.postalCode}
                              onChange={handleBillingChange}
                              placeholder="400001"
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-900 dark:text-white">Country *</Label>
                            <Input
                              name="country"
                              value={billingAddress.country}
                              onChange={handleBillingChange}
                              disabled
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Payment Method */}
              <TabsContent value="payment" className="space-y-6">
                <Card className="dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center text-gray-900 dark:text-white">
                      <Lock className="mr-2 h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-4 border-2 border-amber-500 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-500 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CreditCard className="mr-3 h-5 w-5 text-amber-600 dark:text-amber-400" />
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">Razorpay</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">UPI, Cards, Net Banking, Wallets</p>
                            </div>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-amber-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <Lock className="mr-2 h-4 w-4" />
                        Your payment information is secure and encrypted
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="sticky top-24 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Custom Stone Art x{item.quantity}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax (18%)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-amber-700 dark:text-amber-400">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Truck className="mr-2 h-4 w-4" />
                    <span>Estimated delivery: 5-7 business days</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Check className="mr-2 h-4 w-4" />
                    <span>Free shipping on orders above ₹999</span>
                  </div>
                </div>

                <Button
                  variant="luxury"
                  size="xl"
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={loading || !razorpayLoaded}
                >
                  {loading ? "Processing..." : razorpayLoaded ? "Pay with Razorpay" : "Loading Payment..."}
                </Button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                  By placing this order, you agree to our Terms & Conditions
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
