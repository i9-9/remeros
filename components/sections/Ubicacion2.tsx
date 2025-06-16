'use client'

import { useState, useEffect, useRef } from 'react'

// Datos de puntos de interés con coordenadas corregidas para Nordelta
const pointsOfInterest = {
  gastronomia: [
    { name: "Kansas", lat: -34.4150, lng: -58.6390 },
    { name: "La Valiente Focacceria", lat: -34.4160, lng: -58.6385 },
    { name: "Rapa Nui Nordelta", lat: -34.4155, lng: -58.6395 },
    { name: "La Pulperie", lat: -34.4165, lng: -58.6380 },
    { name: "Cosqo Holy", lat: -34.4170, lng: -58.6375 },
    { name: "Le Pain Quotidien", lat: -34.4145, lng: -58.6385 },
    { name: "Obvio Carne y Pasta", lat: -34.4175, lng: -58.6390 },
    { name: "Sushi Club", lat: -34.4140, lng: -58.6395 },
    { name: "Los Inmortales", lat: -34.4180, lng: -58.6385 }
  ],
  servicios: [
    { name: "Carrefour", lat: -34.4135, lng: -58.6400 },
    { name: "Sport Club Remeros", lat: -34.4190, lng: -58.6370 },
    { name: "Uces Tigre", lat: -34.4185, lng: -58.6365 },
    { name: "Centro Comercial", lat: -34.4130, lng: -58.6405 },
    { name: "Nordelta Remeros Plaza", lat: -34.4125, lng: -58.6410 },
    { name: "Plaza", lat: -34.4195, lng: -58.6375 },
    { name: "Jumbo Nordelta", lat: -34.4120, lng: -58.6415 },
    { name: "Universidad Siglo 21", lat: -34.4200, lng: -58.6360 },
    { name: "Nordelta Golf Club", lat: -34.4205, lng: -58.6355 }
  ]
};

// Ubicación del proyecto (en zona firme, no sobre agua)
const projectLocation = { lat: -34.4160, lng: -58.6390 };

