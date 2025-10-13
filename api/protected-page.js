// api/protected-page.js

import fs from 'fs';
import path from 'path';
import { auth } from '../lib/firebaseAdmin';

// Función auxiliar para parsear cookies
function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(';').forEach(cookie => {
    const [key, ...vals] = cookie.split('=');
    cookies[key?.trim()] = vals.join('=').trim(); // 🛠 corregido: join → join('=')
  });

  return cookies;
}

export default async function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token;

  // ✅ Si no hay token, limpiar cookie y redirigir al login
  if (!token) {
    res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
    return res.writeHead(302, { Location: '/' }).end();
  }

  try {
    // ✅ Verificar token JWT con Firebase Admin
    const decoded = await auth.verifyIdToken(token);
    console.log('✅ Usuario verificado:', decoded.email);

    // ✅ Leer y servir home.html
    const filePath = path.join(process.cwd(), 'private', 'home.html');
    const html = fs.readFileSync(filePath, 'utf8');

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (error) {
    console.error('❌ Token inválido o expirado:', error.message);

    // 🔴 Limpiar la cookie y redirigir
    res.setHeader('Set-Cookie', 'token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');
    return res.writeHead(302, { Location: '/' }).end();
  }
}
