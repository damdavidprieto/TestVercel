import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const token = req.cookies?.token;

  if (!token) {
    res.writeHead(302, { Location: '/' });
    return res.end();
  }

  // Aquí podrías validar el token con Firebase Admin SDK
  const filePath = path.join(process.cwd(), 'private/home.html');

  try {
    const html = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar la página');
  }
}
