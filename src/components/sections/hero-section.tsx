"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const [showGlitch, setShowGlitch] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    // Trigger animations with slight delay for natural feel
    const timer = setTimeout(() => {
      setShowGlitch(true)
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="hero" className="w-full h-screen flex flex-col justify-center items-center lg:py-8 xl:py-10 2xl:py-12 from-white to-gray-50">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-[1600px] flex-1 flex flex-col justify-center">
        
        {/* Mobile and Tablet layout (up to lg) - 50:50 ratio */}
        <div className="flex flex-col items-center text-center lg:hidden h-full justify-center">
          {/* Image Section - 45% of available space */}
          <div className="flex-[0.45] flex items-end justify-center w-full min-h-0 pb-4">
            <div className="relative w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[360px] md:max-w-[400px] h-full max-h-[250px] xs:max-h-[280px] sm:max-h-[320px] md:max-h-[360px]">
              <Image
                src="/img/home.svg"
                width="2100"
                height="1950"
                alt="Mersif Lab Illustration"
                className={`mx-auto aspect-[1.2/1] overflow-hidden rounded-xl object-cover object-center w-full h-full transition-all duration-700 ease-out ${showGlitch ? "glitch-image opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                priority
              />
              {/* Bottom white fade overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 md:h-10 bg-gradient-to-t from-white via-white/90 to-transparent rounded-b-xl pointer-events-none z-10"></div>
            </div>
          </div>
          
          {/* Text Section - 55% of available space */}
          <div className={`flex-[0.55] flex flex-col justify-start pt-2 space-y-3 sm:space-y-4 md:space-y-5 px-4 sm:px-6 md:px-8 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>
            <div className="space-y-2 sm:space-y-3">
              <h1
                className={`text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-tight transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ fontFamily: "Poppins, sans-serif", transitionDelay: "300ms" }}
              >
                {t('hero.mobile.title')}
              </h1>
              <p
                className={`max-w-[320px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-[600px] text-sm xs:text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mx-auto transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ fontFamily: "Inter, sans-serif", transitionDelay: "400ms" }}
              >
                {t('hero.mobile.subtitle')}
              </p>
            </div>
            <div className={`flex justify-center pt-1 sm:pt-2 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "500ms" }}>
              <a 
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                <Button 
                  className="inline-flex h-9 sm:h-10 md:h-10 items-center justify-center rounded-full bg-[#007bff] px-4 sm:px-5 md:px-6 text-sm sm:text-sm md:text-base font-medium text-white shadow transition-all duration-300 hover:bg-[#007bff]/90 hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {t('hero.button')}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop layout (lg and above) - side by side with LARGER IMAGE */}
        <div className="hidden lg:grid gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 items-center lg:grid-cols-[1fr_700px] xl:grid-cols-[1fr_800px] 2xl:grid-cols-[1fr_900px] 3xl:grid-cols-[1fr_1000px] flex-1">
          
          {/* Text Content */}
          <div className={`flex flex-col justify-center space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 lg:pl-6 xl:pl-8 2xl:pl-10 transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`} style={{ transitionDelay: "200ms" }}>
            <div className="space-y-2 lg:space-y-2 xl:space-y-3">
              <h1
                className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ 
                  fontFamily: "Poppins, sans-serif",
                  transitionDelay: "300ms"
                }}
              >
                {t('hero.title')}{" "}
                <span className="text-[#007bff]">{t('hero.title.highlight')}</span>
              </h1>
              <p
                className={`max-w-[450px] xl:max-w-[500px] 2xl:max-w-[550px] lg:text-base xl:text-lg 2xl:text-xl text-gray-600 leading-relaxed transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ 
                  fontFamily: "Inter, sans-serif",
                  transitionDelay: "400ms"
                }}
              >
                {t('hero.subtitle')}
              </p>
            </div>
            <div className={`flex pt-1 lg:pt-2 xl:pt-3 transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "500ms" }}>
              <a
                style={{ fontFamily: "Poppins, sans-serif" }}
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
                className="inline-flex lg:h-10 xl:h-11 2xl:h-12 items-center justify-center rounded-full bg-[#007bff] lg:px-4 xl:px-5 2xl:px-6 lg:text-sm xl:text-base 2xl:text-lg font-medium text-white shadow transition-all duration-300 hover:bg-[#007bff]/90 hover:shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {t('hero.button')}
                <ArrowRight className="ml-2 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
              </a>
            </div>
          </div>

          {/* Image - SIGNIFICANTLY LARGER */}
          <div className={`relative lg:order-last transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: "100ms" }}>
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

        {/* Enhanced responsive optimizations with LARGER IMAGES */}
        <div className="hidden lg:block">
          <style jsx>{`
            /* KHUSUS untuk resolusi 1366x768 - GAMBAR LEBIH BESAR */
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
              
              /* Grid layout optimization - GAMBAR LEBIH BESAR */
              .lg\\:grid-cols-\\[1fr_700px\\] {
                grid-template-columns: 1fr 600px;
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
              
              /* Image container optimization - LEBIH BESAR */
              .lg\\:order-last {
                max-width: 600px;
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

            /* Optimization for other 1366x768 laptop screens - GAMBAR LEBIH BESAR */
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
              
              /* Grid layout optimization with MUCH LARGER image */
              .lg\\:grid-cols-\\[1fr_700px\\] {
                grid-template-columns: 1fr 650px;
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
              
              /* Image container optimization - MUCH LARGER */
              .lg\\:order-last {
                max-width: 650px;
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

            /* Standard FHD 1920x1080 displays with VERY LARGE images */
            @media (min-width: 1920px) and (min-height: 1080px) {
              .container {
                max-width: 1800px;
              }
              
              /* Grid layout for FHD displays - VERY LARGE IMAGE */
              .\\32 xl\\:grid-cols-\\[1fr_900px\\] {
                grid-template-columns: 1fr 1200px;
              }
              
              /* Image container for FHD - VERY LARGE */
              .\\32 xl\\:order-last {
                max-width: 1200px;
              }
            }
            
            /* Ultra-wide and 4K displays - MASSIVE IMAGES */
            @media (min-width: 2560px) {
              .container {
                max-width: 2400px;
              }
              
              /* Ultra-wide displays with MASSIVE images */
              .\\33 xl\\:grid-cols-\\[1fr_1000px\\] {
                grid-template-columns: 1fr 1400px;
              }
              
              .\\33 xl\\:order-last {
                max-width: 1400px;
              }
            }

            /* Additional breakpoint for medium desktop screens - LARGER IMAGE */
            @media (min-width: 1440px) and (max-width: 1919px) {
              .xl\\:grid-cols-\\[1fr_800px\\] {
                grid-template-columns: 1fr 1000px;
              }
              
              .xl\\:order-last {
                max-width: 1000px;
              }
            }

            /* Large desktop screens 1680px+ - EXTRA LARGE IMAGES */
            @media (min-width: 1680px) and (max-width: 2559px) {
              .xl\\:grid-cols-\\[1fr_800px\\] {
                grid-template-columns: 1fr 1100px;
              }
              
              .xl\\:order-last {
                max-width: 1100px;
              }
            }

            /* 5K and 8K displays - ENORMOUS IMAGES */
            @media (min-width: 3840px) {
              .container {
                max-width: 3600px;
              }
              
              .\\33 xl\\:grid-cols-\\[1fr_1000px\\] {
                grid-template-columns: 1fr 1800px;
              }
              
              .\\33 xl\\:order-last {
                max-width: 1800px;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}