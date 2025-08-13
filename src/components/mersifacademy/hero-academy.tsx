"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { BookOpen, Award, Rocket, Users, ChevronRight, Star } from "lucide-react"

export default function HomePageAcademy() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const AnimatedIcon = ({
    children,
    className = "",
    delay = 0,
  }: {
    children: React.ReactNode
    className?: string
    delay?: number
  }) => (
    <div
      className={`absolute opacity-20 animate-float ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "6s",
        animationIterationCount: "infinite",
      }}
    >
      {children}
    </div>
  )

  const collaborationLogos = [
    { name: "Partner 1", src: "/generic-university-logo.png" },
    { name: "Partner 2", src: "/abstract-tech-logo.png" },
    { name: "Partner 3", src: "/research-institute-logo.png" },
    { name: "Partner 4", src: "/placeholder-4cri3.png" },
    { name: "Partner 5", src: "/generic-government-logo.png" },
    { name: "Partner 6", src: "/placeholder-1rwgf.png" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-900 to-slate-800 text-white">
        {/* Animated Background Elements */}
        <AnimatedIcon className="top-10 left-10" delay={0}>
          <Award className="w-12 h-12 text-blue-200" />
        </AnimatedIcon>

        <AnimatedIcon className="top-20 right-20" delay={1}>
          <BookOpen className="w-16 h-16 text-sky-200" />
        </AnimatedIcon>

        <AnimatedIcon className="bottom-32 left-1/4" delay={2}>
          <Rocket className="w-14 h-14 text-slate-200" />
        </AnimatedIcon>

        <AnimatedIcon className="top-1/3 right-1/4" delay={3}>
          <Users className="w-10 h-10 text-blue-300" />
        </AnimatedIcon>

        <AnimatedIcon className="bottom-20 right-10" delay={4}>
          <Star className="w-12 h-12 text-sky-300" />
        </AnimatedIcon>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div
              className={`w-full lg:w-1/2 space-y-8 transform transition-all duration-1000 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 to-sky-500 bg-clip-text text-transparent">
                    Mersif
                  </span>
                  <span className="text-white block lg:inline lg:ml-3">Academy</span>
                </h1>

                <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                  Platform pembelajaran riset, sains, dan teknologi berbasis open innovation untuk mencetak inovator
                  muda Indonesia.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="group bg-white text-blue-800 px-8 py-4 rounded-xl font-semibold 
                           hover:bg-slate-50 transition-all duration-300 transform hover:scale-105 
                           shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Selengkapnya
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/daftar"
                  className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold 
                           hover:bg-white hover:text-blue-800 transition-all duration-300 
                           flex items-center justify-center gap-2"
                >
                  Daftar Sekarang
                  <Rocket className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div
              className={`w-full lg:w-1/2 flex justify-center transform transition-all duration-1000 delay-300 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-slate-600 rounded-3xl blur-3xl opacity-30 scale-110"></div>
                <Image
                  src="/students-tech-innovation.png"
                  alt="Mersif Academy - Inovator Muda Indonesia"
                  width={400}
                  height={500}
                  className="relative z-10 rounded-3xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" className="w-full h-12 fill-white">
            <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Berkolaborasi Dengan</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Bekerja sama dengan berbagai institusi pendidikan dan organisasi terkemuka untuk memberikan pengalaman
              pembelajaran terbaik
            </p>
          </div>

          {/* Logo Marquee */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee space-x-12">
              {[...collaborationLogos, ...collaborationLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.name}
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain opacity-60 hover:opacity-100 
                             transition-opacity duration-300 grayscale hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div
              className="inline-block bg-white/80 backdrop-blur-sm border border-white/50 
                          rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Layanan Unggulan</h2>
              <p className="text-xl text-slate-600 max-w-2xl">
                Program pembelajaran yang dirancang khusus untuk mengembangkan potensi inovator muda Indonesia
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Research Card */}
            <div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl 
                          transition-all duration-300 transform hover:-translate-y-2 
                          border border-gray-100"
            >
              <div
                className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 
                            rounded-2xl flex items-center justify-center mb-6 
                            group-hover:scale-110 transition-transform duration-300"
              >
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Riset & Penelitian</h3>
              <p className="text-slate-600 leading-relaxed">
                Bimbingan penelitian dengan metodologi ilmiah untuk menghasilkan karya inovatif yang berdampak nyata
                bagi masyarakat.
              </p>
            </div>

            {/* Technology Card */}
            <div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl 
                          transition-all duration-300 transform hover:-translate-y-2 
                          border border-gray-100"
            >
              <div
                className="w-16 h-16 bg-gradient-to-br from-sky-600 to-cyan-600 
                            rounded-2xl flex items-center justify-center mb-6 
                            group-hover:scale-110 transition-transform duration-300"
              >
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Teknologi Digital</h3>
              <p className="text-slate-600 leading-relaxed">
                Pembelajaran teknologi terkini dengan pendekatan praktis dan project-based learning untuk skill yang
                relevan.
              </p>
            </div>

            {/* Startup Card */}
            <div
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl 
                          transition-all duration-300 transform hover:-translate-y-2 
                          border border-gray-100"
            >
              <div
                className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-slate-700 
                            rounded-2xl flex items-center justify-center mb-6 
                            group-hover:scale-110 transition-transform duration-300"
              >
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Inkubasi Startup</h3>
              <p className="text-slate-600 leading-relaxed">
                Pembinaan ide bisnis teknologi dari konsep hingga implementasi di pasar dengan mentoring dari praktisi
                berpengalaman.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
