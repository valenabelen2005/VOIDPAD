'use server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const PWA_CODE = 'PWA15'

export async function registerPwaInstall(data: {
  email: string
  _honey?: string
}): Promise<{ ok: boolean; error?: string }> {
  if (data._honey) return { ok: true }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email) || data.email.length > 200) {
    return { ok: false, error: 'Invalid email' }
  }

  if (!supabase) return { ok: false, error: 'Database not configured' }

  const { error: dbError } = await supabase.from('access_members').upsert(
    { email: data.email, source: 'pwa' },
    { onConflict: 'email', ignoreDuplicates: true }
  )

  if (dbError) return { ok: false, error: 'Database error' }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: data.email,
      subject: 'Your VOIDPAD exclusive code',
      text: [
        'Thanks for installing VOIDPAD.',
        '',
        `Your exclusive discount code: ${PWA_CODE}`,
        '',
        'Use it at checkout for 15% off your first order.',
        '',
        '— VOIDPAD',
      ].join('\n'),
    })
  } catch {
    // code saved, email notification failed — not fatal
  }

  return { ok: true }
}

export async function joinWaitlist(data: {
  email: string
  _honey?: string
}): Promise<{ ok: boolean; error?: string }> {
  if (data._honey) return { ok: true }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email) || data.email.length > 200) {
    return { ok: false, error: 'Invalid email' }
  }

  if (!supabase) return { ok: false, error: 'Database not configured' }

  const { error: dbError } = await supabase.from('access_members').upsert(
    { email: data.email, source: 'waitlist' },
    { onConflict: 'email', ignoreDuplicates: true }
  )

  if (dbError) return { ok: false, error: 'Database error' }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: data.email,
      subject: "You're on the VOIDPAD ACCESS waitlist",
      text: [
        "You're on the list.",
        '',
        'VOIDPAD ACCESS is coming — early drops, exclusive content, and more.',
        "We'll reach out when it's ready.",
        '',
        '— VOIDPAD',
      ].join('\n'),
    })
  } catch {
    // not fatal
  }

  return { ok: true }
}
