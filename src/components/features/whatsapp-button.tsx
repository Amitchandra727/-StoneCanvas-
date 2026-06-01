"use client"

import { motion } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { useState } from "react"
import { generateGeneralMessage, getWhatsAppPhoneNumber, generateWhatsAppUrl } from "@/lib/whatsapp"

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const phoneNumber = getWhatsAppPhoneNumber()
  const message = generateGeneralMessage()
  const whatsappUrl = generateWhatsAppUrl(phoneNumber, message)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute right-16 bottom-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap"
        >
          <p className="text-sm font-medium">Chat with us on WhatsApp</p>
        </motion.div>
      )}

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl shadow-green-500/30 transition-colors flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </div>
  )
}
