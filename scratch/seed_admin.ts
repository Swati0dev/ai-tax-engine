import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

config()

const connectionString = `${process.env.DATABASE_URL}`
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const email = 'admin@taxai.com'
  const password = 'Admin@123'
  const hashedPassword = await bcrypt.hash(password, 10)

  // Check if admin already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    // Update role if user exists
    const updated = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN', password: hashedPassword }
    })
    console.log(`Admin user updated: ${updated.email}`)
  } else {
    // Create new admin user
    const newUser = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email,
        password: hashedPassword,
        role: 'ADMIN'
      }
    })
    console.log(`Admin user created: ${newUser.email}`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
