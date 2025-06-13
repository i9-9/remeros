'use client';

import Image from 'next/image';

export default function Proyecto() {
  return (
    <section id="proyecto" className="bg-primary-navy text-white py-20">
      <div className="layout-margin">
        <div className="container-grid">
          <div className="col-12 text-center mb-16">
            <h2 className="font-gt-extended font-medium text-5xl md:text-6xl lg:text-9xl mb-8 md:leading-[1.2rem]">
              CONOCÉ EL<br />
              PROYECTO
            </h2>
          </div>
          
          {/* Project Image */}
          <div className="col-12 mb-16">
            <div className="relative max-w-4xl mx-auto">
              <Image
                src="/images/ARV_GRUPO PORTLAND_REMEROS TOWER_VIEW 01_AEREA_FI (2).jpg"
                alt="Palmera de los Remeros - Vista aérea del proyecto"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="col-12 mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="font-gt-extended font-bold text-6xl md:text-7xl lg:text-8xl mb-2">140</div>
                <div className="font-montreal-medium text-sm tracking-wider">
                  UNIDADES<br />
                  FUNCIONALES
                </div>
              </div>
              
              <div className="text-center">
                <div className="font-gt-extended font-bold text-6xl md:text-7xl lg:text-8xl mb-2">2,3,4&5</div>
                <div className="font-montreal-medium text-sm tracking-wider">
                  AMBIENTES
                </div>
              </div>
              
              <div className="text-center">
                <div className="font-gt-extended font-bold text-6xl md:text-7xl lg:text-8xl mb-2">16.000</div>
                <div className="font-montreal-medium text-sm tracking-wider">
                  M2 DE CONSTRUCCIÓN
                </div>
              </div>
              
              <div className="text-center">
                <div className="font-gt-extended font-bold text-6xl md:text-7xl lg:text-8xl mb-2">1.100</div>
                <div className="font-montreal-medium text-sm tracking-wider">
                  M2 DE ZÓCALO<br />
                  COMERCIAL
                </div>
              </div>
            </div>
          </div>

          {/* Amenities List */}
          <div className="col-12 text-center">
            <div className="inline-block">
              <div className="font-gt-extended-thin text-2xl md:text-3xl lg:text-6xl leading-relaxed">
                PILETA/ SUM/ PARRILLAS/ GYM/<br />
                COWORK/ KIDS ROOM/ FOGONEROS/<br />
                ESPACIO WELLNESS & SPA
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 