function GoogleMapComponent({ apiKey, hoveredPoint, onMarkerHover }: { 
  apiKey: string, 
  hoveredPoint: string | null,
  onMarkerHover: (pointName: string | null) => void 
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<{ [key: string]: google.maps.Marker }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Verificar si Google Maps ya está cargado
    if ((window as any).google?.maps && !scriptLoaded) {
      setIsLoaded(true);
      setScriptLoaded(true);
      return;
    }

    // Solo cargar si no existe y no se ha intentado cargar antes
    if (!(window as any).google?.maps && !scriptLoaded) {
      setScriptLoaded(true);
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsLoaded(true);
      script.onerror = () => {
        console.error('Error loading Google Maps');
        setScriptLoaded(false);
      };
      document.head.appendChild(script);
      
      return () => {
        // No remover el script para evitar recargas múltiples
      };
    }
  }, [apiKey, scriptLoaded]);

  useEffect(() => {
    if (isLoaded && mapRef.current && !map) {
      const mapInstance = new (window as any).google.maps.Map(mapRef.current, {
        center: projectLocation,
        zoom: 15,
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{ "color": "#E5DDD6" }] // primary-beige
          },
          {
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{ "color": "#2B303B" }] // primary-navy
          },
          {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{ "color": "#FFFFFF" }, { "weight": "2" }] // primary-white
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{ "color": "#D2CAC2" }] // primary-cream
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [{ "color": "#80846A" }, { "lightness": 60 }] // primary-sage lightened
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{ "color": "#8BA0BD" }, { "lightness": 40 }] // primary-light
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{ "color": "#80846A" }, { "lightness": 40 }] // primary-sage lightened
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{ "color": "#FFFFFF" }] // primary-white
          },
          {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#536A84" }, { "weight": "1" }] // primary-blue
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{ "color": "#E2C18A" }, { "lightness": 20 }] // primary-gold lightened
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{ "color": "#2B303B" }, { "weight": "1" }] // primary-navy
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{ "visibility": "off" }]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{ "color": "#8BA0BD" }] // primary-light for water
          }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      });

      const newMarkers: { [key: string]: google.maps.Marker } = {};

      // Marker del proyecto principal - MUY DESTACADO
      const projectMarker = new (window as any).google.maps.Marker({
        position: projectLocation,
        map: mapInstance,
        title: "🏠 PALMERA DE LOS REMEROS - Tu nuevo hogar",
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="50" height="60" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
              <!-- Sombra -->
              <ellipse cx="25" cy="55" rx="8" ry="3" fill="rgba(0,0,0,0.3)"/>
              
              <!-- Pin principal -->
              <path d="M25 5 C35 5, 42 12, 42 22 C42 32, 25 50, 25 50 C25 50, 8 32, 8 22 C8 12, 15 5, 25 5 Z" 
                    fill="#E2C18A" stroke="#2B303B" stroke-width="3"/>
              
              <!-- Círculo interior -->
              <circle cx="25" cy="22" r="10" fill="#2B303B" stroke="#FFFFFF" stroke-width="2"/>
              
              <!-- Icono de casa -->
              <path d="M25 14 L30 18 L30 28 L20 28 L20 18 Z" fill="#E2C18A"/>
              <path d="M18 20 L25 14 L32 20" stroke="#E2C18A" stroke-width="2" fill="none"/>
              <rect x="22" y="24" width="2" height="4" fill="#2B303B"/>
              <rect x="26" y="24" width="2" height="4" fill="#2B303B"/>
              
              <!-- Texto "PALMERA" -->
              <text x="25" y="45" font-family="Arial Black" font-size="6" font-weight="bold" 
                    fill="#2B303B" text-anchor="middle">PALMERA</text>
            </svg>
          `),
          scaledSize: new (window as any).google.maps.Size(50, 60),
          anchor: new (window as any).google.maps.Point(25, 50)
        },
        zIndex: 1000 // Asegura que esté por encima de otros markers
      });

      // Agregar un círculo pulsante alrededor del proyecto
      const projectCircle = new (window as any).google.maps.Circle({
        strokeColor: '#E2C18A',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#E2C18A',
        fillOpacity: 0.15,
        map: mapInstance,
        center: projectLocation,
        radius: 100, // 100 metros de radio
        zIndex: 999
      });

      // Animación pulsante para el círculo
      let growing = true;
      setInterval(() => {
        const currentRadius = projectCircle.getRadius();
        if (growing) {
          if (currentRadius < 150) {
            projectCircle.setRadius(currentRadius + 2);
          } else {
            growing = false;
          }
        } else {
          if (currentRadius > 80) {
            projectCircle.setRadius(currentRadius - 2);
          } else {
            growing = true;
          }
        }
      }, 100);

      // InfoWindow con información del proyecto
      const infoWindow = new (window as any).google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; text-align: center; font-family: Arial;">
            <h3 style="margin: 0 0 8px 0; color: #2B303B; font-size: 16px; font-weight: bold;">
              🏠 PALMERA DE LOS REMEROS
            </h3>
            <p style="margin: 0 0 8px 0; color: #536A84; font-size: 12px;">
              Tu nuevo hogar en Nordelta
            </p>
            <p style="margin: 0; color: #80846A; font-size: 11px;">
              📍 Camino de los Remeros y Ruta 27
            </p>
          </div>
        `,
        maxWidth: 250
      });

      // Mostrar InfoWindow al hacer click en el marker del proyecto
      projectMarker.addListener('click', () => {
        infoWindow.open(mapInstance, projectMarker);
      });

      // Abrir InfoWindow automáticamente al cargar (opcional)
      setTimeout(() => {
        infoWindow.open(mapInstance, projectMarker);
      }, 1000);

      // Markers de gastronomía
      pointsOfInterest.gastronomia.forEach(point => {
        const marker = new (window as any).google.maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map: mapInstance,
          title: point.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#80846A" stroke="#FFFFFF" stroke-width="2"/>
                <text x="12" y="16" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle">🍽️</text>
              </svg>
            `),
            scaledSize: new (window as any).google.maps.Size(24, 24),
            anchor: new (window as any).google.maps.Point(12, 12)
          }
        });

        // Agregar eventos de hover al marker
        marker.addListener('mouseover', () => {
          onMarkerHover(point.name);
        });
        marker.addListener('mouseout', () => {
          onMarkerHover(null);
        });

        newMarkers[point.name] = marker;
      });

      // Markers de servicios
      pointsOfInterest.servicios.forEach(point => {
        const marker = new (window as any).google.maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map: mapInstance,
          title: point.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#536A84" stroke="#FFFFFF" stroke-width="2"/>
                <text x="12" y="16" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle">🏢</text>
              </svg>
            `),
            scaledSize: new (window as any).google.maps.Size(24, 24),
            anchor: new (window as any).google.maps.Point(12, 12)
          }
        });

        // Agregar eventos de hover al marker
        marker.addListener('mouseover', () => {
          onMarkerHover(point.name);
        });
        marker.addListener('mouseout', () => {
          onMarkerHover(null);
        });

        newMarkers[point.name] = marker;
      });

      setMarkers(newMarkers);
      setMap(mapInstance);
    }
  }, [isLoaded, map]);

  // Efecto para el hover
  useEffect(() => {
    if (hoveredPoint && markers[hoveredPoint]) {
      // Destacar el marker con animación y tamaño mayor
      const marker = markers[hoveredPoint];
      marker.setAnimation((window as any).google.maps.Animation.BOUNCE);
      
      // Parar la animación después de 2 segundos
      setTimeout(() => {
        marker.setAnimation(null);
      }, 2000);

      // Centrar el mapa en el punto (opcional)
      if (map) {
        map.panTo(marker.getPosition()!);
      }
    }
  }, [hoveredPoint, markers, map]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-primary-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-navy rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-primary-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 className="font-montreal-medium text-lg text-primary-navy mb-2">Cargando mapa...</h3>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full" />;
}

