"use client"

export function AboutUsSection() {
  return (
    <section id="about" className="w-full py-20 md:py-28 lg:py-32 relative overflow-hidden bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Kolom kiri - Gambar dengan background organic shape yang disempurnakan */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <svg viewBox="0 0 400 300" className="w-full h-auto" style={{ maxWidth: "400px" }}>
                <defs>
                  <clipPath id="organicShape">
                    {/* Path yang lebih halus dan dinamis */}
                    <path d="M120 40 C220 10, 340 80, 360 160 C380 240, 280 280, 180 270 C80 260, 40 190, 60 110 C80 60, 120 40, 120 40 Z" />
                  </clipPath>
                </defs>

                {/* Background biru dengan gradien yang lebih kaya */}
                <path
                  d="M120 40 C220 10, 340 80, 360 160 C380 240, 280 280, 180 270 C80 260, 40 190, 60 110 C80 60, 120 40, 120 40 Z"
                  fill="url(#blueGradient)"
                  className="drop-shadow-xl"
                />

                {/* Gradien yang disempurnakan */}
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4299E1" /> {/* Light blue */}
                    <stop offset="50%" stopColor="#3182CE" /> {/* Medium blue */}
                    <stop offset="100%" stopColor="#2B6CB0" /> {/* Darker blue */}
                  </linearGradient>
                </defs>

                {/* Gambar diposisikan dengan lebih baik di dalam shape */}
                <image
                  href="/img/siswaFoto.jpg"
                  x="90"
                  y="50"
                  width="220"
                  height="180"
                  clipPath="url(#organicShape)"
                  preserveAspectRatio="xMidYMid slice"
                />
              </svg>
            </div>
          </div>

          {/* Kolom kanan - Konten */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Small tag */}
            <div className="inline-block">
              <span className="text-xs font-bold text-blue-600 bg-blue-100 px-4 py-2 rounded-full uppercase tracking-wider">
                TENTANG KAMI
              </span>
            </div>

            {/* Judul besar */}
            <div className="space-y-2">
              <h2
                className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
               Kami menyediakan ruang virtual
              </h2>
            </div>

            {/* Deskripsi */}
            <div className="space-y-4">
              <p className="text-gray-600 text-base leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                MersifLab merevolusi pengalaman
                    belajar yang didukung oleh teknologi
                    Augmented Reality, Virtual Reality, dan
                    Internet of Things. Misi kami adalah untuk
                    meningkatkan kualitas pendidikan di
                    Indonesia dengan membuat
                    pembelajaran yang imersif dan interaktif
                    yang dapat diakses oleh semua orang.
              </p>
            </div>

            {/* Business Goals label */}
            <div className="pt-2">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">BUSINESS GOALS</span>
              <p className="text-xs text-gray-500 mt-1">Komitmen Utama di Teknologi SDG's Impact</p>
            </div>

            {/* Icon boxes dalam satu baris */}
            <div className="flex gap-3 pt-2">
              <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg">📚</span>
              </div>
              <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg">📊</span>
              </div>
              <div className="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg">👥</span>
              </div>
              <div className="bg-pink-500 w-12 h-12 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-lg">🎯</span>
              </div>
            </div>

            {/* Button kuning */}
            <div className="pt-4">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-full text-sm transition-all duration-300 shadow-md hover:shadow-lg">
                Selengkapnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
