import React from 'react';

export default function Entorno() {
  return (
    <section id="entorno" className="section-padding bg-primary-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texto Izquierda */}
          <div className="space-y-8">
            <h2 className="heading-lg text-primary-navy">
              UN ENTORNO<br />
              <span className="text-primary-sage">INIGUALABLE</span>
            </h2>
            
            <p className="body-lg text-primary-blue max-w-lg">
              Un lugar que combina lo mejor de lo natural y lo urbano
            </p>

            <div className="space-y-4 text-primary-navy body-md">
              <p>
                Rodeado de espacios verdes y con acceso directo al río, 
                Palmera de los Remeros ofrece un estilo de vida único 
                que equilibra la tranquilidad de la naturaleza con 
                todas las comodidades urbanas.
              </p>
              
              <p>
                La ubicación estratégica permite disfrutar de la serenidad 
                del entorno natural mientras se mantiene la conectividad 
                con los principales centros de actividad de Tigre y Nordelta.
              </p>
            </div>
          </div>

          {/* Imagen Panorámica Derecha */}
          <div className="relative">
            <div 
              className="w-full h-[500px] bg-cover bg-center bg-no-repeat rounded-lg shadow-2xl"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/20 to-transparent rounded-lg"></div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-sage/20 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-gold/20 rounded-full"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-sage rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="heading-md text-primary-navy">Espacios Verdes</h3>
            <p className="body-md text-primary-blue">
              Entorno natural preservado con amplias áreas verdes y 
              biodiversidad local
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="heading-md text-primary-navy">Acceso al Río</h3>
            <p className="body-md text-primary-blue">
              Proximidad directa al río para actividades náuticas 
              y recreación acuática
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="heading-md text-primary-navy">Conectividad</h3>
            <p className="body-md text-primary-blue">
              Fácil acceso a centros urbanos manteniendo la 
              tranquilidad del entorno
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 