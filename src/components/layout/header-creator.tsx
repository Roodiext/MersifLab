"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown, Home, Package, Mail, Cable as Cube, User, Settings, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

interface NavItem {
  href?: string
  label: string
  icon?: React.ElementType
  isDropdown?: boolean
  subLinks?: { href: string; label: string }[]
  isHashLink?: boolean
  targetId?: string
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  icon?: React.ElementType
  isMobile?: boolean
  onClick?: () => void
  isHashLink?: boolean
  targetId?: string
}

function NavLink({
  href,
  children,
  icon: Icon,
  isMobile = false,
  onClick,
  isHashLink = false,
  targetId,
}: NavLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    if (isHashLink && targetId) {
      e.preventDefault()

      const element = document.getElementById(targetId)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.offsetTop
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }

      if (onClick) onClick()
      return
    }

    if (onClick) onClick()
  }

  const base = "relative group transition-all duration-300 flex items-center hover:text-blue-600"
  const size = isMobile ? "text-base font-medium" : "text-sm font-medium"
  const gap = Icon ? (isMobile ? "gap-3" : "gap-1.5") : ""

  if (isHashLink) {
    return (
      <button
        onClick={handleClick}
        className={`${base} ${size} ${gap} ${isMobile ? "px-4 py-3 hover:bg-gray-50 rounded-lg" : "px-4 py-2.5 rounded-full hover:bg-blue-50/80 hover:shadow-sm"} bg-transparent border-none cursor-pointer`}
      >
        {Icon && <Icon className={isMobile ? "h-5 w-5" : "h-4 w-4"} />}
        {children}
        {!isMobile && (
          <span className="absolute left-4 bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out group-hover:w-[calc(100%-2rem)]" />
        )}
      </button>
    )
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={`${base} ${size} ${gap} ${isMobile ? "px-4 py-3 hover:bg-gray-50 rounded-lg" : "px-4 py-2.5 rounded-full hover:bg-blue-50/80 hover:shadow-sm"}`}
    >
      {Icon && <Icon className={isMobile ? "h-5 w-5" : "h-4 w-4"} />}
      {children}
      {!isMobile && (
        <span className="absolute left-4 bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 ease-out group-hover:w-[calc(100%-2rem)]" />
      )}
    </Link>
  )
}

export function HeaderCreator() {
  const [isMobileServiceOpen, setIsMobileServiceOpen] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()
  const { t } = useLanguage()

  const navItems: NavItem[] = [
    { href: "/#hero", label: t("nav.home"), icon: Home, isHashLink: true, targetId: "hero" },
    { href: "/#about", label: t("nav.about"), icon: User, isHashLink: true, targetId: "about" },
    { href: "/#features", label: t("nav.features"), icon: Package, isHashLink: true, targetId: "features" },
    { href: "/#the-rooms", label: "The Rooms", icon: Cube, isHashLink: true, targetId: "the-rooms" },
    { href: "/#contact", label: t("nav.contact"), icon: Mail, isHashLink: true, targetId: "contact" },
  ]

  const closeSheet = () => {
    setIsMobileServiceOpen(false)
  }

  // Function to get user avatar with better fallback logic
  const getUserAvatar = () => {
    if (!session?.user) return null

    // Check multiple possible avatar sources from session
    const possibleAvatars = [
      session.user.avatar,
      session.user.image,
      (session.user as any)?.picture, // Sometimes OAuth providers use 'picture'
    ].filter(Boolean)

    return possibleAvatars[0] || null
  }

  // Function to get user initials
  const getUserInitials = () => {
    if (!session?.user) return "U"

    const name = session.user.name || session.user.email || "User"
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase()
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
                        const isOpen = isMobileServiceOpen
                        const setIsOpen = setIsMobileServiceOpen

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
                              <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                              />
                            </button>
                            {isOpen && (
                              <div className="pl-6 space-y-1">
                                {item.subLinks?.map((subLink, subIndex) => (
                                  <NavLink key={subIndex} href={subLink.href} isMobile onClick={closeSheet}>
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
                          isHashLink={item.isHashLink}
                          targetId={item.targetId}
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
                <div className="flex items-center mr-3">
                  <Link href="/mersifcreator" className="flex items-center">
                    <Image
                      src="/img/navbar-logo/logoCREATOR.svg"
                      alt="MersifLab Creator"
                      width={100}
                      height={30}
                      className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
                      onError={(e) => {
                        console.log("Creator logo failed to load, falling back to main logo")
                        e.currentTarget.src = "/img/logomersiflab.png"
                        e.currentTarget.className = "h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-200"
                      }}
                    />
                  </Link>
                  <div className="w-px h-5 bg-gray-300 ml-3"></div>
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
                        <DropdownMenuContent
                          align="start"
                          className="min-w-48 rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-sm"
                        >
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
                    <NavLink
                      key={index}
                      href={item.href || "/"}
                      icon={item.icon}
                      isHashLink={item.isHashLink}
                      targetId={item.targetId}
                    >
                      {item.label}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          </nav>

          {/* Right Section - Language Switcher & User Menu */}
          <div className="flex items-center gap-2">
            <div className="block">
              <LanguageSwitcher />
            </div>

            {status === "authenticated" && session?.user ? (
              <div className="flex items-center gap-2">
                <div className="hidden xl:block">
                  <span className="text-sm font-medium text-gray-900">{session.user.name || "User"}</span>
                </div>

                {/* Mobile Profile Button - Direct Navigation */}
                <div className="block md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/profile")}
                    className="relative h-8 w-8 rounded-full hover:bg-gray-100"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarImage
                        src={getUserAvatar() || undefined}
                        alt={session.user.name || "User"}
                        className="object-cover"
                        onError={(e) => {
                          console.log("Avatar image failed to load:", getUserAvatar())
                          e.currentTarget.style.display = "none"
                        }}
                      />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-xs">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </div>

                {/* Desktop Profile Dropdown */}
                <div className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-gray-100">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={getUserAvatar() || undefined}
                            alt={session.user.name || "User"}
                            className="object-cover"
                            onError={(e) => {
                              console.log("Avatar image failed to load:", getUserAvatar())
                              e.currentTarget.style.display = "none"
                            }}
                          />
                          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium text-sm">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 md:w-64"
                      align="end"
                      side="bottom"
                      sideOffset={12}
                      alignOffset={-8}
                      avoidCollisions={true}
                      sticky="always"
                      collisionPadding={16}
                    >
                      <div className="flex flex-col gap-1 p-3 border-b">
                        <p className="text-sm font-medium leading-tight">{session.user.name}</p>
                        <p className="text-xs text-muted-foreground leading-tight">{session.user.email}</p>
                      </div>
                      <div className="py-1">
                        <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>{t("nav.profile")}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>{t("nav.settings")}</span>
                        </DropdownMenuItem>
                        {session.user.role === "admin" && (
                          <DropdownMenuItem onClick={() => router.push("/admin")} className="cursor-pointer">
                            <Shield className="mr-2 h-4 w-4" />
                            <span>{t("nav.admin")}</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => signOut()}
                          className="cursor-pointer text-red-600 focus:text-red-600"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>{t("nav.logout")}</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 md:gap-2">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/login")}
                  className="text-xs md:text-sm px-2 md:px-4"
                >
                  {t("nav.login")}
                </Button>
                <Button onClick={() => router.push("/register")} className="text-xs md:text-sm px-2 md:px-4">
                  {t("nav.register")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}