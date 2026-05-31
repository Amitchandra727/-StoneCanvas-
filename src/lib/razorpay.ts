// Razorpay Integration Utility
// This file provides utilities for integrating Razorpay payment gateway

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id?: string
  handler: (response: RazorpayResponse) => void
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color: string
  }
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export const initiateRazorpayPayment = async (options: RazorpayOptions): Promise<void> => {
  const isLoaded = await loadRazorpayScript()
  
  if (!isLoaded) {
    throw new Error('Failed to load Razorpay SDK')
  }

  const razorpay = new window.Razorpay({
    key: options.key,
    amount: options.amount,
    currency: options.currency,
    name: options.name,
    description: options.description,
    order_id: options.order_id,
    handler: options.handler,
    prefill: options.prefill,
    theme: options.theme || {
      color: '#f59e0b'
    },
    notes: {
      address: 'StoneCanvas HQ'
    },
    modal: {
      ondismiss: function() {
        console.log('Checkout form closed')
      }
    }
  })

  razorpay.open()
}

export const createRazorpayOrder = async (amount: number, receipt: string) => {
  // This should call your backend API to create an order
  // Example API call:
  // const response = await fetch('/api/create-order', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ amount, receipt })
  // })
  // const data = await response.json()
  // return data.order_id
  
  console.log('Create order:', { amount, receipt })
  return null
}

// TODO: Update the following with your Razorpay credentials:
// 1. Get your Razorpay API key from https://razorpay.com
// 2. Set up a backend API endpoint to create orders
// 3. Implement the order creation logic on your server
// 4. Add webhook handling for payment verification
// 5. Update the key in your environment variables
