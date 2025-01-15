'use client'
import { FaArrowUp } from 'react-icons/fa'

export default function ScrollToTopButton() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button 
      onClick={handleScrollToTop}
      className="absolute -top-5 right-10 bg-blue-600 text-white p-4 rounded-full shadow-lg
        hover:bg-blue-700 transition-all duration-300 group"
    >
      <FaArrowUp className="text-xl group-hover:-translate-y-1 transition-transform duration-300" />
    </button>
  )
} 