import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CTF Platform',
  description: 'Competitive CTF Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className="dark">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <NextUIProvider>
            {children}
          </NextUIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
