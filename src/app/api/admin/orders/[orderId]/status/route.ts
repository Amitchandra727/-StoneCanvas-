import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 })
    }

    const validStatuses = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    // In production, update order in database using Prisma
    // const updatedOrder = await prisma.order.update({
    //   where: { id: params.orderId },
    //   data: { status }
    // })

    // Mock response for now
    const updatedOrder = {
      id: params.orderId,
      status,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json(updatedOrder)

  } catch (error) {
    console.error('Error updating order status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
