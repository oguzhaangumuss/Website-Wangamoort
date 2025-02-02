import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/services/emailService'
import { ContactFormData } from '@/types/contact.types'

export async function POST(request: Request) {
  try {
    const formData: ContactFormData = await request.json()
    await sendContactEmail(formData)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 