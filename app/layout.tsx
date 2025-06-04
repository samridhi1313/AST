import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import CookieBanner from "@/components/cookie-banner"
import ClientThemeProvider from "./components/ClientThemeProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Community Pulse",
  description: "Discover and join local community events and report civic issues",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text`}>
        <ClientThemeProvider>
          <main className="min-h-screen">
            {children}
          </main>
          <CookieBanner />
        </ClientThemeProvider>
      </body>
    </html>
  )
}
