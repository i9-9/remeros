'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'UBICACIÓN', href: '#ubicacion' },
  { name: 'PROYECTO', href: '#proyecto' },
  { name: 'UNIDADES', href: '#unidades' },
  { name: 'CONTACTO', href: '#contacto' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-10 py-5 layout-margin">
      <div className="container-grid">
        <div className="col-4 flex items-center">
          <Logo type="remeros" size="lg" className="text-white" />
        </div>
        
        {/* Desktop Navigation */}
        <div className="col-8 hidden lg:flex lg:gap-x-24 justify-end items-start">
          {navigation.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.12, duration: 0.5, ease: 'easeOut' }}
            >
              <Link
                href={item.href}
                className="text-sm font-montreal-medium leading-6 text-primary-navy hover:text-primary-blue transition-colors tracking-wider"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="col-8 flex lg:hidden justify-end items-center">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-primary-navy"
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
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-primary-navy flex flex-col"
          >
            <div className="flex justify-end items-center p-6">
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
            <div className="flex-1 flex flex-col justify-center items-center">
              {navigation.map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ delay: 0.2 + idx * 0.15, duration: 0.5, ease: 'easeOut' }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    className="block text-3xl md:text-4xl font-gt-extended text-white text-center py-4 hover:text-primary-cream transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 