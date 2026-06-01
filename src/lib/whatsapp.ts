// WhatsApp Business Integration Utility

export interface WhatsAppMessageConfig {
  productName?: string
  productUrl?: string
  productPrice?: number
  customMessage?: string
  cartItems?: Array<{
    name: string
    price: number
    quantity: number
  }>
}

/**
 * Generate a WhatsApp message for product inquiry
 */
export function generateProductMessage(config: WhatsAppMessageConfig): string {
  const { productName, productUrl, productPrice, customMessage } = config
  
  let message = "Hello StoneCanvas! 👋\n\n"
  
  if (productName) {
    message += `I'm interested in: *${productName}*\n`
  }
  
  if (productPrice) {
    message += `Price: ₹${productPrice.toFixed(2)}\n`
  }
  
  if (productUrl) {
    message += `Link: ${productUrl}\n`
  }
  
  if (customMessage) {
    message += `\n${customMessage}\n`
  }
  
  message += "\nPlease provide more details about this product."
  
  return encodeURIComponent(message)
}

/**
 * Generate a WhatsApp message for cart/order inquiry
 */
export function generateCartMessage(config: WhatsAppMessageConfig): string {
  const { cartItems, customMessage } = config
  
  let message = "Hello StoneCanvas! 👋\n\n"
  message += "I'd like to place an order for the following items:\n\n"
  
  if (cartItems && cartItems.length > 0) {
    let total = 0
    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity
      total += itemTotal
      message += `${index + 1}. *${item.name}*\n`
      message += `   Price: ₹${item.price.toFixed(2)} x ${item.quantity} = ₹${itemTotal.toFixed(2)}\n\n`
    })
    message += `*Total: ₹${total.toFixed(2)}*\n\n`
  }
  
  if (customMessage) {
    message += `${customMessage}\n\n`
  }
  
  message += "Please help me complete this order."
  
  return encodeURIComponent(message)
}

/**
 * Generate a general inquiry message
 */
export function generateGeneralMessage(customMessage?: string): string {
  let message = "Hello StoneCanvas! 👋\n\n"
  
  if (customMessage) {
    message += customMessage
  } else {
    message += "I have a question about your products and services."
  }
  
  return encodeURIComponent(message)
}

/**
 * Generate WhatsApp URL with pre-filled message
 */
export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  const formattedPhone = phoneNumber.replace(/[^0-9]/g, '')
  return `https://wa.me/${formattedPhone}?text=${message}`
}

/**
 * Open WhatsApp with pre-filled message
 */
export function openWhatsApp(phoneNumber: string, message: string): void {
  const url = generateWhatsAppUrl(phoneNumber, message)
  window.open(url, '_blank')
}

/**
 * Get WhatsApp phone number from environment or use default
 */
export function getWhatsAppPhoneNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || '919876543210'
}
