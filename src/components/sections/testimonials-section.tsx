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
      console.log("Frontend: Fetching testimonials from API...")
      const response = await fetch('/api/testimonials')
      console.log("Frontend: Response status:", response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log("Frontend: Data received:", data)
        
        if (data.testimonials && Array.isArray(data.testimonials)) {
          setTestimonials(data.testimonials)
          console.log("Frontend: Testimonials set:", data.testimonials)
        } else {
          console.log("Frontend: No testimonials in response")
        }
      } else {
        console.error("Frontend: Response not ok:", response.statusText)
      }
    } catch (error) {
      console.error('Frontend: Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Apa Kata Mereka</h2>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Apa Kata Mereka</h2>
          <p className="text-gray-600">
            Pendapat para pengguna tentang layanan dan dukungan dari Mersif.
          </p>
        </div>

        {testimonials.length > 0 ? (
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll space-x-6">
              {/* Original testimonials */}
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
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
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {testimonials.map((testimonial) => (
                <div
                  key={`duplicate-${testimonial.id}`}
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
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
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
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
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
