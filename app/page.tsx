import React from 'react';
import Hero from '@/components/sections/Hero';
import Ubicacion from '@/components/sections/Ubicacion';
import Ubicacion2 from '@/components/sections/Ubicacion2';
import Entorno from '@/components/sections/Entorno';
import Amenities from '@/components/sections/Amenities';
import Proyecto from '@/components/sections/Proyecto';
import Unidades from '@/components/sections/Unidades';
import LaObra from '@/components/sections/LaObra';
import Contacto from '@/components/sections/Contacto';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Sección 1: Hero + Navigation */}
      <Hero />
      
      {/* Sección 2: Ubicación 
      <Ubicacion />*/}
      
      {/* Sección 2: Ubicación */}
      <Ubicacion2 />
      
      {/* Sección 3: Un Entorno Inigualable */}
      <Entorno />
      
      {/* Sección 5: Conocé el Proyecto */}
      <Proyecto />
      
      {/* Sección 4: Amenities del Proyecto */}
      <Amenities />
      
      
      {/* Sección 6: Unidades */}
      <Unidades />
      
      {/* Sección 7: La Obra */}
      <LaObra />
      
      {/* Sección 8: Contacto */}
      <Contacto />
      
      {/* Sección 9: Footer */}
      <Footer />
    </main>
  );
} 