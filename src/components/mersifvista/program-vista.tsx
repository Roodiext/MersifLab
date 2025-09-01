import React from "react";

interface Program {
  category: string;
  title: string;
  image: string;
}

const programs: Program[] = [
  // For Teachers
  {
    category: "For Teachers",
    title: "AI for Teaching Administration (Google Docs & Gemini)",
    image: "/images/programs/ai-teaching.jpg",
  },
  {
    category: "For Teachers",
    title: "Automated Data Processing (Spreadsheet & Gemini)",
    image: "/images/programs/data-processing.jpg",
  },
  {
    category: "For Teachers",
    title: "3D Printing for Teaching Materials",
    image: "/images/programs/3d-printing.jpg",
  },
  {
    category: "For Teachers",
    title: "Interactive Learning Module Creation (Curipod)",
    image: "/images/programs/curipod.jpg",
  },
  {
    category: "For Teachers",
    title: "Gamified Quizzes (Kahoot/Quizizz)",
    image: "/images/programs/kahoot.jpg",
  },
  {
    category: "For Teachers",
    title: "Data Visualization (Looker Studio)",
    image: "/images/programs/looker.jpg",
  },
  // For Students
  {
    category: "For Students",
    title: "Creating Educational Games with Scratch",
    image: "/images/programs/scratch.jpg",
  },
  {
    category: "For Students",
    title: "AI & Machine Learning using Teachable Machine",
    image: "/images/programs/teachable-machine.jpg",
  },
  {
    category: "For Students",
    title: "UI/UX Design with AI (Figma & Claude)",
    image: "/images/programs/uiux-ai.jpg",
  },
  {
    category: "For Students",
    title: "Web Development (Laravel Framework)",
    image: "/images/programs/laravel.jpg",
  },
  {
    category: "For Students",
    title: "AI for Automating Computer Tasks (Gemini CLI)",
    image: "/images/programs/gemini-cli.jpg",
  },
  {
    category: "For Students",
    title: "Game Development with Unity",
    image: "/images/programs/unity.jpg",
  },
];

export default function ProgramVista() {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
          Programs & Training
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Pilihan pelatihan inovatif untuk guru, siswa, dan mahasiswa agar siap menghadapi tantangan dunia modern.
        </p>

        {/* Grid Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Gambar */}
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-48 object-cover"
              />

              {/* Konten */}
              <div className="p-5">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-200 rounded-full text-gray-700 mb-3">
                  {program.category}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {program.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
