'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { PlayIcon } from '@heroicons/react/24/solid';

interface VideoPlayerProps {
  videoUrl: string;
  thumbnailUrl: string;
  className?: string;
  isVertical?: boolean;
  showControls?: boolean;
}

export default function VideoPlayer({ 
  videoUrl,
  thumbnailUrl,
  className = '',
  isVertical = false,
  showControls = false
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [displayControls, setDisplayControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      const newTime = percentage * duration;
      
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percentage * 100);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <div className={`relative w-full h-full ${isVertical ? 'flex justify-center' : ''}`}>
        <video
          ref={videoRef}
          className={`${isVertical ? 'h-full w-auto max-w-none' : 'w-full h-full object-cover'}`}
          poster={thumbnailUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={handleVideoEnd}
          playsInline
          muted
        >
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
        {!isPlaying && (
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg 
                className="w-8 h-8 md:w-10 md:h-10 text-primary-navy ml-1" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {showControls && (
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            displayControls ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Controles inferiores */}
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3">
            {/* Barra de progreso */}
            <div
              ref={progressBarRef}
              className="w-full h-2 bg-white/30 rounded-full cursor-pointer"
              onClick={handleProgressBarClick}
            >
              <div 
                className="h-full bg-primary-gold rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controles */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Play/Pause */}
                <button
                  onClick={handlePlayClick}
                  className="text-white hover:text-primary-gold transition-colors p-1"
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>

                {/* Volume */}
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-primary-gold transition-colors p-1"
                  aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6" />
                  ) : (
                    <Volume2 className="w-6 h-6" />
                  )}
                </button>

                {/* Time */}
                <div className="text-white text-sm font-gt-america">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-primary-gold transition-colors p-1"
                aria-label="Pantalla completa"
              >
                <Maximize className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Título del video */}
      {showControls && (
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-lg">
            <h4 className="font-gt-extended font-bold text-lg">
              Avance de Obra - Palmera de los Remeros
            </h4>
            <p className="text-sm text-primary-cream">
              Seguí el progreso de construcción en tiempo real
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 