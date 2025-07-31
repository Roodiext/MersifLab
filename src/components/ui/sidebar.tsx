"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Context for managing sidebar state
interface SidebarContextType {
  open: boolean
  setOpen: (open: boolean) => void
  collapsible: "icon" | "none"
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
  defaultOpen?: boolean
  collapsible?: "icon" | "none"
}

export function SidebarProvider({ children, defaultOpen = true, collapsible = "none" }: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  return <SidebarContext.Provider value={{ open, setOpen, collapsible }}>{children}</SidebarContext.Provider>
}

// Main Sidebar component
const sidebarVariants = cva("flex flex-col border-r bg-background transition-all duration-300 ease-in-out", {
  variants: {
    collapsible: {
      icon: "w-16 group-data-[open=true]:w-64",
      none: "w-64",
    },
  },
  defaultVariants: {
    collapsible: "none",
  },
})

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof sidebarVariants> {
  collapsible?: "icon" | "none"
}

export function Sidebar({ className, collapsible, ...props }: SidebarProps) {
  const { open, collapsible: contextCollapsible } = useSidebar()
  const effectiveCollapsible = collapsible || contextCollapsible

  return (
    <aside
      className={cn(sidebarVariants({ collapsible: effectiveCollapsible }), className, {
        "group data-[open=true]:w-64": effectiveCollapsible === "icon",
        "w-16": effectiveCollapsible === "icon" && !open,
        "w-64": effectiveCollapsible === "icon" && open,
      })}
      data-open={open}
      data-collapsible={effectiveCollapsible}
      {...props}
    />
  )
}

// Sidebar Header
export function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex h-14 items-center border-b px-4", className)} {...props} />
}

// Sidebar Content
export function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-auto py-2", className)} {...props} />
}

// Sidebar Footer
export function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex h-14 items-center border-t px-4", className)} {...props} />
}

// Sidebar Trigger (for collapsing)
export function SidebarTrigger({ className, ...props }: React.ComponentPropsWithoutRef<typeof Button>) {
  const { open, setOpen, collapsible } = useSidebar()

  if (collapsible === "none") {
    return null // No trigger if not collapsible
  }

  return (
    <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className={cn("h-8 w-8", className)} {...props}>
      {open ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  )
}

// Sidebar Inset (for main content area)
export function SidebarInset({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { open, collapsible } = useSidebar()
  return (
    <div
      className={cn(
        "transition-all duration-300 ease-in-out",
        {
          "ml-16 group-data-[open=true]:ml-64": collapsible === "icon",
          "ml-64": collapsible === "none",
        },
        className,
      )}
      {...props}
    />
  )
}

// Sidebar Menu components
export function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <nav className={cn("grid items-start px-2 text-sm font-medium lg:px-4", className)} {...props} />
}

export function SidebarMenuItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        className,
      )}
      {...props}
    />
  )
}

interface SidebarMenuButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  isActive?: boolean
  asChild?: boolean
}

export function SidebarMenuButton({ className, isActive, asChild, ...props }: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : Button
  const { open, collapsible } = useSidebar()

  return (
    <Comp
      variant="ghost"
      className={cn(
        "w-full justify-start",
        {
          "bg-muted text-primary": isActive,
          "group-data-[collapsible=icon]:justify-center": collapsible === "icon",
        },
        className,
      )}
      {...props}
    >
      {React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === "svg") {
            return React.cloneElement(child as React.ReactElement<any, any>, {
              className: cn("h-5 w-5", (child.props as any).className),
            })
          }
          if (typeof child.type === "string" && child.type === "span") {
            return React.cloneElement(child as React.ReactElement<any, any>, {
              className: cn("group-data-[collapsible=icon]:hidden", (child.props as any).className),
            })
          }
        }
        return child
      })}
    </Comp>
  )
}

export function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-2 p-4", className)} {...props} />
}

export function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { collapsible } = useSidebar()
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-foreground",
        {
          "group-data-[collapsible=icon]:hidden": collapsible === "icon",
        },
        className,
      )}
      {...props}
    />
  )
}

export function SidebarGroupContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1", className)} {...props} />
}