export default function Ubicacion2() {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [mapHoveredPoint, setMapHoveredPoint] = useState<string | null>(null);
  
  // Tu API Key de Google Maps
  const GOOGLE_MAPS_API_KEY = "AIzaSyA4wH8mkgtrU90kRb3PUT74sAxoOFdBCnc";
  
  // Función para manejar hover desde el mapa
  const handleMarkerHover = (pointName: string | null) => {
    setMapHoveredPoint(pointName);
  };

  // Determinar qué punto está siendo hovereado (desde lista o mapa)
  const activeHoveredPoint = hoveredPoint || mapHoveredPoint;
  
  return (
    <section id="ubicacion" className="bg-primary-cream min-h-screen overflow-hidden pt-12">
      <div className="layout-margin">
        <div className="container-grid">
          {/* Header */}
          <div className="col-12 mb-8">
            <div className="w-full flex flex-col md:flex-row items-center justify-center md:gap-8 gap-4">
              <h2 className="font-gt-extended font-bold text-6xl md:text-5xl text-primary-dark whitespace-nowrap">
                UBICACIÓN
              </h2>
              <div className="w-16 h-1 md:w-1 md:h-16 bg-primary-dark md:mx-6"></div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="font-montreal-medium text-2xl text-primary-dark mb-2">
                  Camino de los Remeros y Ruta 27
                </h3>
                <p className="font-montreal-light text-md text-primary-dark">
                  Próximo a Remeros Plaza, a 5 minutos del Centro comercial Nordelta y del Acceso Tigre (Panamericana).
                </p>
              </div>
            </div>
          </div>

          {/* Main Content: Map and References */}
          <div className="col-12">
            {/* Desktop Layout */}
            <div className="hidden md:flex justify-center items-stretch gap-12 h-[600px] min-h-0">
              <div className="w-48 h-full flex flex-col">
                <div className="bg-primary-sage text-primary-cream h-full flex flex-col justify-between box-border py-4 px-6 overflow-auto">
                  <div className="flex flex-col gap-8">
                    <div>
                      <h3 className="font-montreal-bold text-2xl mb-6 text-primary-cream">Gastronomía</h3>
                      <div className="space-y-1 text-xs font-montreal-light ">
                        {pointsOfInterest.gastronomia.map((point) => (
                          <p 
                            key={point.name}
                            className={`cursor-pointer transition-all duration-200 ${
                              activeHoveredPoint === point.name 
                                ? 'text-primary-gold font-bold scale-105' 
                                : 'hover:text-primary-gold'
                            }`}
                            onMouseEnter={() => setHoveredPoint(point.name)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          >
                            🍽️ {point.name}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="mt-8">
                      <h3 className="font-montreal-bold text-2xl mb-6 text-primary-cream">Servicios</h3>
                      <div className="space-y-1 text-xs font-montreal-light">
                        {pointsOfInterest.servicios.map((point) => (
                          <p 
                            key={point.name}
                            className={`cursor-pointer transition-all duration-200 ${
                              activeHoveredPoint === point.name 
                                ? 'text-primary-gold font-bold scale-105' 
                                : 'hover:text-primary-gold'
                            }`}
                            onMouseEnter={() => setHoveredPoint(point.name)}
                            onMouseLeave={() => setHoveredPoint(null)}
                          >
                            🏢 {point.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full">
                <div className="relative w-[600px] h-full overflow-hidden border border-primary-dark">
                  <GoogleMapComponent 
                    apiKey={GOOGLE_MAPS_API_KEY} 
                    hoveredPoint={activeHoveredPoint} 
                    onMarkerHover={handleMarkerHover}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden">
              {/* Map - Full Width */}
              <div className="mb-8">
                <div className="relative w-full h-[400px] overflow-hidden border border-primary-dark">
                  <GoogleMapComponent 
                    apiKey={GOOGLE_MAPS_API_KEY} 
                    hoveredPoint={activeHoveredPoint} 
                    onMarkerHover={handleMarkerHover}
                  />
                </div>
              </div>

              {/* References - Two Columns */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-sage text-primary-cream flex flex-col box-border py-4 px-4">
                  <div>
                    <h3 className="font-montreal-bold text-lg mb-4 text-primary-cream">Gastronomía</h3>
                    <div className="space-y-1 text-xs font-montreal-light">
                      {pointsOfInterest.gastronomia.map((point) => (
                        <p 
                          key={point.name}
                          className={`cursor-pointer transition-all duration-200 ${
                            activeHoveredPoint === point.name 
                              ? 'text-primary-gold font-bold scale-105' 
                              : 'hover:text-primary-gold'
                          }`}
                          onMouseEnter={() => setHoveredPoint(point.name)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        >
                          🍽️ {point.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-primary-sage text-primary-cream flex flex-col box-border py-4 px-4">
                  <div>
                    <h3 className="font-montreal-bold text-lg mb-4 text-primary-cream">Servicios</h3>
                    <div className="space-y-1 text-xs font-montreal-light">
                      {pointsOfInterest.servicios.map((point) => (
                        <p 
                          key={point.name}
                          className={`cursor-pointer transition-all duration-200 ${
                            activeHoveredPoint === point.name 
                              ? 'text-primary-gold font-bold scale-105' 
                              : 'hover:text-primary-gold'
                          }`}
                          onMouseEnter={() => setHoveredPoint(point.name)}
                          onMouseLeave={() => setHoveredPoint(null)}
                        >
                          🏢 {point.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}