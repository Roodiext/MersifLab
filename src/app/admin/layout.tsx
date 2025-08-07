"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FileText, Users, MessageSquare, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              <Link
                href="/admin/dashboard"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === "/admin/dashboard"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              
              <Link
                href="/admin/articles-news"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname.startsWith("/admin/articles-news")
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <FileText className="mr-3 h-5 w-5" />
                Articles & News
              </Link>

              <Link
                href="/admin/testimonials"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === "/admin/testimonials"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Testimonials
              </Link>

              <Link
                href="/admin/comments"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  pathname === "/admin/comments"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Comments
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex items-center mb-5">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <nav className="space-y-1">
            <Link
              href="/admin/dashboard"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                pathname === "/admin/dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <LayoutDashboard className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            
            <Link
              href="/admin/articles-news"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                pathname.startsWith("/admin/articles-news")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <FileText className="mr-3 h-5 w-5" />
              Articles & News
            </Link>

            <Link
              href="/admin/testimonials"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                pathname === "/admin/testimonials"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <Users className="mr-3 h-5 w-5" />
              Testimonials
            </Link>

            <Link
              href="/admin/comments"
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                pathname === "/admin/comments"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <MessageSquare className="mr-3 h-5 w-5" />
              Comments
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile header */}
        <div className="md:hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-white border-b">
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

