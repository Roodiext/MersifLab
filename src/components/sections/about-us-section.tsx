"use client"
import Image from "next/image"

export function AboutUsSection() {
  return (
    <section id="about" className="w-full py-20 md:py-28 lg:py-32 relative overflow-hidden bg-white">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url('/images/grid-pattern.png')`,
          backgroundSize: "30px 30px",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Gambar - muncul pertama di mobile */}
          <div className="relative order-1 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-[300px] h-[250px] sm:w-[350px] sm:h-[300px] md:w-[450px] md:h-[380px] lg:w-[500px] lg:h-[420px]">
              <Image
                src="/img/about.jpg"
                alt="Person wearing VR headset"
                layout="fill"
                objectFit="cover"
                className="transform -translate-y-2"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/90 to-transparent rounded-b-xl pointer-events-none z-10" />
            </div>
          </div>

          {/* Konten */}
          <div className="order-2 lg:order-2 space-y-6 text-center lg:text-left">
            <div className="space-y-2">
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#252B42] leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                About Us
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-[#737373] text-base sm:text-lg leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                MersifLab merevolusi pengalaman belajar yang didukung oleh teknologi Augmented Reality, Virtual Reality,
                dan Internet of Things. Misi kami adalah untuk meningkatkan kualitas pendidikan di Indonesia dengan
                membuat pembelajaran yang imersif dan interaktif yang dapat diakses oleh semua orang.
              </p>
            </div>

            {/* Icon boxes - di bawah teks */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
              <div className="w-32 h-32 flex items-center justify-center">
                <Image src="/img/steam.jpg" alt="STEAM logo" width={140} height={140} objectFit="contain" />
              </div>
              <div className="w-24 h-24 flex items-center justify-center">
                <Image
                  src="/img/quality.jpg"
                  alt="SDG 4 Quality Education"
                  width={96}
                  height={96}
                  objectFit="contain"
                />
              </div>
              <div className="w-24 h-24 flex items-center justify-center">
                <Image
                  src="/img/industry.jpg"
                  alt="SDG 9 Industry, Innovation, and Infrastructure"
                  width={96}
                  height={96}
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
