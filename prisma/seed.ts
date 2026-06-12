// Run this with: npx prisma db seed

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const seedPassword = process.env.SEED_ADMIN_PASSWORD

  if (seedPassword) {
    const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@mercydevstudio.com'
    const hashedPassword = await bcrypt.hash(seedPassword, 12)

    const admin = await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        name: process.env.SEED_ADMIN_NAME || 'Mercy Dev',
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    })

    console.log('Admin user created:', admin.email)
  }

  const projects = [
    {
      title: 'ShopNaija E-commerce',
      description: 'Full e-commerce platform with product management, cart, and Paystack payments for a Lagos retailer.',
      techStack: ['Next.js', 'Prisma', 'Paystack', 'PostgreSQL'],
      imageUrl: 'https://placehold.co/800x500/1c1c28/00e5c3?text=ShopNaija',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      category: 'E-commerce',
      featured: true,
      published: true,
    },
    {
      title: 'CoachVault Client Portal',
      description: 'Booking, file upload, and session management dashboard for a fitness coach with 200+ clients.',
      techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      imageUrl: 'https://placehold.co/800x500/1c1c28/00e5c3?text=CoachVault',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      category: 'Web App',
      featured: false,
      published: true,
    },
    {
      title: 'BrandKit Generator',
      description: 'AI-powered branding tool that generates logos, color palettes, and typography from a business description.',
      techStack: ['TypeScript', 'OpenAI', 'TailwindCSS', 'Next.js'],
      imageUrl: 'https://placehold.co/800x500/1c1c28/00e5c3?text=BrandKit',
      githubUrl: 'https://github.com',
      liveUrl: null,
      category: 'AI Tool',
      featured: false,
      published: true,
    },
  ]

  for (const project of projects) {
    await prisma.project.create({ data: project })
  }

  console.log(`${projects.length} projects seeded`)
  console.log('Database seeded successfully!')
}

main()
  .catch((error) => {
    console.error('Seed error:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
