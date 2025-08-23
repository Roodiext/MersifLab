import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import { LanguageProvider } from "@/contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MersifLab - Creator Room",
  description: "Platform inovasi digital untuk masa depan teknologi Indonesia",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
      <div className={inter.className}>
        {children}
      </div>
    </LanguageProvider>
  )
}