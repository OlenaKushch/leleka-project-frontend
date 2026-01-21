import { Layout } from '@/components/layout/Layout'
import type { Metadata } from 'next'
import { Lato, Comfortaa } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import ThemeSync from '@/components/ThemeSync/ThemeSync'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-family',
})

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--second-family',
})

export const metadata: Metadata = {
  title: 'Leleka',
  description: 'Pregnancy tracking application',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        {/* ✅ Google Identity Services */}
        <script src="https://accounts.google.com/gsi/client" async defer />
      </head>
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <Providers>
          <ThemeSync />
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
