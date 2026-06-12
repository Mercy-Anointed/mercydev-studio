import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// ✏️ Replace with your real email
const YOUR_EMAIL = 'hello@mercydevstudio.com'

const resend = new Resend(process.env.RESEND_API_KEY)

// Zod schema — validates every field before anything is sent
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // 1. Validate input
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, service, message } = result.data

    // 2. Send notification email to YOU
    await resend.emails.send({
      from: 'Mercy Dev Studio <onboarding@resend.dev>', // change after verifying your domain
      to: YOUR_EMAIL,
      subject: `New inquiry from ${name} — ${service}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #0a0a0f; color: #f0ede8; border-radius: 12px;">
          <h2 style="color: #00e5c3; margin-bottom: 1.5rem;">📬 New Contact Form Submission</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 0.6rem 0; color: #a8a4b0; width: 120px;">Name</td>
              <td style="padding: 0.6rem 0; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0; color: #a8a4b0;">Email</td>
              <td style="padding: 0.6rem 0;"><a href="mailto:${email}" style="color: #00e5c3;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0; color: #a8a4b0;">Service</td>
              <td style="padding: 0.6rem 0;">${service}</td>
            </tr>
          </table>

          <div style="margin-top: 1.5rem; padding: 1rem; background: #1c1c28; border-radius: 8px; border-left: 3px solid #00e5c3;">
            <p style="color: #a8a4b0; font-size: 0.85rem; margin-bottom: 0.5rem;">Message</p>
            <p style="line-height: 1.7;">${message}</p>
          </div>

          <a href="mailto:${email}" style="display: inline-block; margin-top: 1.5rem; background: #00e5c3; color: #0a0a0f; padding: 0.7rem 1.5rem; border-radius: 8px; font-weight: 700; text-decoration: none;">
            Reply to ${name} →
          </a>
        </div>
      `,
    })

    // 3. Send confirmation email to the CLIENT
    await resend.emails.send({
      from: 'Mercy Dev Studio <onboarding@resend.dev>',
      to: email,
      subject: `Got your message, ${name.split(' ')[0]}! 👋`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #0a0a0f; color: #f0ede8; border-radius: 12px;">
          <h2 style="color: #00e5c3; margin-bottom: 0.5rem;">Hey ${name.split(' ')[0]}, thanks for reaching out!</h2>
          <p style="color: #a8a4b0; margin-bottom: 1.5rem;">I've received your message and will get back to you within 24 hours.</p>

          <div style="padding: 1rem; background: #1c1c28; border-radius: 8px; border-left: 3px solid #00e5c3; margin-bottom: 1.5rem;">
            <p style="color: #a8a4b0; font-size: 0.85rem; margin-bottom: 0.3rem;">Your message about <strong style="color: #00e5c3;">${service}</strong></p>
            <p style="line-height: 1.7; font-size: 0.9rem;">${message}</p>
          </div>

          <p style="color: #a8a4b0; font-size: 0.9rem;">
            In the meantime, feel free to reach me on WhatsApp for a faster reply.<br/>
            — Mercy Dev Studio 🇳🇬
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}