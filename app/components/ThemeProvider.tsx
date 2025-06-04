"use client"

import { useState, useEffect } from "react"

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Only run once component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  // Avoid hydration mismatch by only rendering once mounted
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-dark-card hover:bg-gray-300 dark:hover:bg-dark-border transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '🌞' : '🌙'}
        </button>
      </div>
      {children}
    </>
  )
} 