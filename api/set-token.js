// /api/set-token.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    try {
      const { token } = req.body || {};
  
      if (!token) {
        return res.status(400).json({ error: 'Token missing in request body' });
      }
  
      // Set cookie (token) - HTTP only, secure, 5 días de vida
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; Path=/; Max-Age=${60 * 60 * 24 * 5}; SameSite=Strict`);
  
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Error en set-token:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  