import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ParallaxClientWrapper from "@/components/ui/ParallaxClientWrapper";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

// GT America fonts
const gtAmericaRegular = localFont({
  src: '../fonts/GT-America-Medium.otf',
  variable: '--font-gt-america',
  weight: '400',
});

/* // PP Neue Montreal fonts
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
}); */

// GT America Extended
const gtAmericaExtendedThin = localFont({
  src: '../fonts/GT-America-Extended-Thin.otf',
  variable: '--font-gt-extended-thin',
  weight: '100',
});
const gtAmericaExtendedMedium = localFont({
  src: '../fonts/GT-America-Extended-Medium.otf',
  variable: '--font-gt-extended-medium',
  weight: '500',
});
const gtAmericaExtendedBold = localFont({
  src: '../fonts/GT-America-Extended-Bold.otf',
  variable: '--font-gt-extended-bold',
  weight: '700',
});
const gtAmericaExpandedBold = localFont({
  src: '../fonts/GT-America-Expanded-Bold.otf',
  variable: '--font-gt-expanded-bold',
  weight: '700',
});
const gtAmericaExpandedRegular = localFont({
  src: '../fonts/GT-America-Expanded-Regular.otf',
  variable: '--font-gt-expanded-regular',
  weight: '400',
});
const gtAmericaLight = localFont({
  src: '../fonts/GT-America-Light.otf',
  variable: '--font-gt-light',
  weight: '300',
});
const gtAmericaMedium = localFont({
  src: '../fonts/GT-America-Medium.otf',
  variable: '--font-gt-medium',
  weight: '500',
});

// PP Neue Montreal
const ppNeueMontrealBold = localFont({
  src: '../fonts/PPNeueMontreal-Bold.otf',
  variable: '--font-pp-neue-bold',
  weight: '700',
});
const ppNeueMontrealBook = localFont({
  src: '../fonts/PPNeueMontreal-Book.otf',
  variable: '--font-pp-neue-book',
  weight: '400',
});
const ppNeueMontrealMedium = localFont({
  src: '../fonts/PPNeueMontreal-Medium.otf',
  variable: '--font-pp-neue-medium',
  weight: '500',
});

// Acumin (si la usas)
const acuminVariableConcept = localFont({
  src: '../fonts/AcuminVariableConcept.otf',
  variable: '--font-acumin-variable',
  weight: '400',
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
    <html lang="es" className={`
      ${gtAmericaExtendedThin.variable}
      ${gtAmericaExtendedMedium.variable}
      ${gtAmericaExtendedBold.variable}
      ${gtAmericaExpandedBold.variable}
      ${gtAmericaExpandedRegular.variable}
      ${gtAmericaLight.variable}
      ${gtAmericaMedium.variable}
      ${ppNeueMontrealBold.variable}
      ${ppNeueMontrealBook.variable}
      ${ppNeueMontrealMedium.variable}
      ${acuminVariableConcept.variable}
    `}>
      <body className={`${gtAmericaRegular.className} antialiased bg-primary-white text-primary-navy`}>
        <ParallaxClientWrapper>
          {children}
        </ParallaxClientWrapper>
        <WhatsAppButton />
      </body>
    </html>
  );
} 