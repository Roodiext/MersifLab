"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export function HeroSectionDummy() {
  const [showAnimation, setShowAnimation] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const fadeIn = (delay: number) =>
    `transition-all duration-700 ease-out delay-[${delay}ms] ${
      showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`

  return (
    <section id="hero" className="w-full py-10 sm:py-14 lg:py-20">
      <div className="container mx-auto px-6 sm:px-8 max-w-5xl">
        {/* Mobile & Tablet */}
        <div className="flex flex-col items-center text-center lg:hidden space-y-8">
          <div className={`relative w-full max-w-[380px] mx-auto ${fadeIn(100)}`}>
            <Image
              src="/img/navbar-logo/IOT.jpg"
              alt="Ilustrasi Mersif IoT"
              width={500}
              height={350}
              priority
              className="object-cover "
            />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className={`space-y-4 px-4 ${fadeIn(200)}`}>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {t("iot.hero.title")}
              </h1>
              <p
                className="max-w-[600px] mx-auto text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {t("iot.hero.description.mobile")}
              </p>
            </div>
            <div
              style={{ fontFamily: "Inter, sans-serif" }}
              className={`flex justify-center gap-4 pt-4 ${fadeIn(300)}`}
            >
              <Button className="rounded-full bg-[#007bff] px-6 text-white hover:bg-[#007bff]/90 transition">
                {t("iot.hero.buy.now")}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" className="rounded-full px-6 transition bg-transparent">
                {t("iot.hero.consultation")}
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden lg:grid gap-12 items-center lg:grid-cols-[1fr_450px]">
          {/* Text */}
          <div className="flex flex-col justify-center space-y-6 lg:pl-4">
            <h1
              className={`lg:text-4xl xl:text-5xl font-bold tracking-tight ${fadeIn(100)}`}
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t("iot.hero.title")}
            </h1>
            <p
              className={`max-w-[550px] lg:text-base xl:text-lg text-gray-600 leading-relaxed ${fadeIn(200)}`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t("iot.hero.description.desktop")}
            </p>
            <div className={`flex gap-5 pt-4 ${fadeIn(300)}`}>
              <Button className="rounded-full bg-[#007bff] px-7 text-white hover:bg-[#007bff]/90 transition">
                {t("iot.hero.buy.now")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="rounded-full px-7 transition bg-transparent">
                {t("iot.hero.consultation")}
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className={`relative w-full max-w-[420px] mx-auto ${fadeIn(400)}`}>
            <Image
              src="/img/navbar-logo/IOT.jpg"
              alt="Ilustrasi Mersif IoT"
              width={420}
              height={320}
              priority
              className="object-cover w-full rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
