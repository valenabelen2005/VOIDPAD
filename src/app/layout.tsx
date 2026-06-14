import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { NavbarWrapper } from '@/components/layout/NavbarWrapper'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/cart/CartDrawer'
import { StarField } from '@/components/ui/StarField'
import { CursorGlow } from '@/components/ui/CursorGlow'
import { IdeaWidget } from '@/components/ui/IdeaWidget'
import { ServiceWorkerRegistration } from '@/components/ui/ServiceWorkerRegistration'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00e5ff',
}

export const metadata: Metadata = {
  title: { default: 'VoidPad — Premium Custom Desk Pads', template: '%s | VoidPad' },
  description: 'Premium custom desk pads and mouse pads with stunning artwork. High quality, vibrant prints for your perfect setup.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'VOIDPAD',
  },
  openGraph: {
    title: 'VoidPad — Premium Custom Desk Pads',
    description: 'Premium custom desk pads and mouse pads for your setup.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen flex flex-col bg-background">
        <ServiceWorkerRegistration />
        <StarField />
        <CursorGlow />
        <AnnouncementBar />
        <NavbarWrapper />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
        <CartDrawer />
        <IdeaWidget />
      </body>
    </html>
  )
}
