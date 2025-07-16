import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google" // Import Poppins and Inter
import "./globals.css"

// Konfigurasi font Inter
const inter = Inter({
  subsets: ["latin"], 
  variable: "--font-inter", // Definisikan sebagai CSS variable
})

// Konfigurasi font Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"], // Pilih weight yang dibutuhkan, termasuk untuk bold/extrabold
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "MersifLab",
  description: "Platform Laboratorium Virtual Berbasis Mixed Reality Kolaboratif dan Imersif",
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      {/* Tambahkan kelas font ke body */}
      <body className={`${inter.variable} ${poppins.variable}`}>{children}</body>
    </html>
  )
}
