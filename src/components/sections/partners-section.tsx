"use client"

import Image from "next/image"  

export function PartnersSection() {
  const partners = [
    { name: "Partner 1", logo: "/img/partner/partner1.png" },
    { name: "Partner 2", logo: "/img/partner/partner2.png" },
    { name: "Partner 3", logo: "/img/partner/partner3.png" },
    { name: "Partner 4", logo: "/img/partner/partner4.png" },
    { name: "Partner 5", logo: "/img/partner/partner5.png" },
    { name: "Partner 6", logo: "/img/partner/partner6.png" },
    { name: "Partner 7", logo: "/img/partner/partner7.png" },
    { name: "Partner 8", logo: "/img/partner/partner8.png" },
    { name: "Partner 9", logo: "/img/partner/partner9.png" },
    { name: "Partner 10", logo: "/img/partner/partner10.png" },
    { name: "Partner 11", logo: "/img/partner/partner11.png" },
    { name: "Partner 12", logo: "/img/partner/partner12.png" },
    { name: "Partner 13", logo: "/img/partner/partner13.png" },
    { name: "Partner 14", logo: "/img/partner/partner14.png" },
    { name: "Partner 15", logo: "/img/partner/partner15.png" },
    { name: "Partner 16", logo: "/img/partner/partner16.png" },
    { name: "Partner 17", logo: "/img/partner/partner17.png" },
    { name: "Partner 18", logo: "/img/partner/partner18.png" },
  ]

  return (
    <section id="partners" className="w-full py-8 md:py-12 lg:py-16 bg-white overflow-hidden">
      <div className="w-full text-center">
        <div className="mt-6 relative w-full">
          <div className="flex animate-scroll w-full">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div key={index} className="flex-shrink-0 mx-8 flex justify-center items-center min-w-[120px]">
                <div className="partner-logo-container">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={150}
                    height={80}
                    className="object-contain h-16 w-auto opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div key={`duplicate-${index}`} className="flex-shrink-0 mx-8 flex justify-center items-center min-w-[120px]">
                <div className="partner-logo-container">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    width={150}
                    height={80}
                    className="object-contain h-16 w-auto opacity-70 hover:opacity-100 transition-all duration-300 hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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