"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function AboutUsSection() {
  const sectionRef = useRef(null)
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false) // Mulai dengan false

  const titleText = language === 'en' ? "About Us" : "Tentang Kami"

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            console.log("Section is visible, starting animations") // Debug log
            setIsVisible(true)
          } else if (!entry.isIntersecting && isVisible) {
            // Reset animation when section is out of view (optional)
            // setIsVisible(false)
          }
        })
      },
      { 
        threshold: 0.3, // Section harus 30% terlihat baru trigger
        rootMargin: '-50px 0px -50px 0px' // Tambahkan margin agar tidak trigger terlalu cepat
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  // Reset animation when language changes - tapi jangan auto trigger
  useEffect(() => {
    if (isVisible) {
      setIsVisible(false)
      // Wait a bit then re-trigger if section is still visible
      setTimeout(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect()
          const isInView = rect.top < window.innerHeight && rect.bottom > 0
          if (isInView) {
            setIsVisible(true)
          }
        }
      }, 100)
    }
  }, [language])

  return (
    <>
      <style jsx>{`
        .title-letter {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .title-letter.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-element {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-element.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .image-container {
          opacity: 0;
          transform: translateX(-40px) scale(0.95);
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-container.visible {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .icon-item {
          opacity: 0;
          transform: translateY(20px) rotate(-5deg);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .icon-item.visible {
          opacity: 1;
          transform: translateY(0) rotate(0deg);
        }

        /* Hover effects */
        .title-letter:hover {
          transform: translateY(-2px) scale(1.1);
          color: #23A6F0;
          transition: all 0.3s ease;
        }

        .icon-item:hover {
          transform: translateY(-5px) scale(1.05);
          transition: all 0.3s ease;
        }
      `}</style>

      <section 
        ref={sectionRef}
        id="about" 
        className="w-full py-20 md:py-28 lg:py-32 relative overflow-hidden bg-white"
      >
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `url('/images/grid-pattern.png')`,
            backgroundSize: "30px 30px",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Gambar */}
            <div className="relative order-1 lg:order-1 flex justify-center lg:justify-start">
              <div className={`image-container relative w-[300px] h-[250px] sm:w-[350px] sm:h-[300px] md:w-[450px] md:h-[380px] lg:w-[500px] lg:h-[420px] ${isVisible ? 'visible' : ''}`}
                   style={{ transitionDelay: `${titleText.length * 80 + 200}ms` }}>
                <Image
                  src="/img/about.jpg"
                  alt="Person wearing VR headset"
                  layout="fill"
                  objectFit="cover"
                  className="transform -translate-y-2"
                />
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/90 to-transparent rounded-b-xl pointer-events-none z-10" />
              </div>
            </div>

            {/* Konten */}
            <div className="order-2 lg:order-2 space-y-6 text-center lg:text-left">
              <div className="space-y-2">
                <h2
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#252B42] leading-tight"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {titleText.split('').map((letter, index) => (
                    <span 
                      key={`${letter}-${index}`} 
                      className={`title-letter ${isVisible ? 'visible' : ''}`}
                      style={{ 
                        transitionDelay: `${index * 80}ms`,
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </h2>
              </div>

              <div className="space-y-4">
                <p className={`animate-element text-[#737373] text-base sm:text-lg leading-relaxed ${isVisible ? 'visible' : ''}`} 
                   style={{ 
                     fontFamily: "Inter, sans-serif",
                     transitionDelay: `${titleText.length * 80 + 400}ms`
                   }}>
                  {language === 'en' 
                    ? 'We are committed to creating an inclusive and sustainable digital ecosystem through various services and programs designed to accelerate the growth of the technology industry in Indonesia.'
                    : 'Kami berkomitmen untuk menciptakan ekosistem digital yang inklusif dan berkelanjutan melalui berbagai layanan dan program yang dirancang untuk mengakselerasi pertumbuhan industri teknologi di Indonesia.'}
                </p>
              </div>

              {/* Icon boxes */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                <div className={`icon-item w-32 h-32 flex items-center justify-center ${isVisible ? 'visible' : ''}`}
                     style={{ transitionDelay: `${titleText.length * 80 + 600}ms` }}>
                  <Image src="/img/steam.jpg" alt="STEAM logo" width={140} height={140} objectFit="contain" />
                </div>
                <div className={`icon-item w-24 h-24 flex items-center justify-center ${isVisible ? 'visible' : ''}`}
                     style={{ transitionDelay: `${titleText.length * 80 + 750}ms` }}>
                  <Image
                    src="/img/quality.jpg"
                    alt="SDG 4 Quality Education"
                    width={96}
                    height={96}
                    objectFit="contain"
                  />
                </div>
                <div className={`icon-item w-24 h-24 flex items-center justify-center ${isVisible ? 'visible' : ''}`}
                     style={{ transitionDelay: `${titleText.length * 80 + 900}ms` }}>
                  <Image
                    src="/img/industry.jpg"
                    alt="SDG 9 Industry, Innovation, and Infrastructure"
                    width={96}
                    height={96}
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}