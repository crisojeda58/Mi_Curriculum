'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import type { Certificate } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Loader2, CalendarDays, ExternalLink, Upload } from 'lucide-react';
import { uploadFileToStorage } from '@/lib/storageUtils';
import { useToast } from '@/hooks/use-toast';

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [editingCert, setEditingCert] = useState<Partial<Certificate> | null>(null);
  const { toast } = useToast();

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, 'certificates'));
      const list = snap.docs.map(d => ({ ...d.data(), id: d.id } as unknown as Certificate));
      setCertificates(list);
    } catch (error) {
      console.error('Error al obtener certificados:', error);
      toast({ title: 'Error', description: 'No se pudieron cargar los certificados.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleStartNew = () => {
    setEditingCert({
      id: Date.now(),
      title: '',
      institution: '',
      issue_date: '',
      certificate_url: '',
      description: '',
    });
  };

  const handleStartEdit = (cert: Certificate) => {
    setEditingCert({ ...cert });
  };

  const handleCancel = () => {
    setEditingCert(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);
    try {
      const url = await uploadFileToStorage(file, 'certificates');
      setEditingCert(prev => (prev ? { ...prev, certificate_url: url } : null));
      toast({ title: 'Archivo subido', description: 'El certificado se subió a Firebase Storage.' });
    } catch (error) {
      console.error('Error al subir archivo:', error);
      toast({ title: 'Error de subida', description: 'No se pudo subir el archivo.', variant: 'destructive' });
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert || !editingCert.title || !editingCert.institution) {
      toast({ title: 'Campos requeridos', description: 'Completa el título y la institución.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    try {
      const docId = String(editingCert.id || Date.now());
      const certData: Certificate = {
        id: typeof editingCert.id === 'number' ? editingCert.id : Number(docId) || Date.now(),
        title: editingCert.title || '',
        institution: editingCert.institution || '',
        issue_date: editingCert.issue_date || '',
        certificate_url: editingCert.certificate_url || '',
        description: editingCert.description || '',
      };

      await setDoc(doc(db, 'certificates', docId), certData);
      toast({ title: 'Éxito', description: 'Certificado guardado correctamente.' });
      setEditingCert(null);
      fetchCertificates();
    } catch (error) {
      console.error('Error al guardar:', error);
      toast({ title: 'Error', description: 'No se pudo guardar el certificado.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este certificado?')) return;

    try {
      await deleteDoc(doc(db, 'certificates', String(id)));
      toast({ title: 'Eliminado', description: 'Certificado eliminado con éxito.' });
      fetchCertificates();
    } catch (error) {
      console.error('Error al eliminar:', error);
      toast({ title: 'Error', description: 'No se pudo eliminar el certificado.', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Certificados y Cursos</h2>
          <p className="text-muted-foreground text-sm">Administra tus certificaciones, diplomas y cursos completados.</p>
        </div>
        {!editingCert && (
          <Button onClick={handleStartNew} className="gap-2">
            <Plus className="h-4 w-4" /> Nuevo Certificado
          </Button>
        )}
      </div>

      {editingCert && (
        <Card className="border-primary/50 shadow-lg bg-card/60 backdrop-blur">
          <CardHeader>
            <CardTitle>{editingCert.id && certificates.some(c => c.id === editingCert.id) ? 'Editar Certificado' : 'Crear Certificado'}</CardTitle>
            <CardDescription>Información del curso, emisor y enlace al documento o credencial.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título del Certificado</label>
                  <Input
                    value={editingCert.title || ''}
                    onChange={e => setEditingCert({ ...editingCert, title: e.target.value })}
                    placeholder="Ej: Fundamentos de Ciberseguridad"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Institución / Plataforma</label>
                  <Input
                    value={editingCert.institution || ''}
                    onChange={e => setEditingCert({ ...editingCert, institution: e.target.value })}
                    placeholder="Ej: Cisco Networking Academy, Udemy, Coursera"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fecha de Emisión</label>
                  <Input
                    value={editingCert.issue_date || ''}
                    onChange={e => setEditingCert({ ...editingCert, issue_date: e.target.value })}
                    placeholder="Ej: 2024 o Octubre 2024"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Enlace del Certificado / PDF</label>
                  <div className="flex gap-2">
                    <Input
                      value={editingCert.certificate_url || ''}
                      onChange={e => setEditingCert({ ...editingCert, certificate_url: e.target.value })}
                      placeholder="URL pública o sube un PDF..."
                      className="flex-grow"
                    />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="application/pdf,image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={uploadingPdf}
                      />
                      <Button type="button" variant="outline" className="gap-2 pointer-events-none" disabled={uploadingPdf}>
                        {uploadingPdf ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                        {uploadingPdf ? 'Subiendo...' : 'Subir'}
                      </Button>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descripción</label>
                <Textarea
                  value={editingCert.description || ''}
                  onChange={e => setEditingCert({ ...editingCert, description: e.target.value })}
                  placeholder="Temáticas principales o habilidades validadas por este certificado..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="ghost" onClick={handleCancel} disabled={saving}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={saving || uploadingPdf}>
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Guardar Certificado
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
      ) : certificates.length === 0 ? (
        <p className="text-center py-10 text-muted-foreground">No hay certificados registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map(cert => (
            <Card key={cert.id} className="flex flex-col justify-between shadow">
              <CardHeader>
                <CardTitle className="text-lg">{cert.title}</CardTitle>
                <p className="text-sm font-semibold text-primary">{cert.institution}</p>
                <div className="flex items-center text-xs text-muted-foreground pt-1">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {cert.issue_date}
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs line-clamp-3">{cert.description}</CardDescription>
              </CardContent>
              <div className="p-4 pt-0 flex justify-between items-center border-t border-border/50 mt-auto">
                <div>
                  {cert.certificate_url && cert.certificate_url !== '#' && (
                    <a href={cert.certificate_url} target="_blank" rel="noreferrer" className="text-primary text-xs hover:underline flex items-center gap-1">
                      Ver certificado <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleStartEdit(cert)}>
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(cert.id)}>
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
