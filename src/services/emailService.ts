import nodemailer from 'nodemailer'
import { QuoteData } from '@/types/quote.types'
import {  } from '@/types/database.types'
import { ContactFormData } from '../types/contact.types'

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

const createContactHtmlContent = (formData: ContactFormData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
    <div style="background-color: #152e1b; padding: 20px; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; text-align: center;">New Contact Form Submission</h1>
    </div>
    
    <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="margin-bottom: 30px;">
        <h2 style="color: #152e1b; border-bottom: 2px solid #152e1b; padding-bottom: 10px;">Contact Information</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Full Name:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${formData.phone || 'Not provided'}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #152e1b; border-bottom: 2px solid #152e1b; padding-bottom: 10px;">Message</h2>
        <p style="background-color: #f0f7f1; padding: 15px; border-radius: 4px; margin: 0; white-space: pre-wrap;">
          ${formData.message}
        </p>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
      <p>This is an automated message from Wangamoort Contact Form</p>
    </div>
  </div>
`

export async function sendQuoteEmail(quoteData: QuoteData) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    // Bağlantıyı test et
    await transporter.verify()
    console.log('SMTP connection verified')

    const mailOptions = {
      from: `"Wangamoort Quote System" <${process.env.SMTP_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Quote Request - ${quoteData.customer_first_name} ${quoteData.customer_last_name}`,
      html: createHtmlContent(quoteData)
    }

    // Environment variables'ları kontrol et
    console.log('Environment Check:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER?.substring(0, 3) + '***',
      from: process.env.SMTP_FROM?.substring(0, 3) + '***',
      to: process.env.ADMIN_EMAIL?.substring(0, 3) + '***'
    })

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
  } catch (error) {
    console.error('Email sending failed:', error)
    throw error
  }
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    console.log('Creating email transporter...')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })

    console.log('Verifying SMTP connection...')
    await transporter.verify()
    console.log('SMTP connection verified')

    const mailOptions = {
      from: `"Wangamoort Contact Form" <${process.env.SMTP_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${formData.name}`,
      html: createContactHtmlContent(formData)
    }

    console.log('Mail options prepared:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject
    })

    // Retry mechanism
    for (let i = 0; i < 3; i++) {
      try {
        console.log(`Email sending attempt ${i + 1}...`)
        const info = await transporter.sendMail(mailOptions)
        console.log('Contact email sent successfully:', info.messageId)
        return info
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, {
          error,
          attempt: i + 1,
          timestamp: new Date().toISOString()
        })
        if (i === 2) throw error
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)))
      }
    }
  } catch (error) {
    console.error('Contact email sending failed:', {
      error,
      formData,
      env: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER?.substring(0, 3) + '***',
        from: process.env.SMTP_FROM?.substring(0, 3) + '***'
      }
    })
    throw error
  }
}