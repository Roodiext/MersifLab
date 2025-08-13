"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.message) {
      alert("Harap isi semua field.")
      return
    }

    console.log("Pesan kontak:", form)
    alert("Pesan Anda telah terkirim! Kami akan menghubungi Anda.")
  }

  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-2 gap-8 items-start">
        {/* Bagian Kiri */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Hubungi Kami</h2>
          <p className="text-gray-600 mb-6">
            Punya pertanyaan, masukan, atau ingin berdiskusi?  
            Kami selalu siap membantu. Silakan isi formulir di sebelah kanan,  
            dan tim kami akan segera menghubungi Anda.
          </p>
          <div className="space-y-2 text-gray-700">
            <p><strong>📍 Alamat:</strong> Jl. Contoh No. 123, Jakarta</p>
            <p><strong>📞 Telepon:</strong> +62 812-3456-7890</p>
            <p><strong>✉️ Email:</strong> support@contoh.com</p>
          </div>
        </div>

        {/* Bagian Kanan */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Pesan"
            rows={5}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
          <Button type="submit" className="w-full bg-[#007bff] text-white">
            Kirim Pesan
          </Button>
        </form>
      </div>
    </section>
  )
}
