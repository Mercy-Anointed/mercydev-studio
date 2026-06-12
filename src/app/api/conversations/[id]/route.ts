import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

// GET /api/conversations/:id — get all messages in a conversation
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const conversation = await db.conversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 })
    }

    // Mark all messages as seen
    await db.message.updateMany({
      where: { conversationId: id, seen: false, isFromAdmin: false },
      data: { seen: true },
    })

    return NextResponse.json({
      ...conversation,
      messages: conversation.messages.map(message => ({
        ...message,
        seen: message.isFromAdmin ? message.seen : true,
      })),
    })
  } catch (error) {
    console.error('GET /api/conversations/:id error:', error)
    return NextResponse.json({ error: 'Failed to fetch conversation' }, { status: 500 })
  }
}

// POST /api/conversations/:id — send a reply
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const { content, isAdmin } = z.object({
      content: z.string().min(1).max(2000),
      isAdmin: z.boolean().default(false),
    }).parse(body)

    const admin = await db.user.findFirst({ where: { role: 'ADMIN' } })
    if (!admin) {
      return NextResponse.json({ error: 'No admin found' }, { status: 500 })
    }

    const message = await db.message.create({
      data: {
        content,
        senderId: admin.id,
        conversationId: id,
        isFromAdmin: isAdmin,
        seen: isAdmin,
      },
    })

    await db.conversation.update({
      where: { id },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('POST /api/conversations/:id error:', error)
    return NextResponse.json({ error: 'Failed to send reply' }, { status: 500 })
  }
}

// PATCH /api/conversations/:id — mark as resolved
export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if ((session?.user as { role?: string } | undefined)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const conversation = await db.conversation.update({
      where: { id },
      data: { resolved: true },
    })
    return NextResponse.json(conversation)
  } catch (error) {
    console.error('PATCH /api/conversations/:id error:', error)
    return NextResponse.json({ error: 'Failed to update conversation' }, { status: 500 })
  }
}
