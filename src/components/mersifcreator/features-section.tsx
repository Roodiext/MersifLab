"use client"

import { Cable as Cube, Palette, Users, Zap, Shield, Gamepad2 } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function FeaturesSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Cube,
      title: t("creator.features.virtual3d.title"),
      description: t("creator.features.virtual3d.desc"),
    },
    {
      icon: Palette,
      title: t("creator.features.customization.title"),
      description: t("creator.features.customization.desc"),
    },
    {
      icon: Users,
      title: t("creator.features.realtime.title"),
      description: t("creator.features.realtime.desc"),
    },
    {
      icon: Gamepad2,
      title: t("creator.features.intuitive.title"),
      description: t("creator.features.intuitive.desc"),
    },
    {
      icon: Shield,
      title: t("creator.features.safe.title"),
      description: t("creator.features.safe.desc"),
    },
    {
      icon: Zap,
      title: t("creator.features.performance.title"),
      description: t("creator.features.performance.desc"),
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Poppins, sans-serif" }}>
              {t("creator.features.title")}{" "}
              <span className="text-blue-600">{t("creator.features.title.highlight")}</span>
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {t("creator.features.description")}
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3
                    className="text-xl font-semibold text-gray-900 mb-4"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
