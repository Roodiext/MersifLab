// components/Footer.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, ExternalLink, Instagram, Linkedin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function FooterVista() {
  const [year, setYear] = useState<number | null>(null)
  const { t } = useLanguage()

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="w-full bg-[#1a365d] text-white">
      <div className="container mx-auto px-6 py-16 md:py-20 lg:py-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-16">
          {/* Kiri: Logo dan Deskripsi */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                src="/img/MersifVista.png"
                alt="MersifLab Logo"
                width={120}
                height={50}
                className="h-auto w-auto object-contain"
              />
            </div>
            <div className="space-y-4">
              <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-xl font-semibold text-white">
                Kolaboratif & Imersif
              </h2>
              <p
                style={{ fontFamily: "Inter, sans-serif" }}
                className="text-gray-300 leading-relaxed max-w-lg"
              >
                {t('footer.description')}
              </p>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <h4 style={{ fontFamily: "Poppins, sans-serif" }} className="text-lg font-semibold text-white">
                {t('footer.follow.us')}
              </h4>
              <div className="flex space-x-3">
                <a
                  href="https://www.instagram.com/mersiflab.official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2d4a63] rounded-lg flex items-center justify-center hover:bg-[#3d5a73] transition-colors duration-200"
                >
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a
                  href="https://id.linkedin.com/company/mersiflab?trk=public_post_feed-actor-name"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2d4a63] rounded-lg flex items-center justify-center hover:bg-[#3d5a73] transition-colors duration-200"
                >
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
                <a
                  href="https://x.com/MersifLab?t=evp5AQIyalnJitgGWwk_Ig&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#2d4a63] rounded-lg flex items-center justify-center hover:bg-[#3d5a73] transition-colors duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 1227"
                    fill="white"
                    className="h-5 w-5"
                  >
                    <path d="M730 558.3L1194.1 0H1083.7L684.2 479.8 359.5 0H0L484.1 716.8 0 1227h110.4l427.4-505.8 344.9 505.8H1200L730 558.3z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Tengah: Kontak */}
          <div className="space-y-6">
            <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="text-xl font-semibold text-white">
              {t('footer.contact.us')}
            </h3>
            <div className="space-y-4 text-base">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#2d4a63] rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <a
                  href="https://www.google.com/maps/search/Kentingan+Jl.+Ir.+Sutami,+Surakarta,+Indonesia/@-7.5571726,110.8489142,16.67z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div>
                    <p
                      className="text-white font-medium"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {t('footer.address')}
                    </p>
                    <p
                      style={{ fontFamily: "Inter, sans-serif" }}
                      className="text-gray-300 text-sm underline hover:text-gray-200 transition"
                    >
                      Kentingan Jl. Ir. Sutami,<br />
                      Surakarta, Indonesia
                    </p>
                  </div>
                </a>
              </div>

              <a
                href="mailto:mersiflab@gmail.com"
                className="flex items-center gap-4 text-white hover:text-gray-300 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-[#2d4a63] rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {t('footer.email')}
                  </p>
                  <p
                    className="text-gray-300 text-sm"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    mersiflab@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+6282226841762"
                className="flex items-center gap-4 text-white hover:text-gray-300 transition-colors duration-200"
              >
                <div className="w-10 h-10 bg-[#2d4a63] rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p style={{ fontFamily: "Poppins, sans-serif" }} className="font-medium">
                    {t('footer.phone')}
                  </p>
                  <p
                    style={{ fontFamily: "Inter, sans-serif" }}
                    className="text-gray-300 text-sm"
                  >
                    +62 822-2684-1762
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Kanan: Peta */}
          <div className="space-y-6">
            <h3
              className="text-xl font-semibold text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t('footer.location')}
            </h3>
            <div className="rounded-lg overflow-hidden shadow-lg border border-gray-600">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15820.283427654813!2d110.84132593572804!3d-7.567254117106592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a1701fb684141%3A0xa5d4aad15c7a9489!2sJl.%20Ir.%20Sutami%2C%20Kec.%20Jebres%2C%20Kota%20Surakarta%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1752740478342!5m2!1sid!2sid"
                width="100%"
                height="200"
                style={{ border: 0, fontFamily: "Poppins, sans-serif" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
            <a
              href="https://maps.google.com/?q=Kentingan+Jl.+Ir.+Sutami,+Surakarta,+Indonesia"
              target="_blank"
              rel="noopener noreferrer"
              style={{ border: 0, fontFamily: "Poppins, sans-serif" }}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              {t('footer.view.on.maps')}
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 mb-8">
          <div className="w-full h-px bg-gray-600"></div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4
              className="text-lg font-semibold text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t('footer.quick.links.services')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t('footer.quick.links.vr.development')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t('footer.quick.links.ar')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t('footer.quick.links.mobile.apps')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4
              className="text-lg font-semibold text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t('footer.quick.links.company')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t('footer.quick.links.about.us')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t('footer.quick.links.careers')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4
              className="text-lg font-semibold text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t('footer.quick.links.support')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('footer.quick.links.faq')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('footer.quick.links.documentation')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {t('footer.quick.links.contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4
              className="text-lg font-semibold text-white mb-4"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {t('footer.quick.links.legal')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t('footer.quick.links.privacy.policy')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t('footer.quick.links.terms.service')}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {t('footer.quick.links.cookie.policy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bar Bawah */}
      <div className="w-full bg-[#0f2a44] py-6 text-center text-sm md:text-base text-gray-400 border-t border-gray-600">
        <div className="container mx-auto px-6 max-w-7xl">
          <div
            style={{ fontFamily: "Inter, sans-serif" }}
            className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0"
          >
            {year && <p>&copy; {year} MersifLab. {t('footer.copyright')}</p>}
          </div>
        </div>
      </div>
    </footer>
  )
}
