"use client"

import { Lightbulb, Wifi, Layers } from "lucide-react"
import { motion } from "framer-motion"

export function VistaFeatures() {
    const features = [
        {
            icon: <Lightbulb className="w-8 h-8 text-[#007bff]" />,
            title: "Inovasi Pembelajaran",
            desc: "Metode pelatihan kreatif yang memicu pemikiran kritis dan solusi inovatif."
        },
        {
            icon: <Wifi className="w-8 h-8 text-[#007bff]" />,
            title: "Konektivitas & Kolaborasi",
            desc: "Membangun jejaring dan kolaborasi antar peserta secara interaktif dan produktif."
        },
        {
            icon: <Layers className="w-8 h-8 text-[#007bff]" />,
            title: "Fleksibel & Praktis",
            desc: "Materi yang mudah disesuaikan dengan kebutuhan individu dan tujuan organisasi."
        }
    ]

    return (
        <section className="w-full py-16 bg-white">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-[1100px]">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-center mb-12"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    Pelatihan <span className="text-[#007bff]">Berdampak</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            className="space-y-4"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex justify-center">{feature.icon}</div>
                            <h3
                                className="text-xl font-semibold"
                                style={{ fontFamily: "Poppins, sans-serif" }}
                            >
                                {feature.title}
                            </h3>
                            <p
                                className="text-gray-600 text-base"
                                style={{ fontFamily: "Inter, sans-serif" }}
                            >
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
