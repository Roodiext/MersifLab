"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown, User, Home, Info, Package, Star, Mail, Settings, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useRouter, usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

interface NavItem {
  href?: string
  label: string
  icon?: React.ElementType
  isDropdown?: boolean
  subLinks?: { href: string; label: string }[]
}

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

  const findElementByIds = (ids: string[]) => {
    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) {
        return element
      }
    }
    return null
  }

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    if (href.includes("#")) {
      const [path, hash] = href.split("#")
      const targetPath = path || "/"
      
      const possibleIds: { [key: string]: string[] } = {
        'product': ['product', 'products', 'our-products', 'produk'],
        'about': ['about', 'about-us', 'tentang', 'tentang-kami'],
        'hero': ['hero', 'home', 'banner', 'header-section'],
        'testimonials': ['testimonials', 'testimonial', 'testimoni'],
        'contact': ['contact', 'contact-us', 'kontak']
      }
      
      if (pathname !== targetPath) {
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
    
    if (onClick) onClick()
  }

  const base = "relative group transition-all duration-300 flex items-center hover:text-blue-600"
  const size = isMobile ? "text-base font-medium" : "text-sm font-medium"
  const gap = Icon ? (isMobile ? "gap-3" : "gap-1.5") : ""
  
  return (
    <Link
      href={href}
      onClick={handleNavigation}
      className={`${base} ${size} ${gap} ${isMobile ? "px-4 py-3 hover:bg-gray-50 rounded-lg" : "px-4 py-2.5 rounded-full hover:bg-blue-50/80 hover:shadow-sm"}`}
    >
      {Icon && <Icon className={isMobile ? "h-5 w-5" : "h-4 w-4"} />} 
      {children}
      {!isMobile && <span className="absolute left-4 bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out group-hover:w-[calc(100%-2rem)]" />}
    </Link>
  )
}

