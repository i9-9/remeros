'use client';

import Image from 'next/image';

export default function Proyecto() {
  return (
    <section id="proyecto" className="bg-primary-navy text-white py-20 min-h-[200vh]">
      <div className="layout-margin">
        <div className="container-grid">
          <div className="col-12 text-center mb-16">
            <h2 className="font-gt-extended font-medium text-6xl md:text-6xl lg:text-[9.5rem] md:leading-[1] text-center mb-0 z-10 relative">
              <span className="block">CONOCÉ EL</span>
              <span className="block md:-mt-5">PROYECTO</span>
            </h2> 
          </div>
          
          {/* Project Image */}
          <div className="col-12 mb-16">
            <div className="relative max-w-4xl mx-auto -mt-24 md:-mt-36 z-0">
              <Image
                src="/images/proyecto.png"
                alt="Palmera de los Remeros - Vista aérea del proyecto"
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="col-12 mb-16">
            <div className="border-t border-b border-white py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2">140</div>
                  <div className="font-gt-expanded-regular text-sm tracking-wider">
                    UNIDADES<br />
                    FUNCIONALES
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2">2,3,4&5</div>
                  <div className="font-gt-expanded-regular text-sm tracking-wider">
                    AMBIENTES
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2">16.000</div>
                  <div className="font-gt-expanded-regular text-sm tracking-wider">
                    M2 DE CONSTRUCCIÓN
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="font-gt-expanded-regular text-3xl md:text-7xl lg:text-[4rem] mb-2">1.100</div>
                  <div className="font-gt-expanded-regular text-sm tracking-wider">
                    M2 DE ZÓCALO<br />
                    COMERCIAL
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities List */}
          <div className="col-12 text-leftx">
            <div className="inline-block">
              <div className="font-gt-extended-thin text-5xl md:text-3xl lg:text-6xl leading-relaxed">
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