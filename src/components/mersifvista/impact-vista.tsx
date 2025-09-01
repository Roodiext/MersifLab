import React from "react";

export default function ImpactVista() {
  return (
    <section className="w-full py-16 bg-gray-50 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Card utama */}
        <div className="bg-white rounded-3xl shadow-lg flex flex-col lg:flex-row items-start justify-between p-10 gap-10 relative overflow-visible">
          
          {/* Kiri: Teks dan statistik */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Dampak Nyata <span className="text-blue-600">MersifVista</span><br />
              untuk Generasi Digital
            </h2>
            <p className="text-gray-600 mb-8 max-w-md">
              Ratusan peserta dan puluhan institusi telah merasakan manfaat langsung program kami.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center lg:text-left">
                <div className="text-4xl md:text-5xl font-extrabold text-blue-600">
                  500+
                </div>
                <p className="text-gray-700 mt-1 text-sm">
                  Peserta sudah mengikuti <br /> pelatihan MersifVista.
                </p>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl md:text-5xl font-extrabold text-blue-600">
                  20+
                </div>
                <p className="text-gray-700 mt-1 text-sm">
                  Terhubung dengan <br /> Sekolah dan Universitas.
                </p>
              </div>
            </div>
          </div>

          {/* Kanan: Testimoni dan Gambar */}
          <div className="flex-1 flex flex-col items-start relative">
            {/* Heading testimoni */}
            <h4 className="text-gray-800 font-semibold mb-4">
              Salah satu cerita peserta MersifVista
            </h4>

            {/* Card testimoni */}
            <div className="w-full bg-gray-50 rounded-xl shadow-md p-6 z-10 lg:w-[420px]">
              <div className="flex items-center mb-3">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="user avatar" 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h5 className="font-semibold text-gray-800">Arif Setyojaya</h5>
                  <p className="text-xs text-gray-500">Guru Matematika di Surakarta</p>
                </div>
              </div>

              {/* Bintang rating */}
              <div className="flex items-center text-yellow-400 mb-2 text-sm">
                {Array(5).fill().map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* Isi testimoni */}
              <p className="text-gray-700 text-sm italic mb-3">
                "MersifVista membuka wawasan saya tentang bagaimana AI dapat meningkatkan pembelajaran di kelas."
              </p>
              <p className="text-blue-600 text-xs font-medium cursor-pointer">
                Lihat cerita lengkap peserta →
              </p>
            </div>

            {/* Gambar peserta menunjuk */}
            <img 
              src="/img/peserta.png" // Ganti dengan nama file kamu, misalnya: /img/impact.svg
              alt="Peserta menunjuk"
              className="w-[350px] h-auto object-contain absolute -right-28 bottom-0 z-0 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
