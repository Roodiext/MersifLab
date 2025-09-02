"use client";

import Image from "next/image";
import React from "react";

interface Pillar {
  icon: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    icon: "/img/v.svg",
    title: "Visionary Innovation",
    description:
      "Mendorong terciptanya inovasi teknologi yang visioner untuk pendidikan, tidak hanya mengikuti tren, tapi menciptakan arah baru.",
  },
  {
    icon: "/img/i.svg",
    title: "Impactful Learning",
    description:
      "Setiap program yang dijalankan harus membawa dampak nyata, baik bagi guru, siswa, maupun mahasiswa, agar mereka lebih siap menghadapi tantangan dunia modern.",
  },
  {
    icon: "/img/s.svg",
    title: "Sustainable Growth",
    description:
      "Membangun ekosistem pembelajaran yang berkelanjutan, relevan dengan kebutuhan jangka panjang, dan dapat terus dikembangkan.",
  },
  {
    icon: "/img/t.svg",
    title: "Technopreneurship",
    description:
      "Menghubungkan teknologi dengan kewirausahaan untuk melahirkan technopreneur muda yang solutif dan adaptif.",
  },
  {
    icon: "/img/a.svg",
    title: "Acceleration",
    description:
      "Bertindak sebagai akselerator yang mempercepat transformasi digital di dunia pendidikan melalui program, kolaborasi, dan inovasi berkelanjutan.",
  },
];

const OurPillarsVertical: React.FC = () => {
  return (
    <section className="w-full py-20 bg-white" id="our-pillars">
      <div className="max-w-5xl mx-auto px-6">
        <h2 style={{ fontFamily: "Poppins, sans-serif" }} className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
          Our Pillars
        </h2>

        <div className="flex flex-col gap-16">
          {pillars.map((pillar, index) => {
            const isLeft = index % 2 === 0; // index genap → kiri, ganjil → kanan
            const textAlign = isLeft ? "text-left" : "text-right";

            return (
              <div
                key={index}
                className={`flex items-start gap-6 md:gap-10 ${
                  isLeft ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-20 md:w-24">
                  <Image
                    src={pillar.icon}
                    alt={pillar.title}
                    width={100}
                    height={100}
                    className="w-full h-auto"
                  />
                </div>

                {/* Teks */}
                <div className={`flex-1 ${textAlign}`}>
                  <h3 style={{ fontFamily: "Poppins, sans-serif" }} className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    {pillar.title}
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif" }} className="text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurPillarsVertical;
