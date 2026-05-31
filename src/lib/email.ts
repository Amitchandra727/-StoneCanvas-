// Email Notification Utility
// This file provides utilities for sending email notifications

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export interface OrderConfirmationEmailData {
  customerName: string
  customerEmail: string
  orderId: string
  orderTotal: number
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  shippingAddress: string
}

export interface ContactFormEmailData {
  name: string
  email: string
  phone?: string
  message: string
}

export const sendOrderConfirmationEmail = async (
  data: OrderConfirmationEmailData
): Promise<void> => {
  // This should call your backend API to send email
  // Example API call:
  // const response = await fetch('/api/send-email', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     to: data.customerEmail,
  //     subject: `Order Confirmation - ${data.orderId}`,
  //     html: generateOrderConfirmationHTML(data)
  //   })
  // })

  console.log('Send order confirmation email:', data)
  throw new Error('Email service not configured. Set up backend API endpoint.')
}

export const sendContactFormEmail = async (
  data: ContactFormEmailData
): Promise<void> => {
  // This should call your backend API to send email
  // Example API call:
  // const response = await fetch('/api/send-email', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     to: process.env.CONTACT_EMAIL,
  //     subject: `New Contact Form Submission from ${data.name}`,
  //     html: generateContactFormHTML(data)
  //   })
  // })

  console.log('Send contact form email:', data)
  throw new Error('Email service not configured. Set up backend API endpoint.')
}

const generateOrderConfirmationHTML = (data: OrderConfirmationEmailData): string => {
  const itemsHTML = data.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">₹${item.price}</td>
    </tr>
  `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">StoneCanvas</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Order Confirmation</p>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-top: 0;">Thank You for Your Order!</h2>
          <p>Dear ${data.customerName},</p>
          <p>We're excited to let you know that we've received your order <strong>${data.orderId}</strong>.</p>
          
          <h3 style="color: #1f2937; margin-top: 30px;">Order Details</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <thead>
              <tr style="background: #f59e0b; color: white;">
                <th style="padding: 12px; text-align: left;">Product</th>
                <th style="padding: 12px; text-align: center;">Quantity</th>
                <th style="padding: 12px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 12px; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 12px; text-align: right; font-weight: bold;">₹${data.orderTotal}</td>
              </tr>
            </tfoot>
          </table>
          
          <h3 style="color: #1f2937; margin-top: 30px;">Shipping Address</h3>
          <p style="background: white; padding: 15px; border-radius: 5px; margin-top: 10px;">${data.shippingAddress}</p>
          
          <p style="margin-top: 30px; color: #6b7280;">We'll send you another email when your order ships.</p>
          <p style="color: #6b7280;">If you have any questions, feel free to contact us.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; margin: 0;">StoneCanvas - Premium Personalized Stone Art</p>
            <p style="color: #6b7280; margin: 5px 0 0 0;">hello@stonecanvas.com</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

const generateContactFormHTML = (data: ContactFormEmailData): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">StoneCanvas</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">New Contact Form Submission</p>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #1f2937; margin-top: 0;">Contact Details</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold; width: 150px;">Name:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Email:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.email}</td>
            </tr>
            ${data.phone ? `
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; font-weight: bold;">Phone:</td>
              <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${data.phone}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px; font-weight: bold; vertical-align: top;">Message:</td>
              <td style="padding: 12px;">${data.message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          
          <p style="margin-top: 30px; color: #6b7280;">Please respond to this inquiry as soon as possible.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// TODO: Update the following with your email service credentials:
// 1. Choose an email service (SendGrid, Mailgun, AWS SES, etc.)
// 2. Get your API credentials from the email service
// 3. Add the following environment variables:
//    - EMAIL_SERVICE_API_KEY
//    - EMAIL_FROM_ADDRESS
//    - CONTACT_EMAIL
// 4. Set up a backend API endpoint for sending emails
// 5. Implement the email sending logic on your server
// 6. Add email templates for different notification types
