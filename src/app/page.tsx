import Hero from '@/components/Hero'
import AboutUs from '@/components/AboutUs'
import Services from '@/components/Services'
import HowToOrder from '@/components/HowToOrder'
import Products from '@/components/Products'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* How To Order Section */}
      <HowToOrder />

      {/* Products Section */}
      <Products />

      {/* About Us Section */}
      <AboutUs />

      {/* Why Choose Us Section */}
    </div>
  )
} 