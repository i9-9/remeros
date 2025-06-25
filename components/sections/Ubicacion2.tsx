'use client'

import { useState, useEffect, useRef } from 'react'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import Logo from '@/components/ui/Logo'

// Variable global para evitar múltiples cargas
let isGoogleMapsLoading = false;
let isGoogleMapsLoaded = false;

// Definir tipos para Google Maps
interface GoogleMapsMarker {
  setAnimation: (animation: unknown) => void;
  getPosition: () => unknown;
  addListener: (event: string, callback: () => void) => void;
  content?: HTMLElement;
  position: { lat: number; lng: number };
}

interface GoogleMapsMap {
  panTo: (position: unknown) => void;
}

interface GoogleMapsType {
  maps: {
    Map: new (element: HTMLElement, options: Record<string, unknown>) => GoogleMapsMap;
    Marker: new (options: Record<string, unknown>) => GoogleMapsMarker;
    InfoWindow: new (options: Record<string, unknown>) => {
      open: (map: GoogleMapsMap, marker: GoogleMapsMarker) => void;
    };
    LatLng: new (lat: number, lng: number) => unknown;
    Size: new (width: number, height: number) => unknown;
    Point: new (x: number, y: number) => unknown;
  };
}

interface WindowWithGoogleMaps extends Window {
  google?: GoogleMapsType;
  [key: string]: unknown; // Add index signature for dynamic properties
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

interface MarkerWithCoords extends GoogleMapsMarker {
  originalCoords?: { lat: number; lng: number };
}

// Ubicación del proyecto
const projectLocation = { 
  lat: -34.40692307342323, 
  lng: -58.6187122075483,
  address: "Camino de los Remeros y Ruta 27, Nordelta"
};

// Datos de puntos de interés
const pointsOfInterest: PointsData & { proyecto?: PointOfInterest[] } = {
  gastronomia: [
    { name: "Kansas", address: "Kansas, Nordelta", lat: -34.40074416710421, lng: -58.63440970592327 },
    { name: "La Valiente Focacceria", address: "La Valiente Focacceria", lat: -34.399007932025626, lng: -58.64392662883605 },
    { name: "Rapa Nui Nordelta", address: "Rapa Nui Nordelta", lat: -34.40219457094175, lng: -58.64975470560262 },
    { name: "La Pulperie", address: "La Pulperie", lat: -34.39787813487022, lng: -58.65693877438935 },
    { name: "Cosqo Holy", address: "Cosqo", lat: -34.40615972572545, lng: -58.619141775129734 },
    { name: "Le Pain Quotidien", address: "Le Pain Quotidien", lat: -34.39846443462028, lng: -58.65125818729609 },
    { name: "Obvio Carne y Pasta", address: "Obvio Carne y Pasta", lat: -34.39970041043506, lng: -58.64822105000044 },
    { name: "Sushi Club", address: "Sushi Club", lat: -34.395153896893596, lng: -58.65117149997519 },
    { name: "Los Inmortales", address: "Los Inmortales", lat: -34.39504982382221, lng: -58.64980365258116 }
  ],
  servicios: [
    { name: "Remeros Plaza", address: "Remeros Plaza", lat: -34.40720278312742, lng: -58.61810661168479 },
    { name: "Carrefour", address: "Carrefour", lat: -34.404075539923, lng: -58.619988990258214 },
    { name: "Jumbo Nordelta", address: "Jumbo", lat: -34.400031761925646, lng: -58.6541856703179 },
    { name: "Sport Club Remeros", address: "Sport Club Remeros", lat: -34.40587618200035, lng: -58.61889804317755 },
    { name: "Universidad Siglo 21", address: "Universidad Siglo 21", lat: -34.396964094648624, lng: -58.643214712661795 },
    { name: "Uces Tigre", address: "UCES Tigre", lat: -34.4061354915669, lng: -58.62020656512676 },
    { name: "Centro Comercial", address: "Centro Comercial Nordelta", lat: -34.3987369256382, lng: -58.65146493073389 },
    { name: "Nordelta Golf Club", address: "Nordelta Golf Club", lat: -34.41495790925383, lng: -58.63872754237277 },
    { name: "Plaza", address: "Plaza", lat: -34.40689195297588, lng: -58.61589475967586 }
  ],
  proyecto: [
    { name: "Palmera de los Remeros", address: projectLocation.address, lat: projectLocation.lat, lng: projectLocation.lng }
  ]
};

// Función simplificada para cargar Google Maps
function loadGoogleMaps(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const windowWithGM = window as unknown as WindowWithGoogleMaps;
    
    // Si ya está cargado, resolver inmediatamente
    if (isGoogleMapsLoaded && windowWithGM.google?.maps?.Map) {
      console.log('✅ Google Maps ya cargado');
      resolve();
      return;
    }

    // Si ya se está cargando, esperar
    if (isGoogleMapsLoading) {
      console.log('⏳ Google Maps ya se está cargando, esperando...');
      const checkInterval = setInterval(() => {
        if (isGoogleMapsLoaded && windowWithGM.google?.maps?.Map) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      
      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('Timeout esperando Google Maps'));
      }, 10000);
      return;
    }

