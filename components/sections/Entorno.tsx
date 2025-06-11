import React from 'react';

export default function Entorno() {
  return (
    <section
      id="entorno"
      className="relative w-full h-[50vh] min-h-[300px] flex items-end bg-no-repeat"
      style={{
        backgroundImage: "url('/images/Remeros drone-45.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay suave */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none h-full" />
      <div className="relative w-full h-full flex flex-col justify-end px-16 pb-12" style={{height: '50vh'}}>
        <div className="flex flex-row justify-between items-end w-full">
          {/* Título a la izquierda */}
          <h2 className="text-white font-gt-extended font-medium text-3xl md:text-5xl leading-none">
            UN ENTORNO<br />
            <span className='font-bold'>
              INIGUALABLE
            </span>
          </h2>
          {/* Subtítulo a la derecha */}
          <p className="text-white text-left font-montreal-medium text-xl md:text-2xl text-right max-w-xl z-100">
            Un lugar que combina lo mejor de lo<br />
            natural y lo urbano
          </p>
        </div>
      </div>
    </section>
  );
} 