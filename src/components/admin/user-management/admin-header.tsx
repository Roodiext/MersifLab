"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  CircleUser,
  Menu,
  Search,
  Home,
  BarChart,
  Newspaper,
  Package,
  Phone,
  Handshake,
  Users,
  Settings,
  LogOut,
  Bell,
  Shield
} from "lucide-react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useState } from "react"

interface AdminHeaderProps {
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [notifications] = useState(3) // Mock notification count

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Navigation Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <nav className="grid gap-2 text-sm font-medium">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold">
                  ML
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">MersifLab</h2>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>
              
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/admin/mersif-numbers"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
              >
                <BarChart className="h-4 w-4" />
                Mersif Numbers
              </Link>
              <Link
                href="/admin/articles"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
              >
                <Newspaper className="h-4 w-4" />
                Articles
              </Link>
              <Link
                href="/admin/product"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
              <Link
                href="/admin/contact-messages"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
              >
                <Phone className="h-4 w-4" />
                Contact Messages
              </Link>
              <Link
                href="/admin/partners"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
              >
                <Handshake className="h-4 w-4" />
                Partners
              </Link>
              <Link
                href="/admin/testimonials"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
              >
                <Users className="h-4 w-4" />
                Testimonials
              </Link>
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-sm">
              ML
            </div>
            <div className="hidden md:block">
              <h1 className="font-bold text-gray-900">MersifLab</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search anything..."
              className="w-full pl-10 pr-4 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-300 focus:ring-blue-200"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 hover:bg-red-500">
                {notifications}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src="" alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs font-medium">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-blue-600" />
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    {user.role}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/profile" className="flex items-center gap-2">
                  <CircleUser className="h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}  