export function HeaderIOT() {
  const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false)
  const [isMobileNewsOpen, setIsMobileNewsOpen] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()
  const { t } = useLanguage()
  
  const navItems: NavItem[] = [
    { href: "/#hero", label: t('nav.home'), icon: Home },
    { href: "/#about", label: t('nav.about'), icon: Info },
    { href: "/#testimonials", label: t('nav.testimonials'), icon: Star },
    {
      label: t('nav.services'),
      icon: Package,
      isDropdown: true,
      subLinks: [
        { href: "/mersif-academy/index.html", label: t('nav.services.academy') },
        { href: "/mersifiot", label: t('nav.services.iot') },
        { href: "/mersifvista", label: t('nav.services.vista') },
        { href: "/mersifcreator", label: t('nav.services.creator') },
      ],
    },
    {
      label: t('nav.news'),
      icon: Package,
      isDropdown: true,
      subLinks: [
        { href: "/news", label: t('nav.news.page') },
        { href: "/news", label: t('nav.news.latest') },
        { href: "/news", label: t('nav.news.archive') },
        { href: "/news", label: t('nav.news.categories') },
      ],
    },
    { href: "/#contact", label: t('nav.contact'), icon: Mail },
  ]

  const closeSheet = () => {
    setIsMobileServiceOpen(false)
    setIsMobileNewsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full py-4 bg-white/80 backdrop-blur-xl">
      {/* Centered Container */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
          
          {/* Left Section - Logo (Separated) */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden hover:bg-gray-100 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-sm"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 rounded-r-2xl">
                <div className="flex h-16 items-center border-b px-4">
                  <Link href="/" className="flex items-center" onClick={closeSheet}>
                    <Image 
                      src="/img/logomersiflab.png" 
                      alt="MersifLab Logo" 
                      width={120} 
                      height={40} 
                      className="h-8 w-auto" 
                    />
                  </Link>
                </div>
                <div className="py-6">
                  <nav className="flex flex-col space-y-2">
                    {navItems.map((item, index) => {
                      if (item.isDropdown) {
                        const isOpen = item.label === t('nav.services') ? isMobileServiceOpen : isMobileNewsOpen
                        const setIsOpen = item.label === t('nav.services') ? setIsMobileServiceOpen : setIsMobileNewsOpen

                        return (
                          <div key={index} className="space-y-2">
                            <button
                              onClick={() => setIsOpen(!isOpen)}
                              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-all duration-200"
                            >
                              <div className="flex items-center gap-3">
                                {item.icon && <item.icon className="h-4 w-4" />}
                                <span>{item.label}</span>
                              </div>
                              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isOpen && (
                              <div className="pl-6 space-y-1">
                                {item.subLinks?.map((subLink, subIndex) => (
                                  <NavLink
                                    key={subIndex}
                                    href={subLink.href}
                                    isMobile
                                    onClick={closeSheet}
                                  >
                                    {subLink.label}
                                  </NavLink>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      }
                      return (
                        <NavLink
                          key={index}
                          href={item.href || "/"}
                          icon={item.icon}
                          isMobile
                          onClick={closeSheet}
                        >
                          {item.label}
                        </NavLink>
                      )
                    })}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo - Compact with rounded background */}
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-md shadow-gray-200/20 px-3 py-2">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/img/logomersiflab.png" 
                  alt="MersifLab Logo" 
                  width={100} 
                  height={32} 
                  className="h-6 w-auto" 
                  priority 
                />
              </Link>
            </div>
          </div>

          {/* Center Section - Main Navigation with Logo and Language Switcher */}
          <nav className="hidden md:flex items-center justify-center flex-1 max-w-4xl">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg shadow-gray-200/20 px-4 py-3">
              <div className="flex items-center space-x-1">
                {/* Small Logo in Navbar */}
                <div className="flex items-center mr-4">
                  <Link href="/" className="flex items-center">
                    <Image 
                      src="/img/navbar-logo/logoIOT.jpg" 
                      alt="MersifLab" 
                      width={100} 
                      height={30} 
                      className="h-14 w-auto opacity-100 hover:opacity-100 transition-opacity duration-100" 
                    />
                  </Link>
                  <div className="w-px h-6 bg-gray-300 ml-4"></div>
                </div>
                
                {navItems.map((item, index) => {
                  if (item.isDropdown) {
                    return (
                      <DropdownMenu key={index}>
                        <DropdownMenuTrigger className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-full hover:bg-blue-50/80 hover:shadow-sm transition-all duration-200">
                          {item.icon && <item.icon className="h-4 w-4" />}
                          <span>{item.label}</span>
                          <ChevronDown className="h-3 w-3" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="min-w-48 rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-sm">
                          {item.subLinks?.map((subLink, subIndex) => (
                            <DropdownMenuItem 
                              key={subIndex} 
                              onClick={() => router.push(subLink.href)}
                              className="flex items-center gap-2 cursor-pointer rounded-lg hover:bg-blue-50 focus:bg-blue-50"
                            >
                              {subLink.label}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )
                  }
                  return (
                    <NavLink key={index} href={item.href || "/"} icon={item.icon}>
                      {item.label}
                    </NavLink>
                  )
                })}
                
                {/* Language Switcher integrated in navbar */}
                <div className="flex items-center">
                  <div className="w-px h-6 bg-gray-300 mx-3"></div>
                  <div className="px-2">
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Section - User Profile Only */}
          <div className="flex items-center">
            {status === "authenticated" && session?.user ? (
              /* User Profile - Separated */
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg shadow-gray-200/20 px-4 py-2">
                <div className="flex items-center gap-3">
                  {/* Username Display - Hidden on small screens */}
                  <div className="hidden lg:flex flex-col items-end">
                    <span className="text-sm font-semibold text-gray-900 leading-tight">
                      {session.user.name || 'User'}
                    </span>
                    <span className="text-xs text-gray-500 leading-tight">
                      {session.user.role === 'admin' ? 'Administrator' : 'Member'}
                    </span>
                  </div>
                  
                  {/* User Avatar Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100 ring-2 ring-transparent hover:ring-blue-200/50 transition-all duration-200">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm">
                            {session.user.name?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        {session.user.role === 'admin' && (
                          <div className="absolute -bottom-0.5 -right-0.5">
                            <div className="h-3 w-3 bg-green-500 rounded-full border-2 border-white" />
                          </div>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-72 rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-sm" align="end">
                      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                            {session.user.name?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{session.user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                          {session.user.role === 'admin' && (
                            <Badge variant="outline" className="mt-1 text-xs">Administrator</Badge>
                          )}
                        </div>
                      </div>
                      <div className="py-2">
                        <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-blue-50 focus:bg-blue-50">
                          <User className="mr-3 h-4 w-4" />
                          <span>{t('nav.profile')}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-blue-50 focus:bg-blue-50">
                          <Settings className="mr-3 h-4 w-4" />
                          <span>{t('nav.settings')}</span>
                        </DropdownMenuItem>
                        {session.user.role === 'admin' && (
                          <DropdownMenuItem onClick={() => router.push('/admin')} className="cursor-pointer rounded-lg hover:bg-blue-50 focus:bg-blue-50">
                            <Shield className="mr-3 h-4 w-4" />
                            <span>{t('nav.admin')}</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator className="my-2" />
                        <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 rounded-lg">
                          <LogOut className="mr-3 h-4 w-4" />
                          <span>{t('nav.logout')}</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : (
              /* Login/Register Buttons - Separated */
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg shadow-gray-200/20 px-4 py-2">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => router.push('/login')} 
                    className="text-sm rounded-full hover:bg-gray-100 transition-all duration-200"
                  >
                    {t('nav.login')}
                  </Button>
                  <Button 
                    onClick={() => router.push('/register')} 
                    className="text-sm rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {t('nav.register')}
                  </Button>
                </div>
              </div>
            )}

            {/* Mobile Language Switcher */}
            <div className="sm:hidden ml-3 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg shadow-gray-200/20 px-3 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}