import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { Database } from '@/types/database.types'
import { sendQuoteEmail } from '@/services/emailService'


export async function POST(request: Request) {
  try {
    const quoteData = await request.json()
    console.log('Processing quote request...')

    // Environment variables'ları kontrol et
    console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    // Supabase bağlantısını test et
    try {
      const { error: testError } = await supabase
        .from('quotes')
        .select('id')
        .limit(1)
      
      if (testError) {
        console.error('Supabase connection test error:', testError)
      } else {
        console.log('Supabase connection successful')
      }
    } catch (testError) {
      console.error('Supabase test error:', testError)
    }

    // Veri yapısını kontrol et
    if (!quoteData.customer_first_name || !quoteData.customer_email) {
      console.error('Missing required fields:', quoteData)
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Quote'u doğrudan kaydedelim
    const { data, error } = await supabase
      .from('quotes')
      .insert([quoteData])  // Orijinal veriyi değiştirmeden kaydet
      .select('*, case_id')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Email gönder
    try {
      await sendQuoteEmail(data) // Kaydedilen veriyi kullan
    } catch (emailError) {
      console.error('Email error:', emailError)
    }

    return NextResponse.json(
      { message: 'Quote created successfully', data },
      { status: 201 }
    )

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 