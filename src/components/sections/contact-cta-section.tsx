import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function ContactCtaSection() {
  return (
    <section id="contact" className="w-full py-20 md:py-28 lg:py-36 relative overflow-hidden bg-gray-50">
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
          
          {/* Left Column - Text Content */}
          <div className="lg:order-1 space-y-6">
            <div className="space-y-4">
              <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Ada yang ingin kamu tanyakan?
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif" }} className="text-lg text-gray-600 leading-relaxed">
                Ada pertanyaan atau butuh dukungan? Kami siap membantu Anda sukses. Kirimkan pesan kepada kami dan kami akan segera menghubungi Anda kembali.
              </p>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:order-2 flex justify-center">
            <div className="w-full max-w-md">
              <div style={{ fontFamily: "Poppins, sans-serif" }} className="space-y-6 bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-900">
                <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
                  Isi Formulir Ini
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Nama :</label>
                  <Input
                    type="text"
                    placeholder="Masukkan nama Anda"
                    className="px-4 py-3 rounded-lg font-inter"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Email :</label>
                  <Input
                    type="email"
                    placeholder="example@gmail.com"
                    className="px-4 py-3 rounded-lg font-inter"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">Pertanyaan :</label>
                  <Textarea
                    placeholder="aku ingin bertanya..."
                    className="px-4 py-3 rounded-lg min-h-[120px] font-inter resize-none"
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gray-900 text-white font-semibold text-base hover:bg-gray-800 transition-all"
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}