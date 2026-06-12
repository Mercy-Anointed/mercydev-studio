import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  techStack: z.array(z.string()).min(1),
  imageUrl: z.string().url(),
  githubUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
  category: z.string().min(1),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
})

// GET /api/projects — fetch all published projects
export async function GET() {
  try {
    const projects = await db.project.findMany({
      where: { published: true },
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' },
      ],
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('GET /api/projects error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

// POST /api/projects — create a new project (admin only — auth added in Step 5)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if ((session?.user as { role?: string } | undefined)?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    const result = projectSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid data', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const project = await db.project.create({
      data: {
        ...result.data,
        githubUrl: result.data.githubUrl || null,
        liveUrl: result.data.liveUrl || null,
      },
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('POST /api/projects error:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
