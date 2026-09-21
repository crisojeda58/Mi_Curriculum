'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import type { Education } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Loader2, CalendarDays } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminEducation() {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Education> | null>(null);
  const { toast } = useToast();

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'education'));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as Education));
      setEducationList(list);
    } catch (error) {
      console.error('Error al obtener educación:', error);
      toast({ title: 'Error', description: 'No se pudo cargar la formación académica.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleStartNew = () => {
    setEditingItem({
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      start_date: '',
      end_date: '',
      description: '',
    });
  };

  const handleStartEdit = (item: Education) => {
    setEditingItem({ ...item });
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.institution || !editingItem.degree) {
      toast({ title: 'Campos requeridos', description: 'Completa la institución y el grado/título.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const docId = editingItem.id || `edu-${Date.now()}`;
      const data: Education = {
        id: docId,
        institution: editingItem.institution || '',
        degree: editingItem.degree || '',
        start_date: editingItem.start_date || '',
        end_date: editingItem.end_date || '',
        description: editingItem.description || '',
      };

      await setDoc(doc(db, 'education', docId), data);
      toast({ title: 'Éxito', description: 'Educación guardada correctamente.' });
      setEditingItem(null);
      fetchEducation();
    } catch (error) {
      console.error('Error al guardar:', error);
      toast({ title: 'Error', description: 'No se pudo guardar la información.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este registro?')) return;

    try {
      await deleteDoc(doc(db, 'education', id));
      toast({ title: 'Eliminado', description: 'Registro eliminado con éxito.' });
      fetchEducation();
    } catch (error) {
      console.error('Error al eliminar:', error);
      toast({ title: 'Error', description: 'No se pudo eliminar el registro.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Formación Académica</h2>
          <p className="text-muted-foreground text-sm">Gestiona tus títulos, carreras y estudios universitarios.</p>
        </div>
        {!editingItem && (
          <Button onClick={handleStartNew} className="gap-2">
            <Plus className="h-4 w-4" /> Nueva Educación
          </Button>
        )}
      </div>

      {editingItem && (
        <Card className="border-primary/50 shadow-lg bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle>{editingItem.id && educationList.some(e => e.id === editingItem.id) ? 'Editar Educación' : 'Crear Educación'}</CardTitle>
            <CardDescription>Detalles de la institución y el título obtenido o en curso.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Institución Educativa</label>
                  <Input
                    value={editingItem.institution || ''}
                    onChange={e => setEditingItem({ ...editingItem, institution: e.target.value })}
                    placeholder="Ej: Universidad de Concepción"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Grado o Título</label>
                  <Input
                    value={editingItem.degree || ''}
                    onChange={e => setEditingItem({ ...editingItem, degree: e.target.value })}
                    placeholder="Ej: Ingeniería en Informática"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha de Inicio</label>
                  <Input
                    value={editingItem.start_date || ''}
                    onChange={e => setEditingItem({ ...editingItem, start_date: e.target.value })}
                    placeholder="Ej: 2022 o Marzo 2022"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha de Término</label>
                  <Input
                    value={editingItem.end_date || ''}
                    onChange={e => setEditingItem({ ...editingItem, end_date: e.target.value })}
                    placeholder="Ej: Presente o 2026"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descripción (Opcional)</label>
                <Textarea
                  value={editingItem.description || ''}
                  onChange={e => setEditingItem({ ...editingItem, description: e.target.value })}
                  placeholder="Detalles sobre especialización, logros o materias destacadas..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="ghost" onClick={handleCancel} disabled={saving}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Guardar
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
      ) : educationList.length === 0 ? (
        <p className="text-center py-10 text-muted-foreground">No hay registros de educación guardados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {educationList.map(item => (
            <Card key={item.id} className="flex flex-col justify-between shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.institution}</CardTitle>
                    <p className="text-sm font-semibold text-primary mt-1">{item.degree}</p>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    <CalendarDays className="h-3 w-3 mr-1" />
                    {item.start_date} - {item.end_date}
                  </div>
                </div>
              </CardHeader>
              {item.description && (
                <CardContent>
                  <CardDescription className="text-xs">{item.description}</CardDescription>
                </CardContent>
              )}
              <div className="p-4 pt-0 flex justify-end gap-2 border-t border-border/50 mt-auto">
                <Button size="sm" variant="outline" onClick={() => handleStartEdit(item)}>
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
