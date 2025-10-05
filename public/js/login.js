// public/js/login.js

import {
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { auth } from '../../lib/firebaseClient.js';

// Establecer persistencia local (permite mantener sesión después de recargar)
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    // Evento de login con Google
    document.getElementById('googleLoginBtn').addEventListener('click', () => {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          if (!result.user) throw new Error("No se obtuvo información del usuario");

          const token = await result.user.getIdToken();

          // Enviar token al backend para guardarlo en una cookie
          const response = await fetch("/api/set-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ token }),
          });

          if (!response.ok) {
            const err = await response.text();
            throw new Error(`Fallo al guardar token en cookie: ${err}`);
          }

          // Redirige al home
          window.location.href = "/home";
        })
        .catch((error) => {
          console.error("Error en login con Google:", error);
          alert("Error al iniciar sesión: " + error.message);
        });
    });

    // Verificar si ya hay sesión activa
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const hasCookie = document.cookie.includes("token=");

        if (!hasCookie) {
          console.warn("Sesión Firebase detectada, pero no hay token del backend. Cerrando sesión local...");
          await signOut(auth);
          return;
        }

        // Si ya hay sesión activa y estamos en login, redirigir
        if (window.location.pathname === "/" || window.location.pathname === "/login.html") {
          console.log("Sesión detectada:", user.email);
          window.location.href = "/home";
        }
      }
    });
  })
  .catch((err) => {
    console.error("Error al establecer persistencia:", err);
    alert("Error al configurar sesión persistente: " + err.message);
  });
