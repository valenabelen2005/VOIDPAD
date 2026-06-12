'use server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export type ReviewRow = {
  id: string
  type: 'product' | 'store'
  product_handle: string | null
  product_name: string | null
  reviewer_name: string
  rating: number
  body: string
  created_at: string
}

export async function submitReview(data: {
  type: 'product' | 'store'
  product_handle?: string
  product_name?: string
  reviewer_name: string
  reviewer_email: string
  rating: number
  body: string
  _honey?: string
}): Promise<{ ok: boolean; error?: string }> {
  if (data._honey) return { ok: true }

  if (!data.reviewer_name || !data.reviewer_email || !data.body || !data.rating) {
    return { ok: false, error: 'Missing fields' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(data.reviewer_email)) {
    return { ok: false, error: 'Invalid email' }
  }

  if (data.reviewer_name.length > 100 || data.body.length > 2000) {
    return { ok: false, error: 'Input too long' }
  }

  if (data.rating < 1 || data.rating > 5) {
    return { ok: false, error: 'Invalid rating' }
  }

  if (!supabase) return { ok: false, error: 'Database not configured' }

  const { error: dbError } = await supabase.from('reviews').insert({
    type: data.type,
    product_handle: data.product_handle ?? null,
    product_name: data.product_name ?? null,
    reviewer_name: data.reviewer_name,
    reviewer_email: data.reviewer_email,
    rating: data.rating,
    body: data.body,
    approved: false,
  })

  if (dbError) return { ok: false, error: 'Database error' }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'acrformvg@gmail.com',
      subject: `Nueva reseña de ${data.reviewer_name} — ${'★'.repeat(data.rating)}`,
      text: [
        `De: ${data.reviewer_name} (${data.reviewer_email})`,
        `Valoración: ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}`,
        data.product_name ? `Producto: ${data.product_name}` : 'Tipo: Reseña general',
        ``,
        data.body,
        ``,
        `Para aprobar: Supabase → Table Editor → reviews → approved = true`,
      ].join('\n'),
    })
  } catch {
    // la reseña se guardó igual, solo falló la notificación
  }

  return { ok: true }
}

export async function getApprovedReviews(productHandle?: string): Promise<ReviewRow[]> {
  if (!supabase) return []

  let query = supabase
    .from('reviews')
    .select('id, type, product_handle, product_name, reviewer_name, rating, body, created_at')
    .eq('approved', true)
    .order('created_at', { ascending: false })

  if (productHandle) {
    query = query.eq('product_handle', productHandle)
  }

  query = query.limit(productHandle ? 50 : 6)

  const { data, error } = await query
  if (error) return []
  return (data as ReviewRow[]) ?? []
}
