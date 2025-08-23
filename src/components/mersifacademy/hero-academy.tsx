"use client"

import { useState } from "react"

export default function AboutPage() {
  const [activeSkill, setActiveSkill] = useState("kritis")

  const skills = [
    { id: "kritis", title: "Berpikir Kritis", number: "1" },
    { id: "kreativitas", title: "Kreativitas & Inovasi", number: "2" },
    { id: "kolaborasi", title: "Kolaborasi", number: "3" },
    { id: "karakter", title: "Pengembangan Karakter", number: "4" },
  ]

  const skillContent = {
    kritis:
      "Riset melatih siswa untuk menganalisis data secara mendalam, mempertanyakan asumsi yang ada, dan menarik kesimpulan logis yang dapat dipertanggungjawabkan.",
    kreativitas:
      "Siswa didorong untuk menemukan masalah-masalah baru dan merancang solusi orisinal yang belum pernah terpikirkan sebelumnya, mengubah ide menjadi inovasi nyata.",
    kolaborasi:
      "Proyek riset seringkali melibatkan kerja tim, mengajarkan cara berkomunikasi efektif, berbagi ide secara konstruktif, dan bekerja sama mencapai satu tujuan besar.",
    karakter:
      "Menghadapi tantangan dan kegagalan dalam riset akan membangun ketekunan, menumbuhkan rasa ingin tahu yang mendalam, serta menjunjung tinggi integritas akademik.",
  }

  return (
    <div className="overflow-x-hidden">
      <style jsx>{`
        @keyframes mentul {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .mentul { animation: mentul 1s ease-in-out infinite; }
        .mentul-delay-1 { animation-delay: 1s; }
        .mentul-delay-2 { animation-delay: 2s; }
        .mentul-delay-3 { animation-delay: 3s; }
      `}</style>

      <section className="hero-gradient relative overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 animate__animated animate__fadeInLeft">
              <div className="relative">
                <div className="absolute top-[-1rem] left-[-1rem] w-8 h-8 bg-blue-100 rounded-full"></div>
                <div className="absolute bottom-[-0.5rem] left-[2rem] w-4 h-4 bg-yellow-300 rounded-full"></div>
                <div className="absolute top-[3rem] left-[0rem] text-blue-200 text-3xl mentul mentul-delay-1">📚</div>
                <div className="absolute top-[-4rem] left-[16rem] text-blue-200 text-4xl mentul mentul-delay-2">🎓</div>
                <div className="absolute bottom-[-4rem] right-[2rem] text-blue-200 text-2xl mentul mentul-delay-3">
                  🧪
                </div>
                <div className="relative w-full max-w-md mx-auto" data-aos="fade-right" data-aos-duration="1000">
                  <div className="bg-gradient-to-b from-blue-900 to-blue-600 rounded-3xl p-2 shadow-2xl">
                    <div className="bg-gradient-to-b from-blue-400 to-blue-600 rounded-2xl overflow-hidden">
                      <img src="/2.jpg" alt="About Us" className="w-full h-80 object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="text-4xl font-bold text-blue-900 mb-4" data-aos="fade-down" data-aos-duration="1000">
                About Us
              </h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-6" data-aos="fade-up" data-aos-duration="1000">
                We Bring Idea From Sketch To Life
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-8" data-aos="fade-left" data-aos-duration="1000">
                Platform pembelajaran yang fokus pada riset, sains, dan teknologi, dirancang untuk mendorong inovasi
                terbuka. Kami berkomitmen untuk mencetak generasi inovator muda Indonesia yang siap bersaing di tingkat
                nasional dan internasional.
              </p>
              <div className="flex items-center gap-4" data-aos="fade-up-left" data-aos-duration="1000">
                <div className="bg-red-500 text-white p-4 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Lets Join with</div>
                  <div className="text-lg font-semibold text-gray-800">
                    <span className="text-blue-600">mersif</span>
                    <span>academy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2
                className="text-4xl font-bold text-blue-900 mb-6 leading-tight"
                data-aos="fade-down-right"
                data-aos-duration="1000"
              >
                Kenapa Pengalaman
                <br />
                Riset Penting?
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed" data-aos="fade-up" data-aos-duration="1000">
                Dengan menyediakan kesempatan untuk terlibat dalam riset, Mersif Academy membantu siswa mengembangkan
                berbagai keterampilan penting dan mempersiapkan mereka untuk sukses dalam pendidikan tinggi dan karir
                masa depan.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.id}
                    className={`skill-item ${activeSkill === skill.id ? "active" : ""}`}
                    data-aos={index % 2 === 0 ? "fade-down-right" : "fade-down-left"}
                    data-aos-duration="1000"
                    onClick={() => setActiveSkill(skill.id)}
                  >
                    <div className="bg-white text-blue-900 rounded-full w-8 h-8 flex-shrink-0 flex items-center justify-center font-bold">
                      {skill.number}
                    </div>
                    <span className="font-semibold">{skill.title}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 relative" data-aos="fade-up" data-aos-duration="1000">
                <div className={`bubble-content ${activeSkill ? "active" : ""}`}>
                  {skillContent[activeSkill as keyof typeof skillContent]}
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center lg:justify-end" data-aos="fade-up" data-aos-duration="1000">
              <div className="relative">
                <div className="relative">
                  <div className="w-80 h-96 bg-gradient-to-b from-blue-100 to-blue-200 rounded-3xl overflow-hidden p-4">
                    <div className="w-full h-full bg-white rounded-3xl overflow-hidden shadow-inner">
                      <img
                        src="/orang.jpg"
                        alt="Student"
                        className="w-full h-full object-cover object-center slowbounce"
                      />
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-red-500 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -left-12 w-12 h-12 bg-yellow-400 rounded-full opacity-30"></div>
                <div className="absolute top-20 -right-8 w-8 h-8 bg-blue-400 rounded-full opacity-40"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-gradient relative overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className="mb-12 border border-gray-300 rounded-lg p-8 animate__animated animate__fadeIn"
            data-aos="zoom-in"
            data-aos-duration="1000"
          >
            <h2 className="text-5xl font-bold text-black mb-6 text-center">VISI</h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl text-center mx-auto">
              Menjadi platform dalam pembelajaran riset, sains, dan teknologi, melalui percepatan adopsi teknologi dan
              integrasi pendidikan, serta mencetak inovator muda berdaya saing global melalui open innovation, menuju
              Indonesia Emas 2045.
            </p>
          </div>

          <div
            className="border border-gray-300 rounded-lg p-8 animate__animated animate__fadeIn mb-16"
            data-aos="zoom-out-up"
            data-aos-duration="1000"
          >
            <h2 className="text-5xl font-bold text-black mb-6 text-center">MISI</h2>
            <div className="flex justify-center">
              <ul className="space-y-3 text-gray-700 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Mengembangkan pelatihan riset dan sains yang inovatif dan global.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Menerapkan teknologi canggih dalam pembelajaran dan pelayanan.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Menyediakan program kolaborasi riset antara siswa SMA dan peneliti.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Memfasilitasi pertukaran ide antara siswa, guru, mahasiswa, dan peneliti.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Mendukung partisipasi dalam kompetisi riset dan sains global.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Menyediakan program pengembangan karakter, kepemimpinan, dan soft skills.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
