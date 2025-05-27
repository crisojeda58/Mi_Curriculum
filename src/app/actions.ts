// src/app/actions.ts
'use server';

import { z } from 'zod';
import { resumeTailor as resumeTailorFlow, type ResumeTailorInput, type ResumeTailorOutput } from '@/ai/flows/resume-tailor';
import { ContactFormSchema } from '@/lib/schemas';

// Resume Tailor Action
const ResumeTailorActionInputSchema = z.object({
  jobPostingUrl: z.string().url({ message: "Por favor, introduce una URL válida para la oferta de trabajo." }),
  resumeText: z.string().min(50, { message: "El texto del currículum debe tener al menos 50 caracteres." }),
});

export async function handleTailorResume(
  prevState: any,
  formData: FormData
): Promise<{ suggestions?: string; error?: string; fieldErrors?: Record<string, string[]> }> {
  const rawFormData = {
    jobPostingUrl: formData.get('jobPostingUrl'),
    resumeText: formData.get('resumeText'),
  };

  const validatedFields = ResumeTailorActionInputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      error: "Error de validación.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const input: ResumeTailorInput = validatedFields.data;
    const result: ResumeTailorOutput = await resumeTailorFlow(input);
    return { suggestions: result.suggestions };
  } catch (error) {
    console.error('Error en Resume Tailor:', error);
    return { error: 'Ha ocurrido un error al procesar tu solicitud. Inténtalo de nuevo más tarde.' };
  }
}


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
