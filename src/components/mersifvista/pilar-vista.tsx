import React from "react";

interface Pillar {
  title: string;
  description: string;
  icon: string;
}

const pillars: Pillar[] = [
  {
    icon: "V",
    title: "Visionary Innovation",
    description:
      "Mendorong terciptanya inovasi teknologi yang visioner untuk pendidikan, tidak hanya mengikuti tren, tapi menciptakan arah baru.",
  },
  {
    icon: "I",
    title: "Impactful Learning",
    description:
      "Setiap program yang dijalankan harus membawa dampak nyata, baik bagi guru, siswa, maupun mahasiswa, agar mereka lebih siap menghadapi tantangan dunia modern.",
  },
  {
    icon: "S",
    title: "Sustainable Growth",
    description:
      "Membangun ekosistem pembelajaran yang berkelanjutan, relevan dengan kebutuhan jangka panjang, dan dapat terus dikembangkan.",
  },
  {
    icon: "T",
    title: "Technopreneurship",
    description:
      "Menghubungkan teknologi dengan kewirausahaan untuk melahirkan technopreneur muda yang solutif dan adaptif.",
  },
  {
    icon: "A",
    title: "Acceleration",
    description:
      "Bertindak sebagai akselerator yang mempercepat transformasi digital di dunia pendidikan melalui program, kolaborasi, dan inovasi berkelanjutan.",
  },
];

const OurPillars: React.FC = () => {
  return (
    <section className="w-full py-16 bg-gray-50" id="our-pillars">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Our Pillars
        </h2>

        {/* 5x1 layout - 5 columns in desktop, stack on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="flex flex-col justify-start bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-600 text-white rounded-full text-2xl font-bold">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {pillar.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPillars;