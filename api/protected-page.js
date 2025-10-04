import fs from 'fs';
import path from 'path';

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const [key, ...vals] = cookie.split('=');
    cookies[key?.trim()] = vals.join('=').trim();
  });
  return cookies;
}

export default function handler(req, res) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.token;

  // ✅ Si no hay token, limpia la cookie y redirige a login
  if (!token) {
    res.setHeader(
      'Set-Cookie',
      'token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax'
    );
    return res.writeHead(302, { Location: '/' }).end();
  }

  // ✅ Si hay token, servir home.html desde carpeta private
  const filePath = path.join(process.cwd(), 'private', 'home.html');

  try {
    const html = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (err) {
    console.error('Error cargando home.html:', err);
    return res.status(500).send('Error interno del servidor');
  }
}
