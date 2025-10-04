import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const token = req.cookies?.token;

  if (!token) {
    return res.writeHead(302, { Location: '/' }).end();
  }

  const filePath = path.join(process.cwd(), 'private', req.query.path?.join('/'));

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Archivo no encontrado');
  }

  try {
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
    res.status(200).send(content);
  } catch (err) {
    console.error('Error leyendo archivo privado:', err);
    res.status(500).send('Error interno');
  }
}
