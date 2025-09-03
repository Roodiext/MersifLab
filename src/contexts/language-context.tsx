"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "id" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  mentorsData: any[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.product": "Produk",
    "nav.submission": "Pengajuan",
    "nav.program": "Program",
    "nav.achievements": "Prestasi",
    "nav.mentor": "Mentor",
    "nav.pillars": "Pilar",
    "nav.testimonials": "Testimoni",
    "nav.services": "Layanan",
    "nav.features": "Fitur",
    "nav.news": "Berita",
    "nav.contact": "Kontak",
    "nav.login": "Masuk",
    "nav.register": "Daftar",
    "nav.profile": "Profile",
    "nav.settings": "Pengaturan",
    "nav.admin": "Panel Admin",
    "nav.logout": "Keluar",
    "nav.subscribe": "Berlangganan",

    // Program submenu
    "nav.program.bootcamp": "Bootcamp",
    "nav.program.workshop": "Workshop",
    "nav.program.certification": "Sertifikasi",
    "nav.program.internship": "Magang",
    "nav.program.mentoring": "Mentoring",

    // Mentor submenu
    "nav.mentor.profiles": "Profil Mentor",
    "nav.mentor.expertise": "Keahlian",
    "nav.mentor.booking": "Booking Sesi",
    "nav.mentor.reviews": "Review Mentor",

    // Academy Navigation
    "nav.news.page": "Halaman Berita",
    "nav.news.latest": "Berita Terbaru",
    "nav.news.archive": "Arsip Berita",
    "nav.news.categories": "Kategori",
    "nav.services.academy": "Mersif Academy",
    "nav.services.iot": "Mersif IoT",
    "nav.services.vista": "Mersif Vista",
    "nav.services.creator": "Mersif Creator",

    // Hero Section
    "hero.title": "Membangun Ekosistem",
    "hero.title.highlight": "Inovasi Digital Indonesia",
    "hero.subtitle":
      "MersifLab berkomitmen untuk mengakselerasi talenta dan solusi digital melalui pilar layanan kami di bidang IoT, Edukasi, Kreativitas, dan Dampak Sosial.",
    "hero.button": "Jelajahi Mersif",
    "hero.mobile.title": "MersifLab",
    "hero.mobile.subtitle": "Platform Laboratorium Virtual Berbasis Mixed Reality Kolaboratif dan Imersif",

    // About Section
    "about.title": "Tentang Kami",
    "about.subtitle":
      "MersifLab adalah platform inovasi digital yang berfokus pada pengembangan talenta dan solusi teknologi masa depan.",
    "about.description":
      "Kami berkomitmen untuk menciptakan ekosistem digital yang inklusif dan berkelanjutan melalui berbagai layanan dan program yang dirancang untuk mengakselerasi pertumbuhan industri teknologi di Indonesia.",

    // Services Section
    "services.title": "Layanan Kami",
    "services.subtitle": "Solusi Digital Terdepan untuk Masa Depan",
    "services.academy.title": "Mersif Academy",
    "services.academy.description":
      "Platform pembelajaran digital yang inovatif untuk mengembangkan talenta teknologi masa depan.",
    "services.iot.title": "Mersif IoT",
    "services.iot.description": "Solusi Internet of Things yang terintegrasi untuk transformasi digital industri.",
    "services.vista.title": "Mersif Vista",
    "services.vista.description": "Platform visualisasi data dan analitik untuk pengambilan keputusan yang lebih baik.",
    "services.creator.title": "Mersif Creator",
    "services.creator.description": "Tools kreatif untuk mengembangkan konten digital yang menarik dan interaktif.",

    // Products Section
    "products.title": "Produk Kami",
    "products.subtitle": "Inovasi Teknologi untuk Masa Depan",
    "products.book.title": "Buku Berbasis AR",
    "products.book.description":
      "Buku interaktif dengan teknologi Augmented Reality untuk pembelajaran yang lebih menarik.",
    "products.gamification.title": "Gamifikasi Pembelajaran",
    "products.gamification.description": "Platform pembelajaran berbasis game untuk meningkatkan engagement siswa.",
    "products.creator.title": "Mersif Creator",
    "products.creator.description": "Tools kreatif untuk mengembangkan konten digital yang menarik.",
    "products.forum.title": "Mersif Forum",
    "products.forum.description": "Platform diskusi dan kolaborasi untuk komunitas teknologi.",
    "products.mobile.title": "Mersif Mobile Apps",
    "products.mobile.description": "Aplikasi mobile untuk akses layanan MersifLab di mana saja.",
    "products.room.title": "Mersif Room",
    "products.room.description": "Ruang virtual untuk kolaborasi dan pembelajaran online.",

    // Testimonials Section
    "testimonials.title": "Testimoni",
    "testimonials.subtitle": "Apa Kata Mereka Tentang Kami",

    // Partners Section
    "partners.title": "PARTNER KAMI",
    "partners.title.highlight": "TERPERCAYA",
    "partners.subtitle":
      "Kami berkolaborasi dengan partner terpercaya untuk menghadirkan solusi terbaik dan menciptakan nilai bersama.",

    // Mersif Numbers
    "mersif.numbers.title": "OUR",
    "mersif.numbers.title.highlight": "IMPACT",
    "mersif.numbers.title.suffix": "IN NUMBERS",
    "mersif.numbers.subtitle":
      "Dampak nyata kami dalam memajukan pendidikan di Indonesia dan sekitarnya melalui pelatihan, kolaborasi, dan inovasi digital.",
    "mersif.numbers.bottom.text":
      "Pencapaian ini merupakan hasil kolaborasi berkelanjutan dengan berbagai stakeholder dalam ekosistem pendidikan Indonesia.",

    // Contact Section
    "contact.title": "Hubungi Kami",
    "contact.subtitle": "Mari Berdiskusi Tentang Proyek Anda",
    "contact.form.name": "Nama Lengkap",
    "contact.form.email": "Email",
    "contact.form.message": "Pesan",
    "contact.form.submit": "Kirim Pesan",
    "contact.info.address": "Alamat",
    "contact.info.phone": "Telepon",
    "contact.info.email": "Email",

    // Academy specific translations
    "academy.hero.title": "Mersif Academy",
    "academy.hero.subtitle":
      "Platform pembelajaran riset, sains, dan teknologi berbasis open innovation untuk mencetak inovator muda Indonesia.",
    "academy.hero.learn.more": "Selengkapnya",
    "academy.hero.register.now": "Daftar Sekarang",
    "academy.hero.about.title": "We Bring Idea From Sketch To Life",
    "academy.hero.about.description":
      "Platform pembelajaran yang fokus pada riset, sains, dan teknologi, dirancang untuk mendorong inovasi terbuka. Kami berkomitmen untuk mencetak generasi inovator muda Indonesia yang siap bersaing di tingkat nasional dan internasional.",
    "academy.hero.vision.mission": "Visi Misi Kami",
    "academy.hero.vision.text1":
      "Menjadi platform dalam pembelajaran riset, sains, dan teknologi, melalui percepatan adopsi teknologi dan integrasi pendidikan, serta mencetak inovator muda berdaya saing global melalui open innovation, menuju Indonesia Emas 2045.",
    "academy.hero.vision.text2":
      "Mengembangkan pelatihan riset dan sains yang inovatif dan berdaya saing global dapat dilakukan dengan menerapkan teknologi canggih dalam pembelajaran maupun pelayanan, serta menyediakan program kolaborasi riset antara siswa SMA dan peneliti. Penting juga memfasilitasi pertukaran ide antara siswa, guru, mahasiswa, dan peneliti untuk menciptakan ekosistem ilmiah yang dinamis.",
    "academy.hero.vision.text3":
      "Dukungan terhadap partisipasi dalam kompetisi riset dan sains tingkat global menjadi salah satu cara meningkatkan daya saing, sementara penyediaan program pengembangan karakter, kepemimpinan, dan soft skills memastikan siswa tidak hanya unggul dalam bidang akademik, tetapi juga siap menghadapi tantangan dunia nyata.",

    // Partners
    "academy.partners.title": "Berkolaborasi dengan",
    "academy.partners.subtitle": "Bekerja sama dengan berbagai institusi pendidikan dan organisasi terkemuka",

    // Services
    "academy.services.title": "Program & Fasilitas",
    "academy.services.subtitle":
      "Kami menyediakan berbagai program dan fasilitas untuk mendukung pengembangan keterampilan dan pengalaman belajar.",
    "academy.services.interactive.classes": "Kelas Interaktif",
    "academy.services.interactive.desc": "Pembelajaran berbasis diskusi & praktik langsung.",
    "academy.services.digital.lab": "Laboratorium Digital",
    "academy.services.digital.desc": "Akses ke perangkat & software terbaru.",
    "academy.services.mentoring": "Mentoring",
    "academy.services.mentoring.desc": "Bimbingan dari para mentor berpengalaman.",
    "academy.services.community": "Komunitas",
    "academy.services.community.desc": "Bergabung dengan komunitas pembelajar aktif.",

    // Achievements
    "academy.achievements.title": "PRESTASI KAMI",
    "academy.achievements.juara1.kti": "Juara I Lomba Karya Tulis Ilmiah",
    "academy.achievements.robot.teleoperasi": "Robot Teleoperasi",
    "academy.achievements.stasiun.cuaca": "Stasiun Cuaca Berbasis IoT",
    "academy.achievements.juara2.air": "Juara II Lomba Hari Air",
    "academy.achievements.lampu.portabel": "Lampu Portabel",
    "academy.achievements.cta.title": "Mau menjadi mereka dan berprestasi?",
    "academy.achievements.cta.button": "Daftar Sekarang",

    // Mentors
    "academy.mentors.title": "Mentor",
    "academy.mentors.subtitle":
      "Tim mentor berpengalaman yang siap membimbing Anda dalam perjalanan riset dan kompetisi sains",
    "academy.mentors.experience": "Pengalaman Mentor",

    // Packages
    "academy.packages.title": "Ayo Berlangganan Sekarang",
    "academy.packages.trial.name": "TRIAL",
    "academy.packages.trial.price": "Gratis",
    "academy.packages.trial.duration": "Online 1 pertemuan",
    "academy.packages.trial.description": "Cocok untuk siswa yang ingin memulai belajar penelitian",
    "academy.packages.basic.name": "BASIC",
    "academy.packages.basic.price": "Rp 100.000",
    "academy.packages.basic.duration": "1 pertemuan / 1 kelas",
    "academy.packages.basic.description": "Cocok untuk sekolah yang memerlukan pelatih ekstrakurikuler KIR",
    "academy.packages.pro.name": "PRO",
    "academy.packages.pro.price": "Rp 100.000",
    "academy.packages.pro.duration": "1 pertemuan / tim",
    "academy.packages.pro.description": "Cocok untuk siswa yang membutuhkan pendampingan kompetisi",
    "academy.packages.premium.name": "PREMIUM",
    "academy.packages.premium.price": "Rp 1.250.000",
    "academy.packages.premium.duration": "13 pertemuan / tim",
    "academy.packages.premium.description": "Cocok untuk sekolah yang membutuhkan pendamping riset",
    "academy.packages.features.brainstorming": "Brainstorming ide",
    "academy.packages.features.info.lomba": "Informasi lomba",
    "academy.packages.features.online.zoom": "Online via Zoom",
    "academy.packages.features.fun.science": "Fun science",
    "academy.packages.features.writing.guidance": "Pendampingan kepenulisan ilmiah",
    "academy.packages.features.assessment": "Asesmen minat & bakat",
    "academy.packages.features.presentation": "Pelatihan presentasi",
    "academy.packages.features.research.guidance": "Pendampingan riset",
    "academy.packages.features.prototype": "Pembuatan prototype",
    "academy.packages.select.package": "Pilih Paket",
    "academy.packages.form.title": "Form Pendaftaran",
    "academy.packages.form.selected": "Anda memilih paket",
    "academy.packages.form.name": "Nama Lengkap",
    "academy.packages.form.school": "Asal Sekolah",
    "academy.packages.form.email": "Email",
    "academy.packages.form.whatsapp": "Nomor WhatsApp",
    "academy.packages.form.message": "Pesan Tambahan (Opsional)",
    "academy.packages.form.whatsapp.button": "Kirim via WhatsApp",
    "academy.packages.form.email.button": "Kirim via Email",
    "academy.packages.form.validation.name": "Nama wajib diisi.",
    "academy.packages.form.validation.school": "Asal sekolah wajib diisi.",
    "academy.packages.form.validation.email.required": "Email wajib diisi.",
    "academy.packages.form.validation.email.invalid": "Format email tidak valid.",
    "academy.packages.form.validation.whatsapp.required": "Nomor WhatsApp wajib diisi.",
    "academy.packages.form.validation.whatsapp.numbers": "Nomor WhatsApp hanya boleh angka.",
    "academy.packages.form.validation.whatsapp.min": "Nomor WhatsApp minimal 10 digit.",
    "academy.packages.form.validation.whatsapp.max": "Nomor WhatsApp maksimal 15 digit.",

    // Footer
    "footer.description": "Platform inovasi digital untuk masa depan teknologi Indonesia.",
    "footer.quick.links": "Link Cepat",
    "footer.services": "Layanan",
    "footer.contact": "Kontak",
    "footer.copyright": "© 2024 MersifLab. Semua hak dilindungi.",
    "footer.follow.us": "Ikuti Kami",
    "footer.contact.us": "Hubungi Kami",
    "footer.address": "Alamat",
    "footer.phone": "Telepon",
    "footer.email": "Email",
    "footer.location": "Lokasi Kami",
    "footer.view.on.maps": "Lihat di Google Maps",
    "footer.quick.links.services": "Layanan",
    "footer.quick.links.company": "Perusahaan",
    "footer.quick.links.support": "Dukungan",
    "footer.quick.links.legal": "Legal",
    "footer.quick.links.vr.development": "Pengembangan VR",
    "footer.quick.links.ar": "Augmented Reality",
    "footer.quick.links.mobile.apps": "Aplikasi Mobile",
    "footer.quick.links.about.us": "Tentang Kami",
    "footer.quick.links.careers": "Karir",
    "footer.quick.links.faq": "FAQ",
    "footer.quick.links.documentation": "Dokumentasi",
    "footer.quick.links.privacy.policy": "Kebijakan Privasi",
    "footer.quick.links.terms.service": "Syarat Layanan",
    "footer.quick.links.cookie.policy": "Cookie Policy",
    "footer.quick.links.contact": "Kontak",

    // Common
    "common.learn.more": "Pelajari Lebih Lanjut",
    "common.get.started": "Mulai Sekarang",
    "common.view.more": "Lihat Lebih Banyak",
    "common.read.more": "Baca Selengkapnya",

    // IoT specific translations
    // IoT Hero Section
    "iot.hero.title": "MersifIoT",
    "iot.hero.description.mobile":
      "Mersif IoT adalah platform yang memudahkan Anda menghubungkan, memantau, dan mengontrol perangkat IoT secara real-time. Cocok untuk bisnis dan personal yang ingin mengadopsi teknologi pintar.",
    "iot.hero.description.desktop":
      "Mersif IoT memberikan solusi untuk integrasi perangkat pintar Anda dengan mudah. Pantau, kendalikan, dan analisis data perangkat secara instan melalui satu platform terpadu.",
    "iot.hero.buy.now": "Beli Sekarang",
    "iot.hero.consultation": "Konsultasi",

    // IoT Products Section
    "iot.products.title": "Produk IoT Kami",
    "iot.products.subtitle": "Solusi teknologi terdepan untuk kebutuhan industri dan rumah tangga modern",
    "iot.products.view.detail": "Lihat Detail",
    "iot.products.modal.description": "Deskripsi Produk",
    "iot.products.modal.download.manual": "Download Manual Produk",
    "iot.products.modal.order.form": "Formulir Pemesanan",
    "iot.products.modal.full.name": "Nama Lengkap",
    "iot.products.modal.full.name.placeholder": "Masukkan nama lengkap Anda",
    "iot.products.modal.email": "Email",
    "iot.products.modal.email.placeholder": "nama@email.com",
    "iot.products.modal.quantity": "Jumlah Pesanan",
    "iot.products.modal.quantity.placeholder": "1",
    "iot.products.modal.order.now": "Pesan Sekarang",

    // IoT Custom Request Section
    "iot.custom.title": "Pengajuan Kebutuhan IoT",
    "iot.custom.form.name": "Nama",
    "iot.custom.form.email": "Email",
    "iot.custom.form.request": "Jelaskan kebutuhan IoT Anda",
    "iot.custom.form.submit": "Kirim Pengajuan",
    "iot.custom.form.submitting": "Mengirim...",
    "iot.custom.form.validation.name": "Nama wajib diisi",
    "iot.custom.form.validation.email.required": "Email wajib diisi",
    "iot.custom.form.validation.email.invalid": "Format email tidak valid",
    "iot.custom.form.validation.request": "Kebutuhan IoT wajib diisi",
    "iot.custom.why.title": "Kenapa Ajukan Kebutuhan IoT?",
    "iot.custom.why.benefit1": "Solusi IoT yang disesuaikan untuk bisnis Anda",
    "iot.custom.why.benefit2": "Efisiensi operasional dan penghematan biaya",
    "iot.custom.why.benefit3": "Integrasi mudah dengan sistem yang sudah ada",
    "iot.custom.toast.title": "Pengajuan terkirim",
    "iot.custom.toast.description": "Kami akan menghubungi Anda secepatnya.",

    // IoT Testimonials & FAQ Section
    "iot.testimonials.title": "Testimoni & FAQ",
    "iot.testimonials.andi": "Mersif IoT membantu bisnis saya jadi lebih efisien!",
    "iot.testimonials.siti": "Produk berkualitas dan support yang responsif.",
    "iot.faq.integration.q": "Apakah Mersif IoT bisa diintegrasikan dengan sistem saya?",
    "iot.faq.integration.a": "Ya, bisa disesuaikan sesuai kebutuhan.",
    "iot.faq.warranty.q": "Apakah tersedia garansi?",
    "iot.faq.warranty.a": "Ya, garansi produk 1 tahun.",
    "iot.faq.installation.q": "Berapa lama proses instalasi?",
    "iot.faq.installation.a": "Rata-rata 2–3 hari kerja tergantung kompleksitas.",

    // IoT Contact Section
    "iot.contact.title": "Hubungi Kami",
    "iot.contact.description":
      "Punya pertanyaan, masukan, atau ingin berdiskusi? Kami selalu siap membantu. Silakan isi formulir di sebelah kanan, dan tim kami akan segera menghubungi Anda.",
    "iot.contact.address": "Alamat",
    "iot.contact.phone": "Telepon",
    "iot.contact.email": "Email",
    "iot.contact.form.name": "Nama",
    "iot.contact.form.email": "Email",
    "iot.contact.form.message": "Pesan",
    "iot.contact.form.submit": "Kirim Pesan",
    "iot.contact.form.validation.all": "Harap isi semua field.",
    "iot.contact.form.success": "Pesan Anda telah terkirim! Kami akan menghubungi Anda.",

    // Vista specific translations
    // Vista Hero Section
    "vista.hero.title": "Empowering Learning",
    "vista.hero.title.highlight": "Inspiring Futures",
    "vista.hero.description":
      "adalah program pelatihan digital gratis untuk guru, siswa, dan mahasiswa yang dirancang untuk membekali keterampilan teknologi sesuai kebutuhan dunia saat ini.",
    "vista.hero.explore.programs": "Jelajahi Program",
    "vista.hero.join.training": "Bergabung Pelatihan",

    // Vista About Section
    "vista.about.title": "Tentang",
    "vista.about.title.highlight": "MersifVista",
    "vista.about.description":
      "MersifVista adalah program pelatihan digital gratis yang dirancang untuk guru, siswa, dan mahasiswa agar siap menghadapi tantangan teknologi masa kini.",

    // Vista Pillars Section
    "vista.pillars.title": "Our Pillars",
    "vista.pillars.visionary.title": "Visionary Innovation",
    "vista.pillars.visionary.desc":
      "Mendorong terciptanya inovasi teknologi yang visioner untuk pendidikan, tidak hanya mengikuti tren, tapi menciptakan arah baru.",
    "vista.pillars.impactful.title": "Impactful Learning",
    "vista.pillars.impactful.desc":
      "Setiap program yang dijalankan harus membawa dampak nyata, baik bagi guru, siswa, maupun mahasiswa, agar mereka lebih siap menghadapi tantangan dunia modern.",
    "vista.pillars.sustainable.title": "Sustainable Growth",
    "vista.pillars.sustainable.desc":
      "Membangun ekosistem pembelajaran yang berkelanjutan, relevan dengan kebutuhan jangka panjang, dan dapat terus dikembangkan.",
    "vista.pillars.technopreneurship.title": "Technopreneurship",
    "vista.pillars.technopreneurship.desc":
      "Menghubungkan teknologi dengan kewirausahaan untuk melahirkan technopreneur muda yang solutif dan adaptif.",
    "vista.pillars.acceleration.title": "Acceleration",
    "vista.pillars.acceleration.desc":
      "Bertindak sebagai akselerator yang mempercepat transformasi digital di dunia pendidikan melalui program, kolaborasi, dan inovasi berkelanjutan.",

    // Vista Impact Section
    "vista.impact.title": "Dampak Nyata MersifVista untuk Generasi Digital",
    "vista.impact.description": "Ratusan peserta dan puluhan institusi telah merasakan manfaat langsung program kami.",
    "vista.impact.participants": "peserta sudah mengikuti pelatihan MersifVista.",
    "vista.impact.institutions": "Terhubung dengan Sekolah dan Universitas",
    "vista.impact.testimonial.title": "Beberapa cerita dari peserta MersifVista",
    "vista.impact.testimonial.name": "Arif Setiyajaya",
    "vista.impact.testimonial.role": "Guru di Surabaya",
    "vista.impact.testimonial.text":
      "MersifVista membantu wawasan saya tentang bagaimana AI dapat meningkatkan pembelajaran di kelas dan memberi nilai baru bagi siswa.",
    "vista.impact.more": "Selengkapnya →",

    // Vista Form Section
    "vista.form.title": "Ingin bergabung dengan",
    "vista.form.title.highlight": "MersiVista",
    "vista.form.subtitle": "Daftar sekarang dan jadilah bagian dari transformasi pendidikan digital!",
    "vista.form.form.title": "Isi Formulir Ini",
    "vista.form.name": "Nama :",
    "vista.form.name.placeholder": "Masukkan Nama Lengkap Anda",
    "vista.form.email": "Email :",
    "vista.form.email.placeholder": "example@gmail.com",
    "vista.form.question": "Pertanyaan :",
    "vista.form.question.placeholder": "I want ask...",
    "vista.form.submit": "Submit",

    // Vista Footer Section
    "vista.footer.description":
      "Menjadi akselerator pendidikan berbasis teknologi yang inovatif, berdampak luas, dan berkelanjutan untuk mencetak generasi pembelajar serta technopreneur masa depan",
    "vista.footer.location": "Location",
    "vista.footer.location.address": "example RT 02",
    "vista.footer.email": "Email",
    "vista.footer.email.address": "example@gmail.com",
    "vista.footer.copyright": "© MersifVista",
    "vista.footer.rights": "All Right Reserved",

    // Creator Hero Section
    "creator.hero.title": "Mersif",
    "creator.hero.title.highlight": "Creator",
    "creator.hero.subtitle.mobile":
      "Buat game interaktif dalam hitungan menit! Semua game yang dibuat dengan Mersif Creator akan otomatis tersedia di Mersif Room untuk dimainkan bersama.",
    "creator.hero.subtitle.desktop":
      "Lihat game dan aplikasi interaktif yang mengedukasi dan menghibur. Sampaikan materi pembelajaran dengan cara yang menyenangkan dan mudah dipahami.",
    "creator.hero.button.create": "Mulai Buat Game",
    "creator.hero.button.explore": "Jelajahi",

    // Creator About Section
    "creator.about.title": "Tentang",
    "creator.about.title.highlight": "Mersif Creator",
    "creator.about.description":
      "Mersif Creator adalah platform revolusioner yang menghadirkan ruang virtual interaktif untuk pembelajaran dan eksplorasi. Dengan teknologi VR dan AR terdepan, kami menciptakan pengalaman edukatif yang imersif dan menyenangkan.",
    "creator.about.features.immersive.title": "Teknologi Immersive",
    "creator.about.features.immersive.desc":
      "Menghadirkan pengalaman pembelajaran yang mendalam melalui teknologi VR dan AR yang canggih dan interaktif.",
    "creator.about.features.virtual.title": "Ruang Virtual Beragam",
    "creator.about.features.virtual.desc":
      "Menyediakan berbagai jenis ruang virtual seperti Cube, Custom Shape, dan Lab Kimia untuk eksplorasi tanpa batas.",
    "creator.about.features.collaboration.title": "Kolaborasi Real-time",
    "creator.about.features.collaboration.desc":
      "Memungkinkan pembelajaran kolaboratif dengan sesama pengguna dalam lingkungan virtual yang aman dan terkontrol.",
    "creator.about.features.creativity.title": "Kreativitas Tanpa Batas",
    "creator.about.features.creativity.desc":
      "Platform yang membebaskan kreativitas untuk menciptakan, bereksperimen, dan belajar dengan cara yang menyenangkan.",
    "creator.about.stats.rooms": "Ruang Virtual Dibuat",
    "creator.about.stats.types": "Jenis Ruang Tersedia",
    "creator.about.stats.satisfaction": "Kepuasan Pengguna",

    // Creator Features Section
    "creator.features.title": "Fitur",
    "creator.features.title.highlight": "Unggulan",
    "creator.features.description":
      "Nikmati berbagai fitur canggih Mersif Creator yang dirancang khusus untuk memberikan pengalaman pembelajaran virtual yang imersif dan interaktif.",
    "creator.features.virtual3d.title": "Ruang Virtual 3D",
    "creator.features.virtual3d.desc":
      "Ciptakan dan jelajahi ruang virtual 3D yang realistis dengan teknologi rendering terdepan.",
    "creator.features.customization.title": "Kustomisasi Bebas",
    "creator.features.customization.desc":
      "Personalisasi ruang virtual Anda dengan berbagai bentuk, warna, dan elemen interaktif sesuai kebutuhan.",
    "creator.features.realtime.title": "Kolaborasi Real-time",
    "creator.features.realtime.desc":
      "Bekerja sama dengan pengguna lain dalam ruang virtual yang sama secara bersamaan.",
    "creator.features.intuitive.title": "Kontrol Intuitif",
    "creator.features.intuitive.desc":
      "Interface yang mudah dipahami untuk navigasi dan interaksi dalam lingkungan virtual.",
    "creator.features.safe.title": "Lingkungan Aman",
    "creator.features.safe.desc":
      "Ruang virtual yang aman dan terkontrol untuk pembelajaran dan eksplorasi tanpa risiko.",
    "creator.features.performance.title": "Performa Optimal",
    "creator.features.performance.desc":
      "Teknologi optimasi canggih untuk pengalaman virtual yang lancar di berbagai perangkat.",

    // Creator The Rooms Section
    "creator.rooms.title": "Jelajahi",
    "creator.rooms.title.highlight": "The Rooms",
    "creator.rooms.description":
      "Masuki dunia pembelajaran interaktif dengan berbagai ruang virtual yang dirancang khusus untuk memberikan pengalaman edukatif yang tak terlupakan.",
    "creator.rooms.cube.title": "Cube",
    "creator.rooms.cube.desc":
      "Ruang eksplorasi 3D dengan bentuk geometri dasar. Pelajari konsep matematika dan fisika melalui manipulasi objek kubus interaktif.",
    "creator.rooms.cube.features.geometry": "Geometri 3D",
    "creator.rooms.cube.features.manipulation": "Manipulasi Objek",
    "creator.rooms.cube.features.visualization": "Visualisasi Konsep",
    "creator.rooms.custom.title": "Custom Shape",
    "creator.rooms.custom.desc":
      "Ciptakan dan eksplorasi bentuk-bentuk unik sesuai kreativitas Anda. Ruang tak terbatas untuk pembelajaran yang personal.",
    "creator.rooms.custom.features.design": "Desain Bebas",
    "creator.rooms.custom.features.creativity": "Kreativitas Tanpa Batas",
    "creator.rooms.custom.features.personalization": "Personalisasi",
    "creator.rooms.lab.title": "Lab Kimia",
    "creator.rooms.lab.desc":
      "Laboratorium kimia virtual yang aman dan interaktif. Lakukan eksperimen dengan berbagai bahan kimia tanpa risiko.",
    "creator.rooms.lab.features.safe": "Eksperimen Aman",
    "creator.rooms.lab.features.realistic": "Simulasi Realistis",
    "creator.rooms.lab.features.practical": "Pembelajaran Praktis",
    "creator.rooms.button.explore": "Jelajahi",
    "creator.rooms.button.enter": "Masuk Lab",
    "creator.rooms.status.live": "Live",
    "creator.rooms.cta.title": "Punya Ide Room Baru?",
    "creator.rooms.cta.desc": "Berkolaborasi dengan kami untuk menciptakan pengalaman pembelajaran yang lebih beragam.",
    "creator.rooms.cta.button": "Hubungi Kami",

    // Creator Testimonials Section
    "creator.testimonials.title": "Apa Kata",
    "creator.testimonials.title.highlight": "Pengguna",
    "creator.testimonials.description":
      "Dengarkan pengalaman nyata dari para pengguna yang telah merasakan manfaat ruang virtual Mersif Creator dalam pembelajaran dan eksplorasi kreatif.",
    "creator.testimonials.sarah.name": "Dr. Sarah Wijaya",
    "creator.testimonials.sarah.role": "Dosen Universitas Indonesia",
    "creator.testimonials.sarah.content":
      "Mersif Creator telah merevolusi cara saya mengajar. Mahasiswa dapat memahami konsep kompleks melalui visualisasi 3D yang interaktif dalam ruang virtual.",
    "creator.testimonials.ahmad.name": "Ahmad Rizki",
    "creator.testimonials.ahmad.role": "Guru SMA Negeri 1 Jakarta",
    "creator.testimonials.ahmad.content":
      "Lab Kimia virtual di Mersif Creator memungkinkan siswa melakukan eksperimen dengan aman. Mereka lebih antusias dan pemahaman meningkat drastis.",
    "creator.testimonials.maya.name": "Maya Sari",
    "creator.testimonials.maya.role": "Developer & Educator",
    "creator.testimonials.maya.content":
      "Custom Shape room memberikan kebebasan kreativitas yang luar biasa. Saya dapat membuat lingkungan pembelajaran yang sesuai dengan kebutuhan spesifik.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.product": "Product",
    "nav.submission": "Submission",
    "nav.program": "Program",
    "nav.achievements": "Achievements",
    "nav.mentor": "Mentor",
    "nav.pillars": "Pillars",
    "nav.testimonials": "Testimonials",
    "nav.services": "Services",
    "nav.features": "Features",
    "nav.news": "News",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.profile": "Profile",
    "nav.settings": "Settings",
    "nav.admin": "Admin Panel",
    "nav.logout": "Logout",
    "nav.subscribe": "Subscribe",

    // Program submenu
    "nav.program.bootcamp": "Bootcamp",
    "nav.program.workshop": "Workshop",
    "nav.program.certification": "Certification",
    "nav.program.internship": "Internship",
    "nav.program.mentoring": "Mentoring",

    // Mentor submenu
    "nav.mentor.profiles": "Mentor Profiles",
    "nav.mentor.expertise": "Expertise",
    "nav.mentor.booking": "Book Session",
    "nav.mentor.reviews": "Mentor Reviews",

    // Academy Navigation
    "nav.news.page": "News Page",
    "nav.news.latest": "Latest News",
    "nav.news.archive": "News Archive",
    "nav.news.categories": "Categories",
    "nav.services.academy": "Mersif Academy",
    "nav.services.iot": "Mersif IoT",
    "nav.services.vista": "Mersif Vista",
    "nav.services.creator": "Mersif Creator",

    // Hero Section
    "hero.title": "Building Indonesia's",
    "hero.title.highlight": "Digital Innovation Ecosystem",
    "hero.subtitle":
      "MersifLab is committed to accelerating digital talent and solutions through our service pillars in IoT, Education, Creativity, and Social Impact.",
    "hero.button": "Explore Mersif",
    "hero.mobile.title": "MersifLab",
    "hero.mobile.subtitle": "Collaborative and Immersive Mixed Reality-Based Virtual Laboratory Platform",

    // About Section
    "about.title": "About Us",
    "about.subtitle":
      "MersifLab is a digital innovation platform focused on developing future technology talent and solutions.",
    "about.description":
      "We are committed to creating an inclusive and sustainable digital ecosystem through various services and programs designed to accelerate the growth of the technology industry in Indonesia.",

    // Services Section
    "services.title": "Our Services",
    "services.subtitle": "Leading Digital Solutions for the Future",
    "services.academy.title": "Mersif Academy",
    "services.academy.description": "Innovative digital learning platform for developing future technology talent.",
    "services.iot.title": "Mersif IoT",
    "services.iot.description": "Integrated Internet of Things solutions for industrial digital transformation.",
    "services.vista.title": "Mersif Vista",
    "services.vista.description": "Data visualization and analytics platform for better decision making.",
    "services.creator.title": "Mersif Creator",
    "services.creator.description": "Creative tools for developing engaging and interactive digital content.",

    // Products Section
    "products.title": "Our Products",
    "products.subtitle": "Technology Innovation for the Future",
    "products.book.title": "AR-Based Book",
    "products.book.description": "Interactive book with Augmented Reality technology for more engaging learning.",
    "products.gamification.title": "Learning Gamification",
    "products.gamification.description": "Game-based learning platform to increase student engagement.",
    "products.creator.title": "Mersif Creator",
    "products.creator.description": "Creative tools for developing engaging digital content.",
    "products.forum.title": "Mersif Forum",
    "products.forum.description": "Discussion and collaboration platform for the technology community.",
    "products.mobile.title": "Mersif Mobile Apps",
    "products.mobile.description": "Mobile applications for accessing MersifLab services anywhere.",
    "products.room.title": "Mersif Room",
    "products.room.description": "Virtual room for online collaboration and learning.",

    // Testimonials Section
    "testimonials.title": "Testimonials",
    "testimonials.subtitle": "What They Say About Us",

    // Partners Section
    "partners.title": "OUR TRUSTED",
    "partners.title.highlight": "PARTNERS",
    "partners.subtitle": "We collaborate with trusted partners to deliver the best solutions and create shared value.",

    // Mersif Numbers
    "mersif.numbers.title": "OUR",
    "mersif.numbers.title.highlight": "IMPACT",
    "mersif.numbers.title.suffix": "IN NUMBERS",
    "mersif.numbers.subtitle":
      "Our real impact in advancing education in Indonesia and surrounding areas through training, collaboration, and digital innovation.",
    "mersif.numbers.bottom.text":
      "These achievements are the result of ongoing collaboration with various stakeholders in Indonesia's education ecosystem.",

    // Contact Section
    "contact.title": "Contact Us",
    "contact.subtitle": "Let's Discuss Your Project",
    "contact.form.name": "Full Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.submit": "Send Message",
    "contact.info.address": "Address",
    "contact.info.phone": "Phone",
    "contact.info.email": "Email",

    // Academy specific translations
    "academy.hero.title": "Mersif Academy",
    "academy.hero.subtitle":
      "Open innovation-based research, science, and technology learning platform to create young Indonesian innovators.",
    "academy.hero.learn.more": "Learn More",
    "academy.hero.register.now": "Register Now",
    "academy.hero.about.title": "We Bring Idea From Sketch To Life",
    "academy.hero.about.description":
      "A learning platform focused on research, science, and technology, designed to encourage open innovation. We are committed to creating a generation of young Indonesian innovators ready to compete at national and international levels.",
    "academy.hero.vision.mission": "Our Vision & Mission",
    "academy.hero.vision.text1":
      "To become a platform in research, science, and technology learning, through accelerating technology adoption and educational integration, as well as creating globally competitive young innovators through open innovation, towards Golden Indonesia 2045.",
    "academy.hero.vision.text2":
      "Developing innovative and globally competitive research and science training can be done by applying advanced technology in learning and services, as well as providing research collaboration programs between high school students and researchers. It is also important to facilitate the exchange of ideas between students, teachers, university students, and researchers to create a dynamic scientific ecosystem.",
    "academy.hero.vision.text3":
      "Support for participation in global-level research and science competitions is one way to increase competitiveness, while providing character development, leadership, and soft skills programs ensures students are not only excellent in academics, but also ready to face real-world challenges.",

    // Partners
    "academy.partners.title": "Collaborate with",
    "academy.partners.subtitle": "Collaborating with various leading educational institutions and organizations",

    // Services
    "academy.services.title": "Programs & Facilities",
    "academy.services.subtitle":
      "We provide various programs and facilities to support skill development and learning experiences.",
    "academy.services.interactive.classes": "Interactive Classes",
    "academy.services.interactive.desc": "Discussion-based learning & hands-on practice.",
    "academy.services.digital.lab": "Digital Laboratory",
    "academy.services.digital.desc": "Access to latest devices & software.",
    "academy.services.mentoring": "Mentoring",
    "academy.services.mentoring.desc": "Guidance from experienced mentors.",
    "academy.services.community": "Community",
    "academy.services.community.desc": "Join an active learning community.",

    // Achievements
    "academy.achievements.title": "OUR ACHIEVEMENTS",
    "academy.achievements.juara1.kti": "1st Place Scientific Writing Competition",
    "academy.achievements.robot.teleoperasi": "Teleoperation Robot",
    "academy.achievements.stasiun.cuaca": "IoT-Based Weather Station",
    "academy.achievements.juara2.air": "2nd Place Water Day Competition",
    "academy.achievements.lampu.portabel": "Portable Lamp",
    "academy.achievements.cta.title": "Want to be like them and achieve?",
    "academy.achievements.cta.button": "Register Now",

    // Mentors
    "academy.mentors.title": "Mentors",
    "academy.mentors.subtitle":
      "Experienced mentor team ready to guide you in your research and science competition journey",
    "academy.mentors.experience": "Mentor Experience",

    // Packages
    "academy.packages.title": "Subscribe Now",
    "academy.packages.trial.name": "TRIAL",
    "academy.packages.trial.price": "Free",
    "academy.packages.trial.duration": "Online 1 session",
    "academy.packages.trial.description": "Suitable for students who want to start learning research",
    "academy.packages.basic.name": "BASIC",
    "academy.packages.basic.price": "IDR 100,000",
    "academy.packages.basic.duration": "1 session / 1 class",
    "academy.packages.basic.description": "Suitable for schools that need extracurricular KIR trainers",
    "academy.packages.pro.name": "PRO",
    "academy.packages.pro.price": "IDR 100,000",
    "academy.packages.pro.duration": "1 session / team",
    "academy.packages.pro.description": "Suitable for students who need competition mentoring",
    "academy.packages.premium.name": "PREMIUM",
    "academy.packages.premium.price": "IDR 1,250,000",
    "academy.packages.premium.duration": "13 sessions / team",
    "academy.packages.premium.description": "Suitable for schools that need research mentoring",
    "academy.packages.features.brainstorming": "Idea brainstorming",
    "academy.packages.features.info.lomba": "Competition information",
    "academy.packages.features.online.zoom": "Online via Zoom",
    "academy.packages.features.fun.science": "Fun science",
    "academy.packages.features.writing.guidance": "Scientific writing guidance",
    "academy.packages.features.assessment": "Interest & talent assessment",
    "academy.packages.features.presentation": "Presentation training",
    "academy.packages.features.research.guidance": "Research guidance",
    "academy.packages.features.prototype": "Prototype creation",
    "academy.packages.select.package": "Select Package",
    "academy.packages.form.title": "Registration Form",
    "academy.packages.form.selected": "You selected package",
    "academy.packages.form.name": "Full Name",
    "academy.packages.form.school": "School Origin",
    "academy.packages.form.email": "Email",
    "academy.packages.form.whatsapp": "WhatsApp Number",
    "academy.packages.form.message": "Additional Message (Optional)",
    "academy.packages.form.whatsapp.button": "Send via WhatsApp",
    "academy.packages.form.email.button": "Send via Email",
    "academy.packages.form.validation.name": "Name is required.",
    "academy.packages.form.validation.school": "School origin is required.",
    "academy.packages.form.validation.email.required": "Email is required.",
    "academy.packages.form.validation.email.invalid": "Invalid email format.",
    "academy.packages.form.validation.whatsapp.required": "WhatsApp number is required.",
    "academy.packages.form.validation.whatsapp.numbers": "WhatsApp number must be numbers only.",
    "academy.packages.form.validation.whatsapp.min": "WhatsApp number minimum 10 digits.",
    "academy.packages.form.validation.whatsapp.max": "WhatsApp number maximum 15 digits.",

    // Footer
    "footer.description": "Digital innovation platform for Indonesia's technology future.",
    "footer.quick.links": "Quick Links",
    "footer.services": "Services",
    "footer.contact": "Contact",
    "footer.copyright": "© 2024 MersifLab. All rights reserved.",
    "footer.follow.us": "Follow Us",
    "footer.contact.us": "Contact Us",
    "footer.address": "Address",
    "footer.phone": "Phone",
    "footer.email": "Email",
    "footer.location": "Our Location",
    "footer.view.on.maps": "View on Google Maps",
    "footer.quick.links.services": "Services",
    "footer.quick.links.company": "Company",
    "footer.quick.links.support": "Support",
    "footer.quick.links.legal": "Legal",
    "footer.quick.links.vr.development": "VR Development",
    "footer.quick.links.ar": "Augmented Reality",
    "footer.quick.links.mobile.apps": "Mobile Apps",
    "footer.quick.links.about.us": "About Us",
    "footer.quick.links.careers": "Careers",
    "footer.quick.links.faq": "FAQ",
    "footer.quick.links.documentation": "Documentation",
    "footer.quick.links.privacy.policy": "Privacy Policy",
    "footer.quick.links.terms.service": "Terms of Service",
    "footer.quick.links.cookie.policy": "Cookie Policy",
    "footer.quick.links.contact": "Contact",

    // Common
    "common.learn.more": "Learn More",
    "common.get.started": "Get Started",
    "common.view.more": "View More",
    "common.read.more": "Read More",

    // IoT specific translations in English
    // IoT Hero Section
    "iot.hero.title": "MersifIoT",
    "iot.hero.description.mobile":
      "Mersif IoT is a platform that makes it easy for you to connect, monitor, and control IoT devices in real-time. Suitable for businesses and individuals who want to adopt smart technology.",
    "iot.hero.description.desktop":
      "Mersif IoT provides solutions for easy integration of your smart devices. Monitor, control, and analyze device data instantly through one unified platform.",
    "iot.hero.buy.now": "Buy Now",
    "iot.hero.consultation": "Consultation",

    // IoT Products Section
    "iot.products.title": "Our IoT Products",
    "iot.products.subtitle": "Leading technology solutions for modern industrial and household needs",
    "iot.products.view.detail": "View Details",
    "iot.products.modal.description": "Product Description",
    "iot.products.modal.download.manual": "Download Product Manual",
    "iot.products.modal.order.form": "Order Form",
    "iot.products.modal.full.name": "Full Name",
    "iot.products.modal.full.name.placeholder": "Enter your full name",
    "iot.products.modal.email": "Email",
    "iot.products.modal.email.placeholder": "name@email.com",
    "iot.products.modal.quantity": "Order Quantity",
    "iot.products.modal.quantity.placeholder": "1",
    "iot.products.modal.order.now": "Order Now",

    // IoT Custom Request Section
    "iot.custom.title": "IoT Requirements Submission",
    "iot.custom.form.name": "Name",
    "iot.custom.form.email": "Email",
    "iot.custom.form.request": "Describe your IoT needs",
    "iot.custom.form.submit": "Submit Request",
    "iot.custom.form.submitting": "Submitting...",
    "iot.custom.form.validation.name": "Name is required",
    "iot.custom.form.validation.email.required": "Email is required",
    "iot.custom.form.validation.email.invalid": "Invalid email format",
    "iot.custom.form.validation.request": "IoT requirements are required",
    "iot.custom.why.title": "Why Submit IoT Requirements?",
    "iot.custom.why.benefit1": "IoT solutions tailored to your business",
    "iot.custom.why.benefit2": "Operational efficiency and cost savings",
    "iot.custom.why.benefit3": "Easy integration with existing systems",
    "iot.custom.toast.title": "Request submitted",
    "iot.custom.toast.description": "We will contact you as soon as possible.",

    // IoT Testimonials & FAQ Section
    "iot.testimonials.title": "Testimonials & FAQ",
    "iot.testimonials.andi": "Mersif IoT helps my business become more efficient!",
    "iot.testimonials.siti": "Quality products and responsive support.",
    "iot.faq.integration.q": "Can Mersif IoT be integrated with my system?",
    "iot.faq.integration.a": "Yes, it can be customized according to needs.",
    "iot.faq.warranty.q": "Is warranty available?",
    "iot.faq.warranty.a": "Yes, 1 year product warranty.",
    "iot.faq.installation.q": "How long is the installation process?",
    "iot.faq.installation.a": "Average 2-3 working days depending on complexity.",

    // IoT Contact Section
    "iot.contact.title": "Contact Us",
    "iot.contact.description":
      "Have questions, feedback, or want to discuss? We are always ready to help. Please fill out the form on the right, and our team will contact you soon.",
    "iot.contact.address": "Address",
    "iot.contact.phone": "Phone",
    "iot.contact.email": "Email",
    "iot.contact.form.name": "Name",
    "iot.contact.form.email": "Email",
    "iot.contact.form.message": "Message",
    "iot.contact.form.submit": "Send Message",
    "iot.contact.form.validation.all": "Please fill in all fields.",
    "iot.contact.form.success": "Your message has been sent! We will contact you.",

    // Vista specific translations in English
    // Vista Hero Section
    "vista.hero.title": "Empowering Learning",
    "vista.hero.title.highlight": "Inspiring Futures",
    "vista.hero.description":
      "is a free digital training program for teachers, students, and university students designed to equip technology skills according to current world needs.",
    "vista.hero.explore.programs": "Explore Programs",
    "vista.hero.join.training": "Join Training",

    // Vista About Section
    "vista.about.title": "About",
    "vista.about.title.highlight": "MersifVista",
    "vista.about.description":
      "MersifVista is a free digital training program designed for teachers, students, and university students to be ready to face current technology challenges.",

    // Vista Pillars Section
    "vista.pillars.title": "Our Pillars",
    "vista.pillars.visionary.title": "Visionary Innovation",
    "vista.pillars.visionary.desc":
      "Encouraging the creation of visionary technological innovations for education, not just following trends, but creating new directions.",
    "vista.pillars.impactful.title": "Impactful Learning",
    "vista.pillars.impactful.desc":
      "Every program implemented must bring real impact, both for teachers, students, and university students, so they are better prepared to face modern world challenges.",
    "vista.pillars.sustainable.title": "Sustainable Growth",
    "vista.pillars.sustainable.desc":
      "Building a sustainable learning ecosystem, relevant to long-term needs, and can be continuously developed.",
    "vista.pillars.technopreneurship.title": "Technopreneurship",
    "vista.pillars.technopreneurship.desc":
      "Connecting technology with entrepreneurship to create young technopreneurs who are solution-oriented and adaptive.",
    "vista.pillars.acceleration.title": "Acceleration",
    "vista.pillars.acceleration.desc":
      "Acting as an accelerator that speeds up digital transformation in the education world through programs, collaboration, and continuous innovation.",

    // Vista Impact Section
    "vista.impact.title": "Real Impact of MersifVista for Digital Generation",
    "vista.impact.description":
      "Hundreds of participants and dozens of institutions have felt the direct benefits of our programs.",
    "vista.impact.participants": "participants have joined MersifVista training.",
    "vista.impact.institutions": "Connected with Schools and Universities",
    "vista.impact.testimonial.title": "Some stories from MersifVista participants",
    "vista.impact.testimonial.name": "Arif Setiyajaya",
    "vista.impact.testimonial.role": "Teacher in Surabaya",
    "vista.impact.testimonial.text":
      "MersifVista helps my insight on how AI can improve classroom learning and provide new value for students.",
    "vista.impact.more": "Read more →",

    // Vista Form Section
    "vista.form.title": "Want to join",
    "vista.form.title.highlight": "MersiVista",
    "vista.form.subtitle": "Register now and be part of the digital education transformation!",
    "vista.form.form.title": "Fill This Form",
    "vista.form.name": "Name :",
    "vista.form.name.placeholder": "Enter Your Full Name",
    "vista.form.email": "Email :",
    "vista.form.email.placeholder": "example@gmail.com",
    "vista.form.question": "Question :",
    "vista.form.question.placeholder": "I want ask...",
    "vista.form.submit": "Submit",

    // Vista Footer Section
    "vista.footer.description":
      "To become an innovative, impactful, and sustainable technology-based education accelerator to create future learners and technopreneurs",
    "vista.footer.location": "Location",
    "vista.footer.location.address": "example RT 02",
    "vista.footer.email": "Email",
    "vista.footer.email.address": "example@gmail.com",
    "vista.footer.copyright": "© MersifVista",
    "vista.footer.rights": "All Right Reserved",

    // Creator Hero Section
    "creator.hero.title": "Mersif",
    "creator.hero.title.highlight": "Creator",
    "creator.hero.subtitle.mobile":
      "Create interactive games in minutes! All games created with Mersif Creator will be automatically available in Mersif Room to play together.",
    "creator.hero.subtitle.desktop":
      "See interactive games and applications that educate and entertain. Deliver learning materials in a fun and easy-to-understand way.",
    "creator.hero.button.create": "Start Creating Games",
    "creator.hero.button.explore": "Explore",

    // Creator About Section
    "creator.about.title": "About",
    "creator.about.title.highlight": "Mersif Creator",
    "creator.about.description":
      "Mersif Creator is a revolutionary platform that brings interactive virtual spaces for learning and exploration. With cutting-edge VR and AR technology, we create immersive and enjoyable educational experiences.",
    "creator.about.features.immersive.title": "Immersive Technology",
    "creator.about.features.immersive.desc":
      "Delivering deep learning experiences through advanced and interactive VR and AR technology.",
    "creator.about.features.virtual.title": "Diverse Virtual Spaces",
    "creator.about.features.virtual.desc":
      "Providing various types of virtual spaces like Cube, Custom Shape, and Chemistry Lab for limitless exploration.",
    "creator.about.features.collaboration.title": "Real-time Collaboration",
    "creator.about.features.collaboration.desc":
      "Enabling collaborative learning with fellow users in a safe and controlled virtual environment.",
    "creator.about.features.creativity.title": "Limitless Creativity",
    "creator.about.features.creativity.desc":
      "A platform that unleashes creativity to create, experiment, and learn in a fun way.",
    "creator.about.stats.rooms": "Virtual Rooms Created",
    "creator.about.stats.types": "Room Types Available",
    "creator.about.stats.satisfaction": "User Satisfaction",

    // Creator Features Section
    "creator.features.title": "Featured",
    "creator.features.title.highlight": "Features",
    "creator.features.description":
      "Enjoy various advanced features of Mersif Creator specifically designed to provide immersive and interactive virtual learning experiences.",
    "creator.features.virtual3d.title": "3D Virtual Spaces",
    "creator.features.virtual3d.desc":
      "Create and explore realistic 3D virtual spaces with cutting-edge rendering technology.",
    "creator.features.customization.title": "Free Customization",
    "creator.features.customization.desc":
      "Personalize your virtual space with various shapes, colors, and interactive elements according to your needs.",
    "creator.features.realtime.title": "Real-time Collaboration",
    "creator.features.realtime.desc": "Work together with other users in the same virtual space simultaneously.",
    "creator.features.intuitive.title": "Intuitive Controls",
    "creator.features.intuitive.desc":
      "Easy-to-understand interface for navigation and interaction in virtual environments.",
    "creator.features.safe.title": "Safe Environment",
    "creator.features.safe.desc": "Safe and controlled virtual spaces for learning and exploration without risks.",
    "creator.features.performance.title": "Optimal Performance",
    "creator.features.performance.desc":
      "Advanced optimization technology for smooth virtual experiences across various devices.",

    // Creator The Rooms Section
    "creator.rooms.title": "Explore",
    "creator.rooms.title.highlight": "The Rooms",
    "creator.rooms.description":
      "Enter the world of interactive learning with various virtual spaces specifically designed to provide unforgettable educational experiences.",
    "creator.rooms.cube.title": "Cube",
    "creator.rooms.cube.desc":
      "3D exploration space with basic geometric shapes. Learn mathematical and physics concepts through interactive cube object manipulation.",
    "creator.rooms.cube.features.geometry": "3D Geometry",
    "creator.rooms.cube.features.manipulation": "Object Manipulation",
    "creator.rooms.cube.features.visualization": "Concept Visualization",
    "creator.rooms.custom.title": "Custom Shape",
    "creator.rooms.custom.desc":
      "Create and explore unique shapes according to your creativity. Unlimited space for personal learning.",
    "creator.rooms.custom.features.design": "Free Design",
    "creator.rooms.custom.features.creativity": "Limitless Creativity",
    "creator.rooms.custom.features.personalization": "Personalization",
    "creator.rooms.lab.title": "Chemistry Lab",
    "creator.rooms.lab.desc":
      "Safe and interactive virtual chemistry laboratory. Conduct experiments with various chemicals without risk.",
    "creator.rooms.lab.features.safe": "Safe Experiments",
    "creator.rooms.lab.features.realistic": "Realistic Simulation",
    "creator.rooms.lab.features.practical": "Practical Learning",
    "creator.rooms.button.explore": "Explore",
    "creator.rooms.button.enter": "Enter Lab",
    "creator.rooms.status.live": "Live",
    "creator.rooms.cta.title": "Have New Room Ideas?",
    "creator.rooms.cta.desc": "Collaborate with us to create more diverse learning experiences.",
    "creator.rooms.cta.button": "Contact Us",

    // Creator Testimonials Section
    "creator.testimonials.title": "What",
    "creator.testimonials.title.highlight": "Users Say",
    "creator.testimonials.description":
      "Listen to real experiences from users who have felt the benefits of Mersif Creator virtual spaces in learning and creative exploration.",
    "creator.testimonials.sarah.name": "Dr. Sarah Wijaya",
    "creator.testimonials.sarah.role": "Lecturer at University of Indonesia",
    "creator.testimonials.sarah.content":
      "Mersif Creator has revolutionized the way I teach. Students can understand complex concepts through interactive 3D visualization in virtual spaces.",
    "creator.testimonials.ahmad.name": "Ahmad Rizki",
    "creator.testimonials.ahmad.role": "Teacher at SMA Negeri 1 Jakarta",
    "creator.testimonials.ahmad.content":
      "The virtual Chemistry Lab in Mersif Creator allows students to conduct experiments safely. They are more enthusiastic and understanding has increased drastically.",
    "creator.testimonials.maya.name": "Maya Sari",
    "creator.testimonials.maya.role": "Developer & Educator",
    "creator.testimonials.maya.content":
      "Custom Shape room provides extraordinary creative freedom. I can create learning environments that suit specific needs.",
  },
}

