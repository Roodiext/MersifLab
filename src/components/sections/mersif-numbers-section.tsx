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
      { threshold: 0.5 },
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
    <div ref={ref} className="text-5xl font-extrabold text-blue-600 drop-shadow-md">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

// --- Perubahan di sini: Definisi Antarmuka MetricItem ---
interface MetricItem {
  icon: string
  end: number
  label: string
  suffix?: string // Properti opsional
  prefix?: string // Properti opsional
}
// --- Akhir Perubahan ---

export function MersifNumbersSection() {
  const metrics: MetricItem[] = [
    // Terapkan antarmuka MetricItem ke array metrics
    {
      icon: "🎓",
      end: 15000,
      suffix: "+",
      label: "Students Reached",
    },
    {
      icon: "👩‍🏫",
      end: 200,
      suffix: "+",
      label: "Teachers Trained",
    },
    {
      icon: "🏫",
      end: 30,
      suffix: "+",
      label: "Institutional Partners",
    },
    {
      icon: "🌍",
      end: 3,
      label: "Countries",
      // Tidak perlu menambahkan suffix: "" atau prefix: "" karena sudah opsional
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 10,
        stiffness: 100,
      },
    },
  }

  return (
    <section
      id="numbers"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden"
    >
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{ backgroundImage: `url('/patterns/dots.png')`, backgroundSize: "30px 30px" }}
      ></div>

      <div className="container px-4 md:px-6 text-center relative z-10">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-gray-900">
          Mersif in Numbers
        </h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-12">
          Dampak nyata kami dalam memajukan pendidikan di Indonesia dan sekitarnya.
        </p>
        <Card className="p-6 md:p-10 lg:p-12 bg-white shadow-2xl rounded-3xl max-w-5xl mx-auto border border-blue-200">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center justify-center p-6 text-center bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="text-6xl mb-4 animate-bounce-once">{metric.icon}</div>
                <NumberCounter end={metric.end} duration={2000} suffix={metric.suffix} prefix={metric.prefix} />
                <p className="text-xl font-semibold text-gray-800 mt-2">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </Card>
      </div>
    </section>
  )
}