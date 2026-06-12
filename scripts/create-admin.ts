// Run this once with ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_NAME set in your environment.

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  const adminName = process.env.ADMIN_NAME || 'Mercy Admin'

  if (!adminEmail || !adminPassword) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required')
  }

  console.log('Creating admin user...')

  const hashedPassword = await bcrypt.hash(adminPassword, 12)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { password: hashedPassword, role: 'ADMIN' },
    create: {
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log('Admin created successfully!')
  console.log(`   Email: ${admin.email}`)
  console.log(`   Role:  ${admin.role}`)
  console.log('\nYou can now log in at /admin/login')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
