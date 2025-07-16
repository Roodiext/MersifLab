"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Budi Santoso",
      title: "Kepala Sekolah SMA Harapan Bangsa",
      stars: 5,
      description: "MersifLab telah merevolusi cara siswa kami belajar sains. Pengalaman VR sangat imersif dan mudah digunakan!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Siti Aminah",
      title: "Guru Fisika",
      stars: 5,
      description: "Dengan Mersif Creator, saya bisa membuat simulasi fisika interaktif dalam hitungan menit. Sangat membantu!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Andi Wijaya",
      title: "Mahasiswa Teknik",
      stars: 5,
      description: "Aplikasi seluler MersifLab membuat belajar di mana saja menjadi mungkin. Konten AR-nya luar biasa.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Dr. Lia Kusuma",
      title: "Dosen Universitas Teknologi",
      stars: 5,
      description: "Inovasi MersifLab dalam AR/VR membuka dimensi baru dalam pengajaran. Mahasiswa kami sangat antusias!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Rina Dewi",
      title: "Orang Tua Murid",
      stars: 5,
      description: "Anak saya jadi lebih semangat belajar sejak menggunakan produk MersifLab. Konsep sulit jadi mudah dipahami.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Maya Sari",
      title: "Direktur Sekolah Internasional",
      stars: 5,
      description: "MersifLab mengubah paradigma pembelajaran di sekolah kami. Students love the immersive experience!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Fajar Nugraha",
      title: "Guru Kimia SMA",
      stars: 4,
      description: "Eksperimen kimia virtual sangat membantu siswa memahami reaksi tanpa risiko. Brilliant innovation!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Ravi Patel",
      title: "International Student",
      stars: 5,
      description: "MersifLab breaks language barriers in learning. The visual learning approach is absolutely amazing!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Indira Safitri",
      title: "Guru Biologi",
      stars: 5,
      description: "Menjelajahi sel dan organ dalam VR memberikan pengalaman belajar yang tak terlupakan bagi siswa.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Sarah Johnson",
      title: "English Teacher",
      stars: 5,
      description: "The AR storytelling feature makes English learning so engaging. My students are more motivated than ever!",
      avatar: "/placeholder.svg?height=50&width=50",
    }
  ]

  // Enhanced animation variants for individual scroll-triggered animations
  const zigzagVariants = {
    leftEntry: {
      hidden: { 
        opacity: 0, 
        x: -150, 
        y: 40,
        scale: 0.7,
        rotate: -8
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 120,
          duration: 1,
        },
      },
    },
    rightEntry: {
      hidden: { 
        opacity: 0, 
        x: 150, 
        y: -40,
        scale: 0.7,
        rotate: 8
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 120,
          duration: 1,
        },
      },
    },
  }

  // Function to determine animation variant based on position (2 columns)
  const getAnimationVariant = (index: number) => {
    return index % 2 === 0 ? zigzagVariants.leftEntry : zigzagVariants.rightEntry
  }

  return (
    <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container px-4 md:px-6 text-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
       <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-black">
          Testimoni
        </h2>
          <p className="max-w-[700px] mx-auto text-slate-700 text-2xl font-semibold mt-4">
            Lihat apa kata mereka tentang MersifLab
          </p>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={getAnimationVariant(index)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="w-full"
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl group">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content */}
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-14 w-14 ring-2 ring-gradient-to-r from-blue-400 to-purple-400">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-semibold">
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="text-xl font-bold text-slate-800">{testimonial.name}</div>
                      <div className="text-sm text-slate-500 font-medium">{testimonial.title}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 transition-all duration-300 ${
                          i < testimonial.stars 
                            ? "fill-yellow-400 text-yellow-400 scale-110" 
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-lg text-slate-700 leading-relaxed font-medium">
                    "{testimonial.description}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-xl text-slate-600 font-semibold">
            Bergabunglah dengan ribuan educator yang telah merasakan revolusi pembelajaran!
          </p>
        </motion.div>
      </div>
    </section>
  )
}