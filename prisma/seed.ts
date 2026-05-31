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
        slug: 'romantic-couple-stone',
        description: 'A beautiful personalized stone art piece featuring you and your loved one. Perfect for anniversaries and special occasions.',
        price: 699,
        comparePrice: 899,
        categoryId: categories[0].id,
        images: JSON.stringify(['/placeholder-couple-1.jpg']),
        stock: 100,
        featured: true,
        bestseller: true,
        shapes: JSON.stringify(['round', 'heart', 'oval']),
        sizes: JSON.stringify(['small', 'medium', 'large']),
        materials: JSON.stringify(['natural-stone', 'marble']),
        tags: JSON.stringify(['couple', 'romantic', 'gift']),
      },
    }),
    prisma.product.create({
      data: {
        name: 'Heart Shaped Couple Stone',
        slug: 'heart-shaped-couple-stone',
        description: 'Romantic heart-shaped stone art with your photo and names. A perfect gift for your partner.',
        price: 799,
        comparePrice: 999,
        categoryId: categories[0].id,
        images: JSON.stringify(['/placeholder-couple-2.jpg']),
        stock: 75,
        featured: true,
        bestseller: false,
        shapes: JSON.stringify(['heart']),
        sizes: JSON.stringify(['medium', 'large']),
        materials: JSON.stringify(['natural-stone']),
        tags: JSON.stringify(['couple', 'heart', 'gift']),
      },
    }),

    // God Stone Art
    prisma.product.create({
      data: {
        name: 'Ganesh Stone Art',
        slug: 'ganesh-stone-art',
        description: 'Beautiful Lord Ganesh stone art for your home or temple. Brings blessings and prosperity.',
        price: 899,
        comparePrice: 1099,
        categoryId: categories[1].id,
        images: JSON.stringify(['/placeholder-ganesh.jpg']),
        stock: 50,
        featured: true,
        bestseller: true,
        shapes: JSON.stringify(['round', 'square']),
        sizes: JSON.stringify(['medium', 'large', 'xlarge']),
        materials: JSON.stringify(['marble', 'granite']),
        tags: JSON.stringify(['ganesh', 'god', 'religious']),
      },
    }),
    prisma.product.create({
      data: {
        name: 'Lakshmi Stone Art',
        slug: 'lakshmi-stone-art',
        description: 'Goddess Lakshmi stone art for prosperity and wealth. Perfect for Diwali and festivals.',
        price: 999,
        comparePrice: 1299,
        categoryId: categories[1].id,
        images: JSON.stringify(['/placeholder-lakshmi.jpg']),
        stock: 60,
        featured: true,
        bestseller: false,
        shapes: JSON.stringify(['round', 'oval']),
        sizes: JSON.stringify(['medium', 'large']),
        materials: JSON.stringify(['marble']),
        tags: JSON.stringify(['lakshmi', 'god', 'religious']),
      },
    }),

    // Wedding Gifts
    prisma.product.create({
      data: {
        name: 'Wedding Couple Stone',
        slug: 'wedding-couple-stone',
        description: 'Commemorate your special day with a personalized wedding stone art. A perfect keepsake.',
        price: 1299,
        comparePrice: 1599,
        categoryId: categories[2].id,
        images: JSON.stringify(['/placeholder-wedding.jpg']),
        stock: 40,
        featured: true,
        bestseller: true,
        shapes: JSON.stringify(['round', 'heart', 'oval']),
        sizes: JSON.stringify(['large', 'xlarge']),
        materials: JSON.stringify(['marble', 'natural-stone']),
        tags: JSON.stringify(['wedding', 'couple', 'gift']),
      },
    }),

    // Memorial Stones
    prisma.product.create({
      data: {
        name: 'Pet Memorial Stone',
        slug: 'pet-memorial-stone',
        description: 'Honor your beloved pet with a beautiful memorial stone. A lasting tribute to your furry friend.',
        price: 599,
        comparePrice: 799,
        categoryId: categories[3].id,
        images: JSON.stringify(['/placeholder-pet.jpg']),
        stock: 80,
        featured: true,
        bestseller: true,
        shapes: JSON.stringify(['round', 'heart']),
        sizes: JSON.stringify(['small', 'medium']),
        materials: JSON.stringify(['natural-stone']),
        tags: JSON.stringify(['pet', 'memorial', 'gift']),
      },
    }),
    prisma.product.create({
      data: {
        name: 'Family Memorial Stone',
        slug: 'family-memorial-stone',
        description: 'A touching memorial stone to honor your loved ones. Includes photo and personalized message.',
        price: 899,
        comparePrice: 1099,
        categoryId: categories[3].id,
        images: JSON.stringify(['/placeholder-memorial.jpg']),
        stock: 50,
        featured: false,
        bestseller: false,
        shapes: JSON.stringify(['round', 'oval']),
        sizes: JSON.stringify(['medium', 'large']),
        materials: JSON.stringify(['marble']),
        tags: JSON.stringify(['memorial', 'family', 'gift']),
      },
    }),

    // Home Decor
    prisma.product.create({
      data: {
        name: 'Motivational Desk Stone',
        slug: 'motivational-desk-stone',
        description: 'Inspirational quotes on beautiful stone pieces for your desk. Stay motivated every day.',
        price: 499,
        comparePrice: 699,
        categoryId: categories[4].id,
        images: JSON.stringify(['/placeholder-desk.jpg']),
        stock: 120,
        featured: false,
        bestseller: false,
        shapes: JSON.stringify(['rectangle']),
        sizes: JSON.stringify(['small', 'medium']),
        materials: JSON.stringify(['natural-stone']),
        tags: JSON.stringify(['motivational', 'desk', 'decor']),
      },
    }),
    prisma.product.create({
      data: {
        name: 'Family Photo Stone',
        slug: 'family-photo-stone',
        description: 'Display your family photo beautifully on stone. Perfect for living room or bedroom.',
        price: 799,
        comparePrice: 999,
        categoryId: categories[4].id,
        images: JSON.stringify(['/placeholder-family.jpg']),
        stock: 70,
        featured: true,
        bestseller: false,
        shapes: JSON.stringify(['round', 'square', 'rectangle']),
        sizes: JSON.stringify(['medium', 'large', 'xlarge']),
        materials: JSON.stringify(['marble', 'natural-stone']),
        tags: JSON.stringify(['family', 'photo', 'decor']),
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
        description: 'Welcome discount for new customers',
        discountType: 'PERCENTAGE',
        discountValue: 10,
        minPurchase: 500,
        maxDiscount: 100,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        active: true,
      },
    }),
    prisma.coupon.create({
      data: {
        code: 'FIRSTORDER',
        description: 'First order discount',
        discountType: 'PERCENTAGE',
        discountValue: 15,
        minPurchase: 1000,
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
