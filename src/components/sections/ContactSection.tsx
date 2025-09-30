'use client';

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail as MailIcon, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleSendMessage } from '@/app/actions';
import { ContactFormSchema } from '@/lib/schemas';
import SectionTitle from './SectionTitle';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ContactFormData = z.infer<typeof ContactFormSchema>;

const initialState = {
  success: undefined,
  message: undefined,
  error: undefined,
  fieldErrors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Enviar Mensaje
    </Button>
  );
}


const ContactSection: React.FC<{ id: string }> = ({ id }) => {
  const [formState, formAction] = useActionState(handleSendMessage, initialState);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (formState?.success) {
      toast({
        title: '¡Mensaje Enviado!',
        description: formState.message,
      });
      form.reset(); 
    } else if (formState?.error && !formState.fieldErrors) {
      toast({
        title: 'Error',
        description: formState.error,
        variant: 'destructive',
      });
    } else if (formState?.fieldErrors) {
      // Field-specific errors are handled by the FormMessage component
      // Optionally, show a generic toast for field errors
      // toast({
      //   title: 'Error de Validación',
      //   description: "Por favor, corrige los errores en el formulario.",
      //   variant: 'destructive',
      // });
    }
  }, [formState, toast, form]);

  const { pending } = useFormStatus();

  return (
    <section id={id} className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle icon={MailIcon} title="Ponte en Contacto" subtitle="¿Tienes alguna pregunta o propuesta? No dudes en enviarme un mensaje." />
        <Card className="max-w-xl mx-auto shadow-xl">
          <Form {...form}>
            <form action={formAction} className="space-y-0">
              <CardHeader>
                <CardTitle>Formulario de Contacto</CardTitle>
                <CardDescription>Rellena los campos y te responderé lo antes posible.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Nombre</FormLabel>
                      <FormControl>
                        <Input id="name" placeholder="Tu nombre completo" {...field} disabled={pending} />
                      </FormControl>
                      <FormMessage>{formState?.fieldErrors?.name?.join(', ')}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" placeholder="tu.email@ejemplo.com" {...field} disabled={pending} />
                      </FormControl>
                      <FormMessage>{formState?.fieldErrors?.email?.join(', ')}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="message">Mensaje</FormLabel>
      <FormControl>
        <Textarea
          id="message"
          placeholder="Escribe tu mensaje aquí..."
          rows={5}
          {...field}
          disabled={pending}
        />
      </FormControl>
                      <FormMessage>{formState?.fieldErrors?.message?.join(', ')}</FormMessage>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col items-stretch">
                <SubmitButton />
                {formState?.error && !formState.fieldErrors && (
                  <p className="text-sm text-destructive mt-4 text-center">{formState.error}</p>
                )}
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;
