"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown, User, Home, Info, Package, Star, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

// Define translations
const translations = {
  en: {
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
  },
  id: {
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
  },
}

// Define NavItem interface using translation keys
interface NavItem {
  href?: string
  labelKey: keyof typeof translations.en // Use a key to look up translation
  icon?: React.ElementType
  isDropdown?: boolean
  subLinks?: { href: string; labelKey: keyof typeof translations.en }[]
}

// Base navigation items using translation keys
const baseNavItems: NavItem[] = [
  { href: "#hero", labelKey: "home", icon: Home },
  { href: "#about", labelKey: "about", icon: Info },
  { href: "#products", labelKey: "product", icon: Package },
  { href: "#testimonials", labelKey: "testimonial", icon: Star },
  {
    labelKey: "news",
    icon: Package,
    isDropdown: true,
    subLinks: [
      { href: "/news", labelKey: "newsPage" },
      { href: "/news/latest", labelKey: "latestNews" },
      { href: "/news/archive", labelKey: "newsArchive" },
      { href: "/news/categories", labelKey: "categories" },
    ],
  },
  { href: "#contact", labelKey: "contact", icon: Mail },
]

interface NavLinkProps {
  href: string
  children: React.ReactNode
  icon?: React.ElementType
  isMobile?: boolean
  onClick?: () => void
}

function NavLink({ href, children, icon: Icon, isMobile = false, onClick }: NavLinkProps) {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId.startsWith("#")) {
      e.preventDefault()
      const target = document.querySelector(targetId)
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
    if (onClick) onClick()
  }
  const base = "relative group transition-colors duration-300 flex items-center"
  const size = isMobile ? "text-base font-medium" : "text-sm font-medium"
  const gap = Icon ? (isMobile ? "gap-3" : "gap-1") : ""
  return (
    <Link
      href={href}
      onClick={(e) => handleSmoothScroll(e, href)}
      className={`${base} ${size} ${gap} ${isMobile ? "px-4 py-2" : ""}`}
    >
      {Icon && <Icon className={isMobile ? "h-5 w-5" : "h-4 w-4"} />} {children}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 ease-out group-hover:w-full" />
    </Link>
  )
}

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isMobileNewsOpen, setIsMobileNewsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "id">("en") // State for current language

  const t = translations[currentLanguage] // Get current translations

  const toggleLanguage = () => {
    setCurrentLanguage((prevLang) => (prevLang === "en" ? "id" : "en"))
  }

  const closeSheet = () => {
    setIsSheetOpen(false)
    setIsMobileNewsOpen(false)
  }

  // Map baseNavItems to actual navItems with current language labels
  const navItems = baseNavItems.map((item) => ({
    ...item,
    label: t[item.labelKey],
    subLinks: item.subLinks?.map((subLink) => ({
      ...subLink,
      label: t[subLink.labelKey],
    })),
  }))

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={closeSheet}>
          <Image src="/img/logomersiflab.png" alt={t.mersifLabLogo} width={120} height={30} />
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 items-center flex-grow justify-center">
          {navItems.map((item) =>
            item.isDropdown ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="text-sm font-medium flex items-center gap-1 transition-colors duration-300 relative group outline-none">
                  {item.label} <ChevronDown className="h-4 w-4" />
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {item.subLinks?.map((subLink) => (
                    <DropdownMenuItem key={subLink.href} asChild>
                      <Link href={subLink.href}>{subLink.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavLink key={item.href} href={item.href!}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Toggle for Desktop */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="text-sm font-medium px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors bg-transparent"
          >
            {currentLanguage === "en" ? "ID" : "EN"}
          </Button>
          <Link href="/login">
            <User className="h-6 w-6 hover:text-blue-600 transition" />
          </Link>
        </div>
        {/* Mobile Sheet */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[90%] max-w-sm max-h-[90vh] mx-auto my-6 rounded-2xl border bg-white shadow-xl overflow-hidden"
          >
            <div className="flex flex-col h-full rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b" >
                <Link href="/" className="flex items-center gap-2" onClick={closeSheet}>
                  <Image src="/img/logomersiflab.png" alt={t.mersifLabLogo} width={120} height={30} />
                </Link>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {navItems.map((item) =>
                  item.isDropdown ? (
                    <React.Fragment key={item.label}>
                      <button
                        className="flex w-full items-center justify-between text-base font-medium px-4 py-2 hover:bg-gray-100 rounded-md"
                        onClick={() => setIsMobileNewsOpen(!isMobileNewsOpen)}
                      >
                        <span className="flex items-center gap-3">
                          {item.icon && <item.icon className="h-5 w-5" />} {item.label}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isMobileNewsOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isMobileNewsOpen && (
                        <div className="pl-10 space-y-1">
                          {item.subLinks?.map((subLink) => (
                            <Link
                              key={subLink.href}
                              href={subLink.href}
                              className="block text-sm text-gray-700 hover:text-blue-600 transition px-4 py-2 rounded-md hover:bg-gray-50"
                              onClick={closeSheet}
                            >
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  ) : (
                    <NavLink key={item.href} href={item.href!} icon={item.icon} isMobile onClick={closeSheet}>
                      {item.label}
                    </NavLink>
                  ),
                )}
                <div className="pt-4 border-t mt-4 space-y-2">
                  {/* Language Toggle for Mobile */}
                  <Button
                    variant="outline"
                    onClick={() => {
                      toggleLanguage()
                      closeSheet() // Close sheet after language change
                    }}
                    className="w-full flex items-center gap-3 text-base font-semibold px-4 py-2 rounded-md hover:bg-gray-50 transition"
                  >
                    {t.language}: {currentLanguage === "en" ? "English" : "Indonesia"}
                  </Button>
                  <Link
                    href="/login"
                    className="flex items-center gap-3 text-base font-semibold text-blue-600 hover:text-blue-700 px-4 py-2 rounded-md hover:bg-blue-50 transition"
                    onClick={closeSheet}
                  >
                    <User className="h-5 w-5" /> {t.login}
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
  