// components/Footer.tsx

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full bg-[#007bff] text-white">
      <div className="container mx-auto px-6 py-16 md:py-20 lg:py-24 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Kiri: Logo dan Deskripsi */}
          <div className="space-y-6">
            <Image
              src="/img/logomersiflab.png"
              alt="MersifLab Logo"
              width={160}
              height={50}
              className="h-auto w-auto object-contain"
            />
            <p className="text-xl font-semibold text-white">Kolaboratif & Imersif</p>
            <p className="text-base text-gray-200 leading-relaxed max-w-md">
              MersifLab berdedikasi untuk mendorong pengalaman kolaboratif dan imersif melalui solusi teknologi
              inovatif.
            </p>
          </div>

          {/* Kanan: Kontak */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Hubungi Kami</h3>
            <div className="space-y-4 text-base">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-white mt-1" />
                <p className="text-white leading-snug">
                  Kentingan Jl. Ir. Sutami,<br className="md:hidden" />
                  Surakarta, Indonesia
                </p>
              </div>
              <Link
                href="mailto:mersiflab@gmail.com"
                className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors"
              >
                <Mail className="h-5 w-5 text-white" />
                mersiflab@gmail.com
              </Link>
              <Link
                href="tel:+6282226841762"
                className="flex items-center gap-4 text-white hover:text-blue-200 transition-colors"
              >
                <Phone className="h-5 w-5 text-white" />
                +62 822-2684-1762
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Bawah */}
      <div className="w-full bg-[#006be0] py-6 text-center text-sm md:text-base text-gray-200">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-lg font-bold text-gray-300">N</div> {/* Ganti ini jika ada logo sebenarnya */}
          <p>&copy; {new Date().getFullYear()} Semua hak dilindungi, MersifLab</p>
        </div>
      </div>
    </footer>
  )
}
