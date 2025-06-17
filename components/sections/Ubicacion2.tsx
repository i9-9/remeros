'use client'

import { useState, useEffect, useRef } from 'react'

// Definir tipos para Google Maps
interface GoogleMapsMarker {
  setAnimation: (animation: any) => void;
  getPosition: () => any;
  addListener: (event: string, callback: () => void) => void;
}

interface GoogleMapsMap {
  panTo: (position: any) => void;
}

interface PointOfInterest {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface PointsData {
  gastronomia: PointOfInterest[];
  servicios: PointOfInterest[];
}

// Datos de puntos de interés con direcciones reales y específicas
const pointsOfInterest: PointsData = {
  gastronomia: [
    { name: "Kansas", address: "Kansas Parrilla, Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "La Valiente Focacceria", address: "La Valiente Focacceria, Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Rapa Nui Nordelta", address: "Rapa Nui Heladería, Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "La Pulperie", address: "La Pulperie, Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Cosqo Holy", address: "Cosqo Holy, Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Le Pain Quotidien", address: "Le Pain Quotidien Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Obvio Carne y Pasta", address: "Obvio Carne y Pasta, Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Sushi Club", address: "Sushi Club Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Los Inmortales", address: "Los Inmortales Pizza, Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 }
  ],
  servicios: [
    { name: "Carrefour", address: "Carrefour Nordelta, Av. de los Lagos, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Sport Club Remeros", address: "Club de Remeros del Tigre, Paseo Victorica, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Uces Tigre", address: "Universidad UCES Tigre, Nordelta, Buenos Aires", lat: 0, lng: 0 },
    { name: "Centro Comercial", address: "Nordelta Shopping, Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Nordelta Remeros Plaza", address: "Remeros Plaza Shopping, Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Plaza", address: "Plaza Central Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Jumbo Nordelta", address: "Jumbo Nordelta, Av. de los Lagos, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Universidad Siglo 21", address: "Universidad Siglo 21 Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 },
    { name: "Nordelta Golf Club", address: "Nordelta Golf Club, Nordelta, Tigre, Buenos Aires", lat: 0, lng: 0 }
  ]
};

// Ubicación exacta del proyecto Palmera de los Remeros
const projectLocation = { 
  lat: -34.4128, 
  lng: -58.6416,
  address: "Av. Santa María de las Conchas, Rincón de Milberg, 1624 Tigre, Provincia de Buenos Aires"
};

// Función para geocodificar direcciones
async function geocodeAddress(address: string, apiKey: string): Promise<{lat: number, lng: number} | null> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}&region=ar`
    );
    const data = await response.json();
    
    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    }
    return null;
  } catch (error) {
    console.error('Error geocoding address:', address, error);
    return null;
  }
}

function GoogleMapComponent({ apiKey, hoveredPoint, onMarkerHover }: { 
  apiKey: string, 
  hoveredPoint: string | null,
  onMarkerHover: (pointName: string | null) => void 
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMapsMap | null>(null);
  const [markers, setMarkers] = useState<{ [key: string]: GoogleMapsMarker }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [geocodedPoints, setGeocodedPoints] = useState<PointsData>(pointsOfInterest);
  const [isGeocoding, setIsGeocoding] = useState(false);

  // Cargar Google Maps script
  useEffect(() => {
    // Verificar si Google Maps ya está cargado globalmente
    if ((window as any).google?.maps) {
      setIsLoaded(true);
      return;
    }

    // Verificar si ya hay un script de Google Maps en el DOM
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      // Si ya existe un script, escuchar cuando se cargue
      const checkGoogleMaps = () => {
        if ((window as any).google?.maps) {
          setIsLoaded(true);
        } else {
          setTimeout(checkGoogleMaps, 100);
        }
      };
      checkGoogleMaps();
      return;
    }

    // Solo crear un nuevo script si no existe ninguno
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => console.error('Error loading Google Maps');
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // No remover el script para evitar recargas en otros componentes
    };
  }, [apiKey]);

  // Geocodificar direcciones
  useEffect(() => {
    const geocodeAllAddresses = async () => {
      if (isGeocoding || !apiKey) return;
      
      setIsGeocoding(true);
      console.log('Iniciando geocodificación...');
      
      const updatedPoints: PointsData = { 
        gastronomia: [...pointsOfInterest.gastronomia],
        servicios: [...pointsOfInterest.servicios]
      };
      
      // Geocodificar gastronomía
      for (const point of updatedPoints.gastronomia) {
        if (point.lat === 0 && point.lng === 0) {
          const coords = await geocodeAddress(point.address, apiKey);
          if (coords) {
            point.lat = coords.lat;
            point.lng = coords.lng;
            console.log(`✅ ${point.name}: ${coords.lat}, ${coords.lng}`);
          } else {
            point.lat = projectLocation.lat + (Math.random() - 0.5) * 0.01;
            point.lng = projectLocation.lng + (Math.random() - 0.5) * 0.01;
          }
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
      
      // Geocodificar servicios
      for (const point of updatedPoints.servicios) {
        if (point.lat === 0 && point.lng === 0) {
          const coords = await geocodeAddress(point.address, apiKey);
          if (coords) {
            point.lat = coords.lat;
            point.lng = coords.lng;
            console.log(`✅ ${point.name}: ${coords.lat}, ${coords.lng}`);
          } else {
            point.lat = projectLocation.lat + (Math.random() - 0.5) * 0.01;
            point.lng = projectLocation.lng + (Math.random() - 0.5) * 0.01;
          }
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
      
      setGeocodedPoints(updatedPoints);
      console.log('🎉 Geocodificación completada');
    };

    geocodeAllAddresses();
  }, [apiKey, isGeocoding]);

  // Crear el mapa
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return;

    const googleMaps = (window as any).google.maps;
    const mapInstance = new googleMaps.Map(mapRef.current, {
      center: { lat: projectLocation.lat, lng: projectLocation.lng },
      zoom: 15,
      heading: 0, // Norte hacia arriba (0 grados)
      tilt: 0, // Vista plana, sin inclinación
      mapTypeId: 'roadmap', // Tipo de mapa estándar
      styles: [
        {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [{ "color": "#E5DDD6" }]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#2B303B" }]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [{ "color": "#D2CAC2" }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{ "color": "#FFFFFF" }]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{ "color": "#8BA0BD" }]
        }
      ],
      disableDefaultUI: true,
      zoomControl: true,
      rotateControl: true, // Permitir rotación
      fullscreenControl: true, // Control de pantalla completa
      mapTypeControl: true, // Control para cambiar tipo de mapa
      streetViewControl: false,
      scaleControl: true,
      gestureHandling: 'greedy' // Permitir todos los gestos
    });

    // Marker del proyecto principal
    const projectMarker = new googleMaps.Marker({
      position: { lat: projectLocation.lat, lng: projectLocation.lng },
      map: mapInstance,
      title: "🏠 PALMERA DE LOS REMEROS - Av. Santa María de las Conchas",
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="50" height="60" viewBox="0 0 50 60" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 5 C35 5, 42 12, 42 22 C42 32, 25 50, 25 50 C25 50, 8 32, 8 22 C8 12, 15 5, 25 5 Z" 
                  fill="#E2C18A" stroke="#2B303B" stroke-width="3"/>
            <circle cx="25" cy="22" r="10" fill="#2B303B" stroke="#FFFFFF" stroke-width="2"/>
            <path d="M25 14 L30 18 L30 28 L20 28 L20 18 Z" fill="#E2C18A"/>
            <text x="25" y="45" font-family="Arial" font-size="6" font-weight="bold" 
                  fill="#2B303B" text-anchor="middle">PALMERA</text>
          </svg>
        `),
        scaledSize: new googleMaps.Size(50, 60),
        anchor: new googleMaps.Point(25, 50)
      },
      zIndex: 1000
    });

    // Círculo pulsante
    const projectCircle = new googleMaps.Circle({
      strokeColor: '#E2C18A',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#E2C18A',
      fillOpacity: 0.15,
      map: mapInstance,
      center: { lat: projectLocation.lat, lng: projectLocation.lng },
      radius: 100,
      zIndex: 999
    });

    // Animación del círculo
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

    // InfoWindow
    const infoWindow = new googleMaps.InfoWindow({
      content: `
        <div style="padding: 12px; text-align: center; font-family: Arial;">
          <h3 style="margin: 0 0 8px 0; color: #2B303B; font-size: 16px; font-weight: bold;">
            🏠 PALMERA DE LOS REMEROS
          </h3>
          <p style="margin: 0 0 8px 0; color: #536A84; font-size: 12px;">
            Tu nuevo hogar en Rincón de Milberg
          </p>
          <p style="margin: 0; color: #80846A; font-size: 11px; line-height: 1.3;">
            📍 Av. Santa María de las Conchas<br/>
            Rincón de Milberg, Tigre
          </p>
        </div>
      `,
      maxWidth: 280
    });

    projectMarker.addListener('click', () => {
      infoWindow.open(mapInstance, projectMarker);
    });

    setTimeout(() => {
      infoWindow.open(mapInstance, projectMarker);
    }, 1000);

    setMap(mapInstance);
  }, [isLoaded, map]);

  // Crear markers de puntos de interés
  useEffect(() => {
    if (!map || !isLoaded) return;

    const googleMaps = (window as any).google.maps;
    const newMarkers: { [key: string]: GoogleMapsMarker } = {};

    // Markers de gastronomía
    geocodedPoints.gastronomia.forEach(point => {
      if (point.lat !== 0 && point.lng !== 0) {
        const marker = new googleMaps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map: map,
          title: point.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#80846A" stroke="#FFFFFF" stroke-width="2"/>
                <text x="12" y="16" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle">🍽️</text>
              </svg>
            `),
            scaledSize: new googleMaps.Size(24, 24),
            anchor: new googleMaps.Point(12, 12)
          }
        });

        marker.addListener('mouseover', () => onMarkerHover(point.name));
        marker.addListener('mouseout', () => onMarkerHover(null));
        newMarkers[point.name] = marker;
      }
    });

    // Markers de servicios
    geocodedPoints.servicios.forEach(point => {
      if (point.lat !== 0 && point.lng !== 0) {
        const marker = new googleMaps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map: map,
          title: point.name,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#536A84" stroke="#FFFFFF" stroke-width="2"/>
                <text x="12" y="16" font-family="Arial" font-size="12" fill="#FFFFFF" text-anchor="middle">🏢</text>
              </svg>
            `),
            scaledSize: new googleMaps.Size(24, 24),
            anchor: new googleMaps.Point(12, 12)
          }
        });

        marker.addListener('mouseover', () => onMarkerHover(point.name));
        marker.addListener('mouseout', () => onMarkerHover(null));
        newMarkers[point.name] = marker;
      }
    });

    setMarkers(newMarkers);
  }, [map, isLoaded, geocodedPoints, onMarkerHover]);

  // Efecto hover
  useEffect(() => {
    if (hoveredPoint && markers[hoveredPoint]) {
      const marker = markers[hoveredPoint];
      const googleMaps = (window as any).google.maps;
      marker.setAnimation(googleMaps.Animation.BOUNCE);
      
      setTimeout(() => {
        marker.setAnimation(null);
      }, 2000);

      if (map) {
        map.panTo(marker.getPosition());
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
          <h3 className="font-montreal-medium text-lg text-primary-navy mb-2">
            {isGeocoding ? 'Obteniendo ubicaciones exactas...' : 'Cargando mapa...'}
          </h3>
          {isGeocoding && (
            <p className="text-sm text-primary-blue">
              Esto puede tomar unos segundos
            </p>
          )}
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full" />;
}

export default function Ubicacion2() {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [mapHoveredPoint, setMapHoveredPoint] = useState<string | null>(null);
  
  const GOOGLE_MAPS_API_KEY = "AIzaSyA4wH8mkgtrU90kRb3PUT74sAxoOFdBCnc";
  
  const handleMarkerHover = (pointName: string | null) => {
    setMapHoveredPoint(pointName);
  };

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

          {/* Main Content */}
          <div className="col-12">
            {/* Desktop Layout */}
            <div className="hidden md:flex justify-center items-stretch gap-12 h-[600px] min-h-0">
              <div className="w-48 h-full flex flex-col">
                <div className="bg-primary-sage text-primary-cream h-full flex flex-col justify-between box-border py-4 px-6 overflow-auto">
                  <div className="flex flex-col gap-8">
                    <div>
                      <h3 className="font-montreal-bold text-2xl mb-6 text-primary-cream">Gastronomía</h3>
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
              <div className="mb-8">
                <div className="relative w-full h-[400px] overflow-hidden border border-primary-dark">
                  <GoogleMapComponent 
                    apiKey={GOOGLE_MAPS_API_KEY} 
                    hoveredPoint={activeHoveredPoint} 
                    onMarkerHover={handleMarkerHover}
                  />
                </div>
              </div>

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