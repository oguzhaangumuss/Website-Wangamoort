'use client'

import { FaBoxOpen, FaAward, FaTruck, FaTools, FaHeadset, FaSmile } from 'react-icons/fa'

const features = [
  {
    title: 'Extensive Product Range',
    description: 'With a diverse range of options, we provide furniture, appliances, and household essentials suitable for homes, offices, and businesses of all sizes.',
    icon: FaBoxOpen
  },
  {
    title: 'Guaranteed Quality',
    description: 'Our products match the standards of major retail stores, offering trusted brands and durable, stylish designs at competitive prices.',
    icon: FaAward
  },
  {
    title: 'Fast & Reliable Delivery',
    description: 'We ensure your orders are delivered quickly and efficiently, saving you time and effort.',
    icon: FaTruck
  },
  {
    title: 'Hassle-Free Installation',
    description: 'Our professional team takes care of the entire installation process, from setup to testing, ensuring your products are ready to use immediately.',
    icon: FaTools
  },
  {
    title: 'Expert Support',
    description: 'From product selection to space customization, we provide tailored advice and solutions to suit your needs, whether you\'re an individual or a business.',
    icon: FaHeadset
  },
  {
    title: 'Customer Satisfaction Guaranteed',
    description: 'Your satisfaction is our priority. We stand behind our services at every step, ensuring a smooth and stress-free experience from order to completion.',
    icon: FaSmile
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            We pride ourselves on delivering a seamless and customer-focused experience. Here's why we're the right choice for your furniture and appliance needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <feature.icon className="text-[#ffd230] text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 