import nodemailer from 'nodemailer'
import { QuoteData } from '@/types/quote.types'
import { ContactFormData } from '@/types/contact.types'

const BUSINESS_EMAIL = 'business@wangamoort.com.au'

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

// Müşteri için HTML şablonu
const createCustomerHtmlContent = (quoteData: QuoteData) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
    <div style="background-color: #152e1b; padding: 20px; border-radius: 8px 8px 0 0;">
      <h1 style="color: white; margin: 0; text-align: center;">Thank You for Your Quote Request!</h1>
    </div>
    
    <div style="background-color: white; padding: 20px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <p style="color: #152e1b; font-size: 16px; line-height: 1.6;">
        Dear ${quoteData.customer_first_name},
      </p>
      
      <p style="color: #666; line-height: 1.6;">
        Thank you for choosing Wangamoort! We have received your quote request (Case #${quoteData.case_id}). 
        Our team will review your request and get back to you with a detailed quote as soon as possible.
      </p>

      <div style="margin: 30px 0;">
        <h2 style="color: #152e1b; border-bottom: 2px solid #152e1b; padding-bottom: 10px;">Your Quote Details</h2>
        
        <div style="margin-top: 20px;">
          <h3 style="color: #152e1b; margin-bottom: 10px;">Requested Products</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f0f7f1;">
                <th style="padding: 12px; text-align: left; border-bottom: 2px solid #152e1b;">Product</th>
                <th style="padding: 12px; text-align: center; border-bottom: 2px solid #152e1b;">Quantity</th>
              </tr>
            </thead>
            <tbody>
              ${quoteData.basket.map(item => `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">
                    ${item.product_name}<br/>
                    <span style="color: #666; font-size: 14px;">
                      ${item.variant_name} (${item.selected_size || '-'}, ${item.selected_color || '-'})
                    </span>
                  </td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">
                    ${item.quantity}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        ${quoteData.is_delivery || quoteData.is_installation || quoteData.is_rubbish_removal ? `
          <div style="margin-top: 20px;">
            <h3 style="color: #152e1b; margin-bottom: 10px;">Additional Services</h3>
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
        ` : ''}
      </div>

      <div style="background-color: #f0f7f1; padding: 15px; border-radius: 4px; margin-top: 30px;">
        <p style="margin: 0; color: #152e1b;">
          <strong>What's Next?</strong>
        </p>
        <p style="margin: 10px 0 0; color: #666;">
          Our team will prepare a detailed quote for you. We aim to respond within 24-48 business hours.
        </p>
      </div>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #666; margin-bottom: 5px;">
          <strong>Need assistance?</strong> We're here to help!
        </p>
        <p style="color: #666; margin: 0;">
          📞 Phone: +61 493 324 731<br/>
          ✉️ Email: info@wangamoort.com
        </p>
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
      <p>This is an automated message from Wangamoort - please do not reply to this email.</p>
    </div>
  </div>
`

// Ortak transporter yapılandırması
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: true,
      minVersion: 'TLSv1.2'
    }
  })
}

export async function sendQuoteEmail(quoteData: QuoteData) {
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1 saniye

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const transporter = createTransporter();
      await transporter.verify();

      const [adminResult, customerResult] = await Promise.all([
        transporter.sendMail({
          from: `"Wangamoort Quote System" <${BUSINESS_EMAIL}>`,
          to: BUSINESS_EMAIL,
          subject: `New Quote Request - ${quoteData.customer_first_name} ${quoteData.customer_last_name}`,
          html: createHtmlContent(quoteData)
        }),
        transporter.sendMail({
          from: `"Wangamoort" <${BUSINESS_EMAIL}>`,
          to: quoteData.customer_email,
          subject: `Your Quote Request - Wangamoort (Case #${quoteData.case_id})`,
          html: createCustomerHtmlContent(quoteData)
        })
      ]);

      return { adminResult, customerResult };
    } catch (error) {
      console.error(`Email sending attempt ${attempt} failed:`, error);
      
      if (attempt === MAX_RETRIES) {
        throw new Error(`Failed to send email after ${MAX_RETRIES} attempts: ${error instanceof Error ? error.message : String(error)}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
    }
  }
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    const transporter = createTransporter();
    await transporter.verify();

    const mailOptions = {
      from: `"Wangamoort Contact Form" <${BUSINESS_EMAIL}>`,
      to: BUSINESS_EMAIL,
      subject: `New Contact Form Submission - ${formData.name}`,
      html: createContactHtmlContent(formData)
    }

    const info = await transporter.sendMail(mailOptions)
    return info
  } catch (error) {
    console.error('Contact email sending failed:', error)
    throw error
  }
}


