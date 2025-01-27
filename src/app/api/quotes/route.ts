import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const quoteData = await request.json()
    const supabase = createRouteHandlerClient({ cookies })

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
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()

    if (error) {
      console.error('Database Error:', error)
      return NextResponse.json(
        { error: 'Failed to create quote' },
        { status: 500 }
      )
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