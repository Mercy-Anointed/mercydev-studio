import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

const statusSchema = z.object({
  status: z.enum(['UNREAD', 'READ', 'REPLIED']),
})

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if ((session?.user as { role?: string } | undefined)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const result = statusSchema.safeParse(await req.json())
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const updated = await db.contactRequest.update({
      where: { id },
      data: { status: result.data.status },
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('PATCH /api/contacts/:id error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}
