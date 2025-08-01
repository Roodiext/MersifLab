"use client"
import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define all translations
const translations = {
  en: {
    // Header translations
    home: "Home",
    about: "About",
    product: "Product",
    testimonial: "Testimonial",
    news: "News",
    newsPage: "News Page",
    latestNews: "Latest News",
    newsArchive: "News Archive",
    categories: "Categories",
    contact: "Contact",
    login: "Login",
    mersifLabLogo: "MersifLab Logo",
    language: "Language",

    // Hero section
    heroTitle: "MersifLab",
    heroSubtitle: "Virtual Laboratory Platform Based on Collaborative and Immersive Mixed Reality",

    // About section
    aboutTitle: "About Us",
    aboutDescription:
      "MersifLab revolutionizes learning experiences powered by Augmented Reality, Virtual Reality, and Internet of Things technology. Our mission is to improve the quality of education in Indonesia by making immersive and interactive learning accessible to everyone.",

    // Products section
    servicesTitle: "Services",
    servicesSubtitle: "Our amazing services for you to try",
    mersifAcademy: "Mersif Academy",
    mersifAcademyDesc: "Online learning platform",
    mersifIot: "Mersif IoT",
    mersifIotDesc: "Internet of Things solutions",
    mersifCreatorRoom: "Mersif Creator Room",
    mersifCreatorRoomDesc: "Virtual space creation platform",
    mersifVista: "Mersif Vista",
    mersifVistaDesc: "Data visualization and analytics",
    mersifMobileApps: "Mersif Mobile Apps",
    mersifMobileAppsDesc: "Mobile learning applications",
    mersifAR: "Mersif AR",
    mersifARDesc: "Augmented Reality learning",
    bukuAR: "AR-Based Educational Books",
    bukuARDesc: "Learning data analysis",

    // Numbers section
    numbersTitle: "OUR IMPACT IN NUMBERS",
    numbersSubtitle:
      "Our real impact in advancing education in Indonesia and beyond through training, collaboration, and digital innovation.",
    studentsReached: "Students Reached",
    teachersTrained: "Teachers Trained",
    institutionalPartners: "Institutional Partners",
    countries: "Countries",
    numbersFooter:
      "This achievement is the result of continuous collaboration with various stakeholders in the Indonesian education ecosystem.",

    // Testimonials section
    testimonialsTitle: "What They Say",
    testimonialsSubtitle: "User opinions about services and support from Mersif.",

    // News section
    newsTitle: "Latest News & Articles",
    newsSubtitle: "Follow the latest developments, innovations, and inspiring stories from MersifLab.",
    readMore: "Read more",
    viewAllNews: "View All News",

    // Contact section
    contactTitle: "Have something you want to ask?",
    contactSubtitle:
      "Have questions or need support? We're ready to help you succeed. Send us a message and we'll get back to you soon.",
    contactFormTitle: "Fill Out This Form",
    nameLabel: "Name:",
    namePlaceholder: "Enter your name",
    emailLabel: "Email:",
    emailPlaceholder: "example@gmail.com",
    questionLabel: "Question:",
    questionPlaceholder: "I want to ask...",
    submitButton: "Submit",

    // News posts
    newsPost1Title:
      "Potential for Sustainable Cooperation between MersifLab and SMP Negeri 13 Surakarta Post 3D Printing Workshop",
    newsPost1Snippet:
      "Surakarta - The success of the 3D printing workshop held at SMP Negeri 13 Surakarta with the MersifLab team as resource persons opens various opportunities for developing sustainable cooperation in the field of educational technology.",
    newsPost2Title:
      "Day 2: MersifLab Becomes Resource Person for Teacher Competency Enhancement in Utilizing 3D Printer Technology in Innovative Learning Media at SMP Negeri 13 Surakarta",
    newsPost2Snippet:
      "Surakarta - The second day of Teacher Competency Enhancement in Utilizing 3D Printer Technology in Innovative Learning Media at SMP Negeri 13 Surakarta took place with a focus on direct practice of 3D printing technology. The MersifLab team served as mentors to help teachers practice the technology they learned the previous day.",
    newsPost3Title:
      "Day 1: MersifLab Becomes Resource Person for Teacher Competency Enhancement in Utilizing 3D Printer Technology in Innovative Learning Media at SMP Negeri 13 Surakarta",
    newsPost3Snippet:
      "Surakarta - On the first day of Teacher Competency Enhancement in Utilizing 3D Printer Technology in Innovative Learning Media at SMP Negeri 13 Surakarta, the MersifLab startup team was present as a resource person providing 3D printing technology training to teachers.",
  },
  id: {
    // Header translations
    home: "Beranda",
    about: "Tentang",
    product: "Produk",
    testimonial: "Testimoni",
    news: "Berita",
    newsPage: "Halaman Berita",
    latestNews: "Berita Terbaru",
    newsArchive: "Arsip Berita",
    categories: "Kategori",
    contact: "Kontak",
    login: "Masuk",
    mersifLabLogo: "Logo MersifLab",
    language: "Bahasa",

    // Hero section
    heroTitle: "MersifLab",
    heroSubtitle: "Platform Laboratorium Virtual Berbasis Mixed Reality Kolaboratif dan Imersif",

    // About section
    aboutTitle: "Tentang Kami",
    aboutDescription:
      "MersifLab merevolusi pengalaman belajar yang didukung oleh teknologi Augmented Reality, Virtual Reality, dan Internet of Things. Misi kami adalah untuk meningkatkan kualitas pendidikan di Indonesia dengan membuat pembelajaran yang imersif dan interaktif yang dapat diakses oleh semua orang.",

    // Products section
    servicesTitle: "Layanan",
    servicesSubtitle: "Layanan menakjubkan kami untuk Anda coba",
    mersifAcademy: "Mersif Academy",
    mersifAcademyDesc: "Platform pembelajaran online",
    mersifIot: "Mersif IoT",
    mersifIotDesc: "Internet of Things solutions",
    mersifCreatorRoom: "Mersif Creator Room",
    mersifCreatorRoomDesc: "Platform kreasi ruang virtual",
    mersifVista: "Mersif Vista",
    mersifVistaDesc: "Visualisasi data dan analytics",
    mersifMobileApps: "Mersif Mobile Apps",
    mersifMobileAppsDesc: "Aplikasi mobile Pembelajaran",
    mersifAR: "Mersif AR",
    mersifARDesc: "Pembelajaran dengan Augmented Reality",
    bukuAR: "Buku Edukasi Berbasis AR",
    bukuARDesc: "Analisis Data Pembelajaran",

    // Numbers section
    numbersTitle: "DAMPAK KAMI DALAM ANGKA",
    numbersSubtitle:
      "Dampak nyata kami dalam memajukan pendidikan di Indonesia dan sekitarnya melalui pelatihan, kolaborasi, dan inovasi digital.",
    studentsReached: "Siswa Tercapai",
    teachersTrained: "Guru Terlatih",
    institutionalPartners: "Mitra Institusional",
    countries: "Negara",
    numbersFooter:
      "Pencapaian ini merupakan hasil kolaborasi berkelanjutan dengan berbagai stakeholder dalam ekosistem pendidikan Indonesia.",

    // Testimonials section
    testimonialsTitle: "Apa Kata Mereka",
    testimonialsSubtitle: "Pendapat para pengguna tentang layanan dan dukungan dari Mersif.",

    // News section
    newsTitle: "Berita & Artikel Terbaru",
    newsSubtitle: "Ikuti perkembangan terbaru, inovasi, dan cerita inspiratif dari MersifLab.",
    readMore: "Baca selengkapnya",
    viewAllNews: "Lihat Semua Berita",

    // Contact section
    contactTitle: "Ada yang ingin kamu tanyakan?",
    contactSubtitle:
      "Ada pertanyaan atau butuh dukungan? Kami siap membantu Anda sukses. Kirimkan pesan kepada kami dan kami akan segera menghubungi Anda kembali.",
    contactFormTitle: "Isi Formulir Ini",
    nameLabel: "Nama:",
    namePlaceholder: "Masukkan nama Anda",
    emailLabel: "Email:",
    emailPlaceholder: "example@gmail.com",
    questionLabel: "Pertanyaan:",
    questionPlaceholder: "aku ingin bertanya...",
    submitButton: "Submit",

    // News posts
    newsPost1Title: "Potensi Kerja Sama Berkelanjutan MersifLab dan SMP Negeri 13 Surakarta Pasca Workshop 3D Printing",
    newsPost1Snippet:
      "Surakarta - Kesuksesan workshop 3D printing yang dilaksanakan di SMP Negeri 13 Surakarta dengan melibatkan tim MersifLab sebagai narasumber membuka berbagai peluang untuk pengembangan kerja sama berkelanjutan di bidang teknologi pendidikan.",
    newsPost2Title:
      "Hari ke-2: MersifLab Menjadi Narasumber Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP Negeri 13 Surakarta",
    newsPost2Snippet:
      "Surakarta - Hari kedua Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP Negeri 13 Surakarta berlangsung dengan fokus pada praktik langsung teknologi 3D printing. Tim MersifLab berperan sebagai pembimbing untuk membantu para guru mempraktikan sendiri teknologi yang telah dipelajari pada hari sebelumnya.",
    newsPost3Title:
      "Hari ke-1: MersifLab Menjadi Narasumber Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP Negeri 13 Surakarta",
    newsPost3Snippet:
      "Surakarta - Pada hari pertama Peningkatan Kompetensi Guru Pemanfaatan Teknologi Printer 3D Dalam Media Pembelajaran Inovatif di SMP Negeri 13 Surakarta, tim startup MersifLab hadir sebagai narasumber dengan memberikan pelatihan teknologi 3D printing kepada para guru.Sebagai narasumber yang diundang dalam workshop tersebut, tim MersifLab pada hari pertama memberikan pelatihan komprehensif tentang teknologi 3D printing kepada para guru SMP Negeri 13 Surakarta. Pelatihan ini mencakup pemahaman dasar tentang cara kerja printer 3D, software desain, hingga aplikasi praktis dalam dunia pendidikan.",
  },
}

type Language = "en" | "id"

interface LanguageContextType {
  currentLanguage: Language
  setCurrentLanguage: (lang: Language) => void
  t: typeof translations.en
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("id")
  const [isLoaded, setIsLoaded] = useState(false)

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("mersiflab-language")
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "id")) {
      setCurrentLanguage(savedLanguage as Language)
    }
    setIsLoaded(true)
  }, [])

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("mersiflab-language", currentLanguage)
    }
  }, [currentLanguage, isLoaded])

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === "en" ? "id" : "en"))
  }

  const value: LanguageContextType = {
    currentLanguage,
    setCurrentLanguage,
    t: translations[currentLanguage],
    toggleLanguage,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
