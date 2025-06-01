// src/app/actions.ts
'use server';

import { z } from 'zod';
import { ContactFormSchema } from '@/lib/schemas';

// Contact Form Action
export async function handleSendMessage(
  prevState: any,
  formData: FormData
): Promise<{ success?: boolean; message?: string; error?: string; fieldErrors?: Record<string, string[]> }> {
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  const validatedFields = ContactFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      error: "Error de validación.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // In a real app, you would send an email here or save to a database
    console.log('Mensaje recibido:', validatedFields.data);
    return { success: true, message: '¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.' };
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    return { error: 'Ha ocurrido un error al enviar tu mensaje. Inténtalo de nuevo más tarde.' };
  }
}