    // Marcar como cargando
    isGoogleMapsLoading = true;

    console.log('🔄 Cargando Google Maps...');

    // Función de callback global
    const callbackName = 'initGoogleMapsSimple';
    windowWithGM[callbackName] = () => {
      console.log('✅ Google Maps cargado exitosamente');
      isGoogleMapsLoaded = true;
      isGoogleMapsLoading = false;
      resolve();
    };

    // Crear script solo si no existe
    let script = document.getElementById('google-maps-api') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'google-maps-api';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackName}`;
      script.async = true;
      script.defer = true;
      
      script.onerror = () => {
        console.error('❌ Error cargando Google Maps');
        isGoogleMapsLoading = false;
        reject(new Error('Error cargando Google Maps'));
      };

      document.head.appendChild(script);
    } else {
      // El script ya existe, solo esperar a que se cargue
      const checkExisting = setInterval(() => {
        if (windowWithGM.google?.maps?.Map) {
          clearInterval(checkExisting);
          isGoogleMapsLoaded = true;
          isGoogleMapsLoading = false;
          resolve();
        }
      }, 100);
    }
  });
}

function SimpleGoogleMapComponent({ apiKey, hoveredPoint, onMarkerHover, onMapReady }: { 
  apiKey: string, 
  hoveredPoint: string | null,
  onMarkerHover: (pointName: string | null) => void,
  onMapReady: (map: GoogleMapsMap) => void
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMapsMap | null>(null);
  const [markers, setMarkers] = useState<{ [key: string]: MarkerWithCoords }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<GoogleMapsMap | null>(null);

  // Cargar Google Maps
  useEffect(() => {
    let isMounted = true;

    const initGoogleMaps = async () => {
      try {
        await loadGoogleMaps(apiKey);
        if (isMounted) {
          setIsLoaded(true);
          setError(null);
        }
      } catch (err) {
        console.error('Error cargando Google Maps:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      }
    };

    initGoogleMaps();

    return () => {
      isMounted = false;
    };
  }, [apiKey]);

  // Crear el mapa
  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current || error) return;

    try {
      console.log('🗺️ Creando instancia del mapa...');
      const windowWithGM = window as unknown as WindowWithGoogleMaps;
      const googleMaps = windowWithGM.google!.maps;
      
      const mapInstance = new googleMaps.Map(mapRef.current, {
        center: projectLocation,
        zoom: 17,
        mapTypeId: 'roadmap',
        styles: [
          {
            "featureType": "all",
            "elementType": "geometry",
            "stylers": [{ "color": "#E5DDD6" }]
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
        fullscreenControl: true,
        gestureHandling: 'greedy'
      });

      // Marker principal del proyecto
      const projectMarker = new googleMaps.Marker({
        position: projectLocation,
        map: mapInstance,
        title: "PALMERA DE LOS REMEROS",
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#E2C18A" stroke="#2B303B" stroke-width="3"/>
            </svg>
          `),
          scaledSize: new googleMaps.Size(40, 40),
          anchor: new googleMaps.Point(20, 20)
        },
        zIndex: 1000
      });

      // InfoWindow
      const infoWindow = new googleMaps.InfoWindow({
        content: `
          <div style="padding: 12px; text-align: center; font-family: Arial;">
            <h3 style="margin: 0 0 8px 0; color: #2B303B; font-size: 16px; font-weight: bold;">
              PALMERA DE LOS REMEROS
            </h3>
            <p style="margin: 0 0 8px 0; color: #536A84; font-size: 12px;">
              Tu nuevo hogar en el corazón de Nordelta
            </p>
            <p style="margin: 0; color: #80846A; font-size: 11px; line-height: 1.3;">
              📍 Camino de los Remeros y Ruta 27<br/>
              A 5 min del Centro Comercial Nordelta
            </p>
          </div>
        `,
        maxWidth: 280
      });

      projectMarker.addListener('click', () => {
        infoWindow.open(mapInstance, projectMarker);
      });

      // Mostrar InfoWindow automáticamente
      setTimeout(() => {
        infoWindow.open(mapInstance, projectMarker);
      }, 1000);

      mapInstanceRef.current = mapInstance;
      setMap(mapInstance);
      setMarkers(prev => ({
        ...prev,
        ['Palmera de los Remeros']: {
          ...projectMarker,
          originalCoords: { lat: projectLocation.lat, lng: projectLocation.lng }
        }
      }));
      onMapReady(mapInstance);
      console.log('✅ Mapa creado exitosamente');

    } catch (err) {
      console.error('Error creando mapa:', err);
      setError('Error creando el mapa');
    }
  }, [isLoaded, error, onMapReady]);

  // Crear markers de puntos de interés
  useEffect(() => {
    if (!map || !isLoaded || error) return;

    try {
      const windowWithGM = window as unknown as WindowWithGoogleMaps;
      const googleMaps = windowWithGM.google!.maps;
      const newMarkers: { [key: string]: MarkerWithCoords } = {};

      // Markers de gastronomía
      pointsOfInterest.gastronomia.forEach(point => {
        try {
          const marker = new googleMaps.Marker({
            position: new googleMaps.LatLng(point.lat, point.lng),
            map: map,
            title: point.name,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#80846A" stroke="#FFFFFF" stroke-width="2"/>
                </svg>
              `),
              scaledSize: new googleMaps.Size(24, 24),
              anchor: new googleMaps.Point(12, 12)
            }
          }) as MarkerWithCoords;

          marker.addListener('mouseover', () => onMarkerHover(point.name));
          marker.addListener('mouseout', () => onMarkerHover(null));
          
          // Agregar las coordenadas originales como propiedad custom para fácil acceso
          marker.originalCoords = { lat: point.lat, lng: point.lng };
          
          newMarkers[point.name] = marker;
        } catch (markerError) {
          console.error(`Error creando marker para ${point.name}:`, markerError);
        }
      });

      // Markers de servicios
      pointsOfInterest.servicios.forEach(point => {
        try {
          const marker = new googleMaps.Marker({
            position: new googleMaps.LatLng(point.lat, point.lng),
            map: map,
            title: point.name,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="#536A84" stroke="#FFFFFF" stroke-width="2"/>
                </svg>
              `),
              scaledSize: new googleMaps.Size(24, 24),
              anchor: new googleMaps.Point(12, 12)
            }
          }) as MarkerWithCoords;

          marker.addListener('mouseover', () => onMarkerHover(point.name));
          marker.addListener('mouseout', () => onMarkerHover(null));
          
          // Agregar las coordenadas originales como propiedad custom
          marker.originalCoords = { lat: point.lat, lng: point.lng };
          
          newMarkers[point.name] = marker;
        } catch (markerError) {
          console.error(`Error creando marker para ${point.name}:`, markerError);
        }
      });

      setMarkers(newMarkers);
      console.log('✅ Markers creados:', Object.keys(newMarkers).length);
    } catch (err) {
      console.error('Error general creando markers:', err);
    }
  }, [map, isLoaded, onMarkerHover, error]);

  // Efecto hover - AQUÍ ESTÁ EL FIX
  useEffect(() => {
    if (hoveredPoint && map) {
      try {
        let coords = null;
        
        // Caso especial para el proyecto principal
        if (hoveredPoint === 'Palmera de los Remeros') {
          coords = projectLocation;
          console.log('📍 Volviendo al proyecto principal:', coords);
        } 
        // Para otros puntos, usar la lógica existente
        else if (markers[hoveredPoint]) {
          const marker = markers[hoveredPoint];
          
          // Intentar obtener la posición del marker
          if (marker.originalCoords) {
            coords = marker.originalCoords;
          } else {
            // Fallback: usar getPosition() con type assertion
            const position = marker.getPosition() as { lat: () => number; lng: () => number } | { lat: number; lng: number } | null;
            if (position) {
              coords = {
                lat: typeof (position as { lat: () => number }).lat === 'function' 
                  ? (position as { lat: () => number }).lat() 
                  : (position as { lat: number }).lat,
                lng: typeof (position as { lng: () => number }).lng === 'function' 
                  ? (position as { lng: () => number }).lng() 
                  : (position as { lng: number }).lng
              };
            }
          }
          
          // Último fallback: buscar en los datos originales
          if (!coords) {
            const allPoints = [...pointsOfInterest.gastronomia, ...pointsOfInterest.servicios];
            const point = allPoints.find(p => p.name === hoveredPoint);
            if (point) {
              coords = { lat: point.lat, lng: point.lng };
            }
          }
        }
        
        // Solo hacer panTo si tenemos coordenadas válidas
        if (coords && typeof coords.lat === 'number' && typeof coords.lng === 'number') {
          console.log('📍 Moviendo mapa a:', hoveredPoint, coords);
          map.panTo(coords);
        } else {
          console.warn('⚠️ No se pudieron obtener coordenadas válidas para:', hoveredPoint);
        }
        
      } catch (error) {
        console.error('❌ Error en hover effect:', error);
      }
    }
  }, [hoveredPoint, markers, map]);

  if (error) {
    return (
      <div className="w-full h-full bg-red-50 flex items-center justify-center border border-red-200">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 className="font-montreal-medium text-lg text-red-800 mb-2">
            Error cargando el mapa
          </h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Recargar página
          </button>
        </div>
      </div>
    );
  }

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
            Cargando mapa interactivo...
          </h3>
        </div>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full" />;
}

