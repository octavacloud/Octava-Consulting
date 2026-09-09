import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

// Where enquiries land. Override with CONTACT_TO_EMAIL in Vercel if needed.
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'marcelo@octava.cloud'
// Sender. Until octava.cloud is verified in Resend, onboarding@resend.dev can
// only deliver to the Resend account owner's address. After verifying the
// domain, set CONTACT_FROM_EMAIL="Octava Website <hello@octava.cloud>".
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'Octava Website <onboarding@resend.dev>'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const SERVICES: Record<string, string> = {
  product: 'Product Build — new app',
  azure: 'Azure Cloud Engineering',
  devops: 'DevOps Automation',
  ai: 'AI Automation',
  general: 'General Enquiry',
}

// Best-effort rate limit (per serverless instance): 5 submissions / 10 min / IP.
const hits = new Map<string, number[]>()
function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot: real users never fill this hidden field. Pretend success for bots.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please try again shortly.' }, { status: 429 })
  }

  const name = clean(body.name, 120)
  const email = clean(body.email, 200)
  const company = clean(body.company, 160)
  const service = SERVICES[clean(body.service, 20)] ?? 'Not specified'
  const message = clean(body.message, 5000)

  if (name.length < 2) return NextResponse.json({ error: 'Please enter your name.' }, { status: 422 })
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 })
  if (message.length < 10) return NextResponse.json({ error: 'Please tell us a little more about your project.' }, { status: 422 })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set — enquiry not delivered:', { name, email, company })
    return NextResponse.json(
      { error: 'The contact form is not live yet. Please email marcelo@octava.cloud directly.' },
      { status: 503 },
    )
  }

  const resend = new Resend(apiKey)
  const subject = `New enquiry — ${name}${company ? ` (${company})` : ''} · ${service}`
  const text = [
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Company:  ${company || '—'}`,
    `Service:  ${service}`,
    `IP:       ${ip}`,
    '',
    'Message:',
    message,
    '',
    '— Sent from the octava.cloud contact form',
  ].join('\n')

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [TO_EMAIL],
    replyTo: email,
    subject,
    text,
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    return NextResponse.json(
      { error: 'We could not send your message. Please email marcelo@octava.cloud directly.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
