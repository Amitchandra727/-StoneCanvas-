import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      userId,
      items,
      total,
      subtotal,
      shipping,
      tax,
      discount,
      couponCode,
      shippingAddress,
      billingAddress,
      paymentMethod,
      notes,
    } = body

    // Generate order number
    const orderNumber = `SC${Date.now().toString().slice(-8)}`

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        total,
        subtotal,
        shipping,
        tax,
        discount,
        couponCode,
        paymentMethod,
        shippingAddress,
        billingAddress,
        notes,
        status: "PENDING",
        paymentStatus: "PENDING",
        orderItems: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            customImage: item.customImage,
            customText: item.customText,
            customName: item.customName,
            shape: item.shape,
            size: item.size,
            frame: item.frame,
            packaging: item.packaging,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    })

    return NextResponse.json({ success: true, order }, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "User ID required" },
        { status: 400 }
      )
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ success: true, orders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch orders" },
      { status: 500 }
    )
  }
}
