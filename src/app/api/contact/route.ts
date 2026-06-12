import { db } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'hello@mercydevstudio.com'
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Mercy Dev Studio <onboarding@resend.dev>'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  try {
    const result = contactSchema.safeParse(await req.json())

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, service, message } = result.data

    await db.contactRequest.create({
      data: { name, email, service, message },
    })

    let emailSent = false

    if (process.env.RESEND_API_KEY) {
      const safeName = escapeHtml(name)
      const safeFirstName = escapeHtml(name.split(' ')[0])
      const safeEmail = escapeHtml(email)
      const safeService = escapeHtml(service)
      const safeMessage = escapeHtml(message)

      try {
        await resend.emails.send({
          from: CONTACT_FROM_EMAIL,
          to: CONTACT_TO_EMAIL,
          subject: `New inquiry from ${name} - ${service}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #0a0a0f; color: #f0ede8; border-radius: 12px;">
              <h2 style="color: #00e5c3; margin-bottom: 1.5rem;">New Contact Form Submission</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 0.6rem 0; color: #a8a4b0; width: 120px;">Name</td>
                  <td style="padding: 0.6rem 0; font-weight: 600;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 0.6rem 0; color: #a8a4b0;">Email</td>
                  <td style="padding: 0.6rem 0;"><a href="mailto:${safeEmail}" style="color: #00e5c3;">${safeEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 0.6rem 0; color: #a8a4b0;">Service</td>
                  <td style="padding: 0.6rem 0;">${safeService}</td>
                </tr>
              </table>
              <div style="margin-top: 1.5rem; padding: 1rem; background: #1c1c28; border-radius: 8px; border-left: 3px solid #00e5c3;">
                <p style="color: #a8a4b0; font-size: 0.85rem; margin-bottom: 0.5rem;">Message</p>
                <p style="line-height: 1.7;">${safeMessage}</p>
              </div>
              <a href="mailto:${safeEmail}" style="display: inline-block; margin-top: 1.5rem; background: #00e5c3; color: #0a0a0f; padding: 0.7rem 1.5rem; border-radius: 8px; font-weight: 700; text-decoration: none;">
                Reply to ${safeName}
              </a>
            </div>
          `,
        })

        await resend.emails.send({
          from: CONTACT_FROM_EMAIL,
          to: email,
          subject: `Got your message, ${name.split(' ')[0]}!`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #0a0a0f; color: #f0ede8; border-radius: 12px;">
              <h2 style="color: #00e5c3; margin-bottom: 0.5rem;">Hey ${safeFirstName}, thanks for reaching out!</h2>
              <p style="color: #a8a4b0; margin-bottom: 1.5rem;">I've received your message and will get back to you within 24 hours.</p>
              <div style="padding: 1rem; background: #1c1c28; border-radius: 8px; border-left: 3px solid #00e5c3; margin-bottom: 1.5rem;">
                <p style="color: #a8a4b0; font-size: 0.85rem; margin-bottom: 0.3rem;">Your message about <strong style="color: #00e5c3;">${safeService}</strong></p>
                <p style="line-height: 1.7; font-size: 0.9rem;">${safeMessage}</p>
              </div>
              <p style="color: #a8a4b0; font-size: 0.9rem;">
                In the meantime, feel free to reach me on WhatsApp for a faster reply.<br/>
                - Mercy Dev Studio
              </p>
            </div>
          `,
        })

        emailSent = true
      } catch (emailError) {
        console.error('Contact email delivery failed:', emailError)
      }
    }

    return NextResponse.json({ success: true, emailSent }, { status: 200 })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
