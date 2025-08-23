import { CuboidIcon as Cube, Palette, Users, Zap, Shield, Gamepad2 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: Cube,
      title: "Ruang Virtual 3D",
      description: "Ciptakan dan jelajahi ruang virtual 3D yang realistis dengan teknologi rendering terdepan.",
    },
    {
      icon: Palette,
      title: "Kustomisasi Bebas",
      description:
        "Personalisasi ruang virtual Anda dengan berbagai bentuk, warna, dan elemen interaktif sesuai kebutuhan.",
    },
    {
      icon: Users,
      title: "Kolaborasi Real-time",
      description: "Bekerja sama dengan pengguna lain dalam ruang virtual yang sama secara bersamaan.",
    },
    {
      icon: Gamepad2,
      title: "Kontrol Intuitif",
      description: "Interface yang mudah dipahami untuk navigasi dan interaksi dalam lingkungan virtual.",
    },
    {
      icon: Shield,
      title: "Lingkungan Aman",
      description: "Ruang virtual yang aman dan terkontrol untuk pembelajaran dan eksplorasi tanpa risiko.",
    },
    {
      icon: Zap,
      title: "Performa Optimal",
      description: "Teknologi optimasi canggih untuk pengalaman virtual yang lancar di berbagai perangkat.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Fitur <span className="text-blue-600">Unggulan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nikmati berbagai fitur canggih Mersif Creator yang dirancang khusus untuk memberikan pengalaman
              pembelajaran virtual yang imersif dan interaktif.
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
