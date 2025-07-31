"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Home, Newspaper, Package, Phone, Settings, Users, BarChart, Handshake } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Mersif Numbers",
      href: "/admin/mersif-numbers",
      icon: BarChart,
    },
    {
      title: "Articles",
      href: "/admin/articles",
      icon: Newspaper,
    },
    {
      title: "Products",
      href: "/admin/product",
      icon: Package,
    },
    {
      title: "Contact Messages",
      href: "/admin/contact-messages",
      icon: Phone,
    },
    {
      title: "Partners",
      href: "/admin/partners",
      icon: Handshake,
    },
    {
      title: "Testimonials",
      href: "/admin/testimonials",
      icon: Users,
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-between p-2">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-lg font-semibold">
          <img src="/placeholder.svg?height=24&width=24" alt="MersifLab Logo" className="h-6 w-6" />
          <span className="group-data-[collapsible=icon]:hidden">MersifLab Admin</span>
        </Link>
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
