import { HeroSection } from "@/components/sections/hero-section"
import { Metadata } from "next"
import "./globals.css" // Import global styles
import type React from "react"
import { Inter, Poppins } from "next/font/google" // Import Poppins and Inter fonts
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { PartnersSection } from "@/components/sections/partners-section"
import { MersifNumbersSection } from "@/components/sections/mersif-numbers-section"
import { AboutUsSection } from "@/components/sections/about-us-section"
import { ProductsSection } from "@/components/sections/products-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { NewsBlogSection } from "@/components/sections/news-blog-section"
import { ContactCtaSection } from "@/components/sections/contact-cta-section"


export default function HomePage() {
  return (
    <>
      <Header />
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


