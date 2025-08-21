"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id')
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:text-blue-600"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline">
        {language === 'id' ? 'EN' : 'ID'}
      </span>
    </Button>
  )
}
