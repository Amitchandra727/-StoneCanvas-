"use client"

import { useEffect } from "react"
import { useThemeStore } from "@/stores/theme-store"

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    console.log('Theme provider - isDarkMode:', isDarkMode)
    
    if (isDarkMode) {
      root.classList.add("dark")
      root.classList.remove("light")
      body.classList.add("dark")
      body.classList.remove("light")
    } else {
      root.classList.remove("dark")
      root.classList.add("light")
      body.classList.remove("dark")
      body.classList.add("light")
    }
    
    console.log('Root classes:', root.className)
    console.log('Body classes:', body.className)
  }, [isDarkMode])

  return <>{children}</>
}
