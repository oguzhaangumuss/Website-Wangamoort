'use client'
import { useState, useEffect } from 'react'

export default function CopyrightYear() {
  const [year, setYear] = useState(2024)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return <span>{year}</span>
} 