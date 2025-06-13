'use client';

import { useState } from 'react'

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    comentario: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contacto" className="bg-[#7A8B9A] py-20">
      <div className="layout-margin">
        <div className="container-grid">
          {/* Header */}
          <div className="col-12 mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 text-center md:text-left justify-center">
              <h2 className="font-gt-extended font-bold text-6xl md:text-7xl text-white mb-0 whitespace-nowrap">
                CONTACTO
              </h2>
              <div className="w-20 h-1 md:w-1 md:h-20 bg-white mx-0 md:mx-6"></div>
              <p className="font-montreal-medium text-xl text-white max-w-2xl mb-0">
                Te invitamos a dejarnos tus datos para recibir más información sobre<br />
                Palmera de los Remeros
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-8 col-start-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Row - Name and Surname */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="apellido"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Second Row - Email and Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Comment Field */}
              <div>
                <textarea
                  name="comentario"
                  placeholder="Comentario"
                  value={formData.comentario}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary-dark hover:bg-primary-dark/90 text-white px-12 py-4 font-montreal-medium text-lg transition-colors rounded-full"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
} 