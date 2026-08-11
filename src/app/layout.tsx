import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Manrope, Bebas_Neue } from 'next/font/google';
import '../styles/tailwind.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-hero',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Refly — Premium Men\'s Bottom Wear India',
  description: 'Refly crafts premium men\'s bottom wear — jeans, cargo, formal, linen pants, chinos, joggers and shorts. Luxury quality, delivered across India.',
  keywords: ['premium mens jeans india', 'luxury cargo pants', 'mens formal pants india', 'refly clothing', 'premium bottom wear india'],
  openGraph: {
    title: 'Refly — Move Different.',
    description: 'Premium men\'s bottom wear. Luxury quality, delivered across India.',
    images: [{ url: '/assets/images/6391F31B-6325-43A2-8883-0AEF80565846-1785440876904.png', width: 1200, height: 630, alt: 'Refly — Premium Men\'s Bottom Wear' }],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refly — Move Different.',
    description: 'Premium men\'s bottom wear. Luxury quality, delivered across India.',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        <link href="https://fonts.cdnfonts.com/css/blue-fonte-sans" rel="stylesheet" />
      </head>
      <body className={manrope.className} suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}