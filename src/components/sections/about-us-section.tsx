"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"

export function AboutUsSection() {
  const sectionRef = useRef(null)
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)
  const [showDetailedView, setShowDetailedView] = useState(false)

  const titleText = language === 'en' ? "About Us" : "Tentang Kami"

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            console.log("Section is visible, starting animations")
            setIsVisible(true)
          } else if (!entry.isIntersecting && isVisible) {
            // Reset animation when section is out of view (optional)
            // setIsVisible(false)
          }
        })
      },
      { 
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  // Reset animation when language changes
  useEffect(() => {
    if (isVisible) {
      setIsVisible(false)
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

  const handleShowMore = () => {
    setShowDetailedView(true)
    setTimeout(() => {
      const detailSection = document.getElementById('detailed-about')
      if (detailSection) {
        detailSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleBackToSummary = () => {
    setShowDetailedView(false)
    setTimeout(() => {
      const mainSection = document.getElementById('about')
      if (mainSection) {
        mainSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  // Additional content for detailed view
  const detailedContent = {
    en: {
      mission: "Our Mission",
      missionText: "To democratize technology education and create pathways for everyone to participate in the digital economy through innovative learning experiences and sustainable development programs.",
      vision: "Our Vision", 
      visionText: "To become the leading catalyst for inclusive digital transformation in Southeast Asia, where technology serves as a bridge to equal opportunities and sustainable growth.",
      values: "Our Core Values",
      valuesItems: [
        {
          title: "Innovation",
          description: "We continuously explore new ways to make technology education more accessible and effective through cutting-edge methodologies."
        },
        {
          title: "Inclusivity", 
          description: "We believe technology should be accessible to everyone, regardless of background, creating equal opportunities for all."
        },
        {
          title: "Sustainability",
          description: "We integrate sustainable development goals into all our programs, ensuring long-term positive impact for communities."
        },
        {
          title: "Excellence",
          description: "We maintain the highest standards in our educational content and program delivery, ensuring quality outcomes."
        }
      ],
      impact: "Our Impact",
      impactItems: [
        {
          title: "Quality Education",
          description: "Providing accessible STEAM education that empowers individuals with future-ready skills and knowledge."
        },
        {
          title: "Industry Innovation",
          description: "Supporting infrastructure development and technological advancement in Indonesia's growing digital economy."
        },
        {
          title: "Community Development", 
          description: "Building sustainable partnerships that create lasting positive change in local communities."
        }
      ],
      stats: [
        { number: "10,000+", label: "Students Trained" },
        { number: "50+", label: "Partner Institutions" },
        { number: "25+", label: "Programs Launched" },
        { number: "15+", label: "Awards Received" }
      ]
    },
    id: {
      mission: "Misi Kami",
      missionText: "Mendemokratisasi pendidikan teknologi dan menciptakan jalur bagi semua orang untuk berpartisipasi dalam ekonomi digital melalui pengalaman pembelajaran inovatif dan program pembangunan berkelanjutan.",
      vision: "Visi Kami",
      visionText: "Menjadi katalis utama untuk transformasi digital inklusif di Asia Tenggara, di mana teknologi berfungsi sebagai jembatan menuju kesempatan yang setara dan pertumbuhan berkelanjutan.",
      values: "Nilai-Nilai Inti Kami",
      valuesItems: [
        {
          title: "Inovasi",
          description: "Kami terus mengeksplorasi cara-cara baru untuk membuat pendidikan teknologi lebih mudah diakses dan efektif melalui metodologi mutakhir."
        },
        {
          title: "Inklusivitas",
          description: "Kami percaya teknologi harus dapat diakses oleh semua orang, terlepas dari latar belakang, menciptakan kesempatan yang setara untuk semua."
        },
        {
          title: "Keberlanjutan",
          description: "Kami mengintegrasikan tujuan pembangunan berkelanjutan ke dalam semua program kami, memastikan dampak positif jangka panjang bagi masyarakat."
        },
        {
          title: "Keunggulan",
          description: "Kami mempertahankan standar tertinggi dalam konten pendidikan dan penyampaian program kami, memastikan hasil yang berkualitas."
        }
      ],
      impact: "Dampak Kami",
      impactItems: [
        {
          title: "Pendidikan Berkualitas",
          description: "Menyediakan pendidikan STEAM yang mudah diakses yang memberdayakan individu dengan keterampilan dan pengetahuan siap masa depan."
        },
        {
          title: "Inovasi Industri",
          description: "Mendukung pengembangan infrastruktur dan kemajuan teknologi dalam ekonomi digital Indonesia yang berkembang."
        },
        {
          title: "Pengembangan Komunitas",
          description: "Membangun kemitraan berkelanjutan yang menciptakan perubahan positif yang bertahan lama di komunitas lokal."
        }
      ],
      stats: [
        { number: "10,000+", label: "Siswa Terlatih" },
        { number: "50+", label: "Institusi Mitra" },
        { number: "25+", label: "Program Diluncurkan" },
        { number: "15+", label: "Penghargaan Diterima" }
      ]
    }
  }

  const content = detailedContent[language]

  const additionalBadges = [
    { src: "/img/steam.jpg", alt: "STEAM - Science Technology Engineering Art Math", size: 120 },
    { src: "/img/quality.jpg", alt: "SDG 4 Quality Education", size: 80 },
    { src: "/img/industry.jpg", alt: "SDG 9 Industry, Innovation, and Infrastructure", size: 80 }
  ]

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

        /* Hover effects untuk desain asli */
        .title-letter:hover {
          transform: translateY(-2px) scale(1.1);
          color: #23A6F0;
          transition: all 0.3s ease;
        }

        .icon-item:hover {
          transform: translateY(-5px) scale(1.05);
          transition: all 0.3s ease;
        }

        /* Styles untuk detailed view - minimalist */
        .simple-card {
          transition: all 0.3s ease;
          border-left: 4px solid transparent;
        }

        .simple-card:hover {
          transform: translateX(8px);
          border-left-color: #3B82F6;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .number-highlight {
          background: linear-gradient(135deg, #3B82F6, #1E40AF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .fade-in-detailed {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInDetailed 0.6s ease-out forwards;
        }

        @keyframes fadeInDetailed {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
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
          {!showDetailedView ? (
            // ===== DESAIN ASLI - TETAP SAMA =====
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              {/* Gambar */}
             <div className="relative order-1 lg:order-1 flex justify-center lg:justify-start">
  <div
    className={`image-container relative w-[350px] h-[300px] sm:w-[450px] sm:h-[380px] md:w-[550px] md:h-[460px] lg:w-[650px] lg:h-[520px] ${
      isVisible ? "visible" : ""
    }`}
    style={{ transitionDelay: `${titleText.length * 80 + 200}ms` }}
  >
    <Image
      src="/img/about-mersiflab-new.svg"
      alt="Person wearing VR headset"
      layout="fill"
      objectFit="contain"
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

                {/* Button Lihat Selengkapnya */}
                <div className="pt-6 flex justify-center lg:justify-start">
                  <button
                    onClick={handleShowMore}
                    className={`animate-element px-8 py-3 bg-[#007bff] text-white font-semibold rounded-full shadow-lg hover:bg-[#5a23b5] transition-all duration-300 cursor-pointer ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${titleText.length * 80 + 1100}ms` }}
                  >
                    {language === 'en' ? 'See More' : 'Lihat Selengkapnya'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // ===== DETAILED VIEW - MINIMALIST SEPERTI SILANG.ID =====
            <div id="detailed-about" className="space-y-16">
             

              {/* Title */}
              <div className="fade-in-detailed stagger-1 text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{titleText}</h2>
                <div className="w-16 h-1 bg-blue-600 mx-auto"></div>
              </div>

              {/* Mission & Vision */}
              <div className="fade-in-detailed stagger-2 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="simple-card bg-white p-8 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">{content.mission}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{content.missionText}</p>
                </div>
                <div className="simple-card bg-white p-8 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900">{content.vision}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{content.visionText}</p>
                </div>
              </div>

              {/* Values */}
              <div className="fade-in-detailed stagger-3">
                <h3 className="text-3xl font-semibold text-gray-900 text-center mb-12">{content.values}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {content.valuesItems.map((value, index) => {
                    const icons = [
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>,
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>,
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>,
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ];
                    const colors = ['bg-green-100', 'bg-orange-100', 'bg-teal-100', 'bg-indigo-100'];
                    
                    return (
                      <div key={index} className="simple-card bg-white p-6 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-3">
                          <div className={`w-10 h-10 ${colors[index]} rounded-lg flex items-center justify-center mr-3`}>
                            {icons[index]}
                          </div>
                          <h4 className="text-xl font-semibold text-gray-900">{value.title}</h4>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Impact Areas */}
              <div className="fade-in-detailed stagger-4">
                <h3 className="text-3xl font-semibold text-gray-900 text-center mb-12">{content.impact}</h3>
                <div className="space-y-6">
                  {content.impactItems.map((item, index) => {
                    const icons = [
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>,
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>,
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ];
                    const colors = ['bg-blue-100', 'bg-purple-100', 'bg-emerald-100'];
                    
                    return (
                      <div key={index} className="simple-card bg-white p-6 border border-gray-200 rounded-lg">
                        <div className="flex items-center mb-3">
                          <div className={`w-10 h-10 ${colors[index]} rounded-lg flex items-center justify-center mr-3`}>
                            {icons[index]}
                          </div>
                          <h4 className="text-xl font-semibold text-gray-900">{item.title}</h4>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              

              {/* Partners & Certifications */}
              <div className="fade-in-detailed stagger-4">
                <h3 className="text-3xl font-semibold text-gray-900 text-center mb-12">
                  {language === 'en' ? 'Our Focus Areas' : 'Area Fokus Kami'}
                </h3>
                <div className="flex justify-center items-center gap-8">
                  {additionalBadges.map((badge, index) => (
                    <div key={index} className="bg-white p-6 border border-gray-200 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                      <Image
                        src={badge.src}
                        alt={badge.alt}
                        width={badge.size}
                        height={badge.size}
                        objectFit="contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              
            </div>
          )}
        </div>
      </section>
    </>
  )
}