import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const publicTestimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  role: z.string().max(120).optional().or(z.literal('')),
  rating: z.number().int().min(1).max(5),
  content: z.string().min(20, 'Testimonial must be at least 20 characters').max(1200),
})

const adminTestimonialSchema = publicTestimonialSchema.extend({
  published: z.boolean().optional(),
})

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('GET /api/testimonials error:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const isAdmin = (session?.user as { role?: string } | undefined)?.role === 'ADMIN'
    const body = await req.json()

    if (isAdmin) {
      const result = adminTestimonialSchema.safeParse(body)
      if (!result.success) {
        return NextResponse.json(
          { error: 'Invalid data', details: result.error.flatten().fieldErrors },
          { status: 400 }
        )
      }

      const testimonial = await db.testimonial.create({
        data: {
          name: result.data.name.trim(),
          role: (result.data.role || 'Client').trim(),
          rating: result.data.rating,
          content: result.data.content.trim(),
          published: result.data.published ?? false,
          source: 'ADMIN',
        },
      })

      return NextResponse.json(testimonial, { status: 201 })
    }

    const result = publicTestimonialSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    await db.testimonial.create({
      data: {
        name: result.data.name.trim(),
        role: (result.data.role || 'Client').trim(),
        rating: result.data.rating,
        content: result.data.content.trim(),
        published: true,
        source: 'PUBLIC',
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Thanks for sharing your testimonial. It is now live on the site.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('POST /api/testimonials error:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}
