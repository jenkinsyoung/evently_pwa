import { AuthProvider } from '@/contexts/AuthContext'
import { EventProvider} from '@/contexts'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import './globals.css'
import { ReactNode } from 'react'
import { Inter, Manrope } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-overpass'
});
const manrope = Manrope({ 
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-caveat'
});


interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="manifest" href="/manifest.json" /> */}
        <meta name="theme-color" content="#6366f1" />
        <meta name="description" content="Discover and register for events near you" />
        <title>Evently - Find Your Events</title>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AuthProvider>
          <EventProvider>
            <div className="min-h-screen flex flex-col bg-white">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </EventProvider>
        </AuthProvider>
      </body>
    </html>
  )
}