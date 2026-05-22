"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Mail, Sparkles } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  if (subscribed) {
    return (
      <Card className="bg-gradient-to-r from-green-600 to-green-700 text-white border-0">
        <CardContent className="p-6 text-center">
          <Sparkles className="h-8 w-8 mx-auto mb-2" />
          <h3 className="font-semibold text-lg">Thank you for subscribing!</h3>
          <p className="text-green-100 text-sm">You'll receive our latest updates and offers.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-r from-amber-700 to-amber-900 text-white border-0">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="h-6 w-6" />
          <h3 className="font-semibold text-lg">Subscribe to our newsletter</h3>
        </div>
        <p className="text-amber-100 text-sm mb-4">
          Get exclusive offers, new product updates, and stone art inspiration delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="bg-white/10 border-white/20 text-white placeholder:text-amber-200"
            required
          />
          <Button type="submit" variant="secondary" className="whitespace-nowrap">
            Subscribe
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
