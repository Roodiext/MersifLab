"use client";

export default function FooterVista() {
  return (
    <footer className="bg-[#000B49] text-white px-8 py-10 rounded-t-3xl mt-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left: Logo & Description */}
        <div className="flex-1">
          {/* Gambar Logo */}
          <img src="/img/logomersifvistaputih.svg" alt="Logo MersifVista" className="w-32 mb-4" />
          <p className="text-sm text-white/80 leading-relaxed max-w-sm">
            Menjadi akselerator pendidikan berbasis teknologi yang inovatif, berdampak luas, dan berkelanjutan untuk mencetak generasi pembelajar serta technopreneur masa depan
          </p>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="https://www.svgrepo.com/show/452229/instagram-1.svg" alt="Instagram" className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="https://www.svgrepo.com/show/475647/youtube-color.svg" alt="YouTube" className="w-5 h-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex-1 flex flex-col sm:flex-row justify-end gap-10">
          {/* Location */}
          <div>
            <p className="font-semibold mb-2">Location</p>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <img src="https://www.svgrepo.com/show/510211/location-pin-map.svg" alt="Location" className="w-4 h-4" />
              <span>example RT 02</span>
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="font-semibold mb-2">Email</p>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <img src="https://www.svgrepo.com/show/512340/mail.svg" alt="Email" className="w-4 h-4" />
              <a href="mailto:example@gmail.com" className="underline">example@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <hr className="border-white/20 my-6" />

      <div className="flex justify-between text-sm text-white/50">
        <span>© MersifVista</span>
        <span>All Right Reserved</span>
      </div>
    </footer>
  );
}
