const fs = require('fs').promises;
const path = require('path');
const admin = require('firebase-admin');

// Inicializa Firebase Admin (solo una vez)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

module.exports = async function handler(req, res) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      res.writeHead(302, { Location: '/' });
      return res.end();
    }

    await admin.auth().verifyIdToken(token);

    const filePath = path.join(process.cwd(), 'app.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(htmlContent);

  } catch (error) {
    console.error('Token inválido o error:', error);
    res.writeHead(302, { Location: '/' });
    res.end();
  }
};
