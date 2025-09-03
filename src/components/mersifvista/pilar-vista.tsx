"use client"

import Image from "next/image"
import type React from "react"
import { useLanguage } from "@/contexts/language-context"

interface Pillar {
  icon: string
  titleKey: string
  descKey: string
}

const OurPillarsVertical: React.FC = () => {
  const { t } = useLanguage()

  const pillars: Pillar[] = [
    {
      icon: "/img/v.svg",
      titleKey: "vista.pillars.visionary.title",
      descKey: "vista.pillars.visionary.desc",
    },
    {
      icon: "/img/i.svg",
      titleKey: "vista.pillars.impactful.title",
      descKey: "vista.pillars.impactful.desc",
    },
    {
      icon: "/img/s.svg",
      titleKey: "vista.pillars.sustainable.title",
      descKey: "vista.pillars.sustainable.desc",
    },
    {
      icon: "/img/t.svg",
      titleKey: "vista.pillars.technopreneurship.title",
      descKey: "vista.pillars.technopreneurship.desc",
    },
    {
      icon: "/img/a.svg",
      titleKey: "vista.pillars.acceleration.title",
      descKey: "vista.pillars.acceleration.desc",
    },
  ]

  return (
    <section id="pillar" className="w-full py-20 bg-white overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <h2
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16"
        >
          {t("vista.pillars.title")}
        </h2>

        <div className="flex flex-col gap-16">
          {pillars.map((pillar, index) => {
            const isLeft = index % 2 === 0 // index genap → kiri, ganjil → kanan
            const textAlign = isLeft ? "text-left" : "text-right"

            return (
              <div
                key={index}
                className={`flex items-start gap-6 md:gap-10 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-20 md:w-24">
                  <Image
                    src={pillar.icon || "/placeholder.svg"}
                    alt={t(pillar.titleKey)}
                    width={100}
                    height={100}
                    className="w-full max-w-[80px] h-auto"
                  />
                </div>

                {/* Teks */}
                <div className={`flex-1 ${textAlign}`}>
                  <h3
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    className="text-xl md:text-2xl font-bold text-gray-800 mb-2"
                  >
                    {t(pillar.titleKey)}
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-600 leading-relaxed">
                    {t(pillar.descKey)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default OurPillarsVertical
