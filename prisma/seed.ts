import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create Categories
  console.log('Creating categories...')
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Couple Stones',
        slug: 'couple',
        description: 'Beautiful personalized stone art for couples',
        order: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: 'God Stone Art',
        slug: 'god',
        description: 'Divine stone art featuring gods and deities',
        order: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Wedding Gifts',
        slug: 'wedding',
        description: 'Perfect stone art gifts for weddings',
        order: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Memorial Stones',
        slug: 'memorial',
        description: 'Memorial stones to honor loved ones',
        order: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Home Decor',
        slug: 'decor',
        description: 'Beautiful stone art for home decoration',
        order: 5,
      },
    }),
  ])

  console.log(`Created ${categories.length} categories`)

  // Create Products
  console.log('Creating products...')
  const products = await Promise.all([
    // Couple Stones
    prisma.product.create({
      data: {
        name: 'Romantic Couple Stone',
        description: 'A beautiful personalized stone art piece featuring you and your loved one. Perfect for anniversaries and special occasions.',
        price: 699,
        originalPrice: 899,
        categoryId: categories[0].id,
        images: ['/placeholder-couple-1.jpg'],
        stock: 100,
        featured: true,
        bestseller: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Heart Shaped Couple Stone',
        description: 'Romantic heart-shaped stone art with your photo and names. A perfect gift for your partner.',
        price: 799,
        originalPrice: 999,
        categoryId: categories[0].id,
        images: ['/placeholder-couple-2.jpg'],
        stock: 75,
        featured: true,
        bestseller: false,
      },
    }),

    // God Stone Art
    prisma.product.create({
      data: {
        name: 'Ganesh Stone Art',
        description: 'Beautiful Lord Ganesh stone art for your home or temple. Brings blessings and prosperity.',
        price: 899,
        originalPrice: 1099,
        categoryId: categories[1].id,
        images: ['/placeholder-ganesh.jpg'],
        stock: 50,
        featured: true,
        bestseller: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Lakshmi Stone Art',
        description: 'Goddess Lakshmi stone art for prosperity and wealth. Perfect for Diwali and festivals.',
        price: 999,
        originalPrice: 1299,
        categoryId: categories[1].id,
        images: ['/placeholder-lakshmi.jpg'],
        stock: 60,
        featured: true,
        bestseller: false,
      },
    }),

    // Wedding Gifts
    prisma.product.create({
      data: {
        name: 'Wedding Couple Stone',
        description: 'Commemorate your special day with a personalized wedding stone art. A perfect keepsake.',
        price: 1299,
        originalPrice: 1599,
        categoryId: categories[2].id,
        images: ['/placeholder-wedding.jpg'],
        stock: 40,
        featured: true,
        bestseller: true,
      },
    }),

    // Memorial Stones
    prisma.product.create({
      data: {
        name: 'Pet Memorial Stone',
        description: 'Honor your beloved pet with a beautiful memorial stone. A lasting tribute to your furry friend.',
        price: 599,
        originalPrice: 799,
        categoryId: categories[3].id,
        images: ['/placeholder-pet.jpg'],
        stock: 80,
        featured: true,
        bestseller: true,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Family Memorial Stone',
        description: 'A touching memorial stone to honor your loved ones. Includes photo and personalized message.',
        price: 899,
        originalPrice: 1099,
        categoryId: categories[3].id,
        images: ['/placeholder-memorial.jpg'],
        stock: 50,
        featured: false,
        bestseller: false,
      },
    }),

    // Home Decor
    prisma.product.create({
      data: {
        name: 'Motivational Desk Stone',
        description: 'Inspirational quotes on beautiful stone pieces for your desk. Stay motivated every day.',
        price: 499,
        originalPrice: 699,
        categoryId: categories[4].id,
        images: ['/placeholder-desk.jpg'],
        stock: 120,
        featured: false,
        bestseller: false,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Family Photo Stone',
        description: 'Display your family photo beautifully on stone. Perfect for living room or bedroom.',
        price: 799,
        originalPrice: 999,
        categoryId: categories[4].id,
        images: ['/placeholder-family.jpg'],
        stock: 70,
        featured: true,
        bestseller: false,
      },
    }),
  ])

  console.log(`Created ${products.length} products`)

  // Create Coupons
  console.log('Creating coupons...')
  await Promise.all([
    prisma.coupon.create({
      data: {
        code: 'WELCOME10',
        discount: 10,
        discountType: 'PERCENTAGE',
        minOrder: 500,
        maxDiscount: 100,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        active: true,
      },
    }),
    prisma.coupon.create({
      data: {
        code: 'FIRSTORDER',
        discount: 15,
        discountType: 'PERCENTAGE',
        minOrder: 1000,
        maxDiscount: 200,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
        active: true,
      },
    }),
  ])

  console.log('Created coupons')

  console.log('Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
