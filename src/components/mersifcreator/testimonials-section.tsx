import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Sarah Wijaya",
      role: "Dosen Universitas Indonesia",
      content:
        "Mersif Creator telah merevolusi cara saya mengajar. Mahasiswa dapat memahami konsep kompleks melalui visualisasi 3D yang interaktif dalam ruang virtual.",
      rating: 5,
      avatar: "/professional-woman-diverse.png",
    },
    {
      name: "Ahmad Rizki",
      role: "Guru SMA Negeri 1 Jakarta",
      content:
        "Lab Kimia virtual di Mersif Creator memungkinkan siswa melakukan eksperimen dengan aman. Mereka lebih antusias dan pemahaman meningkat drastis.",
      rating: 5,
      avatar: "/male-teacher.png",
    },
    {
      name: "Maya Sari",
      role: "Developer & Educator",
      content:
        "Custom Shape room memberikan kebebasan kreativitas yang luar biasa. Saya dapat membuat lingkungan pembelajaran yang sesuai dengan kebutuhan spesifik.",
      rating: 5,
      avatar: "/female-developer.png",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Apa Kata <span className="text-blue-600">Pengguna</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Dengarkan pengalaman nyata dari para pengguna yang telah merasakan manfaat ruang virtual Mersif Creator
              dalam pembelajaran dan eksplorasi kreatif.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <div className="relative mb-6">
                  <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                  <p className="text-gray-700 leading-relaxed pl-6">{testimonial.content}</p>
                </div>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 border-2 border-blue-100"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
