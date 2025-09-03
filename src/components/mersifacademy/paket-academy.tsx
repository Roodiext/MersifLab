"use client"

import { useState, useEffect } from "react"
import { Check, X, Mail, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function PaketAcademy() {
  const { t } = useLanguage()
  const [selectedPaket, setSelectedPaket] = useState<any>(null)
  const [isOpen, setIsOpen] = useState(false)

  // Form states
  const [nama, setNama] = useState("")
  const [sekolah, setSekolah] = useState("")
  const [email, setEmail] = useState("")
  const [wa, setWa] = useState("")
  const [pesan, setPesan] = useState("")

  // Error & validasi
  const [errors, setErrors] = useState<any>({})
  const [isFormValid, setIsFormValid] = useState(false)

  const paketData = {
    trial: {
      nama: t("academy.packages.trial.name"),
      harga: t("academy.packages.trial.price"),
      durasi: t("academy.packages.trial.duration"),
      deskripsi: t("academy.packages.trial.description"),
      fitur: [
        t("academy.packages.features.brainstorming"),
        t("academy.packages.features.info.lomba"),
        t("academy.packages.features.online.zoom"),
      ],
    },
    basic: {
      nama: t("academy.packages.basic.name"),
      harga: t("academy.packages.basic.price"),
      durasi: t("academy.packages.basic.duration"),
      deskripsi: t("academy.packages.basic.description"),
      fitur: [
        t("academy.packages.features.brainstorming"),
        t("academy.packages.features.fun.science"),
        t("academy.packages.features.writing.guidance"),
        t("academy.packages.features.assessment"),
      ],
    },
    pro: {
      nama: t("academy.packages.pro.name"),
      harga: t("academy.packages.pro.price"),
      durasi: t("academy.packages.pro.duration"),
      deskripsi: t("academy.packages.pro.description"),
      fitur: [
        t("academy.packages.features.brainstorming"),
        t("academy.packages.features.presentation"),
        t("academy.packages.features.research.guidance"),
        t("academy.packages.features.writing.guidance"),
        t("academy.packages.features.prototype"),
      ],
    },
    premium: {
      nama: t("academy.packages.premium.name"),
      harga: t("academy.packages.premium.price"),
      durasi: t("academy.packages.premium.duration"),
      deskripsi: t("academy.packages.premium.description"),
      fitur: [
        t("academy.packages.features.brainstorming"),
        t("academy.packages.features.writing.guidance"),
        t("academy.packages.features.info.lomba"),
        t("academy.packages.features.research.guidance") + " & " + t("academy.packages.features.prototype"),
      ],
    },
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!nama.trim()) newErrors.nama = t("academy.packages.form.validation.name")
    if (!sekolah.trim()) newErrors.sekolah = t("academy.packages.form.validation.school")
    if (!email.trim()) {
      newErrors.email = t("academy.packages.form.validation.email.required")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t("academy.packages.form.validation.email.invalid")
    }
    if (!wa.trim()) {
      newErrors.wa = t("academy.packages.form.validation.whatsapp.required")
    } else if (!/^[0-9]+$/.test(wa)) {
      newErrors.wa = t("academy.packages.form.validation.whatsapp.numbers")
    } else if (wa.length < 10) {
      newErrors.wa = t("academy.packages.form.validation.whatsapp.min")
    } else if (wa.length > 15) {
      newErrors.wa = t("academy.packages.form.validation.whatsapp.max")
    }

    setErrors(newErrors)
    setIsFormValid(Object.keys(newErrors).length === 0)
  }

  // Jalankan validasi setiap kali input berubah
  useEffect(() => {
    validateForm()
  }, [nama, sekolah, email, wa])

  const handleOpenForm = (paketKey: string) => {
    setSelectedPaket(paketData[paketKey])
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedPaket(null)
    setNama("")
    setSekolah("")
    setEmail("")
    setWa("")
    setPesan("")
    setErrors({})
    setIsFormValid(false)
  }

  const handleWhatsApp = () => {
    if (!isFormValid) return

    const message = `*PENDAFTARAN MERSIF ACADEMY*

*Nama*        : ${nama}
*Sekolah*     : ${sekolah}
*Email*       : ${email}
*WhatsApp*    : ${wa}
*Paket*       : ${selectedPaket.nama}
*Pesan*       : ${pesan || "Tidak ada"}`

    window.open(`https://wa.me/6282226841762?text=${encodeURIComponent(message)}`, "_blank")
  }

  const handleEmail = () => {
    if (!isFormValid) return
    const subject = `Pendaftaran Mersif Academy - ${nama}`
    const body = `Pendaftaran Mersif Academy\n\nNama: ${nama}\nSekolah: ${sekolah}\nEmail: ${email}\nWhatsApp: ${wa}\nPaket: ${selectedPaket.nama}\nPesan: ${pesan || "Tidak ada"}`
    window.location.href = `mailto:official@mersifacademy.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  // Autofocus nama saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const input = document.getElementById("namaInput") as HTMLInputElement
        input?.focus()
      }, 100)
    }
  }, [isOpen])

  return (
    <section id="daftar" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-4xl font-bold text-blue-900 mb-12">
          {t("academy.packages.title")}
        </h2>

        {/* Paket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(paketData).map(([key, item]) => (
            <div
              key={key}
              className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between ${
                key === "trial" ? "bg-white border-2 border-blue-600" : "bg-blue-600 text-white"
              }`}
            >
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${key === "trial" ? "text-blue-900" : "text-white"}`}>
                  {item.nama}
                </h3>
                <p className="text-xl font-semibold mb-1">{item.harga}</p>
                <p className="text-sm opacity-80 mb-4">{item.durasi}</p>
                <p className="text-sm mb-4">{item.deskripsi}</p>
                <ul className="space-y-2 text-left">
                  {item.fitur.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className={`w-4 h-4 ${key === "trial" ? "text-blue-600" : "text-green-300"}`} /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleOpenForm(key)}
                className={`mt-6 py-3 px-5 rounded-lg font-semibold ${
                  key === "trial"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white text-blue-700 hover:bg-gray-100"
                }`}
              >
                {t("academy.packages.select.package")}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      {isOpen && selectedPaket && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
            <button onClick={handleClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">{t("academy.packages.form.title")}</h3>
            <p className="text-center text-sm text-gray-600 mb-6">
              {t("academy.packages.form.selected")} <span className="font-semibold">{selectedPaket.nama}</span>
            </p>

            <div className="space-y-5">
              {/* Nama */}
              <div className="relative">
                <input
                  id="namaInput"
                  type="text"
                  placeholder=" "
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="peer w-full border rounded-lg p-3 pt-5 placeholder-transparent focus:border-blue-600 focus:ring focus:ring-blue-100"
                />
                <label
                  htmlFor="namaInput"
                  className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
                >
                  {t("academy.packages.form.name")} *
                </label>
                {errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama}</p>}
              </div>

              {/* Sekolah */}
              <div className="relative">
                <input
                  type="text"
                  placeholder=" "
                  value={sekolah}
                  onChange={(e) => setSekolah(e.target.value)}
                  className="peer w-full border rounded-lg p-3 pt-5 placeholder-transparent focus:border-blue-600 focus:ring focus:ring-blue-100"
                />
                <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                  {t("academy.packages.form.school")} *
                </label>
                {errors.sekolah && <p className="text-red-500 text-sm mt-1">{errors.sekolah}</p>}
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full border rounded-lg p-3 pt-5 placeholder-transparent focus:border-blue-600 focus:ring focus:ring-blue-100"
                />
                <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                  {t("academy.packages.form.email")} *
                </label>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* WhatsApp */}
              <div className="relative">
                <input
                  type="tel"
                  placeholder=" "
                  value={wa}
                  onChange={(e) => setWa(e.target.value)}
                  className="peer w-full border rounded-lg p-3 pt-5 placeholder-transparent focus:border-blue-600 focus:ring focus:ring-blue-100"
                />
                <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                  {t("academy.packages.form.whatsapp")} *
                </label>
                {errors.wa && <p className="text-red-500 text-sm mt-1">{errors.wa}</p>}
              </div>

              {/* Pesan */}
              <div className="relative">
                <textarea
                  placeholder=" "
                  value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  rows={3}
                  className="peer w-full border rounded-lg p-3 pt-5 placeholder-transparent focus:border-blue-600 focus:ring focus:ring-blue-100"
                />
                <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600">
                  {t("academy.packages.form.message")}
                </label>
              </div>

              {/* Tombol */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsApp}
                  disabled={!isFormValid}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MessageCircle className="w-5 h-5" /> {t("academy.packages.form.whatsapp.button")}
                </button>
                <button
                  onClick={handleEmail}
                  disabled={!isFormValid}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail className="w-5 h-5" /> {t("academy.packages.form.email.button")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
