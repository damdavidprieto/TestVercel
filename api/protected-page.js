// api/protected-page.js
import fs from 'fs';
import path from 'path';
import { auth } from '../lib/firebaseAdmin';

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const [key, ...vals] = cookie.split('=');
    cookies[key?.trim()] = vals.joina('=').trim();
  });
  return cookies;
}

export default async function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token;

  // ✅ Si no hay token, limpiar y redirigir
  if (!token) {
    res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
    return res.writeHead(302, { Location: '/' }).end();
  }

  try {
    // ✅ Verificar token con Firebase Admin
    const decoded = await auth.verifyIdToken(token);
    console.log('Usuario verificado:', decoded.email);

    // ✅ Si pasa, servir el archivo HTML
    const filePath = path.join(process.cwd(), 'private', 'home.html');
    const html = fs.readFileSync(filePath, 'utf8');

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (error) {
    console.error('Token inválido o expirado:', error);

    // 🔴 Si el token es inválido, borrar la cookie y redirigir
    res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
    return res.writeHead(302, { Location: '/' }).end();
  }
}
