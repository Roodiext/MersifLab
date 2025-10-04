import React from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Gibran Khalil Gibran",
    role: "CEO",
    image: "/img/vista4.jpg",
  },
  {
    name: "Faradila Putri Dewinta Azzahra",
    role: "CFO",
    image: "/img/vista1.jpg",
  },
  {
    name: "Yunita Puspita Dewi",
    role: "CMO",
    image: "/img/vista3.jpg",
  },
  {
    name: "Nur Rahman Najib",
    role: "CTO",
    image: "/img/vista2.jpg",
  },
];

export default function MeetTheTeam() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-12 gap-6">
          {/* Kiri: Judul */}
          <div>
            <p className="text-sm text-gray-600 mb-1">Our team</p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-1">
              Meet the Team
            </h2>
            <h3 className="text-3xl font-semibold text-sky-500">
              Mersif Vista
            </h3>
          </div>

          {/* Kanan: Deskripsi */}
          <div className="lg:max-w-sm text-base text-gray-600 mt-6 leading-relaxed">
            Bersama Mersif Vista, kami percaya bahwa kekuatan kolaborasi dan
            ide-ide segar dapat menciptakan perubahan nyata.
          </div>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              {/* Card gambar (tanpa background warna karena gambar sudah punya bg) */}
              <div className="w-56 h-80 rounded-xl shadow-md overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nama & Role */}
              <h3 className="text-base font-semibold text-gray-900 mt-3 leading-tight">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
