import { promises as fs } from 'fs';
import path from 'path';
import admin from 'firebase-admin';

// Inicializa Firebase Admin (sólo una vez)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // La clave privada viene con saltos de línea \n, hay que arreglarla
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export default async function handler(req, res) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      // No token -> redirigir al login
      res.writeHead(302, { Location: '/' });
      return res.end();
    }

    // Verifica el token con Firebase Admin
    await admin.auth().verifyIdToken(token);

    // Si es válido, sirve el archivo app.html
    const filePath = path.join(process.cwd(), 'app.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(htmlContent);

  } catch (error) {
    console.error('Token inválido o error:', error);

    // Token inválido -> redirigir al login
    res.writeHead(302, { Location: '/' });
    res.end();
  }
}
