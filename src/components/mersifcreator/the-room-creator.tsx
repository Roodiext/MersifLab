'use client'
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Beaker, Box, Shapes } from "lucide-react"
import { useState } from "react"

export function TheRoomsSection() {
  const rooms = [
    {
      id: 'cube',
      title: 'Cube',
      description: 'Ruang eksplorasi 3D dengan bentuk geometri dasar. Pelajari konsep matematika dan fisika melalui manipulasi objek kubus interaktif.',
      image: '/img/product/product-mersifcreator.png',
      icon: <Box className="w-6 h-6" />,
      href: 'https://room.mersiflab.com/cube/',
      bgColor: 'from-green-400 to-green-600',
      features: ['Geometri 3D', 'Manipulasi Objek', 'Visualisasi Konsep']
    },
    {
      id: 'custom-shape',
      title: 'Custom Shape',
      description: 'Ciptakan dan eksplorasi bentuk-bentuk unik sesuai kreativitas Anda. Ruang tak terbatas untuk pembelajaran yang personal.',
      image: '/images/custom-shape-room.jpg',
      icon: <Shapes className="w-6 h-6" />,
      href: 'https://room.mersiflab.com/custom-shape/',
      bgColor: 'from-emerald-400 to-teal-600',
      features: ['Desain Bebas', 'Kreativitas Tanpa Batas', 'Personalisasi']
    },
    {
      id: 'lab-kimia',
      title: 'Lab Kimia',
      description: 'Laboratorium kimia virtual yang aman dan interaktif. Lakukan eksperimen dengan berbagai bahan kimia tanpa risiko.',
      image: '/images/lab-kimia-room.jpg',
      icon: <Beaker className="w-6 h-6" />,
      href: 'https://room.mersiflab.com/lab-sm/',
      bgColor: 'from-slate-600 to-slate-800',
      features: ['Eksperimen Aman', 'Simulasi Realistis', 'Pembelajaran Praktis']
    }
  ]

  return (
    <section className="w-full py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-[1600px]">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Jelajahi <span className="text-[#007bff]">The Rooms</span>
          </h2>
          <p 
            className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Masuki dunia pembelajaran interaktif dengan berbagai ruang virtual yang dirancang khusus 
            untuk memberikan pengalaman edukatif yang tak terlupakan.
          </p>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Image/Preview Area */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play Icon Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-[#007bff] ml-1" />
                  </div>
                </div>

                {/* Room Icon */}
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-md">
                    {room.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {room.title}
                </h3>
                
                <p 
                  className="text-gray-600 text-sm leading-relaxed mb-4"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {room.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="flex justify-between items-center">
                  <a
                    href={room.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#007bff] hover:bg-[#007bff]/90 text-white rounded-full px-6 py-2 text-sm font-medium transition-colors duration-300 inline-flex items-center"
                  >
                    {room.id === 'lab-kimia' ? 'Masuk Lab' : 'Jelajahi'}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                  
                  {/* Status Badge */}
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <div className={`w-2 h-2 rounded-full ${room.id === 'lab-kimia' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span>{room.id === 'lab-kimia' ? 'Live' : 'Beta'}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-[#007bff]/10 to-blue-50 rounded-2xl border border-blue-100">
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Punya Ide Room Baru?</h3>
              <p className="text-gray-600 text-sm">Berkolaborasi dengan kami untuk menciptakan pengalaman pembelajaran yang lebih beragam.</p>
            </div>
            <Button className="bg-[#007bff] hover:bg-[#007bff]/90 text-white rounded-full px-6 whitespace-nowrap">
              Hubungi Kami
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}