"use client"

import { useState, useEffect } from "react"

export function TestimonialFAQ() {
  const testimonials = [
    { id: 1, name: "Andi", text: "Mersif IoT membantu bisnis saya jadi lebih efisien!" },
    { id: 2, name: "Siti", text: "Produk berkualitas dan support yang responsif." }
  ]

  const faqs = [
    { q: "Apakah Mersif IoT bisa diintegrasikan dengan sistem saya?", a: "Ya, bisa disesuaikan sesuai kebutuhan." },
    { q: "Apakah tersedia garansi?", a: "Ya, garansi produk 1 tahun." },
    { q: "Berapa lama proses instalasi?", a: "Rata-rata 2–3 hari kerja tergantung kompleksitas." }
  ]

  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-6 sm:px-10 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-10">Testimoni & FAQ</h2>

        {/* Testimoni */}
        <div className="grid gap-8 sm:grid-cols-2 mb-12">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className={`p-6 border rounded-lg bg-white shadow transition-all duration-700 ease-out
                ${visible ? "opacity-100 translate-x-0" 
                          : index % 2 === 0 
                          ? "-translate-x-8 opacity-0" 
                          : "translate-x-8 opacity-0"}`}
              style={{ transitionDelay: `${index * 250}ms` }}
            >
              <p className="text-gray-600 italic">"{t.text}"</p>
              <p className="mt-3 font-semibold">- {t.name}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className={`border rounded-lg bg-white shadow-sm transition-all duration-700 ease-out
                ${visible ? "opacity-100 translate-y-0" : "translate-y-6 opacity-0"}`}
              style={{ transitionDelay: `${(testimonials.length + i) * 250}ms` }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-5 py-4 font-semibold flex justify-between items-center hover:bg-gray-100 transition"
              >
                {f.q}
                <span className="text-xl">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-gray-600">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
