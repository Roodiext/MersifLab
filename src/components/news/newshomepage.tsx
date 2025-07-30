import React from "react";

export function NewsHomepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-slate-800 text-white py-24">
        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 style={{ fontFamily: "Poppins, sans-serif" }} className="text-5xl md:text-7xl font-bold mb-6 text-white">
            Berita & Artikel
          </h1>
          <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-xl md:text-2xl mb-8 text-slate-200 leading-relaxed">
            Temukan berita terbaru dan artikel menarik dari Mersif Lab
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button style={{ fontFamily: "Inter, sans-serif" }} className="px-8 py-4 bg-white text-slate-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Jelajahi Artikel
            </button>
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-20 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-4">
                  BERITA UTAMA
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Revolusi Digital Indonesia 2024
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  Transformasi digital yang mengubah lanskap bisnis dan teknologi
                  di Indonesia. Pelajari bagaimana perusahaan-perusahaan lokal
                  beradaptasi dengan era baru ini.
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">ML</span>
                    </div>
                    <span className="text-gray-600 text-sm">Mersif Lab</span>
                  </div>
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-500 text-sm">15 Juli 2024</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg group"
                >
                  Baca Selengkapnya{" "}
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>
              <div>
                <div className="relative">
                  <div className="h-80 bg-blue-600 rounded-xl shadow-md flex items-center justify-center">
                    <div className="text-white text-6xl opacity-30">📰</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-4xl font-bold mb-4 text-gray-900">
              Artikel Terbaru
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Jelajahi koleksi artikel dan berita terkini dari berbagai kategori
            </p>
          </div>

          {/* Grid Artikel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Inovasi Terbaru dalam Dunia Tech",
                category: "TEKNOLOGI",
                icon: "💡",
                bgColor: "bg-gray-600",
                date: "12 Juli 2024",
                textColor: "text-blue-600",
              },
              {
                title: "Strategi Bisnis Digital 2024",
                category: "BISNIS",
                icon: "📈",
                bgColor: "bg-green-600",
                date: "10 Juli 2024",
                textColor: "text-green-600",
              },
              {
                title: "Cara Memulai dengan Next.js",
                category: "TUTORIAL",
                icon: "🎯",
                bgColor: "bg-indigo-600",
                date: "8 Juli 2024",
                textColor: "text-indigo-600",
              },
              {
                title: "Ekosistem Startup Indonesia",
                category: "STARTUP",
                icon: "🚀",
                bgColor: "bg-orange-500",
                date: "5 Juli 2024",
                textColor: "text-orange-600",
              },
              {
                title: "Masa Depan Artificial Intelligence",
                category: "AI & ML",
                icon: "🤖",
                bgColor: "bg-blue-600",
                date: "3 Juli 2024",
                textColor: "text-blue-600",
              },
              {
                title: "Cybersecurity di Era Digital",
                category: "KEAMANAN",
                icon: "🔐",
                bgColor: "bg-gray-700",
                date: "1 Juli 2024",
                textColor: "text-gray-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-200"
              >
                <div className={`h-56 ${item.bgColor} relative`}>
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">{item.icon}</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black bg-opacity-20 text-white text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.date}</span>
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                      Baca Selengkapnya →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Lihat Semua Artikel */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200">
              Lihat Semua Artikel
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}