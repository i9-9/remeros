'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

export default function ImageGallery({ images, className = '' }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length, isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!images || images.length === 0) {
    return (
      <div className={`bg-primary-cream/50 rounded-lg flex items-center justify-center h-96 ${className}`}>
        <p className="text-primary-blue">No hay imágenes disponibles</p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Image Container */}
      <div className="relative overflow-hidden rounded-lg shadow-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div
                className="w-full h-[500px] lg:h-[600px] bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${image}')` }}
                role="img"
                aria-label={`Interior ${index + 1} de 8`}
              >
                <div className="w-full h-full bg-gradient-to-t from-primary-navy/20 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-primary-white/80 hover:bg-primary-white p-2 rounded-full shadow-lg transition-all duration-300 group"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6 text-primary-navy group-hover:text-primary-sage" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-primary-white/80 hover:bg-primary-white p-2 rounded-full shadow-lg transition-all duration-300 group"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="w-6 h-6 text-primary-navy group-hover:text-primary-sage" />
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-primary-navy/80 text-primary-white px-3 py-1 rounded-full text-sm font-gt-america">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-6 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-primary-sage scale-125'
                : 'bg-primary-dark/20 hover:bg-primary-sage/50'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 bg-primary-navy/80 text-primary-white px-3 py-1 rounded-full text-xs">
            <div className="w-2 h-2 bg-primary-gold rounded-full animate-pulse"></div>
            <span className="font-gt-america">Auto</span>
          </div>
        </div>
      )}
    </div>
  );
} 