import nodemailer from 'nodemailer'
import { QuoteData } from '@/types/quote.types'
import {  } from '@/types/database.types'

const createHtmlContent = (quoteData: QuoteData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
    <div style="background-color: #152e1b; padding: 20px; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; text-align: center;">Quote Request - Case #${quoteData.case_id}</h1>
    </div>
    
    <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 30px;">
        <h2 style="color: #152e1b; border-bottom: 2px solid #152e1b; padding-bottom: 10px;">Customer Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Full Name:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${quoteData.customer_first_name} ${quoteData.customer_last_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${quoteData.customer_email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${quoteData.customer_phone}</td>
          </tr>
          ${quoteData.company_name ? `
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${quoteData.company_name}</td>
            </tr>
          ` : ''}
        </table>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #152e1b; border-bottom: 2px solid #152e1b; padding-bottom: 10px;">Requested Services</h2>
        <ul style="list-style: none; padding: 0;">
          ${quoteData.is_delivery ? `
            <li style="padding: 8px; margin: 5px 0; background-color: #f0f7f1; border-radius: 4px;">
              ✅ Delivery Service
            </li>
          ` : ''}
          ${quoteData.is_installation ? `
            <li style="padding: 8px; margin: 5px 0; background-color: #f0f7f1; border-radius: 4px;">
              ✅ Installation Service
            </li>
          ` : ''}
          ${quoteData.is_rubbish_removal ? `
            <li style="padding: 8px; margin: 5px 0; background-color: #f0f7f1; border-radius: 4px;">
              ✅ Rubbish Removal Service
            </li>
          ` : ''}
        </ul>
      </div>

      ${quoteData.delivery_address ? `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #152e1b; border-bottom: 2px solid #152e1b; padding-bottom: 10px;">Delivery Address</h2>
          <p style="margin: 5px 0;">Street: ${quoteData.delivery_address.street}</p>
          <p style="margin: 5px 0;">City: ${quoteData.delivery_address.city}</p>
          <p style="margin: 5px 0;">State: ${quoteData.delivery_address.state}</p>
          <p style="margin: 5px 0;">Postcode: ${quoteData.delivery_address.postcode}</p>
        </div>
      ` : ''}

      <div style="margin-bottom: 30px;">
        <h2 style="color: #152e1b; border-bottom: 2px solid #152e1b; padding-bottom: 10px;">Products</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f0f7f1;">
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #152e1b;">Product</th>
              <th style="padding: 12px; text-align: left; border-bottom: 2px solid #152e1b;">Variant</th>
              <th style="padding: 12px; text-align: center; border-bottom: 2px solid #152e1b;">Size</th>
              <th style="padding: 12px; text-align: center; border-bottom: 2px solid #152e1b;">Color</th>
              <th style="padding: 12px; text-align: center; border-bottom: 2px solid #152e1b;">Quantity</th>
              <th style="padding: 12px; text-align: right; border-bottom: 2px solid #152e1b;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${quoteData.basket.map(item => `
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.product_name}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.variant_name}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.selected_size || '-'}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.selected_color || '-'}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
                <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${item.price.toFixed(2)}</td>
              </tr>
            `).join('')}
            <tr style="background-color: #f0f7f1;">
              <td colspan="4" style="padding: 12px; border-top: 2px solid #152e1b;"></td>
              <td style="padding: 12px; border-top: 2px solid #152e1b; text-align: right;"><strong>Total:</strong></td>
              <td style="padding: 12px; border-top: 2px solid #152e1b; text-align: right;"><strong>$${
                quoteData.basket.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
              }</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      ${quoteData.notes ? `
        <div style="margin-bottom: 30px;">
          <h2 style="color: #152e1b; border-bottom: 2px solid #152e1b; padding-bottom: 10px;">Additional Notes</h2>
          <p style="background-color: #f0f7f1; padding: 15px; border-radius: 4px; margin: 0;">
            ${quoteData.notes}
          </p>
        </div>
      ` : ''}
    </div>
    
    <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
      <p>This is an automated message from Wangamoort Quote System</p>
    </div>
  </div>
`

export async function sendQuoteEmail(quoteData: QuoteData) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  const mailOptions = {
    from: `"Wangamoort Quote System" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Quote Request - ${quoteData.customer_first_name} ${quoteData.customer_last_name}`,
    html: createHtmlContent(quoteData)
  }

  // Retry mechanism
  for (let i = 0; i < 3; i++) {
    try {
      console.log(`Email sending attempt ${i + 1}...`)
      const info = await transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', info.messageId)
      return info
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error)
      if (i === 2) throw error
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
    }
  }
} 