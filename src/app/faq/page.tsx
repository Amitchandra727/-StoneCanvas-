"use client"

import { useState } from "react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "How long does it take to deliver my order?",
    answer: "Standard delivery takes 5-7 business days. Express delivery (available for select locations) takes 2-3 business days. You can track your order using the order tracking page.",
  },
  {
    id: 2,
    question: "What materials are used for the stone art?",
    answer: "We use premium quality natural stones and advanced UV printing technology to ensure your stone art is durable, waterproof, and long-lasting. The stone is carefully selected for its texture and quality.",
  },
  {
    id: 3,
    question: "Can I customize the stone art with my own photo?",
    answer: "Absolutely! Our custom product builder allows you to upload your own photo, add custom text, choose from various fonts, select stone shapes and sizes, and preview your design in real-time before ordering.",
  },
  {
    id: 4,
    question: "What payment methods do you accept?",
    answer: "We accept payments via Razorpay (UPI, cards, net banking, wallets) for Indian customers and Stripe (international cards, Apple Pay, Google Pay) for international customers. All transactions are secure and encrypted.",
  },
  {
    id: 5,
    question: "What is your return policy?",
    answer: "Due to the personalized nature of our products, we don't accept returns. However, if you receive a damaged or defective product, we'll replace it free of charge. Please contact us within 48 hours of delivery with photos of the damage.",
  },
  {
    id: 6,
    question: "Can I add a gift message or packaging?",
    answer: "Yes! During checkout, you can select from our premium gift packaging options (standard box, premium gift box, or luxury wooden box). You can also add a personalized gift message that will be included with your order.",
  },
  {
    id: 7,
    question: "How do I track my order?",
    answer: "You can track your order by visiting our Order Tracking page and entering your order ID. You'll receive email updates at every stage of your order's journey.",
  },
  {
    id: 8,
    question: "Do you ship internationally?",
    answer: "Currently, we ship within India only. We're working on expanding our international shipping capabilities. Stay tuned for updates!",
  },
  {
    id: 9,
    question: "What if I need to cancel my order?",
    answer: "Orders can be cancelled within 24 hours of placing them, as production begins after that. To cancel, please contact our customer support with your order ID.",
  },
  {
    id: 10,
    question: "How do I care for my stone art?",
    answer: "Our stone art is durable and waterproof. Simply wipe it with a soft, dry cloth to clean. Avoid using harsh chemicals or abrasive materials. It's suitable for both indoor and outdoor display.",
  },
]

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null)

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full mb-6">
            <HelpCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, orders, and services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-0">
                  <button
                    onClick={() => toggle(faq.id)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-lg pr-8">{faq.question}</h3>
                    {openId === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-amber-700 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-amber-700 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openId === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6"
                    >
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <Card className="bg-gradient-to-r from-amber-700 to-amber-900 text-white border-0">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-amber-100 mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  Contact Us
                </Button>
                <Button variant="outline" size="xl" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Start Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
