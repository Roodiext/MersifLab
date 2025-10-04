import { use } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { NewsDetail } from "@/components/news/newsdetail"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Berita & Artikel - Mersif Lab",
  description: "Temukan berita terbaru dan artikel menarik dari Mersif Lab",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <>
      <Header />
      <NewsDetail newsId={parseInt(id)} />
      <Footer />
    </>
  )
}