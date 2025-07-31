"use client"
import { useEffect, useRef, useState } from "react"
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
      className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl font-bold tracking-tight"
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
  icon: string
  color: string
}

export function MersifNumbersSection() {
  const metrics: MetricItem[] = [
    {
      end: 15000,
      suffix: "+",
      label: "Siswa Tercapai",
      icon: "/img/mersif-number-img/student-graduate.svg",
      color: "text-teal-600"
    },
    {
      end: 200,
      suffix: "+",
      label: "Guru Terlatih",
      icon: "/img/mersif-number-img/teacher-class.svg",
      color: "text-blue-600"
    },
    {
      end: 30,
      suffix: "+",
      label: "Mitra Institusional",
      icon: "/img/mersif-number-img/school-icon.svg",
      color: "text-orange-500"
    },
    {
      end: 3,
      label: "Negara",
      icon: "/img/mersif-number-img/earth-icon.svg",
      color: "text-red-500"
    },
  ]

  return (
    <section
      className="w-full py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 3xl:py-40 relative overflow-hidden"
      style={{
        backgroundImage: `url('/img/nkri.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* White overlay untuk readability */}
      <div className="absolute inset-0 bg-white/50"></div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 3xl:px-20 relative z-10 max-w-[1920px]">
        
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 xl:mb-20 2xl:mb-24">
          <h2
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl font-bold text-gray-800 mb-3 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-7 2xl:mb-8"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            OUR IMPACT IN NUMBERS
          </h2>
          <p
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl text-gray-600 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto leading-relaxed px-2 sm:px-0"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Dampak nyata kami dalam memajukan pendidikan di Indonesia dan sekitarnya melalui pelatihan, kolaborasi, dan inovasi digital.
          </p>
        </div>

        {/* Stats Grid - Fully Responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-8 xl:gap-12 2xl:gap-16 3xl:gap-20 max-w-sm xs:max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1800px] mx-auto">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-3 sm:mb-4 md:mb-5 lg:mb-4 xl:mb-5 2xl:mb-6 3xl:mb-8">
                <img
                  src={metric.icon}
                  alt={metric.label}
                  className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 3xl:w-28 3xl:h-28 object-contain transition-transform hover:scale-110"
                />
              </div>

              {/* Number */}
              <div className={`${metric.color} mb-2 sm:mb-3 md:mb-4 lg:mb-3 xl:mb-4 2xl:mb-5 3xl:mb-6`} style={{ fontFamily: "Poppins, sans-serif" }}>
                <NumberCounter
                  end={metric.end}
                  duration={2000}
                  suffix={metric.suffix}
                  prefix={metric.prefix} 
                />
              </div>

              {/* Label */}
              <p
                className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl font-medium text-gray-700 leading-tight px-1 sm:px-2"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20 2xl:mt-24 3xl:mt-28">
          <p
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl text-gray-500 max-w-sm xs:max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl 3xl:max-w-7xl mx-auto leading-relaxed px-2 sm:px-4"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Pencapaian ini merupakan hasil kolaborasi berkelanjutan dengan berbagai stakeholder dalam ekosistem pendidikan Indonesia.
          </p>
        </div>
      </div>

      {/* UHD and Ultra-wide optimization styles */}
      <style jsx>{`
        @media (min-width: 1920px) and (min-height: 1080px) {
          .container {
            max-width: 1800px;
          }
        }
        
        @media (min-width: 2560px) {
          .container {
            max-width: 2400px;
          }
        }

        /* Enhanced hover effects for larger screens */
        @media (min-width: 1024px) {
          .text-center:hover img {
            transform: scale(1.1);
          }
        }
      `}</style>
    </section>
  )
}