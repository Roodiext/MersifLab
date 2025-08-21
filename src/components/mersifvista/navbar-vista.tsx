"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, User, Home, BookOpen, Newspaper, Image as ImageIcon, Mail, Settings, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter, usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

interface NavItem {
  href: string
  label: string
  icon?: React.ElementType
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

  const base = "relative group transition-colors duration-300 flex items-center hover:text-blue-600"
  const size = isMobile ? "text-base font-medium" : "text-sm font-medium"
  const gap = Icon ? (isMobile ? "gap-3" : "gap-1.5") : ""
  
  return (
    <Link
      href={href}
      onClick={handleNavigation}
      className={`${base} ${size} ${gap} ${isMobile ? "px-4 py-3 hover:bg-gray-50 rounded-md" : "px-3 py-2 rounded-md hover:bg-gray-50/80"}`}
    >
      {Icon && <Icon className={isMobile ? "h-5 w-5" : "h-4 w-4"} />} 
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-current transition-all duration-300 ease-out group-hover:w-full" />
    </Link>
  )
}

export function HeaderVista() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { t } = useLanguage()
  
  const navItems: NavItem[] = [
    { href: "#home", label: "Beranda", icon: Home },
    { href: "", label: "Pelatihan", icon: BookOpen },
    { href: "/berita", label: "Berita", icon: Newspaper },
    { href: "/galeri", label: "Galeri", icon: ImageIcon },
    { href: "/#contact", label: "Kontak", icon: Mail },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden hover:bg-gray-100"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex h-16 items-center border-b px-4">
                  <Link href="/" className="flex items-center">
                    <Image 
                      src="/img/MersifVista.png" 
                      alt="MersifVista Logo" 
                      width={120} 
                      height={40} 
                      className="h-8 w-auto" 
                    />
                  </Link>
                </div>
                <div className="py-6">
                  <nav className="flex flex-col space-y-2">
                    {navItems.map((item, index) => (
                      <NavLink
                        key={index}
                        href={item.href}
                        icon={item.icon}
                        isMobile
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/img/MersifVista.png"
              alt="Mersif Vista"
              width={120}
              height={10}
              className="w-full h-auto"
              />
            </Link>
          </div>

          {/* Center Section - Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <NavLink key={index} href={item.href} icon={item.icon}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* Right Section - Language Switcher & User Menu */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            
            {status === "authenticated" && session?.user ? (
              <div className="flex items-center gap-3">
                {/* Username Display - Hidden on small screens */}
                <div className="hidden lg:block">
                  <span className="text-sm font-medium text-gray-900">
                    {session.user.name || 'User'}
                  </span>
                </div>
                
                {/* User Avatar Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-gray-100">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                          {session.user.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64" align="end">
                    <div className="flex flex-col gap-1 p-3 border-b">
                      <p className="text-sm font-medium leading-tight">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground leading-tight">{session.user.email}</p>
                    </div>
                    <div className="py-1">
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>{t('nav.profile')}</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t('nav.settings')}</span>
                      </DropdownMenuItem>
                      {session.user.role === 'admin' && (
                        <DropdownMenuItem onClick={() => router.push('/admin')} className="cursor-pointer">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>{t('nav.admin')}</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{t('nav.logout')}</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => router.push('/login')} className="text-sm">
                  {t('nav.login')}
                </Button>
                <Button onClick={() => router.push('/register')} className="text-sm">
                  {t('nav.register')}
                </Button>
              </div>
            )}

            {/* Mobile Language Switcher */}
            <div className="sm:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}