"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown, User } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isNewsHovered, setIsNewsHovered] = useState(false)

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image src="/img/logomersiflab.png" alt="MersifLab Logo" width={120} height={30} />
        </Link>
        <nav className="hidden lg:flex gap-6 items-center flex-grow justify-center">
          <Link href="#hero" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            About
          </Link>
          <Link href="#product" className="text-sm font-medium hover:underline underline-offset-4">
            Product
          </Link>
          <Link href="#testimonial" className="text-sm font-medium hover:underline underline-offset-4">
            Testimonial
          </Link>
          
          {/* News Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsNewsHovered(true)}
            onMouseLeave={() => setIsNewsHovered(false)}
          >
            <Link 
              href="#news" 
              className="text-sm font-medium hover:underline underline-offset-4 flex items-center gap-1"
            >
              News <ChevronDown className="h-4 w-4" />
            </Link>
            
            {/* Dropdown Card */}
            {isNewsHovered && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <div className="py-2">
                  <Link 
                    href="/news" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    News Page
                  </Link>
                  <Link 
                    href="/news/latest" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Latest News
                  </Link>
                  <Link 
                    href="/news/archive" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    News Archive
                  </Link>
                  <Link 
                    href="/news/categories" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Categories
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <Link href="/login" className="hidden lg:block">
          <User className="h-6 w-6" />
          <span className="sr-only">User Account</span>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="ml-auto lg:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="flex items-center justify-center gap-2 mb-6">
              <Image src="/mersiflab-logo.svg" alt="MersifLab Logo" width={120} height={30} />
            </Link>
            <div className="grid gap-4 py-6">
              <Link href="#hero" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="#about" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href="#product" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>
                Product
              </Link>
              <Link href="#testimonial" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>
                Testimonial
              </Link>
              
              {/* Mobile News Menu */}
              <div className="space-y-2">
                <Link
                  href="#news"
                  className="text-lg font-semibold flex items-center gap-1"
                  onClick={() => setIsOpen(false)}
                >
                  News <ChevronDown className="h-5 w-5" />
                </Link>
                <div className="pl-4 space-y-2">
                  <Link 
                    href="/news" 
                    className="block text-base text-gray-600" 
                    onClick={() => setIsOpen(false)}
                  >
                    News Page
                  </Link>
                  <Link 
                    href="/news/latest" 
                    className="block text-base text-gray-600" 
                    onClick={() => setIsOpen(false)}
                  >
                    Latest News
                  </Link>
                  <Link 
                    href="/news/archive" 
                    className="block text-base text-gray-600" 
                    onClick={() => setIsOpen(false)}
                  >
                    News Archive
                  </Link>
                  <Link 
                    href="/news/categories" 
                    className="block text-base text-gray-600" 
                    onClick={() => setIsOpen(false)}
                  >
                    Categories
                  </Link>
                </div>
              </div>
              
              <Link href="#contact" className="text-lg font-semibold" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              <Link
                href="/login"
                className="text-lg font-semibold flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-6 w-6" /> Login
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}