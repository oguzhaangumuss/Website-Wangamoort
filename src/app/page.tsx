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

       {/* About Us Section */}
       <AboutUs />

      {/* How To Order Section */}
      <HowToOrder />

      {/* Products Section */}
      <Products />
    </div>
  )
} 