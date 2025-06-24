# Integración de Google Maps en Proyectos Inmobiliarios

Esta guía explica cómo implementar un mapa interactivo de Google Maps similar al utilizado en el proyecto Remeros Tower, ideal para proyectos inmobiliarios que necesiten mostrar la ubicación del proyecto y puntos de interés cercanos.

## Índice
1. [Requisitos Previos](#requisitos-previos)
2. [Configuración Inicial](#configuración-inicial)
3. [Estructura de Datos](#estructura-de-datos)
4. [Componente Principal](#componente-principal)
5. [Estilos y Personalización](#estilos-y-personalización)
6. [Funcionalidades Interactivas](#funcionalidades-interactivas)
7. [Optimizaciones y Mejores Prácticas](#optimizaciones-y-mejores-prácticas)

## Requisitos Previos

1. Una cuenta de Google Cloud Platform
2. API Key de Google Maps con las siguientes APIs habilitadas:
   - Maps JavaScript API
   - Places API (opcional, si se necesita búsqueda de lugares)
3. Next.js proyecto configurado
4. TypeScript (recomendado)

## Configuración Inicial

1. Agregar la API Key a las variables de entorno:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=tu_api_key_aquí
```

2. Instalar tipos de TypeScript para Google Maps (opcional pero recomendado):
```bash
npm install @types/google.maps --save-dev
```

## Estructura de Datos

Define la estructura de los puntos de interés. Ejemplo:

```typescript
interface PointOfInterest {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

// Ubicación del proyecto
const projectLocation = { 
  lat: -34.40692307342323, 
  lng: -58.6187122075483,
  address: "Tu dirección aquí"
};

// Puntos de interés por categoría
const pointsOfInterest = {
  gastronomia: [
    { name: "Restaurante 1", address: "Dirección 1", lat: -34.400, lng: -58.634 },
    // ... más puntos
  ],
  servicios: [
    { name: "Servicio 1", address: "Dirección 1", lat: -34.405, lng: -58.619 },
    // ... más puntos
  ],
  proyecto: [
    { name: "Nombre del Proyecto", address: projectLocation.address, lat: projectLocation.lat, lng: projectLocation.lng }
  ]
};
```

## Componente Principal

El componente se divide en dos partes principales:

1. **Carga del Mapa**: Función para cargar Google Maps de manera optimizada
2. **Componente del Mapa**: Manejo de la visualización y la interactividad

### Carga Optimizada

```typescript
function loadGoogleMaps(apiKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.Map) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-maps-api';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Error cargando Google Maps'));

    document.head.appendChild(script);
  });
}
```

## Estilos y Personalización

### Estilo del Mapa

```typescript
const mapStyles = [
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
];
```

### Marcadores Personalizados

```typescript
// Marcador principal del proyecto
const projectMarker = new google.maps.Marker({
  position: projectLocation,
  map: mapInstance,
  title: "NOMBRE DEL PROYECTO",
  icon: {
    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="#E2C18A" stroke="#2B303B" stroke-width="3"/>
      </svg>
    `),
    scaledSize: new google.maps.Size(40, 40),
    anchor: new google.maps.Point(20, 20)
  },
  zIndex: 1000
});
```

## Funcionalidades Interactivas

### Ventana de Información

```typescript
const infoWindow = new google.maps.InfoWindow({
  content: `
    <div style="padding: 12px; text-align: center; font-family: Arial;">
      <h3 style="margin: 0 0 8px 0; color: #2B303B; font-size: 16px; font-weight: bold;">
        NOMBRE DEL PROYECTO
      </h3>
      <p style="margin: 0 0 8px 0; color: #536A84; font-size: 12px;">
        Descripción corta del proyecto
      </p>
      <p style="margin: 0; color: #80846A; font-size: 11px; line-height: 1.3;">
        📍 Dirección completa<br/>
        Información adicional
      </p>
    </div>
  `,
  maxWidth: 280
});
```

### Interacción con Hover

```typescript
// En el componente de lista de puntos
<p 
  onMouseEnter={() => setHoveredPoint(point.name)}
  onMouseLeave={() => setHoveredPoint(null)}
  className={`cursor-pointer ${
    hoveredPoint === point.name ? 'text-primary-gold' : ''
  }`}
>
  {point.name}
</p>

// En el efecto del mapa
useEffect(() => {
  if (hoveredPoint && map) {
    const marker = markers[hoveredPoint];
    if (marker?.getPosition()) {
      map.panTo(marker.getPosition());
    }
  }
}, [hoveredPoint, markers, map]);
```

## Optimizaciones y Mejores Prácticas

1. **Carga Lazy del Script**
   - Cargar Google Maps solo cuando sea necesario
   - Implementar un sistema de cache para evitar múltiples cargas

2. **Manejo de Errores**
   - Implementar fallbacks visuales
   - Mostrar mensajes de error amigables
   - Retry logic para cargas fallidas

3. **Rendimiento**
   - Usar marcadores SVG en lugar de imágenes PNG
   - Implementar clustering para muchos marcadores
   - Limitar el número de marcadores visibles según el zoom

4. **Responsive Design**
   - Adaptar el tamaño del mapa según el dispositivo
   - Ajustar el zoom y centro según la pantalla
   - Implementar controles touch-friendly

5. **SEO y Accesibilidad**
   - Agregar textos alternativos a los marcadores
   - Implementar navegación por teclado
   - Asegurar que el contenido sea indexable

## Ejemplo de Implementación

```typescript
export default function MapaProyecto() {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  return (
    <section className="mapa-section">
      <div className="mapa-container">
        {/* Componente del Mapa */}
        <SimpleGoogleMapComponent 
          apiKey={GOOGLE_MAPS_API_KEY} 
          hoveredPoint={hoveredPoint} 
          onMarkerHover={setHoveredPoint}
        />
      </div>
      
      {/* Lista de Puntos de Interés */}
      <div className="puntos-interes">
        {Object.entries(pointsOfInterest).map(([categoria, puntos]) => (
          <div key={categoria}>
            <h3>{categoria}</h3>
            {puntos.map(punto => (
              <p 
                key={punto.name}
                onMouseEnter={() => setHoveredPoint(punto.name)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {punto.name}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
```

## Conclusión

Esta implementación proporciona una base sólida para mostrar la ubicación de un proyecto inmobiliario y sus puntos de interés cercanos. La combinación de un diseño atractivo, interactividad fluida y buenas prácticas de desarrollo asegura una experiencia de usuario óptima.

Recuerda siempre:
- Mantener actualizada la API key y las dependencias
- Probar en diferentes dispositivos y navegadores
- Optimizar el rendimiento según la escala del proyecto
- Seguir las mejores prácticas de seguridad al manejar claves API 