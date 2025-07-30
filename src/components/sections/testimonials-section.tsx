"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Elnoah Agustinus Markus Manalu",
    role: "Siswa SMK Negeri 6 Surakarta",
    initials: "EL",
    text: "Mersif sangat membantu dalam mengelola pembelajaran digital. Platformnya mudah digunakan dan sangat responsif terhadap kebutuhan kami.",
  },
  {
    name: "Febrian Bayu Purwanto",
    role: "Siswa SMK Negeri 2 Surakarta",
    initials: "FB",
    text: "Kolaborasi dengan Mersif telah meningkatkan efektivitas pelatihan guru dan siswa. Materi yang disediakan lengkap dan aplikatif.",
  },
  {
    name: "Abdullah Rudi Athaya",
    role: "Siswa SMA Negeri 4 Surakarta",
    initials: "AR",
    text: "Saya sangat terbantu dengan Mersif dalam mengembangkan kemampuan saya dalam bidang teknologi.",
  },
  {
    name: "Narendra Fatin Fahrezi",
    role: "Siswa SMA Pradita Dirgantara",
    initials: "NF",
    text: "Saya sangat terbantu dengan Mersif dalam mengembangkan kemampuan saya dalam bidang teknologi.",
  },
]

// Duplikat 2x agar bisa scroll 50%
const scrollingTestimonials = [...testimonials, ...testimonials]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-2xl md:text-4xl font-bold text-gray-900 text-center mb-3 md:mb-4">
          Apa Kata Mereka
        </h2>
        <p style={{ fontFamily: "Inter, sans-serif" }}  className="text-center text-gray-500 mb-8 md:mb-12 text-sm md:text-base">
          Pendapat para pengguna tentang layanan dan dukungan dari Mersif.
        </p>

        <div className="relative w-full overflow-hidden">
          {/* Gradient overlay kiri-kanan */}
          <div className="absolute left-0 top-0 w-6 md:w-20 h-full bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-6 md:w-20 h-full bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

          {/* Kontainer scroll otomatis */}
          <div className="animate-scroll flex gap-4 md:gap-6 w-max">
            {scrollingTestimonials.map((t, idx) => (
              <div
                key={idx}
                className="w-[240px] md:w-[350px] border rounded-xl p-3 md:p-6 shadow-md bg-white hover:shadow-lg transition-all duration-300 flex-shrink-0"
              >
                <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold shadow-sm border text-xs md:text-base">
                    {t.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 style={{ fontFamily: "Poppins, sans-serif" }} className="text-xs md:text-base font-semibold text-gray-900 leading-tight break-words">
                      {t.name}
                    </h4>
                    <p style={{ fontFamily: "Inter, sans-serif" }} className="text-xs md:text-sm text-gray-500 break-words">{t.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2 md:mb-3 text-yellow-500">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={10}
                        className="md:w-[14px] md:h-[14px]"
                        fill="currentColor"
                      />
                    ))}
                </div>

                <div className="h-[80px] md:h-[90px] overflow-hidden">
                  <p style={{ fontFamily: "Inter, sans-serif" }} className="text-xs md:text-sm text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-2 md:pl-4 break-words">
                    "{t.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animasi scroll CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll {
          animation: scroll 25s linear infinite;
          will-change: transform;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 20s;
          }
        }
      `}} />
    </section>
  )
}
