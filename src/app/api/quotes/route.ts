import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type { Database } from '@/types/database.types'

type BasketItem = Database['public']['Tables']['quotes']['Insert']['basket'][0]

export async function POST(request: Request) {
  try {
    const quoteData = await request.json()
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Veritabanına kaydet
    const { data, error } = await supabase
      .from('quotes')
      .insert([{
        company_name: quoteData.company_name,
        customer_first_name: quoteData.customer_first_name,
        customer_last_name: quoteData.customer_last_name,
        customer_email: quoteData.customer_email,
        customer_phone: quoteData.customer_phone,
        delivery_address: quoteData.delivery_address,
        is_delivery: quoteData.is_delivery,
        is_installation: quoteData.is_installation,
        is_rubbish_removal: quoteData.is_rubbish_removal,
        notes: quoteData.notes,
        basket: quoteData.basket,
        status: 'pending'
      }])
      .select()

    if (error) {
      console.error('Database Error:', error)
      return NextResponse.json(
        { error: 'Failed to create quote' },
        { status: 500 }
      )
    }

    // Email gönder
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
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 