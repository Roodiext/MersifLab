"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const [showGlitch, setShowGlitch] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Trigger animations with slight delay for natural feel
    const timer = setTimeout(() => {
      setShowGlitch(true)
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Enhanced iframe URL with better controls and auto-rotation
  const enhancedIframeUrl = `https://sketchfab.com/models/55a9b75a90ad4b65891668d850a8dd36/embed?autospin=1&autostart=1&preload=1&transparent=1&ui_watermark_link=0&ui_watermark=0&ui_controls=1&ui_infos=0&ui_stop=0&ui_inspector=0&ui_settings=0&ui_vr=0&ui_fullscreen=0&ui_annotations=0&ui_hint=0&ui_ar=0&camera=0&background=c4c4c4&orbit_constraint_pan=0&orbit_constraint_zoom_in=0.1&orbit_constraint_zoom_out=10&scrollwheel=1`

  // Mouse interaction handlers for VR control
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isInteracting) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = (e.clientX - rect.left - centerX) / centerX
    const y = (e.clientY - rect.top - centerY) / centerY
    
    setMousePos({ x, y })

    // Send rotation data to iframe VR model
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        // Send mouse position to control VR rotation
        iframeRef.current.contentWindow.postMessage({
          type: 'viewer_rotation',
          x: x * 0.5,  // Smooth rotation multiplier
          y: y * 0.5
        }, '*')
      } catch (e) {
        // Handle cross-origin restrictions silently
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsInteracting(true)
    e.currentTarget.style.cursor = 'grabbing'
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsInteracting(false)
    e.currentTarget.style.cursor = 'grab'
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    setIsInteracting(false)
    e.currentTarget.style.cursor = 'grab'
  }

  return (
    <section id="hero" className="w-full h-screen flex flex-col justify-center items-center lg:py-8 xl:py-10 2xl:py-12 relative overflow-hidden">
      {/* Background VR - Full Screen */}
      <div className="absolute inset-0 w-full h-full">
        <iframe 
          ref={iframeRef}
          title="Samsung Gear VR Background" 
          frameBorder="0" 
          allowFullScreen 
          mozallowfullscreen="true" 
          webkitallowfullscreen="true" 
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          xr-spatial-tracking="true"
          execution-while-out-of-viewport="true"
          execution-while-not-rendered="true" 
          web-share="true"
          src={enhancedIframeUrl}
          className="w-full h-full object-cover"
          style={{ backgroundColor: '#c4c4c4' }}
        />
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 max-w-[1600px] flex-1 flex flex-col justify-center relative z-10">
        
        {/* Mobile and Tablet layout (up to lg) - 50:50 ratio */}
        <div className="flex flex-col items-center text-center lg:hidden h-full justify-center">
          {/* Text Section - Full content with semi-transparent background */}
          <div className={`flex flex-col justify-center items-center space-y-3 sm:space-y-4 md:space-y-5 px-4 sm:px-6 md:px-8 py-8 rounded-2xl backdrop-blur-sm bg-white/20 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: "200ms" }}>
            <div className="space-y-2 sm:space-y-3">
              <h1
                className={`text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-tight transition-all duration-700 ease-out text-white ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ fontFamily: "Poppins, sans-serif", transitionDelay: "300ms" }}
              >
                {t('hero.mobile.title')}
              </h1>
              <p
                className={`max-w-[320px] xs:max-w-[380px] sm:max-w-[480px] md:max-w-[600px] text-sm xs:text-base sm:text-lg md:text-xl text-gray-100 leading-relaxed mx-auto transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
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
                  className="inline-flex h-9 sm:h-10 md:h-10 items-center justify-center rounded-full bg-[#007bff] px-4 sm:px-5 md:px-6 text-sm sm:text-sm md:text-base font-medium text-white shadow-lg transition-all duration-300 hover:bg-[#007bff]/90 hover:shadow-xl hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {t('hero.button')}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Desktop layout (lg and above) - Text with enhanced background overlay */}
        <div className="hidden lg:grid gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 items-center lg:grid-cols-[1fr_1fr] flex-1">
          
          {/* Text Content with semi-transparent background */}
          <div className={`flex flex-col justify-center space-y-3 lg:space-y-4 xl:space-y-5 2xl:space-y-6 lg:pl-6 xl:pl-8 2xl:pl-10 transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`} style={{ transitionDelay: "200ms" }}>
            <div className="backdrop-blur-md bg-white/30 p-6 lg:p-8 xl:p-10 rounded-2xl">
              <div className="space-y-2 lg:space-y-2 xl:space-y-3">
                <h1
                  className={`text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                  style={{ 
                    fontFamily: "Poppins, sans-serif",
                    transitionDelay: "300ms"
                  }}
                >
                  {t('hero.title')}{" "}
                  <span className="text-[#007bff]">{t('hero.title.highlight')}</span>
                </h1>
                <p
                  className={`max-w-[450px] xl:max-w-[500px] 2xl:max-w-[550px] lg:text-base xl:text-lg 2xl:text-xl text-gray-100 leading-relaxed transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ 
                    fontFamily: "Inter, sans-serif",
                    transitionDelay: "400ms"
                  }}
                >
                  {t('hero.subtitle')}
                </p>
              </div>
              <div className={`flex pt-4 lg:pt-5 xl:pt-6 transition-all duration-800 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "500ms" }}>
                <a
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#services')?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                  className="inline-flex lg:h-10 xl:h-11 2xl:h-12 items-center justify-center rounded-full bg-[#007bff] lg:px-4 xl:px-5 2xl:px-6 lg:text-sm xl:text-base 2xl:text-lg font-medium text-white shadow-xl transition-all duration-300 hover:bg-[#007bff]/90 hover:shadow-2xl hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {t('hero.button')}
                  <ArrowRight className="ml-2 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive VR Control Zone - Area kosong untuk kontrol mouse */}
          <div 
            className="flex justify-center items-center relative cursor-grab active:cursor-grabbing"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {/* Invisible interaction zone */}
            <div className="w-full h-full min-h-[400px] lg:min-h-[500px] xl:min-h-[600px] relative">
              {/* Subtle visual hint for interaction */}
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isInteracting ? 'opacity-20' : 'opacity-10'}`}>
                <div className="text-center text-white/50">
                  <div className="text-2xl mb-2">🖱️</div>
                  <p className="text-xs font-medium">Drag to explore VR</p>
                </div>
              </div>
              
              {/* Interactive feedback overlay */}
              <div 
                className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                  isInteracting 
                    ? 'bg-white/5 border border-white/10 shadow-lg' 
                    : 'border border-transparent'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Enhanced responsive optimizations with LARGER IMAGES */}
        <div className="hidden lg:block">
          <style jsx>{`
            /* Enhanced gradient for radial effect */
            .bg-gradient-radial {
              background: radial-gradient(circle at center, var(--tw-gradient-stops));
            }
            
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