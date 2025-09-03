"use client"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id")
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-2 rounded-full hover:bg-gray-100 transition-all duration-200 min-w-[65px] md:min-w-[70px] bg-gray-50/80 border border-gray-200/60"
    >
      <Globe className="h-3.5 w-3.5 md:h-4 md:w-4 flex-shrink-0 text-gray-600" />
      <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-gray-800 min-w-[20px] text-center">
        {language}
      </span>
    </Button>
  )
}
