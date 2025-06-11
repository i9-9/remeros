'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

const navigation = [
  { name: 'UBICACIÓN', href: '#ubicacion' },
  { name: 'PROYECTO', href: '#proyecto' },
  { name: 'UNIDADES', href: '#unidades' },
  { name: 'CONTACTO', href: '#contacto' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-10 py-6 layout-margin">
      <div className="container-grid">
        <div className="col-4 flex items-center">
          <Logo type="remeros" size="xl" className="text-white" />
        </div>
        
        {/* Desktop Navigation */}
        <div className="col-8 hidden lg:flex lg:gap-x-24 justify-end items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-montreal-medium leading-6 text-primary-navy hover:text-primary-blue transition-colors tracking-wider"
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
          <div className="fixed inset-0 z-50 bg-primary-navy">
            <div className="layout-margin py-6">
              <div className="flex items-center justify-between">
                <Logo type="remeros" size="md" className="text-white" />
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
                <div className="-my-6 divide-y divide-primary-cream/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 text-base font-montreal-medium leading-7 text-white hover:text-primary-cream"
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
        </div>
      )}
    </nav>
  );
} 