import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = "usd", metadata } = body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency,
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return NextResponse.json(
      { success: true, clientSecret: paymentIntent.client_secret },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating Stripe payment intent:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create payment intent" },
      { status: 500 }
    )
  }
}
