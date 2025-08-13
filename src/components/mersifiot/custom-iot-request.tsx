"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"

export function CustomIoTRequest() {
  const [form, setForm] = useState({ name: "", email: "", request: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = "Nama wajib diisi"
    if (!form.email.trim()) {
      newErrors.email = "Email wajib diisi"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Format email tidak valid"
    }
    if (!form.request.trim()) newErrors.request = "Kebutuhan IoT wajib diisi"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Pengajuan terkirim",
        description: "Kami akan menghubungi Anda secepatnya.",
      })
      setForm({ name: "", email: "", request: "" })
    }, 1000)
  }

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-5xl mx-auto px-8 lg:px-20 grid md:grid-cols-2 gap-20 items-center">

        {/* Kiri - Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Pengajuan Kebutuhan IoT
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nama"
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <textarea
                name="request"
                value={form.request}
                onChange={handleChange}
                placeholder="Jelaskan kebutuhan IoT Anda"
                rows={5}
                className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${
                  errors.request ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.request && (
                <p className="text-red-500 text-sm mt-1">{errors.request}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg rounded-lg transition"
            >
              {loading ? "Mengirim..." : "Kirim Pengajuan"}
            </Button>
          </form>
        </motion.div>

        {/* Kanan - Penjelasan (Card Stroke) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="border border-gray-200 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-2xl font-semibold text-blue-700 mb-4">
            Kenapa Ajukan Kebutuhan IoT?
          </h3>
          <ul className="space-y-3 text-gray-700">
            {[
              "Solusi IoT yang disesuaikan untuk bisnis Anda",
              "Efisiensi operasional dan penghematan biaya",
              "Integrasi mudah dengan sistem yang sudah ada",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="text-blue-500 w-5 h-5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <img
              src="/images/iot-illustration.png"
              alt="Ilustrasi IoT"
              className="w-full rounded-lg"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
