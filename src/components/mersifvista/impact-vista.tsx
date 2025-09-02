'use client';

import React, { useEffect, useState } from "react";

const Counter = ({ end }: { end: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [end]);

  return <span>{count}</span>;
};

export default function ImpactVista() {
  return (
    <section className="font-poppins bg-white py-12 px-6 md:px-16">
      <div className="bg-white rounded-3xl shadow-md p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto">
        
        {/* Left Content */}
        <div className="flex-1 max-w-lg">
          <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Dampak Nyata MersifVista untuk Generasi Digital
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-600 mb-6">
            Ratusan peserta dan puluhan institusi telah merasakan manfaat langsung program kami.
          </p>
          <div  className="flex flex-col sm:flex-row gap-8 text-center sm:text-left">
            <div>
              <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-3xl font-bold text-blue-600">
                <Counter end={500} />+
              </p>
              <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-700">peserta sudah mengikuti pelatihan MersifVista.</p>
            </div>
            <div>
              <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-3xl font-bold text-blue-600">
                <Counter end={20} />+
              </p>
              <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-700">Terhubung dengan Sekolah dan Universitas</p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 max-w-sm relative">
          <div className="relative w-full mx-auto">

            {/* Card utama */}
            <div className="relative bg-white p-6 rounded-xl shadow-lg z-40 w-full">
              <p style={{ fontFamily: "Poppins, sans-serif" }} className="text-sm font-semibold mb-2">
                Beberapa cerita dari peserta MersifVista
              </p>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Profil"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p style={{ fontFamily: "Inter, sans-serif" }} className="text-sm font-semibold">Arif Setiyajaya</p>
                  <p style={{ fontFamily: "Inter, sans-serif" }} className="text-xs text-gray-500">Guru di Surabaya</p>
                </div>
              </div>
              <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-700 text-sm mb-2">
                “MersifVista membantu wawasan saya tentang bagaimana AI dapat meningkatkan pembelajaran di kelas dan memberi nilai baru bagi siswa.”
              </p>
              <div className="flex text-yellow-400 text-sm">
                {'★★★★★'.split('').map((star, index) => (
                  <span key={index}>{star}</span>
                ))}
              </div>
            </div>

            {/* 3 Bayangan card di kanan */}
            <div className="absolute top-2 right-0 w-full h-[180px] rounded-xl bg-white shadow-lg opacity-50 scale-[0.95] z-30"></div>
            <div className="absolute top-6 right-5 w-full h-[180px] rounded-xl bg-white shadow-lg opacity-40 scale-[0.9] z-20"></div>
            <div className="absolute top-10 right-10 w-full h-[180px] rounded-xl bg-white shadow-lg opacity-30 scale-[0.85] z-10"></div>

            {/* Teks bawah card */}
            <p style={{ fontFamily: "Inter, sans-serif" }} className="text-sm text-gray-500 mt-4 text-right">Selengkapnya →</p>
          </div>
        </div>
      </div>
    </section>
  );
}
