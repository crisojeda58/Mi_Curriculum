import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

/**
 * Sube un archivo a Firebase Storage y retorna la URL pública de descarga.
 * @param file Archivo a subir
 * @param path Ruta dentro del storage (ej: "projects", "certificates", "profile")
 */
export async function uploadFileToStorage(file: File, path: string = 'uploads'): Promise<string> {
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const storageRef = ref(storage, `${path}/${timestamp}_${sanitizedName}`);
  
  const snapshot = await uploadBytes(storageRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  
  return downloadUrl;
}
