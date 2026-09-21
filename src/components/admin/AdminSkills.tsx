'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import type { Skill } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Loader2, Code, Computer, Github, DraftingCompass, Database, Paintbrush, Wrench } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AVAILABLE_ICONS = [
  { label: 'Código / Desarrollo', value: 'Code', icon: Code },
  { label: 'Computador / Sistemas', value: 'Computer', icon: Computer },
  { label: 'GitHub / Git', value: 'Github', icon: Github },
  { label: 'Diseño / Arquitectura', value: 'DraftingCompass', icon: DraftingCompass },
  { label: 'Base de Datos', value: 'Database', icon: Database },
  { label: 'Diseño Visual / Frontend', value: 'Paintbrush', icon: Paintbrush },
  { label: 'Herramientas / DevOps', value: 'Wrench', icon: Wrench },
];

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const { toast } = useToast();

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'skills'));
      const list = snap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as Skill));
      setSkills(list);
    } catch (error) {
      console.error('Error al obtener habilidades:', error);
      toast({ title: 'Error', description: 'No se pudieron cargar las habilidades.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleStartNew = () => {
    setEditingSkill({
      id: `skill-${Date.now()}`,
      name: '',
      proficiency: 80,
      icon_name: 'Code',
    });
  };

  const handleStartEdit = (item: Skill) => {
    setEditingSkill({ ...item });
  };

  const handleCancel = () => {
    setEditingSkill(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name) {
      toast({ title: 'Campo requerido', description: 'Escribe el nombre de la habilidad.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const docId = String(editingSkill.id || `skill-${Date.now()}`);
      const data: Skill = {
        id: docId,
        name: editingSkill.name || '',
        proficiency: Number(editingSkill.proficiency) || 0,
        icon_name: editingSkill.icon_name || 'Code',
      };

      await setDoc(doc(db, 'skills', docId), data);
      toast({ title: 'Éxito', description: 'Habilidad guardada correctamente.' });
      setEditingSkill(null);
      fetchSkills();
    } catch (error) {
      console.error('Error al guardar:', error);
      toast({ title: 'Error', description: 'No se pudo guardar la habilidad.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta habilidad?')) return;

    try {
      await deleteDoc(doc(db, 'skills', String(id)));
      toast({ title: 'Eliminado', description: 'Habilidad eliminada con éxito.' });
      fetchSkills();
    } catch (error) {
      console.error('Error al eliminar:', error);
      toast({ title: 'Error', description: 'No se pudo eliminar la habilidad.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Habilidades Técnicas</h2>
          <p className="text-muted-foreground text-sm">Gestiona tus tecnologías, lenguajes y nivel de dominio.</p>
        </div>
        {!editingSkill && (
          <Button onClick={handleStartNew} className="gap-2">
            <Plus className="h-4 w-4" /> Nueva Habilidad
          </Button>
        )}
      </div>

      {editingSkill && (
        <Card className="border-primary/50 shadow-lg bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle>{editingSkill.id && skills.some(s => s.id === editingSkill.id) ? 'Editar Habilidad' : 'Crear Habilidad'}</CardTitle>
            <CardDescription>Nombre de la tecnología, icono representativo y nivel porcentual.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre de la Habilidad / Tecnología</label>
                  <Input
                    value={editingSkill.name || ''}
                    onChange={e => setEditingSkill({ ...editingSkill, name: e.target.value })}
                    placeholder="Ej: TypeScript, React, Python, Docker"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ícono Representativo</label>
                  <Select
                    value={editingSkill.icon_name || 'Code'}
                    onValueChange={val => setEditingSkill({ ...editingSkill, icon_name: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un ícono" />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABLE_ICONS.map(item => {
                        const Icon = item.icon;
                        return (
                          <SelectItem key={item.value} value={item.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label>Nivel de Dominio / Porcentaje</label>
                  <span className="text-primary font-bold">{editingSkill.proficiency || 0}%</span>
                </div>
                <Slider
                  value={[editingSkill.proficiency || 0]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={vals => setEditingSkill({ ...editingSkill, proficiency: vals[0] })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="ghost" onClick={handleCancel} disabled={saving}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Guardar Habilidad
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
      ) : skills.length === 0 ? (
        <p className="text-center py-10 text-muted-foreground">No hay habilidades registradas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map(skill => (
            <Card key={skill.id} className="shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-base font-medium">{skill.name}</CardTitle>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleStartEdit(skill)}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => handleDelete(skill.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={skill.proficiency} className="h-2 mb-1" />
                <p className="text-xs text-muted-foreground text-right">{skill.proficiency}%</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