export default function UbicacionSimple() {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [mapHoveredPoint, setMapHoveredPoint] = useState<string | null>(null);
  const mapRef = useRef<GoogleMapsMap | null>(null);
  
  // Obtener API key de variables de entorno con fallback
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "AIzaSyA4wH8mkgtrU90kRb3PUT74sAxoOFdBCnc";
  
  const handleMarkerHover = (pointName: string | null) => {
    setMapHoveredPoint(pointName);
  };

  const handleMapReady = (map: GoogleMapsMap) => {
    mapRef.current = map;
  };

  const activeHoveredPoint = hoveredPoint || mapHoveredPoint;
  
  return (
    <section id="ubicacion" className="bg-primary-cream overflow-hidden py-12">
      <div className="layout-margin">
        <div className="container-grid">
          {/* Header */}
          <div className="col-12 mb-8">
            <div className="w-full flex flex-col md:flex-row items-center justify-center md:gap-8 gap-4">
              <AnimatedTitle 
                className="font-gt-extended font-bold text-6xl md:text-5xl text-primary-dark whitespace-nowrap"
                delay={0.2}
                direction="up"
              >
                UBICACIÓN
              </AnimatedTitle>
              <div className="w-16 h-1 md:w-1 md:h-16 bg-primary-dark md:mx-6"></div>
              <AnimatedTitle 
                className="flex flex-col items-center md:items-start text-center md:text-left"
                delay={0.4}
                direction="up"
              >
                <h3 className="font-montreal-medium text-2xl text-primary-dark mb-2">
                  Camino de los Remeros<br className="md:hidden" /> y Ruta 27
                </h3>
                <p className="font-montreal-light text-md text-primary-dark">
                  Próximo a Remeros Plaza, a 5 minutos del Centro comercial Nordelta y del Acceso Tigre (Panamericana).
                </p>
              </AnimatedTitle>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-12">
            {/* Desktop Layout */}
            <div className="hidden md:flex justify-center items-stretch gap-12 h-[600px] min-h-0">
              <div className="w-48 h-full flex flex-col">
                <div className="bg-primary-sage text-primary-cream h-full flex flex-col box-border py-2 px-4">
                  <div className="flex flex-col gap-4">
                    {/* Logo Remeros */}
                    <div className="flex justify-center mb-2 pt-4">
                      <button
                        onClick={() => setHoveredPoint('Palmera de los Remeros')}
                        onMouseEnter={() => setHoveredPoint('Palmera de los Remeros')}
                        className="transition-transform duration-200 hover:scale-105 active:scale-95"
                        title="Volver a Palmera de los Remeros"
                        tabIndex={0}
                      >
                        <Logo type="remeros-footer" size="md" className="text-primary-cream" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-montreal-bold text-xl mb-4 text-primary-cream">Gastronomía</h3>
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
                            {point.name}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="font-montreal-bold text-xl mb-4 text-primary-cream">Servicios</h3>
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
                            {point.name}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full">
                <div className="relative w-[600px] h-full overflow-hidden border border-primary-dark">
                  <SimpleGoogleMapComponent 
                    apiKey={GOOGLE_MAPS_API_KEY} 
                    hoveredPoint={activeHoveredPoint} 
                    onMarkerHover={handleMarkerHover}
                    onMapReady={handleMapReady}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="mb-8">
                <div className="relative w-full h-[400px] overflow-hidden border border-primary-dark">
                  <SimpleGoogleMapComponent 
                    apiKey={GOOGLE_MAPS_API_KEY} 
                    hoveredPoint={activeHoveredPoint} 
                    onMarkerHover={handleMarkerHover}
                    onMapReady={handleMapReady}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-sage text-primary-cream flex flex-col box-border py-4 px-4">
                  {/* Logo Remeros Mobile */}
                  <div className="flex justify-center mb-4">
                    <button
                      onClick={() => setHoveredPoint('Palmera de los Remeros')}
                      className="transition-transform duration-200 hover:scale-105 active:scale-95"
                      title="Volver a Palmera de los Remeros"
                    >
                      <Logo type="remeros-footer" size="sm" className="text-primary-cream" />
                    </button>
                  </div>
                  
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
                          {point.name}
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
                          {point.name}
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