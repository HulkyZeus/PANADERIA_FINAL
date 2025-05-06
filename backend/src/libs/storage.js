import { storage } from './firebase.js';
import fs from 'fs-extra';

export const uploadImage = async (filePath, folder = 'products') => {
  try {
    const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const file = storage.file(fileName);
    
    await file.save(fs.readFileSync(filePath), {
      metadata: {
        contentType: 'image/jpeg'
      }
    });

    // Hacer el archivo público
    await file.makePublic();

    // Obtener la URL pública
    const publicUrl = `https://storage.googleapis.com/${storage.name}/${fileName}`;

    // Eliminar el archivo temporal
    await fs.unlink(filePath);

    return {
      url: publicUrl,
      path: fileName
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteImage = async (filePath) => {
  try {
    const file = storage.file(filePath);
    await file.delete();
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}; 