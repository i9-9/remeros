'use client';

import React from 'react';
import { useState, useRef } from 'react'
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import { motion, useInView, Variants } from 'framer-motion';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    comentario: ''
  })

  // Ref para detectar cuando la sección entra en el viewport
  const formRef = useRef(null)
  const isInView = useInView(formRef, { 
    once: true, // Solo anima una vez
    amount: 0.2 // Se activa cuando el 20% de la sección es visible
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

  // Define animation variants
  const inputVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.12,
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1]
      }
    })
  }

  return (
    <section id="contacto" className="bg-primary-blue py-20">
      <div className="layout-margin">
        <div className="container-grid grid grid-cols-12 gap-x-[20px]">
          {/* Header */}
          <div className="col-12 mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 text-center md:text-left justify-center">
              <AnimatedTitle 
                className="font-gt-extended font-medium text-6xl md:text-7xl text-white mb-0 whitespace-nowrap"
                delay={0.2}
                direction="up"
              >
                CONTACTO
              </AnimatedTitle>
              <div className="w-20 h-1 md:w-1 md:h-20 bg-white mx-0 md:mx-6"></div>
              <p className="font-montreal-medium text-xl text-white max-w-2xl mb-0">
                Te invitamos a dejarnos tus datos para recibir más información sobre<br />
                Palmera de los Remeros
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-span-12 col-start-1 sm:col-span-6 sm:col-start-6" ref={formRef}>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-x-[20px]">
                <motion.input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                  required
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={0}
                />
                <motion.input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                  required
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={1}
                />
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                  required
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={2}
                />
                <motion.input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                  required
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={3}
                />
                <motion.textarea
                  name="comentario"
                  placeholder="Comentario"
                  value={formData.comentario}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors resize-none sm:col-span-2"
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={4}
                />
                <motion.div
                  className="flex flex-col sm:flex-row sm:justify-end sm:col-span-2"
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={5}
                >
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-primary-dark hover:bg-primary-dark/90 text-white px-12 py-4 font-montreal-medium text-lg transition-colors rounded-full"
                  >
                    Enviar
                  </button>
                </motion.div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}