import React from "react";

export default function NewsHomepage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }} className="min-h-screen bg-gray-50">
      {/* Hero Section - Lebih Compact */}
      <section className="relative bg-slate-800 text-white py-12">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-white">
            Berita & Artikel
          </h1>
          <p className="text-lg mb-6 text-slate-200">
            Temukan berita terbaru dan artikel menarik dari Mersif Lab
          </p>
          <button className="px-6 py-3 bg-white text-slate-800 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Jelajahi Artikel
          </button>
        </div>
      </section>

      {/* Featured News - Compact */}
      <section className="py-8 -mt-6 relative z-10">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-3">
                  BERITA UTAMA
                </span>
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                  Revolusi Digital Indonesia 2024
                </h2>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Transformasi digital yang mengubah lanskap bisnis dan teknologi
                  di Indonesia. Pelajari bagaimana perusahaan-perusahaan lokal
                  beradaptasi dengan era baru ini.
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">ML</span>
                    </div>
                    <span className="text-gray-600 text-xs">Mersif Lab</span>
                  </div>
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-gray-500 text-xs">15 Juli 2024</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group"
                >
                  Baca Selengkapnya{" "}
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </a>
              </div>
              <div>
                <div className="h-48 bg-blue-600 rounded-lg shadow-md flex items-center justify-center">
                  <div className="text-white text-4xl opacity-30">📰</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid - Lebih Banyak Artikel, Ukuran Lebih Kecil */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">
              Artikel Terbaru
            </h2>
            <p className="text-gray-600 text-sm">
              Jelajahi koleksi artikel dan berita terkini dari berbagai kategori
            </p>
          </div>

          {/* Grid Artikel - 4 kolom untuk desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Inovasi Terbaru dalam Dunia Tech",
                category: "TEKNOLOGI",
                icon: "💡",
                bgColor: "bg-gray-600",
                date: "12 Juli",
              },
              {
                title: "Strategi Bisnis Digital 2024",
                category: "BISNIS",
                icon: "📈",
                bgColor: "bg-green-600",
                date: "10 Juli",
              },
              {
                title: "Cara Memulai dengan Next.js",
                category: "TUTORIAL",
                icon: "🎯",
                bgColor: "bg-indigo-600",
                date: "8 Juli",
              },
              {
                title: "Ekosistem Startup Indonesia",
                category: "STARTUP",
                icon: "🚀",
                bgColor: "bg-orange-500",
                date: "5 Juli",
              },
              {
                title: "Masa Depan Artificial Intelligence",
                category: "AI & ML",
                icon: "🤖",
                bgColor: "bg-blue-600",
                date: "3 Juli",
              },
              {
                title: "Cybersecurity di Era Digital",
                category: "KEAMANAN",
                icon: "🔐",
                bgColor: "bg-gray-700",
                date: "1 Juli",
              },
              {
                title: "Cloud Computing untuk Bisnis",
                category: "CLOUD",
                icon: "☁️",
                bgColor: "bg-purple-600",
                date: "29 Juni",
              },
              {
                title: "Mobile Development Trends",
                category: "MOBILE",
                icon: "📱",
                bgColor: "bg-pink-600",
                date: "27 Juni",
              },
              {
                title: "Data Science Best Practices",
                category: "DATA",
                icon: "📊",
                bgColor: "bg-teal-600",
                date: "25 Juni",
              },
              {
                title: "DevOps Implementation Guide",
                category: "DEVOPS",
                icon: "⚙️",
                bgColor: "bg-red-600",
                date: "23 Juni",
              },
              {
                title: "UX/UI Design Principles",
                category: "DESIGN",
                icon: "🎨",
                bgColor: "bg-amber-600",
                date: "21 Juni",
              },
              {
                title: "Blockchain dalam Fintech",
                category: "BLOCKCHAIN",
                icon: "🔗",
                bgColor: "bg-emerald-600",
                date: "19 Juni",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 border border-gray-100"
              >
                <div className={`h-32 ${item.bgColor} relative`}>
                  <div className="absolute top-2 right-2 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">{item.icon}</span>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-black bg-opacity-20 text-white text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-xs leading-relaxed line-clamp-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.date}</span>
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold text-xs">
                      Baca →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 text-sm">
              Muat Lebih Banyak Artikel
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">Kategori Populer</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {["Teknologi", "Bisnis", "Tutorial", "AI & ML", "Startup", "Design", "Mobile", "Cloud"].map((category, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-xs font-medium transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}