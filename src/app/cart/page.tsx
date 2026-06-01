"use client"

import { useState } from "react"
import Link from "next/link"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Gift, MessageCircle } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"
import { generateCartMessage, getWhatsAppPhoneNumber, generateWhatsAppUrl } from "@/lib/whatsapp"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)

  const subtotal = getTotal()
  const shipping = subtotal > 999 ? 0 : 99
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax - discount

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "welcome10") {
      setDiscount(subtotal * 0.1)
      setCouponApplied(true)
    } else if (couponCode.toLowerCase() === "stone20") {
      setDiscount(subtotal * 0.2)
      setCouponApplied(true)
    } else {
      alert("Invalid coupon code")
    }
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = getWhatsAppPhoneNumber()
    const cartItems = items.map(item => ({
      name: item.name || 'Custom Stone Art',
      price: item.price,
      quantity: item.quantity
    }))
    const message = generateCartMessage({
      cartItems,
      customMessage: "I'd like to place an order for these items."
    })
    const whatsappUrl = generateWhatsAppUrl(phoneNumber, message)
    window.open(whatsappUrl, '_blank')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4 text-gray-900">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/customize">
              <Button variant="luxury" size="xl">
                Start Customizing
              </Button>
            </Link>
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
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600">{items.length} {items.length === 1 ? "item" : "items"} in your cart</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-32 h-32 bg-gradient-to-br from-stone-200 to-stone-300 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.customImage ? (
                          <img
                            src={item.customImage}
                            alt="Custom"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Gift className="h-12 w-12 text-stone-400" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">Custom Stone Art</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.shape && `Shape: ${item.shape}`}
                          {item.size && ` • Size: ${item.size}`}
                        </p>
                        {item.customText && (
                          <p className="text-sm text-gray-600 mb-2">Text: "{item.customText}"</p>
                        )}
                        {item.customName && (
                          <p className="text-sm text-gray-600 mb-2">Names: "{item.customName}"</p>
                        )}
                        <p className="text-lg font-bold text-amber-700">₹{item.price}</p>
                      </div>

                      {/* Quantity & Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full mt-4"
            >
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
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

                  {couponApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-amber-700">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <Label className="text-sm font-semibold mb-2 block">Coupon Code</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                    />
                    <Button
                      variant="outline"
                      onClick={applyCoupon}
                      disabled={couponApplied}
                    >
                      Apply
                    </Button>
                  </div>
                  {couponApplied && (
                    <p className="text-sm text-green-600 mt-2">Coupon applied successfully!</p>
                  )}
                  {!couponApplied && (
                    <p className="text-xs text-gray-500 mt-1">Try: WELCOME10 or STONE20</p>
                  )}
                </div>

                <Link href="/checkout">
                  <Button variant="luxury" size="xl" className="w-full">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="xl"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Order via WhatsApp
                </Button>

                <div className="mt-4 text-center text-sm text-gray-500">
                  <p>🔒 Secure checkout powered by Razorpay & Stripe</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
