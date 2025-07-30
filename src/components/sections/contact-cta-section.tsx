import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactCtaSection() {
  return (
    <section id="contact" className="w-full py-20 md:py-28 lg:py-36 relative overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-15px) translateX(5px); }
          66% { transform: translateY(-10px) translateX(-5px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
      ` }} />

      <div className="container px-4 md:px-6 max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Gambar */}
          <div className="lg:order-1 flex justify-center">
            <div className="relative">
              <div className="overflow-hidden rounded-3xl max-w-sm animate-float-slow">
                <img
                  src="/img/te1.png"
                  alt="Illustration"
                  className="w-full h-auto rounded-3xl animate-float hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Form dan Teks */}
          <div className="lg:order-2 flex flex-col gap-8 max-w-xl w-full mx-auto">
            <div className="space-y-5">
              <h2 style={{ fontFamily: "Poppins, sans-serif" }}  className="text-4xl md:text-5xl font-bold text-blue-600 leading-tight font-poppins">
                Hubungi Kami
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif" }} className="text-lg text-gray-600 font-inter leading-relaxed">
                Ada pertanyaan atau butuh dukungan? Kami siap membantu Anda sukses. Kirimkan pesan kepada kami dan kami akan segera menghubungi Anda kembali.
              </p>
            </div>

            <div style={{ fontFamily: "Poppins, sans-serif" }} className="space-y-6 bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Nama Lengkap</label>
                  <Input
                    type="text"
                    placeholder="Masukkan Nama Lengkap"
                    className="px-5 py-4 rounded-xl font-inter"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Alamat Email</label>
                  <Input
                    type="email"
                    placeholder="Masukkan Email Anda"
                    className="px-5 py-4 rounded-xl font-inter"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Subjek</label>
                <Input
                  type="text"
                  placeholder="Tentang apa ini?"
                  className="px-5 py-4 rounded-xl font-inter"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Pesan</label>
                <Textarea
                  placeholder="Ceritakan lebih lanjut tentang pertanyaan Anda..."
                  className="px-5 py-4 rounded-xl min-h-[150px] font-inter resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full py-4 rounded-xl bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-all"
              >
                Kirim Pesan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
