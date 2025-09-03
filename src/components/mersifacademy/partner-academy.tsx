"use client"

import { useLanguage } from "@/contexts/language-context"

export default function PartnerAcademy() {
  const { t } = useLanguage()

  return (
    <section className="py-16 bg-white relative">
      <style jsx>{`
        .marquee-wrapper {
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        .marquee-wrapper::before,
        .marquee-wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          width: 100px;
          height: 100%;
          z-index: 10;
          pointer-events: none;
        }
        .marquee-wrapper::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        .marquee-wrapper::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
        .marquee-track,
        .marquee-track-reverse {
          display: flex;
          gap: 5rem;
          width: max-content;
          align-items: center;
        }
        .marquee-logo {
          height: 120px;
          width: auto;
          object-fit: contain;
        }
        @media (min-width: 768px) {
          .marquee-logo {
            height: 140px;
          }
        }
        .marquee-track {
          animation: marquee-left 20s linear infinite;
        }
        .marquee-track-reverse {
          animation: marquee-right 20s linear infinite;
        }
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl font-bold mb-4"
            data-aos="fade-down"
            data-aos-duration="1000"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {t("academy.partners.title")}
          </h2>
          <p
            className="text-gray-600"
            data-aos="fade-up"
            data-aos-duration="1000"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {t("academy.partners.subtitle")}
          </p>
        </div>

        {/* ROW 1 */}
        <div className="marquee-wrapper mb-6 px-12">
          <div className="marquee-track" data-aos="fade-up" data-aos-duration="500">
            <img src="/mersif-academy/logo/download1.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download2.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download3.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download4.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download5.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download6.jpg" className="marquee-logo" />

            {/* Duplicate */}
            <img src="/mersif-academy/logo/download1.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download2.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download3.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download4.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download5.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download6.jpg" className="marquee-logo" />
          </div>
        </div>

        {/* ROW 2 */}
        <div className="marquee-wrapper mb-6 px-12">
          <div className="marquee-track-reverse" data-aos="fade-down" data-aos-duration="500">
            <img src="/mersif-academy/logo/download7.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download8.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download9.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download10.png" className="marquee-logo" />
            <img src="/mersif-academy/logo/download11.png" className="marquee-logo" />
            <img src="/mersif-academy/logo/download12.png" className="marquee-logo" />

            {/* Duplicate */}
            <img src="/mersif-academy/logo/download7.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download8.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download9.jpg" className="marquee-logo" />
            <img src="/mersif-academy/logo/download10.png" className="marquee-logo" />
            <img src="/mersif-academy/logo/download11.png" className="marquee-logo" />
            <img src="/mersif-academy/logo/download12.png" className="marquee-logo" />
          </div>
        </div>
      </div>
    </section>
  )
}
