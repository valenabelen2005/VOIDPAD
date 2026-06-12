'use server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitIdeaForm(data: {
  name: string
  email: string
  idea: string
  _honey?: string
}): Promise<{ ok: boolean; error?: string }> {
  // honeypot: bots fill hidden fields, humans don't
  if (data._honey) return { ok: true }

  if (!data.email || !data.idea) {
    return { ok: false, error: 'Missing fields' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.email)) {
    return { ok: false, error: 'Invalid email' }
  }

  if (data.email.length > 200 || data.name.length > 100 || data.idea.length > 2000) {
    return { ok: false, error: 'Input too long' }
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'acrformvg@gmail.com',
      subject: `New pad idea from ${data.name || data.email}`,
      text: [
        `Name:  ${data.name || '—'}`,
        `Email: ${data.email}`,
        ``,
        `Idea:`,
        data.idea,
      ].join('\n'),
    })
    return { ok: true }
  } catch {
    return { ok: false, error: 'Send failed' }
  }
}
