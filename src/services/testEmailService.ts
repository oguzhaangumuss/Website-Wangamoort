import type { QuoteData } from '../types/quote.types.js'
import type { ContactFormData } from '../types/contact.types.js'
import { sendQuoteEmail, sendContactEmail } from './emailService.js'
import nodemailer from 'nodemailer'

// Test için örnek quote verisi
const mockQuoteData: QuoteData = {
  case_id: 1,
  customer_first_name: 'Test',
  customer_last_name: 'User',
  customer_email: 'test@example.com',
  customer_phone: '0400000000',
  company_name: 'Test Company',
  is_delivery: true,
  is_installation: true,
  is_rubbish_removal: false,
  delivery_address: {
    street: '123 Test St',
    city: 'Sydney',
    state: 'NSW',
    postcode: '2000'
  },
  basket: [
    {
      product_id: 'prod_001',
      product_name: 'Test Product',
      variant_name: 'Test Variant',
      quantity: 1,
      selected_size: 'Large',
      selected_color: 'Black',
      price: 999.99
    }
  ],
  notes: 'This is a test quote'
}

// Test için örnek contact form verisi
const mockContactData: ContactFormData = {
  name: 'Test Contact',
  email: 'test@example.com',
  phone: '0400000000',
  message: 'This is a test contact message'
}

// Test fonksiyonları önce tanımlanmalı
const emailTests = {
  testQuoteEmail: async () => {
    try {
      return await sendQuoteEmail(mockQuoteData)
    } catch (error) {
      throw new Error(`Quote email test failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  },
  testContactEmail: async () => {
    try {
      return await sendContactEmail(mockContactData)
    } catch (error) {
      throw new Error(`Contact email test failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  },
  testSMTPConnection: async () => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'mx3594.syd1.mymailhosting.com',  // WebCentral Professional Email SMTP server
        port: 465,                  // SSL port
        secure: true,              // SSL için true
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      })

      console.log('Attempting SMTP connection with config:', {
        host: 'mx3594.syd1.mymailhosting.com',
        port: 465,
        user: process.env.SMTP_USER?.substring(0, 3) + '***'
      })

      await transporter.verify()
      return { success: true, message: 'SMTP connection successful' }
    } catch (error) {
      throw new Error(`SMTP connection test failed: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

// Email servislerini test et
async function testEmailServices() {
  console.log('=== EMAIL SERVICE TEST STARTED ===')

  // Environment variables kontrolü
  const envVars = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_FROM: process.env.SMTP_FROM,
    hasPass: !!process.env.SMTP_PASS
  }

  console.log('Environment Variables:', envVars)

  if (!envVars.SMTP_HOST || !envVars.SMTP_PORT || !envVars.SMTP_USER || !envVars.hasPass) {
    throw new Error('Missing required environment variables')
  }

  try {
    // SMTP bağlantı testi
    console.log('\nTesting SMTP connection...')
    const smtpTest = await emailTests.testSMTPConnection()
    console.log('SMTP Test Result:', smtpTest)

    // Quote email testi
    console.log('\nTesting quote email...')
    const quoteResult = await emailTests.testQuoteEmail()
    console.log('Quote Email Result:', quoteResult)

    console.log('\n=== EMAIL SERVICE TEST COMPLETED ===')
  } catch (error) {
    console.error('\n=== EMAIL SERVICE TEST FAILED ===')
    console.error('Error:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  }
}

// Test başlat
console.log('Starting test execution...')
testEmailServices()
  .then(() => {
    console.log('Test completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Test failed:', error)
    process.exit(1)
  })

// Test sonuçlarını formatlayan yardımcı fonksiyon
function formatTestResult(testName: string, result: any) {
  return {
    test: testName,
    timestamp: new Date().toISOString(),
    success: true,
    result
  }
} 