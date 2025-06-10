'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/lib/validations';
import { submitToGoogleSheetsMock } from '@/lib/google-sheets';
import { getUTMSource } from '@/lib/utils';
import type { ContactFormData } from '@/types/forms';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = {
        ...data,
        utmSource: getUTMSource()
      };

      const success = await submitToGoogleSheetsMock(formData);

      if (success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nombre y Apellido en fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              {...register('nombre')}
              type="text"
              placeholder="Nombre"
              className="form-input"
              disabled={isSubmitting}
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('apellido')}
              type="text"
              placeholder="Apellido"
              className="form-input"
              disabled={isSubmitting}
            />
            {errors.apellido && (
              <p className="mt-1 text-sm text-red-600">{errors.apellido.message}</p>
            )}
          </div>
        </div>

        {/* Email y Teléfono en fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              {...register('email')}
              type="email"
              placeholder="Email"
              className="form-input"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('telefono')}
              type="tel"
              placeholder="Teléfono"
              className="form-input"
              disabled={isSubmitting}
            />
            {errors.telefono && (
              <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
            )}
          </div>
        </div>

        {/* Comentario */}
        <div>
          <textarea
            {...register('comentario')}
            placeholder="Comentario"
            className="form-textarea"
            disabled={isSubmitting}
            rows={4}
          />
          {errors.comentario && (
            <p className="mt-1 text-sm text-red-600">{errors.comentario.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            ¡Gracias por tu consulta! Nos pondremos en contacto contigo a la brevedad.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            Hubo un error al enviar tu consulta. Por favor, inténtalo nuevamente.
          </div>
        )}
      </form>
    </div>
  );
} 