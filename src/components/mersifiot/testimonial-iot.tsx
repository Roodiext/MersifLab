"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export function TestimonialFAQ() {
  const { t } = useLanguage()

  const testimonials = [
    { id: 1, name: "Andi", text: t("iot.testimonials.andi") },
    { id: 2, name: "Siti", text: t("iot.testimonials.siti") },
  ]

  const faqs = [
    { q: t("iot.faq.integration.q"), a: t("iot.faq.integration.a") },
    { q: t("iot.faq.warranty.q"), a: t("iot.faq.warranty.a") },
    { q: t("iot.faq.installation.q"), a: t("iot.faq.installation.a") },
  ]

  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="testimonials" className="w-full py-16">
      <div className="container mx-auto px-6 sm:px-10 lg:px-20">
        <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-3xl font-bold text-center mb-10">
          {t("iot.testimonials.title")}
        </h2>

        {/* Testimoni */}
        <div className="grid gap-8 sm:grid-cols-2 mb-12">
          {testimonials.map((t, index) => (
            <div
              key={t.id}
              className={`p-6 border rounded-lg bg-white shadow transition-all duration-700 ease-out
                ${
                  visible
                    ? "opacity-100 translate-x-0"
                    : index % 2 === 0
                      ? "-translate-x-8 opacity-0"
                      : "translate-x-8 opacity-0"
                }`}
              style={{ transitionDelay: `${index * 250}ms` }}
            >
              <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-600 italic">
                "{t.text}"
              </p>
              <p style={{ fontFamily: "Inter, sans-serif" }} className="mt-3 font-semibold">
                - {t.name}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ fontFamily: "Inter, sans-serif" }} className="space-y-4">
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
              {openFaq === i && <div className="px-5 pb-4 text-gray-600">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
