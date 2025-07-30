import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { NewsHomepage } from "@/components/news/newshomepage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Berita & Artikel - Mersif Lab",
  description: "Temukan berita terbaru dan artikel menarik dari Mersif Lab",
}

export default function NewsPage() {
  return (
    <>
      <Header />
      <NewsHomepage />
      <Footer />
    </>
  )
}