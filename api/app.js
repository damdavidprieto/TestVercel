export default async function handler(req, res) {
  const skipAuth = true; // Cambiar a false para activar la seguridad
  
  try {
    if (skipAuth) {
      const filePath = path.join(process.cwd(), 'private', 'app.html');
      const htmlContent = await fs.readFile(filePath, 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(htmlContent);
    }

    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (!token) {
      return res.writeHead(302, { Location: '/' }).end();
    }

    await admin.auth().verifyIdToken(token);

    const filePath = path.join(process.cwd(), 'private', 'app.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(htmlContent);

  } catch (error) {
    console.error('Token inválido o error:', error);
    return res.writeHead(302, { Location: '/' }).end();
  }
}
