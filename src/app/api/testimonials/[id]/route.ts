import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  role: z.string().max(120),
  rating: z.number().int().min(1).max(5),
  content: z.string().min(20).max(1200),
  published: z.boolean().default(false),
})

async function requireAdmin() {
  const session = await getServerSession(authOptions)
  return (session?.user as { role?: string } | undefined)?.role === 'ADMIN'
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const testimonial = await db.testimonial.findUnique({ where: { id } })

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('GET /api/testimonials/:id error:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonial' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const result = testimonialSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const testimonial = await db.testimonial.update({
      where: { id },
      data: {
        name: result.data.name.trim(),
        role: result.data.role.trim(),
        rating: result.data.rating,
        content: result.data.content.trim(),
        published: result.data.published,
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('PUT /api/testimonials/:id error:', error)
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await db.testimonial.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/testimonials/:id error:', error)
    return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 })
  }
}
