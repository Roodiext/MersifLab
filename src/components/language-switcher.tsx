"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation" // Import hooks dari next/navigation
import { ChevronDown } from "lucide-react" // Untuk ikon panah

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()

  // Ambil locale saat ini dari pathname
  // Misalnya '/en/about' akan menjadi 'en'
  // Jika tidak ada locale di path (misal: '/about'), default ke 'en'
  const currentLocale = pathname.split("/")[1] || "en"

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "id", name: "Indonesian", flag: "🇮🇩" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
  ]

  const getLanguageName = (code: string) => {
    const lang = languages.find((l) => l.code === code)
    return lang ? `${lang.flag} ${lang.name}` : `${code.toUpperCase()}`
  }

  const handleLanguageChange = (newLocale: string) => {
    // Bangun path baru dengan locale yang dipilih
    const pathSegments = pathname.split("/")
    // Jika pathSegments[1] adalah locale, ganti. Jika tidak, tambahkan setelah root.
    if (languages.some((lang) => lang.code === pathSegments[1])) {
      pathSegments[1] = newLocale
    } else {
      pathSegments.splice(1, 0, newLocale) // Insert new locale after the first empty string (root)
    }
    const newPath = pathSegments.join("/")

    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2 bg-transparent text-gray-700 hover:text-black">
          {getLanguageName(currentLocale)}
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
            {lang.flag} {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
