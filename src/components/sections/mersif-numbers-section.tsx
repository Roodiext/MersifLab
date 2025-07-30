"use client"
import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface NumberCounterProps {
  end: number
  duration: number
  suffix?: string
  prefix?: string
}

const NumberCounter = ({ end, duration, suffix = "", prefix = "" }: NumberCounterProps) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let startTimestamp: DOMHighResTimeStamp | null = null
          const step = (timestamp: DOMHighResTimeStamp) => {
            if (!startTimestamp) startTimestamp = timestamp
            const progress = Math.min((timestamp - startTimestamp) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
              window.requestAnimationFrame(step)
            }
          }
          window.requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [end, duration])

  return (
    <div
      ref={ref}
      className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight"
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

interface MetricItem {
  end: number
  label: string
  suffix?: string
  prefix?: string
}

export function MersifNumbersSection() {
  const metrics: MetricItem[] = [
    { end: 15000, suffix: "+", label: "Siswa Tercapai" },
    { end: 200, suffix: "+", label: "Guru Terlatih" },
    { end: 30, suffix: "+", label: "Mitra Institusional" },
    { end: 3, label: "Negara" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 14, stiffness: 120 },
    },
  }

  return (
    <section className="w-full py-20 lg:py-32 bg-white     ">
      <div className="container px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* Kiri - Judul dan Deskripsi */}
          <div className="text-left">
            <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-4xl sm:text-5xl font-extrabold tracking-tight text-black leading-tight">
              Mersif Dalam Angka
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif" }} className="mt-6 text-lg text-black max-w-xl">
              Dampak nyata kami dalam memajukan pendidikan di Indonesia dan sekitarnya melalui pelatihan,
              kolaborasi, dan inovasi digital.
            </p>
          </div>

          {/* Kanan - Card Counter */}
          <Card className="p-8 sm:p-10 bg-white shadow-xl border border-gray-200 rounded-3xl">
            <motion.div
              className="grid grid-cols-2 gap-6 sm:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  style={{ fontFamily: "Poppins, sans-serif" }}
                  className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <NumberCounter
                    end={metric.end}
                    duration={2000}
                    suffix={metric.suffix}
                    prefix={metric.prefix}
                  />
                  <p style={{ fontFamily: "Inter, sans-serif" }} className="text-sm font-medium text-black mt-1">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </Card>
        </div>
      </div>
    </section>
  )
}
