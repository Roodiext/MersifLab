"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

type Language = 'id' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation data
const translations = {
  id: {
    // Navigation
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.testimonials': 'Testimoni',
    'nav.services': 'Layanan',
    'nav.news': 'Berita',
    'nav.contact': 'Kontak',
    'nav.login': 'Masuk',
    'nav.register': 'Daftar',
    'nav.profile': 'Profile',
    'nav.settings': 'Pengaturan',
    'nav.admin': 'Panel Admin',
    'nav.logout': 'Keluar',
    'nav.news.page': 'Halaman Berita',
    'nav.news.latest': 'Berita Terbaru',
    'nav.news.archive': 'Arsip Berita',
    'nav.news.categories': 'Kategori',
    'nav.services.academy': 'Mersif Academy',
    'nav.services.iot': 'Mersif IoT',
    'nav.services.vista': 'Mersif Vista',
    'nav.services.creator': 'Mersif Creator',

    // Hero Section
    'hero.title': 'Membangun Ekosistem',
    'hero.title.highlight': 'Inovasi Digital Indonesia',
    'hero.subtitle': 'MersifLab berkomitmen untuk mengakselerasi talenta dan solusi digital melalui pilar layanan kami di bidang IoT, Edukasi, Kreativitas, dan Dampak Sosial.',
    'hero.button': 'Jelajahi Mersif',
    'hero.mobile.title': 'MersifLab',
    'hero.mobile.subtitle': 'Platform Laboratorium Virtual Berbasis Mixed Reality Kolaboratif dan Imersif',

    // About Section
    'about.title': 'Tentang Kami',
    'about.subtitle': 'MersifLab adalah platform inovasi digital yang berfokus pada pengembangan talenta dan solusi teknologi masa depan.',
    'about.description': 'Kami berkomitmen untuk menciptakan ekosistem digital yang inklusif dan berkelanjutan melalui berbagai layanan dan program yang dirancang untuk mengakselerasi pertumbuhan industri teknologi di Indonesia.',

    // Services Section
    'services.title': 'Layanan Kami',
    'services.subtitle': 'Solusi Digital Terdepan untuk Masa Depan',
    'services.academy.title': 'Mersif Academy',
    'services.academy.description': 'Platform pembelajaran digital yang inovatif untuk mengembangkan talenta teknologi masa depan.',
    'services.iot.title': 'Mersif IoT',
    'services.iot.description': 'Solusi Internet of Things yang terintegrasi untuk transformasi digital industri.',
    'services.vista.title': 'Mersif Vista',
    'services.vista.description': 'Platform visualisasi data dan analitik untuk pengambilan keputusan yang lebih baik.',
    'services.creator.title': 'Mersif Creator',
    'services.creator.description': 'Tools kreatif untuk mengembangkan konten digital yang menarik dan interaktif.',

    // Products Section
    'products.title': 'Produk Kami',
    'products.subtitle': 'Inovasi Teknologi untuk Masa Depan',
    'products.book.title': 'Buku Berbasis AR',
    'products.book.description': 'Buku interaktif dengan teknologi Augmented Reality untuk pembelajaran yang lebih menarik.',
    'products.gamification.title': 'Gamifikasi Pembelajaran',
    'products.gamification.description': 'Platform pembelajaran berbasis game untuk meningkatkan engagement siswa.',
    'products.creator.title': 'Mersif Creator',
    'products.creator.description': 'Tools kreatif untuk mengembangkan konten digital yang menarik.',
    'products.forum.title': 'Mersif Forum',
    'products.forum.description': 'Platform diskusi dan kolaborasi untuk komunitas teknologi.',
    'products.mobile.title': 'Mersif Mobile Apps',
    'products.mobile.description': 'Aplikasi mobile untuk akses layanan MersifLab di mana saja.',
    'products.room.title': 'Mersif Room',
    'products.room.description': 'Ruang virtual untuk kolaborasi dan pembelajaran online.',

    // Testimonials Section
    'testimonials.title': 'Testimoni',
    'testimonials.subtitle': 'Apa Kata Mereka Tentang Kami',

    // Partners Section
    'partners.title': 'Partner Kami',
    'partners.subtitle': 'Berkolaborasi dengan Institusi Terkemuka',

    // Contact Section
    'contact.title': 'Hubungi Kami',
    'contact.subtitle': 'Mari Berdiskusi Tentang Proyek Anda',
    'contact.form.name': 'Nama Lengkap',
    'contact.form.email': 'Email',
    'contact.form.message': 'Pesan',
    'contact.form.submit': 'Kirim Pesan',
    'contact.info.address': 'Alamat',
    'contact.info.phone': 'Telepon',
    'contact.info.email': 'Email',

    // Footer
    'footer.description': 'Platform inovasi digital untuk masa depan teknologi Indonesia.',
    'footer.quick.links': 'Link Cepat',
    'footer.services': 'Layanan',
    'footer.contact': 'Kontak',
    'footer.copyright': '© 2024 MersifLab. Semua hak dilindungi.',
    'footer.follow.us': 'Ikuti Kami',
    'footer.contact.us': 'Hubungi Kami',
    'footer.address': 'Alamat',
    'footer.phone': 'Telepon',
    'footer.email': 'Email',
    'footer.location': 'Lokasi Kami',
    'footer.view.on.maps': 'Lihat di Google Maps',
    'footer.quick.links.services': 'Layanan',
    'footer.quick.links.company': 'Perusahaan',
    'footer.quick.links.support': 'Dukungan',
    'footer.quick.links.legal': 'Legal',
    'footer.quick.links.vr.development': 'Pengembangan VR',
    'footer.quick.links.ar': 'Augmented Reality',
    'footer.quick.links.mobile.apps': 'Aplikasi Mobile',
    'footer.quick.links.about.us': 'Tentang Kami',
    'footer.quick.links.careers': 'Karir',
    'footer.quick.links.faq': 'FAQ',
    'footer.quick.links.documentation': 'Dokumentasi',
    'footer.quick.links.privacy.policy': 'Kebijakan Privasi',
    'footer.quick.links.terms.service': 'Syarat Layanan',
    'footer.quick.links.cookie.policy': 'Cookie Policy',
    'footer.quick.links.contact': 'Kontak',

    // Partners
    'partners.title': 'PARTNER KAMI',
    'partners.title.highlight': 'TERPERCAYA',
    'partners.subtitle': 'Kami berkolaborasi dengan partner terpercaya untuk menghadirkan solusi terbaik dan menciptakan nilai bersama.',

    // Mersif Numbers
    'mersif.numbers.title': 'OUR',
    'mersif.numbers.title.highlight': 'IMPACT',
    'mersif.numbers.title.suffix': 'IN NUMBERS',
    'mersif.numbers.subtitle': 'Dampak nyata kami dalam memajukan pendidikan di Indonesia dan sekitarnya melalui pelatihan, kolaborasi, dan inovasi digital.',
    'mersif.numbers.bottom.text': 'Pencapaian ini merupakan hasil kolaborasi berkelanjutan dengan berbagai stakeholder dalam ekosistem pendidikan Indonesia.',

    // Common
    'common.learn.more': 'Pelajari Lebih Lanjut',
    'common.get.started': 'Mulai Sekarang',
    'common.view.more': 'Lihat Lebih Banyak',
    'common.read.more': 'Baca Selengkapnya',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.testimonials': 'Testimonials',
    'nav.services': 'Services',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.admin': 'Admin Panel',
    'nav.logout': 'Logout',
    'nav.news.page': 'News Page',
    'nav.news.latest': 'Latest News',
    'nav.news.archive': 'News Archive',
    'nav.news.categories': 'Categories',
    'nav.services.academy': 'Mersif Academy',
    'nav.services.iot': 'Mersif IoT',
    'nav.services.vista': 'Mersif Vista',
    'nav.services.creator': 'Mersif Creator',

    // Hero Section
    'hero.title': 'Building Indonesia\'s',
    'hero.title.highlight': 'Digital Innovation Ecosystem',
    'hero.subtitle': 'MersifLab is committed to accelerating digital talent and solutions through our service pillars in IoT, Education, Creativity, and Social Impact.',
    'hero.button': 'Explore Mersif',
    'hero.mobile.title': 'MersifLab',
    'hero.mobile.subtitle': 'Collaborative and Immersive Mixed Reality-Based Virtual Laboratory Platform',

    // About Section
    'about.title': 'About Us',
    'about.subtitle': 'MersifLab is a digital innovation platform focused on developing future technology talent and solutions.',
    'about.description': 'We are committed to creating an inclusive and sustainable digital ecosystem through various services and programs designed to accelerate the growth of the technology industry in Indonesia.',

    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'Leading Digital Solutions for the Future',
    'services.academy.title': 'Mersif Academy',
    'services.academy.description': 'Innovative digital learning platform for developing future technology talent.',
    'services.iot.title': 'Mersif IoT',
    'services.iot.description': 'Integrated Internet of Things solutions for industrial digital transformation.',
    'services.vista.title': 'Mersif Vista',
    'services.vista.description': 'Data visualization and analytics platform for better decision making.',
    'services.creator.title': 'Mersif Creator',
    'services.creator.description': 'Creative tools for developing engaging and interactive digital content.',

    // Products Section
    'products.title': 'Our Products',
    'products.subtitle': 'Technology Innovation for the Future',
    'products.book.title': 'AR-Based Book',
    'products.book.description': 'Interactive book with Augmented Reality technology for more engaging learning.',
    'products.gamification.title': 'Learning Gamification',
    'products.gamification.description': 'Game-based learning platform to increase student engagement.',
    'products.creator.title': 'Mersif Creator',
    'products.creator.description': 'Creative tools for developing engaging digital content.',
    'products.forum.title': 'Mersif Forum',
    'products.forum.description': 'Discussion and collaboration platform for the technology community.',
    'products.mobile.title': 'Mersif Mobile Apps',
    'products.mobile.description': 'Mobile applications for accessing MersifLab services anywhere.',
    'products.room.title': 'Mersif Room',
    'products.room.description': 'Virtual room for online collaboration and learning.',

    // Testimonials Section
    'testimonials.title': 'Testimonials',
    'testimonials.subtitle': 'What They Say About Us',

    // Partners Section
    'partners.title': 'Our Partners',
    'partners.subtitle': 'Collaborating with Leading Institutions',

    // Contact Section
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Let\'s Discuss Your Project',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.info.address': 'Address',
    'contact.info.phone': 'Phone',
    'contact.info.email': 'Email',

    // Footer
    'footer.description': 'Digital innovation platform for Indonesia\'s technology future.',
    'footer.quick.links': 'Quick Links',
    'footer.services': 'Services',
    'footer.contact': 'Contact',
    'footer.copyright': '© 2024 MersifLab. All rights reserved.',
    'footer.follow.us': 'Follow Us',
    'footer.contact.us': 'Contact Us',
    'footer.address': 'Address',
    'footer.phone': 'Phone',
    'footer.email': 'Email',
    'footer.location': 'Our Location',
    'footer.view.on.maps': 'View on Google Maps',
    'footer.quick.links.services': 'Services',
    'footer.quick.links.company': 'Company',
    'footer.quick.links.support': 'Support',
    'footer.quick.links.legal': 'Legal',
    'footer.quick.links.vr.development': 'VR Development',
    'footer.quick.links.ar': 'Augmented Reality',
    'footer.quick.links.mobile.apps': 'Mobile Apps',
    'footer.quick.links.about.us': 'About Us',
    'footer.quick.links.careers': 'Careers',
    'footer.quick.links.faq': 'FAQ',
    'footer.quick.links.documentation': 'Documentation',
    'footer.quick.links.privacy.policy': 'Privacy Policy',
    'footer.quick.links.terms.service': 'Terms of Service',
    'footer.quick.links.cookie.policy': 'Cookie Policy',
    'footer.quick.links.contact': 'Contact',

    // Partners
    'partners.title': 'OUR TRUSTED',
    'partners.title.highlight': 'PARTNERS',
    'partners.subtitle': 'We collaborate with trusted partners to deliver the best solutions and create shared value.',

    // Mersif Numbers
    'mersif.numbers.title': 'OUR',
    'mersif.numbers.title.highlight': 'IMPACT',
    'mersif.numbers.title.suffix': 'IN NUMBERS',
    'mersif.numbers.subtitle': 'Our real impact in advancing education in Indonesia and surrounding areas through training, collaboration, and digital innovation.',
    'mersif.numbers.bottom.text': 'These achievements are the result of ongoing collaboration with various stakeholders in Indonesia\'s education ecosystem.',

    // Common
    'common.learn.more': 'Learn More',
    'common.get.started': 'Get Started',
    'common.view.more': 'View More',
    'common.read.more': 'Read More',
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('id')

  useEffect(() => {
    // Load language preference from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return {
    language: context.language,
    setLanguage: context.setLanguage,
    t: context.t,
  }
}
