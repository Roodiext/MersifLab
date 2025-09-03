"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const { t } = useLanguage()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.message) {
      alert(t("iot.contact.form.validation.all"))
      return
    }

    console.log("Pesan kontak:", form)
    alert(t("iot.contact.form.success"))
  }

  return (
    <section id="contact" className="w-full py-12 bg-white">
      <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-8 items-start">
        {/* Bagian Kiri */}
        <div>
          <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-3xl font-bold mb-4">
            {t("iot.contact.title")}
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-600 mb-6">
            {t("iot.contact.description")}
          </p>
          <div style={{ fontFamily: "Inter, sans-serif" }} className="space-y-2 text-gray-700">
            <p>
              <strong>{t("iot.contact.address")}:</strong> Kentingan, Jl. Ir. Sutami, Surakarta, Indonesia
            </p>
            <p>
              <strong>{t("iot.contact.phone")}:</strong> +62 822-2684-1762{" "}
            </p>
            <p>
              <strong>{t("iot.contact.email")}:</strong> mersiflab@gmail.com
            </p>
          </div>
        </div>

        {/* Bagian Kanan */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow">
          <input
            style={{ fontFamily: "Inter, sans-serif" }}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("iot.contact.form.name")}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            style={{ fontFamily: "Inter, sans-serif" }}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("iot.contact.form.email")}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <textarea
            style={{ fontFamily: "Inter, sans-serif" }}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t("iot.contact.form.message")}
            rows={5}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <Button
            style={{ fontFamily: "Poppins, sans-serif" }}
            type="submit"
            className="w-full bg-[#007bff] text-white font-semibold"
          >
            {t("iot.contact.form.submit")}
          </Button>
        </form>
      </div>
    </section>
  )
}
