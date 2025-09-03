"use client"

import { Star, Quote } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    {
      name: t("creator.testimonials.sarah.name"),
      role: t("creator.testimonials.sarah.role"),
      content: t("creator.testimonials.sarah.content"),
      rating: 5,
      avatar: "/img/professional-woman-diverse.svg",
    },
    {
      name: t("creator.testimonials.ahmad.name"),
      role: t("creator.testimonials.ahmad.role"),
      content: t("creator.testimonials.ahmad.content"),
      rating: 5,
      avatar: "/img/male-teacher.svg",
    },
    {
      name: t("creator.testimonials.maya.name"),
      role: t("creator.testimonials.maya.role"),
      content: t("creator.testimonials.maya.content"),
      rating: 5,
      avatar: "/img/female-developer.svg",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              {t("creator.testimonials.title")}{" "}
              <span className="text-blue-600">{t("creator.testimonials.title.highlight")}</span>
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t("creator.testimonials.description")}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="relative mb-6">
                  <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                  <p className="text-gray-700 leading-relaxed pl-6" style={{ fontFamily: "Inter, sans-serif" }}>
                    {testimonial.content}
                  </p>
                </div>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-blue-100"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
