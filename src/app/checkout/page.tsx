"use client"

import { useState } from "react"
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

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("razorpay")

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
  const [orderPlaced, setOrderPlaced] = useState(false)

  const subtotal = getTotal()
  const shipping = subtotal > 999 ? 0 : 99
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

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
    setLoading(true)
    
    // Simulate order processing
    setTimeout(() => {
      setLoading(false)
      setOrderPlaced(true)
      clearCart()
    }, 2000)
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Check className="h-12 w-12 text-green-600" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your order. We'll send you an email with order details and tracking information.
            </p>
            <div className="space-y-4">
              <Button variant="luxury" size="xl" onClick={() => router.push("/")}>
                Continue Shopping
              </Button>
              <Button variant="outline" size="xl" className="w-full">
                Track Order
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Checkout</h1>
          <p className="text-gray-600">Complete your order to receive your custom stone art</p>
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Full Name *</Label>
                        <Input
                          name="fullName"
                          value={shippingAddress.fullName}
                          onChange={handleShippingChange}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label>Phone *</Label>
                        <Input
                          name="phone"
                          value={shippingAddress.phone}
                          onChange={handleShippingChange}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Email *</Label>
                      <Input
                        name="email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={handleShippingChange}
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <Label>Address Line 1 *</Label>
                      <Input
                        name="addressLine1"
                        value={shippingAddress.addressLine1}
                        onChange={handleShippingChange}
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div>
                      <Label>Address Line 2</Label>
                      <Input
                        name="addressLine2"
                        value={shippingAddress.addressLine2}
                        onChange={handleShippingChange}
                        placeholder="Apartment, suite, etc."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>City *</Label>
                        <Input
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleShippingChange}
                          placeholder="Mumbai"
                        />
                      </div>
                      <div>
                        <Label>State *</Label>
                        <Input
                          name="state"
                          value={shippingAddress.state}
                          onChange={handleShippingChange}
                          placeholder="Maharashtra"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Postal Code *</Label>
                        <Input
                          name="postalCode"
                          value={shippingAddress.postalCode}
                          onChange={handleShippingChange}
                          placeholder="400001"
                        />
                      </div>
                      <div>
                        <Label>Country *</Label>
                        <Input
                          name="country"
                          value={shippingAddress.country}
                          onChange={handleShippingChange}
                          disabled
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Billing Address */}
              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
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
                      <Label htmlFor="sameAsShipping" className="cursor-pointer">
                        Same as shipping address
                      </Label>
                    </div>

                    {!sameAsShipping && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Full Name *</Label>
                            <Input
                              name="fullName"
                              value={billingAddress.fullName}
                              onChange={handleBillingChange}
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <Label>Phone *</Label>
                            <Input
                              name="phone"
                              value={billingAddress.phone}
                              onChange={handleBillingChange}
                              placeholder="+91 98765 43210"
                            />
                          </div>
                        </div>

                        <div>
                          <Label>Email *</Label>
                          <Input
                            name="email"
                            type="email"
                            value={billingAddress.email}
                            onChange={handleBillingChange}
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <Label>Address Line 1 *</Label>
                          <Input
                            name="addressLine1"
                            value={billingAddress.addressLine1}
                            onChange={handleBillingChange}
                            placeholder="123 Main Street"
                          />
                        </div>

                        <div>
                          <Label>Address Line 2</Label>
                          <Input
                            name="addressLine2"
                            value={billingAddress.addressLine2}
                            onChange={handleBillingChange}
                            placeholder="Apartment, suite, etc."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>City *</Label>
                            <Input
                              name="city"
                              value={billingAddress.city}
                              onChange={handleBillingChange}
                              placeholder="Mumbai"
                            />
                          </div>
                          <div>
                            <Label>State *</Label>
                            <Input
                              name="state"
                              value={billingAddress.state}
                              onChange={handleBillingChange}
                              placeholder="Maharashtra"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Postal Code *</Label>
                            <Input
                              name="postalCode"
                              value={billingAddress.postalCode}
                              onChange={handleBillingChange}
                              placeholder="400001"
                            />
                          </div>
                          <div>
                            <Label>Country *</Label>
                            <Input
                              name="country"
                              value={billingAddress.country}
                              onChange={handleBillingChange}
                              disabled
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="mr-2 h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "razorpay"
                            ? "border-amber-500 bg-amber-50"
                            : "border-gray-200 hover:border-amber-300"
                        }`}
                        onClick={() => setPaymentMethod("razorpay")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CreditCard className="mr-3 h-5 w-5" />
                            <div>
                              <p className="font-semibold">Razorpay</p>
                              <p className="text-sm text-gray-600">UPI, Cards, Net Banking, Wallets</p>
                            </div>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-amber-500 flex items-center justify-center">
                            {paymentMethod === "razorpay" && (
                              <div className="w-2 h-2 rounded-full bg-amber-500" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          paymentMethod === "stripe"
                            ? "border-amber-500 bg-amber-50"
                            : "border-gray-200 hover:border-amber-300"
                        }`}
                        onClick={() => setPaymentMethod("stripe")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CreditCard className="mr-3 h-5 w-5" />
                            <div>
                              <p className="font-semibold">Stripe</p>
                              <p className="text-sm text-gray-600">International Cards, Apple Pay, Google Pay</p>
                            </div>
                          </div>
                          <div className="w-4 h-4 rounded-full border-2 border-amber-500 flex items-center justify-center">
                            {paymentMethod === "stripe" && (
                              <div className="w-2 h-2 rounded-full bg-amber-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 flex items-center">
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
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Custom Stone Art x{item.quantity}
                      </span>
                      <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18%)</span>
                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t pt-2">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-amber-700">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="mr-2 h-4 w-4" />
                    <span>Estimated delivery: 5-7 business days</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="mr-2 h-4 w-4" />
                    <span>Free shipping on orders above ₹999</span>
                  </div>
                </div>

                <Button
                  variant="luxury"
                  size="xl"
                  className="w-full"
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-xs text-center text-gray-500">
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
