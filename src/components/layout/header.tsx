"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown, User, Home, Info, Package, Star, Mail, Settings, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

// Define NavItem interface with direct labels
interface NavItem {
  href?: string
  label: string
  icon?: React.ElementType
  isDropdown?: boolean
  subLinks?: { href: string; label: string }[]
}

// Navigation items with Indonesian labels
const navItems: NavItem[] = [
  { href: "/#hero", label: "Beranda", icon: Home },
  { href: "/#about", label: "Tentang", icon: Info },
  { href: "/#testimonials", label: "Testimoni", icon: Star },
  {
    label: "Layanan",
    icon: Package,
    isDropdown: true,
    subLinks: [
      { href: "/mersif-academy/index.html", label: "Mersif Academy" },
      { href: "/mersifiot", label: "Mersif IoT" },
      { href: "/mersifvista", label: "Mersif Vista" },
      { href: "/mersifcreator", label: "Mersif Creator" },
    ],
  },
  {
    label: "Berita",
    icon: Package,
    isDropdown: true,
    subLinks: [
      { href: "/news", label: "Halaman Berita" },
      { href: "/news", label: "Berita Terbaru" },
      { href: "/news", label: "Arsip Berita" },
      { href: "/news", label: "Kategori" },
    ],
  },
  { href: "/#contact", label: "Kontak", icon: Mail },
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
  const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false)
  const [isMobileNewsOpen, setIsMobileNewsOpen] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  const closeSheet = () => {
    setIsSheetOpen(false)
    setIsMobileServiceOpen(false)
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

  return (
    <header style={{ fontFamily: "Poppins, sans-serif" }} className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center shadow-sm">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link 
          href="/#hero" 
          className="flex items-center gap-2" 
          onClick={(e) => {
            e.preventDefault()
            handleMobileNavigation("/#hero")
          }}
        >
          <Image src="/img/logomersiflab.png" alt="Logo MersifLab" width={120} height={30} />
        </Link>
        
        {/* Desktop Navigation */}
        <nav style={{ fontFamily: "Poppins, sans-serif" }} className="hidden lg:flex gap-6 items-center flex-grow justify-center">
          {navItems.map((item) =>
            item.isDropdown ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger className="text-sm font-medium flex items-center gap-1 transition-colors duration-300 relative group outline-none hover:text-blue-600">
                  {item.label} <ChevronDown className="h-4 w-4" />
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 ease-out group-hover:w-full" />
                </DropdownMenuTrigger>
                <DropdownMenuContent style={{ fontFamily: "Poppins, sans-serif" }}align="start" className="w-48">
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

        {/* Desktop User Section */}
        <div className="hidden lg:flex items-center gap-4">
          {status === "loading" ? (
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" style={{ fontFamily: "Poppins, sans-serif" }}></div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-auto px-3 rounded-full hover:bg-gray-100">
                  <div className="flex items-center space-x-2">
                   <Avatar className="h-8 w-8">
  <AvatarImage src={session.user?.avatar || undefined} />
  <AvatarFallback className="bg-blue-500 text-white">
    {session.user?.name
      ? session.user.name.split(" ")[0].substring(0, 2).toUpperCase()
      : 'U'}
  </AvatarFallback>
</Avatar>
                    <span className="hidden md:block text-sm font-medium">
  {session.user?.name?.split(" ")[0] || session.user?.username}
</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent style={{ fontFamily: "Poppins, sans-serif" }} className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium text-sm">
                      {session.user?.name || session.user?.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </p>
                    {session.user?.role === 'admin' && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <Shield className="w-3 h-3 mr-1" />
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Pengaturan
                  </Link>
                </DropdownMenuItem>
                {session.user?.role === 'admin' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard" className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Panel Admin
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut()}
                  className="text-red-600 focus:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Masuk</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Daftar</Link>
              </Button>
            </div>
          )}
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
                  <Image src="/img/logomersiflab.png" alt="Logo MersifLab" width={120} height={30} />
                </Link>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {navItems.map((item) =>
                  item.isDropdown ? (
                    <React.Fragment key={item.label}>
                      <button
                        className="flex w-full items-center justify-between text-base font-medium px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                        onClick={() => {
                          if (item.label === "Layanan") {
                            setIsMobileServiceOpen(!isMobileServiceOpen)
                          } else if (item.label === "Berita") {
                            setIsMobileNewsOpen(!isMobileNewsOpen)
                          }
                        }}
                      >
                        <span className="flex items-center gap-3">
                          {item.icon && <item.icon className="h-5 w-5" />} {item.label}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            (item.label === "Layanan" && isMobileServiceOpen) || 
                            (item.label === "Berita" && isMobileNewsOpen) 
                              ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {((item.label === "Layanan" && isMobileServiceOpen) || 
                        (item.label === "Berita" && isMobileNewsOpen)) && (
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
                  {status === "loading" ? (
                    <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                  ) : session ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-md">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={session.user?.avatar || undefined} />
                          <AvatarFallback className="bg-blue-500 text-white text-xs">
                            {session.user?.name?.substring(0, 2).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {session.user?.name || session.user?.username}
                          </span>
                          <span className="text-xs text-gray-500">
                            {session.user?.email}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        className="flex w-full items-center gap-3 text-base font-medium px-4 py-2 hover:bg-gray-50 rounded-md transition-colors hover:text-blue-600"
                        onClick={() => {
                          router.push("/profile")
                          closeSheet()
                        }}
                      >
                        <User className="h-5 w-5" />
                        Profile
                      </button>
                      
                      <button
                        className="flex w-full items-center gap-3 text-base font-medium px-4 py-2 hover:bg-gray-50 rounded-md transition-colors hover:text-blue-600"
                        onClick={() => {
                          router.push("/settings")
                          closeSheet()
                        }}
                      >
                        <Settings className="h-5 w-5" />
                        Pengaturan
                      </button>
                      
                      {session.user?.role === 'admin' && (
                        <button
                          className="flex w-full items-center gap-3 text-base font-medium px-4 py-2 hover:bg-gray-50 rounded-md transition-colors hover:text-blue-600"
                          onClick={() => {
                            router.push("/admin")
                            closeSheet()
                          }}
                        >
                          <Shield className="h-5 w-5" />
                          Panel Admin
                        </button>
                      )}
                      
                      <button
                        className="flex w-full items-center gap-3 text-base font-semibold text-red-600 hover:text-red-700 px-4 py-2 rounded-md hover:bg-red-50 transition"
                        onClick={() => {
                          signOut()
                          closeSheet()
                        }}
                      >
                        <LogOut className="h-5 w-5" />
                        Keluar
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        className="flex w-full items-center gap-3 text-base font-medium text-blue-600 hover:text-blue-700 px-4 py-2 rounded-md hover:bg-blue-50 transition"
                        onClick={() => {
                          router.push("/login")
                          closeSheet()
                        }}
                      >
                        <User className="h-5 w-5" />
                        Masuk
                      </button>
                      <button
                        className="flex w-full items-center gap-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
                        onClick={() => {
                          router.push("/register")
                          closeSheet()
                        }}
                      >
                        <User className="h-5 w-5" />
                        Daftar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}