# TestVercel
Prueba conceptual sobre Vercel

🎯 Objetivo funcional

Crear una aplicación web mínima y móvil-responsiva que permita a los miembros de una peña sin ánimo de lucro:
Subir tickets de compra (fotos o PDF).
Visualizar su estado de procesamiento.
Que el tesorero pueda:
Ver los tickets pendientes.
Marcar como pagados.
Descargar evidencias si hace falta.
Llevar un control básico de las cuentas.

🔍 Análisis Técnico y Propuesta
1. Frontend (App Web Responsiva)
Ya lo sabes hacer, así que:
Usa HTML/CSS + JS con algún framework que te guste (React, Vue, etc.).
O simplemente un stack clásico con Bootstrap para rapidez.
Subida de imágenes (desde cámara o galería) y un formulario básico.
📱 Consejo: Usa PWA (Progressive Web App)
 para que los miembros puedan "instalarla" como si fuera una app nativa sin necesidad de pasar por Play Store.
 
 2. Backend gratuito o casi gratuito

Opciones:
🅰️ Firebase (de Google):
✅ Gratis en su plan básico, y perfecto para lo que necesitas:
Auth: Inicios de sesión con email o Google.
Firestore: BBDD NoSQL en tiempo real.
Storage: Para guardar imágenes de tickets.
Functions (Opcional): Lógica backend sin servidor.
✔️ Pro:
Integración total con Google Drive y otras APIs.
Sin preocuparte de servidores.
Buen soporte móvil y web.

❌ Contra:
Límite de uso gratuito (aunque muy generoso para un uso reducido como este).
Aprender un poco de la estructura de Firebase si no lo conoces.

🅱️ Supabase
Una alternativa open source a Firebase:
Usa PostgreSQL como BBDD.
Storage incluido.
Auth y funciones sin servidor.

✔️ Pro:
Más cercano a un stack tradicional (SQL).
Gratis hasta cierto punto.
3. Gestión de archivos: Google Drive vs. sistema propio
Tienes dos caminos aquí:
Opción 1: Usar Firebase Storage o Supabase Storage
Subes las imágenes a su sistema y todo queda en la misma plataforma.
Puedes controlar permisos fácilmente.
Se visualiza desde la app directamente.
Opción 2: Usar Google Drive API
Subes los tickets directamente a una carpeta en Google Drive usando la API.
Guardas solo los metadatos (nombre, link, fecha) en tu base de datos.
📝 Consejo: Si ya usan Drive, esta puede ser buena opción. Pero requerirá crear un proyecto de Google, OAuth y manejo de permisos. Puede complicarse un poco más.

4. Autenticación y control de usuarios
Puedes tener dos tipos de roles:
Miembro normal: Suben tickets, ven sus propios movimientos.
Tesorero: Ve todos los tickets, marca como pagados, gestiona cuentas.
Auth sencillo con:
Firebase Auth.
Supabase Auth.
O JWT si usas backend propio (aunque más complejo de mantener).

5. Contabilidad y pagos
En esta fase inicial puedes seguir usando Google Sheets o Excel:
Desde tu backend puedes generar exportaciones en CSV/Excel.
O incluso conectar con Google Sheets vía API si quieres automatizar más adelante.

💰 Coste estimado
Elemento	Opción	Coste
Backend + BBDD	Firebase / Supabase	$0 (hasta cierto uso)
Almacenamiento tickets	Firebase Storage / Supabase / Drive	$0
Frontend	App web + GitHub Pages o Vercel	$0
Hosting	Vercel / Netlify / Firebase Hosting	$0
Autenticación	Firebase / Supabase	$0

🛠️ Recomendación técnica concreta
Si no quieres complicarte mucho:
Frontend: React + Vite + Bootstrap o Tailwind
Hosting: Vercel
Backend + BBDD + Storage + Auth: Firebase
Exportaciones: CSV para empezar, opción de Google Sheets en el futuro.
Repositorio: GitHub
Y si en el futuro necesitáis llevar contabilidad más seria, podéis pensar en algo como Odoo o Zoho, pero por ahora no lo necesitas.

🔐 Seguridad y permisos
Solo usuarios registrados pueden subir tickets.
Solo el tesorero ve todos los tickets.
Archivos protegidos (no públicos en storage).
Backups automáticos (Firebase lo hace).

✅ Siguientes pasos sugeridos
Crear el proyecto en Firebase.
Diseñar la estructura mínima:
Tickets: fecha, autor, archivo, estado, importe.
Usuarios: email, rol.
Crear la web responsiva.
Subida de imagen y vista de tickets.
Panel de tesorero (marcar como pagado, descarga).
Exportación de datos.

Repositorio: https://github.com/damdavidprieto/TestVercel
Servidor de alojamiento: https://vercel.com/david-prietos-projects-97233534
Gestor de proveedores de acceso: https://console.firebase.google.com (Configurado para google)

Para firebase en local he tenido que ejecutar los siguientes comandos de CMD:
-npm install firebase
-npm install -g firebase-tools
-npm install firebase-admin

-Sobre la configuración de Firebase en el frontend

const firebaseConfig = {
  apiKey: "AIzaSyBh6tdi3NswyHj4RVNfIEGYIP9CoMe-BsQ",
  authDomain: "sepultururosvercelapp.firebaseapp.com",
  projectId: "sepultururosvercelapp",
  storageBucket: "sepultururosvercelapp.appspot.com",
  messagingSenderId: "4986417399",
  appId: "1:4986417399:web:537bc902d6037dbc9d23f2",
  measurementId: "G-BYSTFYZPBJ"
};
¿Es seguro exponer esta información?
	Sí, es completamente seguro y es la práctica recomendada:
		Estos datos no son secretos ni claves privadas. Solo identifican tu proyecto Firebase.
		La seguridad no depende de ocultar esta configuración, sino de las reglas y autenticación de Firebase.
		Las reglas de seguridad de Firestore, Storage, etc., controlan quién puede leer o escribir datos.
		Sin autenticación válida y sin reglas permisivas, nadie puede modificar ni acceder a tus datos.

¿Por qué incluir este config en el frontend?
	Firebase necesita esta configuración para saber a qué proyecto conectar la app.
	Sin ella, tu app no puede inicializarse ni usar servicios como autenticación, base de datos o almacenamiento.

Consideraciones adicionales
	No incluyas claves privadas (como FIREBASE_PRIVATE_KEY) en el frontend. Estas son para uso en servidores o funciones backend.
	Configura reglas de seguridad estrictas en Firebase para proteger tus datos.
	Puedes usar variables de entorno en servidores o funciones para manejar claves privadas y configuraciones sensibles.