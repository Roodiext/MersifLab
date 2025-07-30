"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function NewsBlogSection() {
  const newsPosts = [
    {
      title: "Potensi Kerja Sama Berkelanjutan MersifLab dan SMP Negeri 13 Surakarta Pasca Workshop 3D Printing",
      date: "25 Jun, 2025",
      image: "/img/h3.jpg",
      snippet:
        "Surakarta - Kesuksesan workshop 3D printing yang dilaksanakan di SMP Negeri 13 Surakarta dengan melibatkan tim MersifLab sebagai narasumber membuka berbagai peluang untuk pengembangan kerja sama berkelanjutan di bidang teknologi pendidikan.",
      category: "Update",
      link: "/blog/mersif-room-2-0",
    },
    {
      title: "Hari ke-2: MersifLab Menjadi Narasumber Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP Negeri 13 Surakarta",
      date: "24 Jun, 2025",
      image: "/img/h2.jpg",
      snippet:
        "Surakarta - Hari kedua Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP Negeri 13 Surakarta berlangsung dengan fokus pada praktik langsung teknologi 3D printing. Tim MersifLab berperan sebagai pembimbing untuk membantu para guru mempraktikan sendiri teknologi yang telah dipelajari pada hari sebelumnya.",
      category: "Partnership",
      link: "/blog/kolaborasi-kemendikbud",
    },
    {
      title: "Hari ke-1: MersifLab Menjadi Narasumber Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP Negeri 13 Surakarta",
      date: "23 Jun, 2025",
      image: "/img/h1.jpg",
      snippet:
        "Surakarta - Pada hari pertama Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP Negeri 13 Surakarta, tim startup MersifLab hadir sebagai narasumber dengan memberikan pelatihan teknologi 3D printing kepada para guru.Sebagai narasumber yang diundang dalam workshop tersebut, tim MersifLab pada hari pertama memberikan pelatihan komprehensif tentang teknologi 3D printing kepada para guru SMP Negeri 13 Surakarta. Pelatihan ini mencakup pemahaman dasar tentang cara kerja printer 3D, software desain, hingga aplikasi praktis dalam dunia pendidikan.",
      category: "Event",
      link: "/blog/edutech-expo-2024",
    },
  ]

  return (
    <section id="news" className="w-full py-20 lg:py-24 bg-white">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto text-center">
        <div className="space-y-3 mb-10">
          <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 font-poppins">
            Berita & Artikel Terbaru
          </h2>
          <p style={{ fontFamily: "Poppins, sans-serif" }} className="max-w-2xl mx-auto text-slate-600 text-base md:text-lg">
            Ikuti perkembangan terbaru, inovasi, dan cerita inspiratif dari MersifLab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsPosts.map((post, index) => (
            <Card
              key={index}
              className="group border border-slate-200 shadow-sm hover:shadow-md transition duration-300 rounded-2xl overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <CardHeader style={{ fontFamily: "Inter, sans-serif" }} className="p-5 pb-3 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-base font-semibold text-left text-slate-900 leading-snug group-hover:text-blue-600 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-blue-100 text-blue-700 border border-blue-200"
                  >
                    {post.category}
                  </Badge>
                </div>
                <CardDescription className="text-left text-xs text-slate-500">
                  Diupload: {post.date}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-5 pb-5 pt-0">
                <p className="text-slate-600 text-left mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.snippet}
                </p>
                <Button
                  variant="link"
                  asChild
                  className="text-sm text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
                >
                  <Link style={{ fontFamily: "Poppins, sans-serif" }} href={post.link}>Baca selengkapnya →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Button
            variant="outline"
            asChild
            className="px-6 py-3 text-blue-600 border border-blue-300 hover:bg-blue-50 font-medium rounded-xl"
          >
            <Link style={{ fontFamily: "Poppins, sans-serif" }}  href="/blog">Lihat Semua Berita</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
