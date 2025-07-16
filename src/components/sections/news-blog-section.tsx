// Salin kode ini ke: src/components/sections/news-blog-section.tsx
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function NewsBlogSection() {
  const newsPosts = [
    {
      title: "MersifLab Luncurkan Mersif Room 2.0 dengan Fitur AI",
      date: "10 Juli 2024",
      image: "/placeholder.svg?height=150&width=250",
      snippet:
        "Versi terbaru Mersif Room kini dilengkapi dengan asisten AI untuk pengalaman belajar yang lebih personal.",
      category: "Update",
      link: "/blog/mersif-room-2-0",
    },
    {
      title: "Kolaborasi MersifLab dan Kementerian Pendidikan",
      date: "5 Juni 2024",
      image: "/placeholder.svg?height=150&width=250",
      snippet:
        "MersifLab menjalin kemitraan strategis untuk mengimplementasikan teknologi AR/VR di sekolah-sekolah pilot.",
      category: "Partnership",
      link: "/blog/kolaborasi-kemendikbud",
    },
    {
      title: "MersifLab Hadir di EduTech Expo 2024",
      date: "20 Mei 2024",
      image: "/placeholder.svg?height=150&width=250",
      snippet: "Kunjungi booth kami di EduTech Expo untuk mencoba langsung demo produk-produk terbaru MersifLab.",
      category: "Event",
      link: "/blog/edutech-expo-2024",
    },
  ]

  return (
    <section id="news" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Berita & Artikel Terbaru</h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
          Ikuti perkembangan terbaru, inovasi, dan cerita inspiratif dari MersifLab.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsPosts.map((post, index) => (
            <Card key={index} className="flex flex-col">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={250}
                height={150}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <CardTitle className="text-xl text-left">{post.title}</CardTitle>
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <CardDescription className="text-left text-sm">{post.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <p className="text-muted-foreground text-left mb-4">{post.snippet}</p>
                <Button variant="link" asChild className="self-start p-0 h-auto">
                  <Link href={post.link}>Read more</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <Button variant="outline" asChild>
            <Link href="/blog">View All News</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