const mentorsDataId = [
  {
    name: "Rozin Fata Ulvian",
    field: "Fisika dan Elektronika",
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

const mentorsDataEn = [
  {
    name: "Rozin Fata Ulvian",
    field: "Physics and Electronics",
    achievement: "Best CEO SEMESTA UNS 2006",
    desc: "Experienced in electronics projects and technology development",
    experience: [
      "CEO SEMESTA UNS (2006-2010)",
      "Applied Electronics Researcher",
      "Technology Consultant for 50+ companies",
      "Supervisor for 200+ engineering students",
    ],
  },
  {
    name: "Bagus Prayoga",
    field: "Physics and Energy",
    achievement: "Outstanding Student 1 UNS",
    desc: "Renewable energy expert with national competition experience",
    experience: [
      "Outstanding Student 1 UNS",
      "National Energy Competition Winner 2018",
      "Researcher at Renewable Energy Lab",
      "Mentor for 100+ physics students",
    ],
  },
  {
    name: "Atina Rahmawati",
    field: "Physics and Science",
    achievement: "Outstanding Student 1 FKIP UNS",
    desc: "Science education specialist with 8+ years teaching experience",
    experience: [
      "Outstanding Student 1 FKIP UNS",
      "High School Physics Teacher",
      "Science curriculum developer",
      "Physics olympiad trainer",
    ],
  },
  {
    name: "Moh. Abdul Mukhit",
    field: "Electronics and IoT",
    achievement: "Winner in 10+ competitions",
    desc: "IoT expert with National and International Competition experience",
    experience: [
      "1st Place National IoT Competition",
      "Smart home system developer",
      "IoT consultant for startups",
      "Founder of IoT Indonesia community",
    ],
  },
  {
    name: "Illyin Kurniana",
    field: "Food and Bio",
    achievement: "Winner in 5+ competitions",
    desc: "Food technology expert with National Competition experience",
    experience: [
      "Food Innovation Competition Winner",
      "Researcher at Biotechnology Lab",
      "Food industry consultant",
      "Student research supervisor",
    ],
  },
  {
    name: "Sinta Kristiana Putri",
    field: "Environment and Planning",
    achievement: "Winner in 15+ competitions",
    desc: "Environmental planning specialist with National Competition experience",
    experience: [
      "National Environmental Competition Winner",
      "Urban planning consultant",
      "Environmental activist",
      "Sustainability project supervisor",
    ],
  },
  {
    name: "Kiranda Dinata",
    field: "Material Physics and Electronics",
    achievement: "Experienced in 15+ Competitions",
    desc: "Material science expert with National Competition experience",
    experience: [
      "Nano material researcher",
      "Material physics competition winner",
      "Electronics industry consultant",
      "Thesis supervisor for 50+ students",
    ],
  },
  {
    name: "Ali Nur Mustofa",
    field: "Technical Geography",
    achievement: "Experienced in Geography Olympiad",
    desc: "Technical geography expert with National Research Competition experience",
    experience: [
      "PKM 2023 Finalist",
      "Geography Olympiad Winner",
      "Geographic information systems expert",
      "Regional mapping project supervisor",
    ],
  },
]

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id")

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "id" || savedLanguage === "en")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const mentorsData = language === "id" ? mentorsDataId : mentorsDataEn

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, mentorsData }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }

  return {
    language: context.language,
    setLanguage: context.setLanguage,
    t: context.t,
    mentorsData: context.mentorsData,
  }
}
