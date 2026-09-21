'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import type { Project } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Upload, Loader2, ExternalLink } from 'lucide-react';
import { uploadFileToStorage } from '@/lib/storageUtils';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [technologiesInput, setTechnologiesInput] = useState('');
  const { toast } = useToast();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'projects'));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as Project));
      setProjects(list);
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
      toast({ title: 'Error', description: 'No se pudieron cargar los proyectos.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleStartNew = () => {
    setEditingProject({
      id: `project-${Date.now()}`,
      title: '',
      description: '',
      image_url: '',
      technologies: [],
      github_url: '',
      live_url: '',
    });
    setTechnologiesInput('');
  };

  const handleStartEdit = (proj: Project) => {
    setEditingProject({ ...proj });
    setTechnologiesInput(proj.technologies ? proj.technologies.join(', ') : '');
  };

  const handleCancel = () => {
    setEditingProject(null);
    setTechnologiesInput('');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadFileToStorage(file, 'projects');
      setEditingProject(prev => (prev ? { ...prev, image_url: url } : null));
      toast({ title: 'Imagen subida', description: 'La imagen se cargó exitosamente en Firebase Storage.' });
    } catch (error) {
      console.error('Error al subir imagen:', error);
      toast({ title: 'Error de subida', description: 'No se pudo subir la imagen.', variant: 'destructive' });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) {
      toast({ title: 'Campo requerido', description: 'El proyecto debe tener al menos un título.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const techArray = technologiesInput
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      const docId = editingProject.id || `project-${Date.now()}`;
      const projectData: Project = {
        id: docId,
        title: editingProject.title || '',
        description: editingProject.description || '',
        image_url: editingProject.image_url || '',
        technologies: techArray,
        github_url: editingProject.github_url || '',
        live_url: editingProject.live_url || '',
      };

      await setDoc(doc(db, 'projects', docId), projectData);
      toast({ title: 'Éxito', description: 'Proyecto guardado correctamente.' });
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error('Error al guardar:', error);
      toast({ title: 'Error', description: 'No se pudo guardar el proyecto.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este proyecto?')) return;

    try {
      await deleteDoc(doc(db, 'projects', id));
      toast({ title: 'Eliminado', description: 'Proyecto eliminado con éxito.' });
      fetchProjects();
    } catch (error) {
      console.error('Error al eliminar:', error);
      toast({ title: 'Error', description: 'No se pudo eliminar el proyecto.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Proyectos</h2>
          <p className="text-muted-foreground text-sm">Administra los proyectos destacados de tu portafolio.</p>
        </div>
        {!editingProject && (
          <Button onClick={handleStartNew} className="gap-2">
            <Plus className="h-4 w-4" /> Nuevo Proyecto
          </Button>
        )}
      </div>

      {editingProject && (
        <Card className="border-primary/50 shadow-lg bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle>{editingProject.id && projects.some(p => p.id === editingProject.id) ? 'Editar Proyecto' : 'Crear Proyecto'}</CardTitle>
            <CardDescription>Completa los detalles del proyecto y guarda los cambios.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título del Proyecto</label>
                  <Input
                    value={editingProject.title || ''}
                    onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                    placeholder="Ej: Chatbot con IA"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tecnologías (separadas por coma)</label>
                  <Input
                    value={technologiesInput}
                    onChange={e => setTechnologiesInput(e.target.value)}
                    placeholder="Ej: Next.js, TypeScript, Tailwind, Firebase"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descripción</label>
                <Textarea
                  value={editingProject.description || ''}
                  onChange={e => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Descripción detallada de las características y objetivos del proyecto..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL de GitHub</label>
                  <Input
                    value={editingProject.github_url || ''}
                    onChange={e => setEditingProject({ ...editingProject, github_url: e.target.value })}
                    placeholder="https://github.com/tu-usuario/tu-repo"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">URL Demo / Web en vivo</label>
                  <Input
                    value={editingProject.live_url || ''}
                    onChange={e => setEditingProject({ ...editingProject, live_url: e.target.value })}
                    placeholder="https://tu-proyecto.vercel.app"
                  />
                </div>
              </div>

              {/* Imagen del proyecto y subida a Firebase Storage */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Imagen del Proyecto</label>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Input
                    value={editingProject.image_url || ''}
                    onChange={e => setEditingProject({ ...editingProject, image_url: e.target.value })}
                    placeholder="URL de la imagen o sube un archivo..."
                    className="flex-grow"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                    />
                    <Button type="button" variant="outline" className="gap-2 pointer-events-none" disabled={uploadingImage}>
                      {uploadingImage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                      {uploadingImage ? 'Subiendo...' : 'Subir Imagen'}
                    </Button>
                  </label>
                </div>
                {editingProject.image_url && (
                  <div className="relative w-40 h-24 rounded-md overflow-hidden border mt-2">
                    <Image src={editingProject.image_url} alt="Preview" fill className="object-cover" />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="ghost" onClick={handleCancel} disabled={saving}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving || uploadingImage}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Guardar Proyecto
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : projects.length === 0 ? (
        <p className="text-center py-10 text-muted-foreground">No hay proyectos registrados en la base de datos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(proj => (
            <Card key={proj.id} className="flex flex-col justify-between overflow-hidden shadow">
              {proj.image_url && (
                <div className="relative w-full h-36">
                  <Image src={proj.image_url} alt={proj.title} fill className="object-cover" />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{proj.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-xs">{proj.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {proj.technologies?.map(t => (
                    <span key={t} className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 pt-0 flex justify-between items-center border-t border-border/50 mt-auto">
                <div className="flex gap-2">
                  {proj.github_url && (
                    <a href={proj.github_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleStartEdit(proj)}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(proj.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
