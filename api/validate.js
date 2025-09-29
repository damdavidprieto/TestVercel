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
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return res.status(401).json({ error: 'Token requerido' });
    }

    await admin.auth().verifyIdToken(token);

    return res.status(200).json({ ok: true }); // Token válido
  } catch (error) {
    console.error('Token inválido en /api/validate:', error);
    return res.status(401).json({ error: 'Token inválido' });
  }
}
