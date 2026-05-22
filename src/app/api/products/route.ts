import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    const featured = searchParams.get("featured")
    const bestseller = searchParams.get("bestseller")

    const where: any = {}

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (featured === "true") {
      where.featured = true
    }

    if (bestseller === "true") {
      where.bestseller = true
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ success: true, products })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        comparePrice: body.comparePrice,
        images: body.images,
        categoryId: body.categoryId,
        stock: body.stock,
        featured: body.featured || false,
        bestseller: body.bestseller || false,
        customizable: body.customizable !== false,
        shapes: body.shapes || [],
        sizes: body.sizes || [],
        materials: body.materials || [],
        tags: body.tags || [],
        seoTitle: body.seoTitle,
        seoDescription: body.seoDescription,
      },
    })

    return NextResponse.json({ success: true, product }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    )
  }
}
