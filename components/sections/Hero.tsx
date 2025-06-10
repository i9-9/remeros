'use client';

import { useState } from 'react'
import Logo from '../ui/Logo'
import Link from 'next/link'

const navigation = [
  { name: 'UBICACIÓN', href: '#ubicacion' },
  { name: 'EL PROYECTO', href: '#proyecto' },
  { name: 'DEPARTAMENTOS', href: '#unidades' },
  { name: 'CONTACTO', href: '#contacto' },
]

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 01_AEREA_FI (2).jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Navigation - Fixed at top with 50px margins */}
      <nav className="relative z-10 py-6 layout-margin">
        <div className="container-grid">
          <div className="col-4 flex items-center">
            <Logo type="remeros" size="md" className="text-white" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="col-8 hidden lg:flex lg:gap-x-12 justify-end items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-montreal-medium leading-6 text-white hover:text-primary-cream transition-colors tracking-wider"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="col-8 flex lg:hidden justify-end items-center">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="fixed inset-0 z-50 bg-black/80" onClick={() => setIsMenuOpen(false)} />
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-primary-dark px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Logo type="remeros" size="sm" className="text-white" />
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="sr-only">Cerrar menú</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-montreal-medium leading-7 text-white hover:bg-gray-50/10"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content - Using 12 column grid with centered content */}
      <div className="relative z-10 flex-1 flex items-center h-[calc(100vh-120px)] layout-margin">
        <div className="container-grid w-full">
          <div className="col-8">
            <h1 className="font-gt-extended font-bold text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white leading-none mb-12">
              UNA NUEVA<br />
              MANERA DE<br />
              <span className="text-black">VIVIRTIGRE.</span>
            </h1>
            
            <button className="inline-flex items-center px-8 py-4 border border-white text-white font-montreal-medium text-lg hover:bg-white hover:text-primary-dark transition-all duration-300 rounded-full">
              QUIERO SABER MÁS
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 