import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type { Database } from '@/types/database.types'

type BasketItem = Database['public']['Tables']['quotes']['Insert']['basket'][0]

export async function POST(request: Request) {
  try {
    // Environment variables'ları kontrol et
    console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log('ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

    const quoteData = await request.json()
    console.log('Received quote data:', JSON.stringify(quoteData, null, 2))

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ 
      cookies: () => cookieStore,
    })

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

    // Supabase'e kaydet
    const { data, error } = await supabase
      .from('quotes')
      .insert([{
        company_name: quoteData.company_name || null,
        customer_first_name: quoteData.customer_first_name,
        customer_last_name: quoteData.customer_last_name,
        customer_email: quoteData.customer_email,
        customer_phone: quoteData.customer_phone,
        delivery_address: quoteData.delivery_address || null,
        is_delivery: quoteData.is_delivery || false,
        is_installation: quoteData.is_installation || false,
        is_rubbish_removal: quoteData.is_rubbish_removal || false,
        notes: quoteData.notes || '',
        basket: quoteData.basket || [],
        status: 'pending'
      }])
      .select()

    if (error) {
      console.error('Supabase error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // Email göndermeyi dene
    if (process.env.SMTP_HOST) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        await transporter.sendMail({
          from: process.env.SMTP_FROM,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Quote Request',
          html: `
            <h2>New Quote Request</h2>
            <h3>Customer Information:</h3>
            <p>Name: ${quoteData.customer_first_name} ${quoteData.customer_last_name}</p>
            <p>Email: ${quoteData.customer_email}</p>
            <p>Phone: ${quoteData.customer_phone}</p>
            
            <h3>Products:</h3>
            <ul>
              ${quoteData.basket.map((item: BasketItem) => `
                <li>Product ID: ${item.product_id} - Quantity: ${item.quantity}</li>
              `).join('')}
            </ul>
          `
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Email hatası quote oluşturmayı etkilemesin
      }
    }

    return NextResponse.json(
      { message: 'Quote created successfully', data },
      { status: 201 }
    )

  } catch (error) {
    console.error('Server Error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
} 