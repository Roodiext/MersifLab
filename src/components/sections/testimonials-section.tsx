"use client"

import { Star } from "lucide-react"
import { useEffect, useState } from "react"

interface Testimonial {
  id: number
  name: string
  role: string
  initials: string
  text: string
  imageUrl: string | null
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/testimonials")
      if (response.ok) {
        const data = await response.json()
        if (data.testimonials && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials)
        }
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
            Apa Kata Mereka
          </h2>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </section>
    )
  }

  return (
    <section id="testimonials" className="py-20  relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="text-center mb-14">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Apa Kata Mereka
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Pendapat para pengguna tentang layanan dan dukungan dari Mersif.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="relative overflow-hidden">
            {/* Fade kiri */}
            <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
            {/* Fade kanan */}
            <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

            <div className="flex animate-scroll space-x-8 pb-4">
              {testimonials.concat(testimonials).map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-80 bg-white rounded-lg p-6 shadow-md"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                      {testimonial.imageUrl ? (
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        testimonial.initials
                      )}
                    </div>
                    <div>
                      <h6
                        style={{ fontFamily: "Poppins, sans-serif" }}
                        className="font-semibold text-gray-900"
                      >
                        {testimonial.name}
                      </h6>
                      <p
                        style={{ fontFamily: "Poppins, sans-serif" }}
                        className="text-sm text-gray-600"
                      >
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p
                    style={{ fontFamily: "Inter, sans-serif" }}
                    className="text-gray-700"
                  >
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Belum ada testimonial yang tersedia.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
