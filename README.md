# Palmera de los Remeros - Landing Page

Landing page inmobiliaria completa para el proyecto "Palmera de los Remeros" de Grupo Portland.

## Stack Tecnológico

- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de estilos
- **Contentful** - CMS para gestión de imágenes
- **Google Sheets** - Almacenamiento de leads del formulario
- **Lucide React** - Iconos

## Características

### 🎨 Diseño
- 9 secciones específicas según diseño Figma
- Paleta de colores personalizada (navy, sage, gold, cream)
- Responsive design mobile-first
- Animaciones y transiciones suaves
- Tipografía professional (Inter como fallback)

### 🚀 Funcionalidades
- Navegación sticky con scroll suave
- Galería de imágenes con navegación por dots
- Reproductor de video personalizado
- Formulario de contacto con validación
- Integración con Google Sheets
- Mapa interactivo de ubicación
- Botones de descarga de documentos
- Enlaces a redes sociales

### ⚡ Performance
- Static export para máximo rendimiento
- Optimización de imágenes con Contentful
- Lazy loading de componentes
- SEO optimizado

## Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd remeros-landing
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales:
```env
# Contentful
CONTENTFUL_SPACE_ID=tu_space_id
CONTENTFUL_ACCESS_TOKEN=tu_access_token

# Google Integration  
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/TU_ID/exec
NEXT_PUBLIC_GOOGLE_MAPS_KEY=tu_maps_api_key

# Site Config  
NEXT_PUBLIC_SITE_URL=https://grupoportland.com/remeros
NEXT_PUBLIC_CONTACT_EMAIL=ventas@grupoportland.com
NEXT_PUBLIC_WHATSAPP_NUMBER=5491112345678
```

## Desarrollo

```bash
# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run start

# Linting
npm run lint
```

La aplicación estará disponible en `http://localhost:3000`

## Configuración de Contentful

### Content Model: "remerosProjectImages"

Crear un content model con los siguientes campos:

```typescript
{
  heroImage: Asset,           // Vista aérea principal
  locationImage: Asset,       // Vista peatonal torres  
  environmentImage: Asset,    // Vista aérea entorno natural
  amenitiesImage: Asset,      // Torres con amenities
  projectImage: Asset,        // Vista aérea para "Conocé el proyecto"
  interiorImages: Asset[],    // Galería unidades (8 imágenes)
  constructionVideo: Asset,   // Video progreso obra
}
```

### Optimización de Imágenes

Las imágenes se optimizan automáticamente usando la URL API de Contentful:
- Formato WebP
- Compresión inteligente
- Responsive sizing

## Configuración de Google Sheets

### 1. Crear Google Apps Script

1. Ir a [script.google.com](https://script.google.com)
2. Crear nuevo proyecto
3. Pegar el código del archivo `docs/google-apps-script.js`
4. Publicar como web app
5. Copiar la URL y agregarla a `.env.local`

### 2. Estructura de la Hoja

El script creará automáticamente las siguientes columnas:
- Timestamp
- Nombre
- Apellido  
- Email
- Teléfono
- Comentario
- UTM Source

## Deployment

### Build Estático

```bash
npm run build
```

Esto genera una carpeta `/out` con todos los archivos estáticos.

### Subida a WordPress

1. Subir contenido de `/out` a `/remeros/` en el servidor
2. Configurar .htaccess si es necesario:

```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^.]+)$ $1.html [NC,L]
```

### URL Final

La landing estará disponible en: `https://grupoportland.com/remeros`

## Estructura del Proyecto

```
remeros-landing/
├── app/
│   ├── layout.tsx              # Layout principal con SEO
│   ├── page.tsx                # Homepage con todas las secciones
│   ├── globals.css             # Estilos globales
│   └── favicon.ico
├── components/
│   ├── sections/               # Secciones principales
│   │   ├── Hero.tsx           # Nav + hero
│   │   ├── Ubicacion.tsx      # Mapa + sidebar
│   │   ├── Entorno.tsx        # Entorno inigualable
│   │   ├── Amenities.tsx      # Torres + downloads
│   │   ├── Proyecto.tsx       # Conocé el proyecto
│   │   ├── Unidades.tsx       # Galería interiores
│   │   ├── LaObra.tsx         # Video construcción
│   │   ├── Contacto.tsx       # Formulario
│   │   └── Footer.tsx         # Footer 3 columnas
│   └── ui/                    # Componentes reutilizables
│       ├── VideoPlayer.tsx    # Reproductor customizado
│       ├── ImageGallery.tsx   # Galería con dots
│       ├── ContactForm.tsx    # Form con validación
│       └── SocialLinks.tsx    # Iconos redes sociales
├── lib/
│   ├── contentful.ts          # Cliente CMS
│   ├── google-sheets.ts       # Integración formularios
│   ├── utils.ts               # Utilidades generales
│   └── validations.ts         # Schemas Zod
├── types/
│   ├── contentful.ts          # Tipos CMS
│   └── forms.ts               # Tipos formularios
└── public/
    └── images/                # Imágenes fallback
```

## Secciones del Sitio

1. **Hero** - Navegación + "UNA NUEVA MANERA DE VIVIRTIGRE"
2. **Ubicación** - Mapa + sidebar con gastronomía y servicios
3. **Entorno** - "UN ENTORNO INIGUALABLE" + features
4. **Amenities** - Vista torres + botones descarga
5. **Proyecto** - Stats + amenities sobre fondo navy
6. **Unidades** - Galería interiores + tipologías
7. **La Obra** - Video progreso + cronograma
8. **Contacto** - Formulario + información de contacto
9. **Footer** - 3 columnas: logo, Portland, redes

## Personalización

### Colores

Los colores están definidos en `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    navy: '#2B303B',
    blue: '#536A84', 
    sage: '#80846A',
    light: '#8BA0BD',
    cream: '#D2CAC2',
    gold: '#E2C18A',
    beige: '#E5DDD6',
    white: '#FFFFFF'
  }
}
```

### Fuentes

Por defecto usa Inter de Google Fonts. Para usar las fuentes específicas del proyecto:

1. Agregar archivos OTF a `/fonts/`
2. Configurar en `app/layout.tsx`
3. Actualizar variables CSS en `tailwind.config.ts`

## Soporte

Para soporte técnico o consultas sobre el proyecto:
- Email: desarrollo@grupoportland.com
- Documentación: [Notion/Confluence interno]

---

**Desarrollado por Grupo Portland** - Landing inmobiliaria premium para Palmera de los Remeros 