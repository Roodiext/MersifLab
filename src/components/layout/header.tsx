"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown, User, Home, Info, Package, Star, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

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
  labelKey: keyof typeof translations.en
  icon?: React.ElementType
  isDropdown?: boolean
  subLinks?: { href: string; labelKey: keyof typeof translations.en }[]
}

// Base navigation items - Updated with proper section links
const baseNavItems: NavItem[] = [
  { href: "/#hero", labelKey: "home", icon: Home }, // Link ke hero section
  { href: "/#about", labelKey: "about", icon: Info }, // Link ke about section
  { href: "/#product", labelKey: "product", icon: Package }, // Link ke product section (singular)
  { href: "/#testimonials", labelKey: "testimonial", icon: Star }, // Link ke testimonials section
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
  { href: "/#contact", labelKey: "contact", icon: Mail }, // Link ke contact section
]

interface NavLinkProps {
  href: string
  children: React.ReactNode
  icon?: React.ElementType
  isMobile?: boolean
  onClick?: () => void
}

function NavLink({ href, children, icon: Icon, isMobile = false, onClick }: NavLinkProps) {
  const router = useRouter()
  const pathname = usePathname()

  // Helper function to find element by multiple possible IDs
  const findElementByIds = (ids: string[]) => {
    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) {
        console.log(`Found element with ID: ${id}`)
        return element
      }
    }
    console.error(`No element found with any of these IDs: ${ids.join(', ')}`)
    return null
  }

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Check if it's an anchor link
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      const targetPath = path || "/"
      
      // Define possible IDs for each section
      const possibleIds: { [key: string]: string[] } = {
        'product': ['product', 'products', 'our-products', 'produk'],
        'about': ['about', 'about-us', 'tentang', 'tentang-kami'],
        'hero': ['hero', 'home', 'banner', 'header-section'],
        'testimonials': ['testimonials', 'testimonial', 'testimoni'],
        'contact': ['contact', 'contact-us', 'kontak']
      }
      
      // If we're not on the target page, navigate there first
      if (pathname !== targetPath) {
        console.log(`Navigating from ${pathname} to ${targetPath}, then scrolling to #${hash}`)
        router.push(targetPath)
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const ids = possibleIds[hash] || [hash]
          const target = findElementByIds(ids)
          if (target) {
            // Add offset for sticky header (adjust as needed)
            const headerOffset = 80
            const elementPosition = target.offsetTop
            const offsetPosition = elementPosition - headerOffset
            
            console.log(`Scrolling to position: ${offsetPosition}`)
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            })
          }
        }, 500) // Increased timeout for better reliability
      } else {
        // If we're on the correct page, just scroll
        console.log(`Already on ${pathname}, scrolling to #${hash}`)
        const ids = possibleIds[hash] || [hash]
        const target = findElementByIds(ids)
        if (target) {
          const headerOffset = 80
          const elementPosition = target.offsetTop
          const offsetPosition = elementPosition - headerOffset
          
          console.log(`Scrolling to position: ${offsetPosition}`)
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          })
        }
      }
    } else {
      // For regular page navigation
      router.push(href)
    }
    
    if (onClick) onClick()
  }

  const base = "relative group transition-colors duration-300 flex items-center hover:text-blue-600"
  const size = isMobile ? "text-base font-medium" : "text-sm font-medium"
  const gap = Icon ? (isMobile ? "gap-3" : "gap-1") : ""
  
  return (
    <Link
      href={href}
      onClick={handleNavigation}
      className={`${base} ${size} ${gap} ${isMobile ? "px-4 py-2 hover:bg-gray-50 rounded-md" : ""}`}
    >
      {Icon && <Icon className={isMobile ? "h-5 w-5" : "h-4 w-4"} />} 
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 ease-out group-hover:w-full" />
    </Link>
  )
}

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isMobileNewsOpen, setIsMobileNewsOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "id">("id")
  const [isLanguageLoaded, setIsLanguageLoaded] = useState(false)
  const router = useRouter()

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("mersiflab-language")
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "id")) {
      setCurrentLanguage(savedLanguage as "en" | "id")
    }
    setIsLanguageLoaded(true)
  }, [])

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    if (isLanguageLoaded) {
      localStorage.setItem("mersiflab-language", currentLanguage)
    }
  }, [currentLanguage, isLanguageLoaded])

  const t = translations[currentLanguage]

  const toggleLanguage = () => {
    setCurrentLanguage((prevLang) => (prevLang === "en" ? "id" : "en"))
  }

  const closeSheet = () => {
    setIsSheetOpen(false)
    setIsMobileNewsOpen(false)
  }

  // Handle dropdown navigation
  const handleDropdownNavigation = (href: string) => {
    router.push(href)
  }

  // Handle mobile navigation with proper section scrolling
  const handleMobileNavigation = (href: string) => {
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      const targetPath = path || "/"
      
      // Define possible IDs for each section
      const possibleIds: { [key: string]: string[] } = {
        'product': ['product', 'products', 'our-products', 'produk'],
        'about': ['about', 'about-us', 'tentang', 'tentang-kami'],
        'hero': ['hero', 'home', 'banner', 'header-section'],
        'testimonials': ['testimonials', 'testimonial', 'testimoni'],
        'contact': ['contact', 'contact-us', 'kontak']
      }

      // Helper function to find element by multiple possible IDs
      const findElementByIds = (ids: string[]) => {
        for (const id of ids) {
          const element = document.getElementById(id)
          if (element) return element
        }
        return null
      }
      
      if (window.location.pathname !== targetPath) {
        router.push(targetPath)
        setTimeout(() => {
          const ids = possibleIds[hash] || [hash]
          const target = findElementByIds(ids)
          if (target) {
            const headerOffset = 80
            const elementPosition = target.offsetTop
            const offsetPosition = elementPosition - headerOffset
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            })
          }
        }, 500)
      } else {
        const ids = possibleIds[hash] || [hash]
        const target = findElementByIds(ids)
        if (target) {
          const headerOffset = 80
          const elementPosition = target.offsetTop
          const offsetPosition = elementPosition - headerOffset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          })
        }
      }
    } else {
      router.push(href)
    }
    closeSheet()
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

  // Loading state
  if (!isLanguageLoaded) {
    return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/img/logomersiflab.png" alt="MersifLab Logo" width={120} height={30} />
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="w-12 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="lg:hidden">
            <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link 
          href="/#hero" 
          className="flex items-center gap-2" 
          onClick={(e) => {
            e.preventDefault()
            handleMobileNavigation("/#hero")
          }}
        >
          <Image src="/img/logomersiflab.png" alt={t.mersifLabLogo} width={120} height={30} />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 items-center flex-grow justify-center">
          {navItems.map((item) =>
            item.isDropdown ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="text-sm font-medium flex items-center gap-1 transition-colors duration-300 relative group outline-none hover:text-blue-600">
                  {item.label} <ChevronDown className="h-4 w-4" />
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {item.subLinks?.map((subLink) => (
                    <DropdownMenuItem key={subLink.href} asChild>
                      <Link 
                        href={subLink.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleDropdownNavigation(subLink.href)
                        }}
                        className="cursor-pointer hover:text-blue-600"
                      >
                        {subLink.label}
                      </Link>
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
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="text-sm font-medium px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors bg-transparent"
          >
            {currentLanguage === "en" ? "ID" : "EN"}
          </Button>
          <Link href="/login" className="hover:text-blue-600 transition-colors">
            <User className="h-6 w-6" />
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
              <div className="flex items-center justify-between p-4 border-b">
                <Link 
                  href="/#hero" 
                  className="flex items-center gap-2" 
                  onClick={(e) => {
                    e.preventDefault()
                    handleMobileNavigation("/#hero")
                  }}
                >
                  <Image src="/img/logomersiflab.png" alt={t.mersifLabLogo} width={120} height={30} />
                </Link>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {navItems.map((item) =>
                  item.isDropdown ? (
                    <React.Fragment key={item.label}>
                      <button
                        className="flex w-full items-center justify-between text-base font-medium px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
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
                            <button
                              key={subLink.href}
                              className="block w-full text-left text-sm text-gray-700 hover:text-blue-600 transition px-4 py-2 rounded-md hover:bg-gray-50"
                              onClick={() => {
                                handleDropdownNavigation(subLink.href)
                                closeSheet()
                              }}
                            >
                              {subLink.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </React.Fragment>
                  ) : (
                    <button
                      key={item.href}
                      className="flex w-full items-center gap-3 text-base font-medium px-4 py-2 hover:bg-gray-50 rounded-md transition-colors hover:text-blue-600"
                      onClick={() => handleMobileNavigation(item.href!)}
                    >
                      {item.icon && <item.icon className="h-5 w-5" />} 
                      {item.label}
                    </button>
                  ),
                )}
                
                <div className="pt-4 border-t mt-4 space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      toggleLanguage()
                      closeSheet()
                    }}
                    className="w-full flex items-center gap-3 text-base font-semibold px-4 py-2 rounded-md hover:bg-gray-50 transition justify-start"
                  >
                    {t.language}: {currentLanguage === "en" ? "English" : "Indonesia"}
                  </Button>
                  <button
                    className="flex w-full items-center gap-3 text-base font-semibold text-blue-600 hover:text-blue-700 px-4 py-2 rounded-md hover:bg-blue-50 transition"
                    onClick={() => {
                      router.push("/login")
                      closeSheet()
                    }}
                  >
                    <User className="h-5 w-5" /> {t.login}
                  </button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}