"use client"

import { useState } from "react"

function MentorCard({ mentor }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="mentor-card bg-white rounded-lg p-6 shadow-lg border hover:border-blue-300 relative cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex flex-col items-center text-center">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="mentor-photo mb-4 w-32 h-32 object-cover rounded-full"
        />
        <h3 className="text-xl font-bold text-blue-900 mb-2">{mentor.name}</h3>
        <p className="text-blue-600 font-medium mb-3">{mentor.field}</p>
        <div className="flex items-center justify-center text-sm text-gray-500 mb-3">
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{mentor.achievement}</span>
        </div>
        <p className="text-gray-600 text-sm">{mentor.desc}</p>
      </div>

      {/* Experience Bubble */}
      {open && (
        <div className="absolute inset-0 bg-white rounded-lg shadow-2xl p-6 flex flex-col z-20">
          <button
            className="self-end text-2xl text-gray-500 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(false)
            }}
          >
            &times;
          </button>
          <div className="mb-4">
            <h4 className="font-bold text-blue-900 mb-3">Pengalaman Mentor</h4>
            <ul className="space-y-2 text-sm text-gray-600 text-left">
              {mentor.experience.map((exp, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  {exp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default function MentorAcademy() {
  const mentors = [
    {
      name: "Rozin Fata Ulvian",
      field: "Fisika dan Elektronika",
      image: "/mersif-academy/logo/mentor1.jpg",
      achievement: "Best CEO SEMESTA UNS tahun 2006",
      desc: "Berpengalaman dalam proyek elektronika dan pengembangan teknologi",
      experience: [
        "CEO SEMESTA UNS (2006-2010)",
        "Peneliti Elektronika Terapan",
        "Konsultan Teknologi untuk 50+ perusahaan",
        "Pembimbing 200+ mahasiswa teknik",
      ],
    },
    {
      name: "Bagus Prayoga",
      field: "Fisika dan Energi",
      image: "/mersif-academy/logo/2 (1).jpg",
      achievement: "Mahasiswa berprestasi 1 UNS",
      desc: "Ahli energi terbarukan dengan pengalaman kompetisi nasional",
      experience: [
        "Mahasiswa Berprestasi 1 UNS",
        "Juara Kompetisi Energi Nasional 2018",
        "Peneliti di Lab Energi Terbarukan",
        "Mentor 100+ mahasiswa fisika",
      ],
    },
    {
      name: "Atina Rahmawati",
      field: "Fisika dan Sains",
      image: "/mersif-academy/logo/3 (1).jpg",
      achievement: "Mahasiswa berprestasi 1 FKIP UNS",
      desc: "Spesialis pendidikan sains dengan pengalaman mengajar 8+ tahun",
      experience: [
        "Mahasiswa Berprestasi 1 FKIP UNS",
        "Guru Fisika SMA Negeri",
        "Pengembang kurikulum sains",
        "Pelatih olimpiade fisika",
      ],
    },
    {
      name: "Moh. Abdul Mukhit",
      field: "Elektronika dan IoT",
      image: "/mersif-academy/logo/4 (1).jpg",
      achievement: "Juara dalam 10+ kompetisi",
      desc: "Expert IoT dengan pengalaman Kompetisi Nasional dan Internasional",
      experience: [
        "Juara 1 Kompetisi IoT Nasional",
        "Developer sistem smart home",
        "Konsultan IoT untuk startup",
        "Founder komunitas IoT Indonesia",
      ],
    },
    {
      name: "Illyin Kurniana",
      field: "Pangan dan Bio",
      image: "/mersif-academy/logo/5 (1).jpg",
      achievement: "Juara dalam 5+ kompetisi",
      desc: "Ahli teknologi pangan dengan pengalaman Kompetisi Nasional",
      experience: [
        "Juara Kompetisi Inovasi Pangan",
        "Peneliti di Lab Bioteknologi",
        "Konsultan industri makanan",
        "Pembimbing riset mahasiswa",
      ],
    },
    {
      name: "Sinta Kristiana Putri",
      field: "Lingkungan dan Perencanaan",
      image: "/mersif-academy/logo/6 (1).jpg",
      achievement: "Juara dalam 15+ kompetisi",
      desc: "Spesialis perencanaan lingkungan dengan pengalaman Kompetisi Nasional",
      experience: [
        "Juara Kompetisi Lingkungan Nasional",
        "Konsultan perencanaan kota",
        "Aktivis lingkungan hidup",
        "Pembimbing proyek sustainability",
      ],
    },
    {
      name: "Kiranda Dinata",
      field: "Fisika Material dan Elektronika",
      image: "/mersif-academy/logo/7 (1).jpg",
      achievement: "Berpengalaman dalam 15+ Kompetisi",
      desc: "Expert material science dengan pengalaman Kompetisi Nasional",
      experience: [
        "Peneliti material nano",
        "Juara kompetisi fisika material",
        "Konsultan industri elektronik",
        "Pembimbing thesis 50+ mahasiswa",
      ],
    },
    {
      name: "Ali Nur Mustofa",
      field: "Geografi Teknik",
      image: "/mersif-academy/logo/8 (1).jpg",
      achievement: "Berpengalaman dalam Olimpiade Geografi",
      desc: "Ahli geografi teknik dengan pengalaman Kompetisi Riset Nasional",
      experience: [
        "Finalis PKM 2023",
        "Juara Olimpiade Geografi",
        "Ahli sistem informasi geografis",
        "Pembimbing proyek pemetaan wilayah",
      ],
    },
  ]

  return (
    <section className="hero-gradient relative overflow-x-hidden py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Mentor</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tim mentor berpengalaman yang siap membimbing Anda dalam perjalanan
            riset dan kompetisi sains
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.map((m, i) => (
            <MentorCard key={i} mentor={m} />
          ))}
        </div>
      </div>
    </section>
  )
}
