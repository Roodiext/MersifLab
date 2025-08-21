"use client"

import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Home, Star, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter, usePathname } from "next/navigation"
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
        'hero': ['hero', 'home', 'banner', 'header-section'],
        'testimonials': ['testimonials', 'testimonial', 'testimoni'],
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
            window.scrollTo({ top: offsetPosition, behavior: "smooth" })
          }
        }, 500)
      } else {
        const ids = possibleIds[hash] || [hash]
        const target = findElementByIds(ids)
        if (target) {
          const headerOffset = 80
          const elementPosition = target.offsetTop
          const offsetPosition = elementPosition - headerOffset
          window.scrollTo({ top: offsetPosition, behavior: "smooth" })
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

export function HeaderIOT() {
  const router = useRouter()
  const { t } = useLanguage()
  
  const navItems: NavItem[] = [
    { href: "/#hero", label: t('nav.home'), icon: Home },
    { href: "/#product", label: t('nav.product'), icon: Package },
    { href: "/#testimonials", label: t('nav.testimonials'), icon: Star },
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
                <Button variant="ghost" size="icon" className="md:hidden hover:bg-gray-100">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex h-16 items-center border-b px-4">
                  <Link href="/" className="flex items-center">
                    <Image 
                      src="/img/mersif-academy/logo/mersifiot.svg" 
                      alt="Mersif IoT Logo" 
                      width={120} 
                      height={40} 
                      className="h-8 w-auto" 
                    />
                  </Link>
                </div>
                <div className="py-6">
                  <nav className="flex flex-col space-y-2">
                    {navItems.map((item, index) => (
                      <NavLink key={index} href={item.href} icon={item.icon} isMobile>
                        {item.label}
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo Desktop */}
            <Link href="/" className="flex items-center">
              <Image
                src="/img/mersif-academy/logo/mersifiot.svg"
                alt="Mersif IoT Logo"
                width={140}
                height={50}
                priority
                className="h-10 w-auto"
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

          {/* Right Section - Language Switcher */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          </div>
        </div>
      </nav>
    </header>
  )
}
