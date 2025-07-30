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
    <section id="hero" className="w-full py-8 md:py-16 lg:py-20 xl:py-24 from-white to-gray-50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-4 pl-8 md:pl-12 lg:pl-16">
            <div className="space-y-2">
              <h1
                className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Mersif <span className="text-[#007bff]">Lab</span>
              </h1>
              <p
                className="max-w-[600px] text-xl text-gray-600 md:text-2xl"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Platform Laboratorium Virtual Berbasis Mixed Reality Kolaboratif dan Imersif
              </p>
            </div>
            <div className="flex">
              <Button className="inline-flex h-12 items-center justify-center rounded-full bg-[#007bff] px-6 text-base font-medium text-white shadow transition-colors hover:bg-[#007bff]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <Image
            src="/img/te2.png"
            width="600"
            height="550"
            alt="Mersif Lab Illustration"
            className={`mx-auto aspect-[1.2/1] overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last ${showGlitch ? "glitch-image" : ""}`}
          />
        </div>
      </div>
    </section>
  )
}
