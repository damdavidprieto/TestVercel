// secret-data.js
import fs from 'fs';
import path from 'path';
import { auth } from '../lib/firebaseAdmin.js';

// Parsear cookies
function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const [key, ...vals] = cookie.split('=');
    cookies[key?.trim()] = vals.join('=').trim();
  });
  return cookies;
}

export default async function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token;

  if (!token) {
    res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
    return res.status(401).send('No autorizado');
  }

  try {
    await auth.verifyIdToken(token);

    const { file } = req.query;

    if (!file || !file.endsWith('.js')) {
      return res.status(400).send('Archivo inválido');
    }

    let filePath;

    if (file === 'firebaseClient.js') {
      filePath = path.join(process.cwd(), 'lib', 'firebaseClient.js');
    } else {
      const safeFileName = path.basename(file); // prevenir path traversal
      filePath = path.join(process.cwd(), 'private', 'js', safeFileName);
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Archivo no encontrado');
    }

    const jsCode = fs.readFileSync(filePath, 'utf8');

    res.setHeader('Content-Type', 'application/javascript');
    return res.status(200).send(jsCode);

  } catch (error) {
    res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
    return res.status(401).send('No autorizado');
  }
}
