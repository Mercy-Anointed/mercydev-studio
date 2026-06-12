import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

const schema = z.object({
  visitorName: z.string().min(2).max(100),
  visitorEmail: z.string().email(),
  content: z.string().min(1).max(2000),
})

// POST /api/conversations — start a new conversation
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = schema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { visitorName, visitorEmail, content } = result.data

    // Find or create admin user to link messages to
    const admin = await db.user.findFirst({ where: { role: 'ADMIN' } })
    if (!admin) {
      return NextResponse.json({ error: 'No admin found' }, { status: 500 })
    }

    // Check if conversation already exists for this email
    let conversation = await db.conversation.findFirst({
      where: { visitorEmail },
      orderBy: { createdAt: 'desc' },
    })

    // Create new conversation if none exists
    if (!conversation) {
      conversation = await db.conversation.create({
        data: { visitorName, visitorEmail },
      })
    }

    // Create the message — visitor uses admin's ID as sender for now
    // (full user auth for visitors is a future feature)
    const message = await db.message.create({
      data: {
        content,
        senderId: admin.id,
        conversationId: conversation.id,
        isFromAdmin: false,
        seen: false,
      },
    })

    // Update conversation updatedAt
    await db.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json({ conversation, message }, { status: 201 })
  } catch (error) {
    console.error('POST /api/conversations error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

// GET /api/conversations — get all conversations (admin)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if ((session?.user as { role?: string } | undefined)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const conversations = await db.conversation.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    })
    return NextResponse.json(conversations)
  } catch (error) {
    console.error('GET /api/conversations error:', error)
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 })
  }
}
