import { promises as fs } from 'fs';
import path from 'path';
import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}
export default async function handler(req, res) {
  try {
    // Ruta directa al archivo privado
    const filePath = path.join(process.cwd(), 'private', 'app.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(htmlContent);

  } catch (error) {
    console.error('Error al leer app.html:', error);
    res.status(500).send('Error interno del servidor');
  }
}

