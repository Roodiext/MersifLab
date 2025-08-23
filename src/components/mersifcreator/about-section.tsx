import { Gamepad2, CuboidIcon as Cube, Lightbulb, Users } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: Gamepad2,
      title: "Teknologi Immersive",
      description:
        "Menghadirkan pengalaman pembelajaran yang mendalam melalui teknologi VR dan AR yang canggih dan interaktif.",
    },
    {
      icon: Cube,
      title: "Ruang Virtual Beragam",
      description:
        "Menyediakan berbagai jenis ruang virtual seperti Cube, Custom Shape, dan Lab Kimia untuk eksplorasi tanpa batas.",
    },
    {
      icon: Users,
      title: "Kolaborasi Real-time",
      description:
        "Memungkinkan pembelajaran kolaboratif dengan sesama pengguna dalam lingkungan virtual yang aman dan terkontrol.",
    },
    {
      icon: Lightbulb,
      title: "Kreativitas Tanpa Batas",
      description:
        "Platform yang membebaskan kreativitas untuk menciptakan, bereksperimen, dan belajar dengan cara yang menyenangkan.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/40">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Tentang <span className="text-blue-600">Mersif Creator</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Mersif Creator adalah platform revolusioner yang menghadirkan ruang virtual interaktif untuk pembelajaran
              dan eksplorasi. Dengan teknologi VR dan AR terdepan, kami menciptakan pengalaman edukatif yang imersif dan
              menyenangkan.
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
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-4xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                  5000+
                </div>
                <div className="text-gray-600 font-medium">Ruang Virtual Dibuat</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                  15+
                </div>
                <div className="text-gray-600 font-medium">Jenis Ruang Tersedia</div>
              </div>
              <div className="group">
                <div className="text-4xl font-bold text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300">
                  98%
                </div>
                <div className="text-gray-600 font-medium">Kepuasan Pengguna</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
