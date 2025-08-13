"use client"

import { useState, useEffect } from "react"
import { HeroSection } from "@/components/sections/hero-section"
import "./globals.css"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { PartnersSection } from "@/components/sections/partners-section"
import { MersifNumbersSection } from "@/components/sections/mersif-numbers-section"
import { AboutUsSection } from "@/components/sections/about-us-section"
import { ProductsSection } from "@/components/sections/products-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { NewsBlogSection } from "@/components/sections/news-blog-section"
import { ContactCtaSection } from "@/components/sections/contact-cta-section"
import Image from "next/image"

export default function HomePage() {
  const [isEnglish, setIsEnglish] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [loading, setLoading] = useState(true)

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish)
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 2000)
  }

  // Simulasi loading 2 detik
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        {/* Logo */}
        <div className="opacity-0 transition-opacity duration-700 ease-out" style={{ opacity: 1 }}>
  <Image
    src="/img/logomersiflab.png"
    alt="Logo Mersif Lab"
    width={150}
    height={150}
  />
</div>

        {/* Loader */}
        <div className="mt-6 w-12 h-12 border-4 border-gray-300 border-t-[#007bff] rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <>
      <Header />

      {/* Language Switcher Button */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center">
        <div
          className="relative group"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            onClick={toggleLanguage}
            className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-gray-200 hover:scale-110 transition-transform"
          >
            {isEnglish ? (
              <svg width="24" height="16" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="30" fill="#012169" />
                <rect x="25" width="10" height="30" fill="#C8102E" />
                <rect y="10" width="60" height="10" fill="#C8102E" />
                <polygon points="0,0 6,0 60,24 60,30 54,30 0,6" fill="#fff" />
                <polygon points="60,0 60,6 6,30 0,30 0,24 54,0" fill="#fff" />
              </svg>
            ) : (
              <svg width="24" height="16" viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" className="rounded-sm">
                <rect width="3" height="1" y="0" fill="#dc143c" />
                <rect width="3" height="1" y="1" fill="#ffffff" />
              </svg>
            )}
          </button>

          {showTooltip && (
            <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-100 transition-opacity duration-300">
              {isEnglish ? "Hi! You are using English" : "Hai! Kamu menggunakan bahasa Indonesia"}
            </span>
          )}
        </div>
      </div>

      <HeroSection />
      <PartnersSection />
      <MersifNumbersSection />
      <AboutUsSection />
      <ProductsSection />
      <TestimonialsSection />
      <NewsBlogSection />
      <ContactCtaSection />
      <Footer />
    </>
  )
}
