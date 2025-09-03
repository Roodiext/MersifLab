"use client"

import { Gamepad2, Cable as Cube, Lightbulb, Users } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function AboutSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Gamepad2,
      title: t("creator.about.features.immersive.title"),
      description: t("creator.about.features.immersive.desc"),
    },
    {
      icon: Cube,
      title: t("creator.about.features.virtual.title"),
      description: t("creator.about.features.virtual.desc"),
    },
    {
      icon: Users,
      title: t("creator.about.features.collaboration.title"),
      description: t("creator.about.features.collaboration.desc"),
    },
    {
      icon: Lightbulb,
      title: t("creator.about.features.creativity.title"),
      description: t("creator.about.features.creativity.desc"),
    },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/40">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>
              {t("creator.about.title")} <span className="text-blue-600">{t("creator.about.title.highlight")}</span>
            </h2>
            <p
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t("creator.about.description")}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              >
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div
                  className="text-4xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  5000+
                </div>
                <div className="text-gray-600 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  {t("creator.about.stats.rooms")}
                </div>
              </div>
              <div className="group">
                <div
                  className="text-4xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  15+
                </div>
                <div className="text-gray-600 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  {t("creator.about.stats.types")}
                </div>
              </div>
              <div className="group">
                <div
                  className="text-4xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  98%
                </div>
                <div className="text-gray-600 font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                  {t("creator.about.stats.satisfaction")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
