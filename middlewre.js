import { NextResponse } from 'next/server';

export function middleware(req) {
  const { cookies, nextUrl } = req;
  const token = cookies.get('token');

  // Rutas públicas permitidas sin token
  const publicPaths = ['/', '/login.html', '/js/', '/css/'];

  // Si la petición es para una ruta pública, dejamos pasar
  if (publicPaths.some(path => nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Si no hay token y la ruta es privada, redirigimos a login
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Aquí podrías añadir lógica para validar el token (opcional)

  return NextResponse.next();
}
