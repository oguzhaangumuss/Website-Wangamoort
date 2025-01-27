import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { customerInfo, products } = await request.json()

    // Supabase'e kaydet
    const { data, error } = await supabase
      .from('quotes')
      .insert([
        {
          customer_info: customerInfo,
          products: products,
          status: 'pending'
        }
      ])
      .select()

    if (error) throw error

    // Email gönder
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
        <p>Name: ${customerInfo.name}</p>
        <p>Email: ${customerInfo.email}</p>
        <p>Phone: ${customerInfo.phone}</p>
        
        <h3>Products:</h3>
        <ul>
          ${products.map((p: Record<string, any>) => `
            <li>${p.name} - Quantity: ${p.quantity}</li>
          `).join('')}
        </ul>
      `
    })

    return NextResponse.json({ 
      success: true, 
      data: data[0]
    })

  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit quote' },
      { status: 500 }
    )
  }
} 