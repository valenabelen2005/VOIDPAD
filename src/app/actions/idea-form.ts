'use server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitIdeaForm(data: {
  name: string
  email: string
  idea: string
}): Promise<{ ok: boolean; error?: string }> {
  if (!data.email || !data.idea) {
    return { ok: false, error: 'Missing fields' }
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
