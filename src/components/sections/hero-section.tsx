"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [showGlitch, setShowGlitch] = useState(false)

  useEffect(() => {
    // Trigger the glitch effect when the component mounts
    setShowGlitch(true)
  }, [])

  return (
    <section id="hero" className="w-full py-3 sm:py-4 md:py-6 lg:py-8 xl:py-10 2xl:py-12 from-white to-gray-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-[1600px]">
        
        {/* Mobile and Tablet layout (up to lg) - image first, then text below */}
        <div className="flex flex-col items-center text-center lg:hidden space-y-4 sm:space-y-6 md:space-y-8">
          <div className="relative w-full max-w-[400px] xs:max-w-[480px] sm:max-w-[600px] md:max-w-[720px]">
            <Image
              src="/img/home.svg"
              width="2100"
              height="1950"
              alt="Mersif Lab Illustration"
              className={`mx-auto aspect-[1.2/1] overflow-hidden rounded-xl object-cover object-center w-full ${showGlitch ? "glitch-image" : ""}`}
              priority
            />
            {/* Bottom white fade overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-14 md:h-16 bg-gradient-to-t from-white via-white/90 to-transparent rounded-b-xl pointer-events-none z-10"></div>
          </div>
          
          <div className="flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-5">
            <div className="space-y-2 sm:space-y-3">
              <h1
                className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Mersif<span className="text-[#007bff]">Lab</span>
              </h1>
              <p
                className="max-w-[280px] xs:max-w-[320px] sm:max-w-[500px] md:max-w-[600px] text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed px-2 sm:px-4"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Platform Laboratorium Virtual Berbasis Mixed Reality Kolaboratif dan Imersif
              </p>
            </div>
            <div className="flex justify-center pt-1 sm:pt-2">
              <Button className="inline-flex h-9 sm:h-10 md:h-11 items-center justify-center rounded-full bg-[#007bff] px-4 sm:px-5 md:px-6 text-sm sm:text-base font-medium text-white shadow transition-colors hover:bg-[#007bff]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop layout (lg and above) - side by side */}
        <div className="hidden lg:grid gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 items-center lg:grid-cols-[1fr_580px] xl:grid-cols-[1fr_650px] 2xl:grid-cols-[1fr_720px]">
          
          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 lg:pl-6 xl:pl-8 2xl:pl-10">
            <div className="space-y-2 lg:space-y-2 xl:space-y-3">
              <h1
                className="lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tighter leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Mersif<span className="text-[#007bff]">Lab</span>
              </h1>
              <p
                className="max-w-[450px] xl:max-w-[500px] 2xl:max-w-[550px] lg:text-base xl:text-lg 2xl:text-xl text-gray-600 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Platform Laboratorium Virtual Berbasis Mixed Reality Kolaboratif dan Imersif
              </p>
            </div>
            <div className="flex pt-1 lg:pt-2 xl:pt-3">
              <Button className="inline-flex lg:h-10 xl:h-11 2xl:h-12 items-center justify-center rounded-full bg-[#007bff] lg:px-4 xl:px-5 2xl:px-6 lg:text-sm xl:text-base 2xl:text-lg font-medium text-white shadow transition-colors hover:bg-[#007bff]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                <ArrowRight className="lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
              </Button>
            </div>
          </div>

          {/* Image - Now Larger */}
          <div className="relative lg:order-last">
            <Image
              src="/img/home.svg"
              width="2100"
              height="1950"
              alt="Mersif Lab Illustration"
              className={`mx-auto aspect-[1.2/1] overflow-hidden rounded-xl object-cover object-center w-full ${showGlitch ? "glitch-image" : ""}`}
              priority
            />
            {/* Bottom white fade overlay */}
            <div className="absolute bottom-0 left-0 right-0 lg:h-16 xl:h-18 2xl:h-20 3xl:h-24 bg-gradient-to-t from-white via-white/90 to-transparent rounded-b-xl pointer-events-none z-10"></div>
          </div>
        </div>

        {/* Enhanced responsive optimizations */}
        <div className="hidden lg:block">
          <style jsx>{`
            /* KHUSUS untuk resolusi 1366x768 - Teks Diperbesar */
            @media (min-width: 1366px) and (max-width: 1366px) and (min-height: 768px) and (max-height: 768px) {
              .container {
                max-width: 1320px;
                padding-left: 2rem;
                padding-right: 2rem;
              }
              
              /* Hero section padding adjustment */
              section {
                padding-top: 3rem;
                padding-bottom: 3rem;
              }
              
              /* Grid layout optimization */
              .lg\\:grid-cols-\\[1fr_580px\\] {
                grid-template-columns: 1fr 480px;
              }
              
              /* TEKS JUDUL DIPERBESAR KHUSUS 1366x768 */
              .lg\\:text-4xl {
                font-size: 4.5rem !important;
                line-height: 1.05 !important;
                font-weight: 800 !important;
              }
              
              /* DESKRIPSI DIPERBESAR KHUSUS 1366x768 */
              .lg\\:text-base {
                font-size: 1.5rem !important;
                line-height: 1.5 !important;
                font-weight: 500 !important;
              }
              
              /* Button size adjustment */
              .lg\\:h-10 {
                height: 3.5rem !important;
                font-size: 1.125rem !important;
              }
              
              .lg\\:px-4 {
                padding-left: 2rem !important;
                padding-right: 2rem !important;
              }
              
              /* Arrow icon size */
              .lg\\:w-4 {
                width: 1.5rem !important;
                height: 1.5rem !important;
              }
              
              /* Image container optimization */
              .lg\\:order-last {
                max-width: 480px;
              }
              
              /* Spacing adjustments */
              .lg\\:space-y-4 > * + * {
                margin-top: 1.75rem !important;
              }
              
              .lg\\:gap-6 {
                gap: 2.5rem !important;
              }
              
              .lg\\:pl-6 {
                padding-left: 2rem !important;
              }
              
              /* Max width untuk paragraf agar tidak terlalu lebar */
              .max-w-\\[450px\\] {
                max-width: 550px !important;
              }
            }

            /* Optimization for other 1366x768 laptop screens */
            @media (min-width: 1024px) and (max-width: 1366px) and (min-height: 700px) and (max-height: 800px) {
              .container {
                max-width: 1300px;
                padding-left: 1.5rem;
                padding-right: 1.5rem;
              }
              
              /* Hero section padding adjustment */
              section {
                padding-top: 2rem;
                padding-bottom: 2rem;
              }
              
              /* Grid layout optimization with larger image */
              .lg\\:grid-cols-\\[1fr_580px\\] {
                grid-template-columns: 1fr 500px;
              }
              
              /* Text content adjustments */
              .lg\\:text-4xl {
                font-size: 3.5rem;
                line-height: 1.1;
              }
              
              .lg\\:text-base {
                font-size: 1.125rem;
                line-height: 1.6;
              }
              
              /* Button size adjustment */
              .lg\\:h-10 {
                height: 2.75rem;
              }
              
              .lg\\:px-4 {
                padding-left: 1.25rem;
                padding-right: 1.25rem;
              }
              
              /* Image container optimization - larger */
              .lg\\:order-last {
                max-width: 500px;
              }
              
              /* Spacing adjustments */
              .lg\\:space-y-4 > * + * {
                margin-top: 1.25rem;
              }
              
              .lg\\:gap-6 {
                gap: 1.5rem;
              }
              
              .lg\\:pl-6 {
                padding-left: 1.25rem;
              }
            }

            /* Standard FHD 1920x1080 displays with larger images */
            @media (min-width: 1920px) and (min-height: 1080px) {
              .container {
                max-width: 1800px;
              }
              
              /* Grid layout for FHD displays */
              .\\33 xl\\:grid-cols-\\[1fr_720px\\] {
                grid-template-columns: 1fr 1100px;
              }
              
              /* Image container for FHD */
              .\\33 xl\\:order-last {
                max-width: 1100px;
              }
            }
            
            /* Ultra-wide and 4K displays */
            @media (min-width: 2560px) {
              .container {
                max-width: 2400px;
              }
              
              /* Ultra-wide displays with very large images */
              .\\33 xl\\:grid-cols-\\[1fr_720px\\] {
                grid-template-columns: 1fr 1200px;
              }
              
              .\\33 xl\\:order-last {
                max-width: 1200px;
              }
            }

            /* Additional breakpoint for medium desktop screens */
            @media (min-width: 1440px) and (max-width: 1919px) {
              .xl\\:grid-cols-\\[1fr_650px\\] {
                grid-template-columns: 1fr 850px;
              }
              
              .xl\\:order-last {
                max-width: 850px;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}