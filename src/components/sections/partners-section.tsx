"use client"

import Image from "next/image"  

export function PartnersSection() {
  const partners = [
    { name: "Partner 1", logo: "/img/partner2/partner1.svg" },
    { name: "Partner 2", logo: "/img/partner2/partner2.svg" },
    { name: "Partner 3", logo: "/img/partner2/partner3.svg" },
    { name: "Partner 4", logo: "/img/partner2/partner4.svg" },
    { name: "Partner 5", logo: "/img/partner2/partner5.svg" },
    { name: "Partner 6", logo: "/img/partner2/partner6.svg" },
    { name: "Partner 7", logo: "/img/partner2/partner7.svg" },
    { name: "Partner 8", logo: "/img/partner2/partner8.svg" },
    { name: "Partner 9", logo: "/img/partner2/partner9.svg" },
    { name: "Partner 10", logo: "/img/partner2/partner10.svg" },
    { name: "Partner 11", logo: "/img/partner2/partner11.svg" },
    { name: "Partner 12", logo: "/img/partner2/partner12.svg" },
    { name: "Partner 13", logo: "/img/partner2/partner13.svg" },
    { name: "Partner 14", logo: "/img/partner2/partner14.svg" },
    { name: "Partner 15", logo: "/img/partner2/partner15.svg" },
    { name: "Partner 16", logo: "/img/partner3/partner16.svg" },
    { name: "Partner 17", logo: "/img/partner3/partner17.svg" },
    { name: "Partner 18", logo: "/img/partner3/partner18.svg" },
    { name: "Partner 19", logo: "/img/partner3/partner19.svg" },
  ]

  return (
    <section id="partners" className="w-full py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="w-full text-center">

{/* Heading */}
        <h2
          style={{ fontFamily: "Poppins, sans-serif" }}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-3"
        >
          PARTNER KAMI
          <span className="text-[#007bff]"> TERPERCAYA</span>
        </h2>

        {/* Subheading */}
        <p
          style={{ fontFamily: "Inter, sans-serif" }}
          className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
        >
          Kami berkolaborasi dengan partner terpercaya untuk menghadirkan solusi
          terbaik dan menciptakan nilai bersama.
        </p>




        {/* Container Logo */}
        <div className="mt-6 relative w-full">
          <div className="flex animate-scroll w-full">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div key={index} className="flex-shrink-0 mx-8 flex justify-center items-center min-w-[250px]">
                <div className="partner-logo-container">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={300}
                    height={160}
                    className="object-contain h-32 w-auto opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div key={`duplicate-${index}`} className="flex-shrink-0 mx-8 flex justify-center items-center min-w-[250px]">
                <div className="partner-logo-container">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={300}
                    height={160}
                    className="object-contain h-32 w-auto opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Khusus */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 50s linear infinite;
          width: max-content;
          min-width: 200%;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        #partners {
          mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
        }

        .partner-logo-container {
          position: relative;
          display: inline-block;
        }
      `}</style>
    </section>
  )
}
