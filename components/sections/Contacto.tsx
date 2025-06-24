'use client';

import React from 'react';
import { useState, useRef } from 'react'
import AnimatedTitle from '@/components/ui/AnimatedTitle';
import { motion, useInView, Variants } from 'framer-motion';
import { submitToGoogleSheets } from '@/lib/google-sheets';
import { ContactFormData, contactFormSchema } from '@/types/forms';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Contacto() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  // Ref para detectar cuando la sección entra en el viewport
  const formRef = useRef(null)
  const isInView = useInView(formRef, { 
    once: true, // Solo anima una vez
    amount: 0.2 // Se activa cuando el 20% de la sección es visible
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    try {
      const success = await submitToGoogleSheets(data);
      
      if (success) {
        setSubmitSuccess(true);
        setSubmitError(null);
        reset();
      } else {
        setSubmitError('Error al enviar el formulario. Por favor, intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitError('Error al enviar el formulario. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-x-[20px]">
                <div className="relative">
                <motion.input
                  type="text"
                    {...register('nombre')}
                  placeholder="Nombre"
                  className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={0}
                    disabled={isSubmitting}
                    aria-invalid={errors.nombre ? "true" : "false"}
                  />
                  {errors.nombre && (
                    <motion.span 
                      className="absolute -bottom-6 left-0 text-red-400 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.nombre.message}
                    </motion.span>
                  )}
                </div>

                <div className="relative">
                <motion.input
                  type="text"
                    {...register('apellido')}
                  placeholder="Apellido"
                  className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={1}
                    disabled={isSubmitting}
                    aria-invalid={errors.apellido ? "true" : "false"}
                  />
                  {errors.apellido && (
                    <motion.span 
                      className="absolute -bottom-6 left-0 text-red-400 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.apellido.message}
                    </motion.span>
                  )}
                </div>

                <div className="relative">
                <motion.input
                  type="email"
                    {...register('email')}
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={2}
                    disabled={isSubmitting}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <motion.span 
                      className="absolute -bottom-6 left-0 text-red-400 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.email.message}
                    </motion.span>
                  )}
                </div>

                <div className="relative">
                <motion.input
                  type="tel"
                    {...register('telefono')}
                  placeholder="Teléfono"
                  className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors"
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={3}
                    disabled={isSubmitting}
                    aria-invalid={errors.telefono ? "true" : "false"}
                  />
                  {errors.telefono && (
                    <motion.span 
                      className="absolute -bottom-6 left-0 text-red-400 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.telefono.message}
                    </motion.span>
                  )}
                </div>

                <div className="relative sm:col-span-2">
                <motion.textarea
                    {...register('comentario')}
                  placeholder="Comentario"
                  rows={4}
                    className="w-full px-6 py-4 bg-white/90 text-primary-dark placeholder-gray-500 font-montreal-medium text-lg focus:outline-none focus:bg-white transition-colors resize-none"
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={4}
                    disabled={isSubmitting}
                    aria-invalid={errors.comentario ? "true" : "false"}
                  />
                  {errors.comentario && (
                    <motion.span 
                      className="absolute -bottom-6 left-0 text-red-400 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.comentario.message}
                    </motion.span>
                  )}
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row sm:justify-end sm:col-span-2 gap-4 mt-8"
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={5}
                >
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-primary-dark hover:bg-primary-dark/90 text-white px-12 py-4 font-montreal-medium text-lg transition-colors rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </button>
                </motion.div>

                {submitSuccess && (
                  <motion.div
                    className="sm:col-span-2 p-4 bg-green-500 text-white rounded-lg font-montreal-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ¡Gracias por tu mensaje! Te contactaremos pronto.
                  </motion.div>
                )}

                {submitError && (
                  <motion.div
                    className="sm:col-span-2 p-4 bg-red-500 text-white rounded-lg font-montreal-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {submitError}
                  </motion.div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}