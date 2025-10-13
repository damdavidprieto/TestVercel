import admin from 'firebase-admin';
import dotenv from 'dotenv';

// Cargar variables de entorno solo en desarrollo/local
if (process.env.NODE_ENV !== 'production') {
    dotenv.config(); // busca automáticamente el archivo .env en el root
  }

// Asegurar que todas las variables estén presentes
const requiredEnvVars = [
  'FIREBASE_CLIENT_EMAIL',
  'FIREBASE_CLIENT_ID',
  'FIREBASE_CLIENT_CERT_URL',
  'FIREBASE_PRIVATE_KEY',
  'FIREBASE_PRIVATE_KEY_ID'
];

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(`❌ Falta la variable de entorno: ${key}`);
  }
}

// Inicializa Firebase Admin solo una vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: 'service_account',
      project_id: 'sepultururosvercelapp',
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
    }),
  });
}

export const auth = admin.auth();
