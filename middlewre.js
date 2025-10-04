// api/protected-route.js

export default function handler(req, res) {
    const token = req.cookies.token || null;
  
    if (!token) {
      return res.status(401).json({ error: 'No autorizado' });
    }
  
    // Aquí podrías validar el token (p.ej. con Firebase Admin SDK)
  
    // Si está autorizado:
    res.status(200).json({ data: "Contenido protegido" });
  }
  