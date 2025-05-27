'use client';

import { useState, useTransition, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { handleTailorResume } from '@/app/actions';
import SectionTitle from './SectionTitle';

const initialState = {
  suggestions: undefined,
  error: undefined,
  fieldErrors: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
      Adaptar Currículum
    </Button>
  );
}

const ResumeTailorSection: React.FC<{ id: string }> = ({ id }) => {
  const [formState, formAction] = useFormState(handleTailorResume, initialState);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (formState?.error && !formState.fieldErrors) {
      toast({
        title: 'Error',
        description: formState.error,
        variant: 'destructive',
      });
    }
    if (formState?.suggestions) {
       toast({
        title: 'Sugerencias Generadas',
        description: '¡Tu currículum ha sido analizado!',
      });
    }
  }, [formState, toast]);

  return (
    <section id={id} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle icon={Sparkles} title="Adaptador de CV con IA" subtitle="Pega el enlace de una oferta de trabajo y tu currículum para recibir sugerencias personalizadas y mejorar tus posibilidades." />
        <Card className="max-w-2xl mx-auto shadow-xl">
          <form action={formAction}>
            <CardHeader>
              <CardTitle>Optimiza tu Currículum</CardTitle>
              <CardDescription>Introduce los detalles para obtener recomendaciones impulsadas por IA.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jobPostingUrl">URL de la Oferta de Trabajo</Label>
                <Input
                  id="jobPostingUrl"
                  name="jobPostingUrl"
                  placeholder="https://ejemplo.com/oferta-de-trabajo"
                  disabled={isPending}
                />
                {formState?.fieldErrors?.jobPostingUrl && (
                  <p className="text-sm text-destructive">{formState.fieldErrors.jobPostingUrl.join(', ')}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="resumeText">Texto de tu Currículum</Label>
                <Textarea
                  id="resumeText"
                  name="resumeText"
                  placeholder="Pega aquí el contenido de tu currículum..."
                  rows={10}
                  disabled={isPending}
                />
                {formState?.fieldErrors?.resumeText && (
                  <p className="text-sm text-destructive">{formState.fieldErrors.resumeText.join(', ')}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-stretch">
              <SubmitButton />
               {formState?.error && !formState.fieldErrors && (
                  <p className="text-sm text-destructive mt-4 text-center">{formState.error}</p>
                )}
            </CardFooter>
          </form>
        </Card>

        {formState?.suggestions && (
          <Card className="max-w-2xl mx-auto mt-8 shadow-xl">
            <CardHeader>
              <CardTitle>Sugerencias de Mejora</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
                {formState.suggestions}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default ResumeTailorSection;
