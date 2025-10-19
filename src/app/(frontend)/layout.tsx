import React from 'react'
import './styles.css'
import { Poppins, Anton } from 'next/font/google'
import Header from './components/Header'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "A's Hub - Bespoke Interior Design & Luxury Furniture | Abuja",
  description:
    "Transform your space with A's Hub. Premium bespoke interior design, custom furniture, and complete fit-outs in Abuja. Where function meets luxury craftsmanship.",
  keywords: [
    'interior design',
    'bespoke furniture',
    'luxury interiors',
    'custom furniture',
    'Abuja designer',
    'home design',
    'commercial design',
    'interior consultation',
  ],
  authors: [{ name: "A's Hub" }],
  creator: "A's Hub",
  publisher: "A's Hub",
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: "A's Hub Luxury Concepts",
    title: "A's Hub - Bespoke Interior Design & Luxury Furniture",
    description:
      'Experience precision craftsmanship and personalized interior design solutions. Luxury furniture and complete interior fit-outs.',
    images: [
      {
        url: '/image.png',
        width: 1200,
        height: 630,
        alt: "A's Hub - Modern living room interior design",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "A's Hub - Bespoke Interior Design & Luxury Furniture",
    description:
      'Transform your space with premium interior design and custom furniture. Precision craftsmanship meets luxury.',
    images: ['/image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})
const anton = Anton({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-anton',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className={`${poppins.className} ${anton.variable}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
