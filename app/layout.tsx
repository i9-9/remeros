import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// GT America fonts
const gtAmericaRegular = localFont({
  src: '../fonts/GT-America-Medium.otf',
  variable: '--font-gt-america',
  weight: '400',
});

const gtAmericaBold = localFont({
  src: '../fonts/GT-America-Extended-Bold.otf',
  variable: '--font-gt-extended',
  weight: '700',
});

// PP Neue Montreal fonts
const ppNeueMontreal = localFont({
  src: [
    {
      path: '../fonts/PPNeueMontreal-Book.otf',
      weight: '400',
    },
    {
      path: '../fonts/PPNeueMontreal-Medium.otf',
      weight: '500',
    },
    {
      path: '../fonts/PPNeueMontreal-Bold.otf',
      weight: '700',
    },
  ],
  variable: '--font-pp-neue',
});

export const metadata: Metadata = {
  title: "Palmera de los Remeros - Departamentos en Tigre | Grupo Portland",
  description: "Descubre Palmera de los Remeros, torres residenciales premium en Tigre. 140 unidades de 2, 3, 4 y 5 ambientes con amenities únicos.",
  keywords: "departamentos tigre, torres remeros, inmobiliario nordelta, grupo portland",
  authors: [{ name: "Grupo Portland" }],
  creator: "Grupo Portland",
  publisher: "Grupo Portland",
  openGraph: {
    title: "Palmera de los Remeros - Departamentos en Tigre",
    description: "Torres residenciales premium en Tigre con amenities únicos",
    url: "https://grupoportland.com/remeros/",
    siteName: "Grupo Portland",
    locale: "es_AR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  twitter: {
    card: 'summary',
    title: 'Palmera de los Remeros - Departamentos en Tigre',
    description: 'Torres residenciales premium en Tigre con amenities únicos',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${gtAmericaRegular.variable} ${gtAmericaBold.variable} ${ppNeueMontreal.variable}`}>
      <body className={`${gtAmericaRegular.className} antialiased bg-primary-white text-primary-navy`}>
        {children}
      </body>
    </html>
  );
}   