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

export default async function handler(req, res) {
  try {
    const cookies = parseCookies(req.headers.cookie);
    const token = cookies.token;

    if (!token) {
      return res.writeHead(302, { Location: '/' }).end();
    }

    const pathParts = req.query.path;
    if (!Array.isArray(pathParts) || pathParts[0] !== 'private') {
      return res.status(400).send('Ruta no permitida');
    }

    const relativePath = pathParts.slice(1).join('/');
    const filePath = path.join(process.cwd(), 'private', relativePath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Archivo no encontrado');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml'
    }[ext] || 'application/octet-stream';

    const content = fs.readFileSync(filePath);
    res.setHeader('Content-Type', contentType);
    return res.status(200).send(content);

  } catch (err) {
    console.error('Error leyendo archivo privado:', err);
    return res.status(500).send('Error interno');
  }
}
