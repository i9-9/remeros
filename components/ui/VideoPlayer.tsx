'use client';

import React, { useRef } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  className?: string;
  isVertical?: boolean;
}

export default function VideoPlayer({ videoUrl, thumbnailUrl, className = '', isVertical = false }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <div className={`relative w-full h-full ${isVertical ? 'flex justify-center' : ''}`}>
        <video
          ref={videoRef}
          className={`${isVertical ? 'h-full w-auto max-w-none' : 'w-full h-full object-cover'}`}
          poster={thumbnailUrl}
          playsInline
          autoPlay
          loop
          muted
        >
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </div>
  );
} 