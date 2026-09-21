'use client';

import React, { useState } from 'react';
import { useAuth, ADMIN_EMAIL } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, LogOut, ArrowLeft, Briefcase, GraduationCap, Award, Wrench, Loader2 } from 'lucide-react';
import Link from 'next/link';
import AdminProjects from '@/components/admin/AdminProjects';
import AdminEducation from '@/components/admin/AdminEducation';
import AdminCertificates from '@/components/admin/AdminCertificates';
import AdminSkills from '@/components/admin/AdminSkills';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { user, loading, isAdmin, loginWithGoogle, logout } = useAuth();
  const [loggingIn, setLoggingIn] = useState(false);
  const { toast } = useToast();

  const handleLogin = async () => {
    setLoggingIn(true);
    try {
      await loginWithGoogle();
      toast({
        title: 'Sesión iniciada',
        description: 'Bienvenido al panel de administración.',
      });
    } catch (error: any) {
      toast({
        title: 'Acceso Denegado',
        description: error.message || 'No se pudo iniciar sesión.',
        variant: 'destructive',
      });
    } finally {
      setLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Vista de Login si no está autenticado o no es el admin
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <Card className="max-w-md w-full border-border/60 shadow-2xl backdrop-blur bg-card/80">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-bold">Panel de Administración</CardTitle>
            <CardDescription>
              Inicia sesión con tu cuenta de administrador autorizada para continuar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <Button
              className="w-full py-6 text-base font-medium flex items-center justify-center gap-3"
              onClick={handleLogin}
              disabled={loggingIn}
            >
              {loggingIn ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              {loggingIn ? 'Conectando con Google...' : 'Continuar con Google'}
            </Button>

            <div className="pt-4 text-center">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Volver al sitio principal
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Panel de Control con pestañas
  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Header Admin */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h1 className="font-semibold text-lg">Panel de Administración</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground">Sesión activa</p>
              <p className="text-xs font-mono font-medium">{user.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl mx-auto h-auto p-1 gap-1">
            <TabsTrigger value="projects" className="flex items-center gap-2 py-2.5">
              <Briefcase className="h-4 w-4" /> Proyectos
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2 py-2.5">
              <GraduationCap className="h-4 w-4" /> Educación
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2 py-2.5">
              <Award className="h-4 w-4" /> Certificados
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2 py-2.5">
              <Wrench className="h-4 w-4" /> Habilidades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <AdminProjects />
          </TabsContent>

          <TabsContent value="education">
            <AdminEducation />
          </TabsContent>

          <TabsContent value="certificates">
            <AdminCertificates />
          </TabsContent>

          <TabsContent value="skills">
            <AdminSkills />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
