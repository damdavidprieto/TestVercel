// public/js/login.js

import {
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  signInWithRedirect,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
// En public/js/login.js
import { auth } from './firebaseClient.js';

// Inicializar provider una sola vez
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

let loginInProgress = false; // previene múltiples popups

// Establecer persistencia local
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    document.getElementById('googleLoginBtn').addEventListener('click', async () => {
      if (loginInProgress) return; // evita múltiples clics
      loginInProgress = true;

      try {
        const result = await signInWithPopup(auth, provider);

        if (!result.user) throw new Error("No se obtuvo información del usuario");

        const token = await result.user.getIdToken();

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

        window.location.href = "/home";
      } catch (error) {
        console.error("Error en login con Google:", error);

        // fallback si el popup fue bloqueado o cancelado
        if (
          error.code === 'auth/popup-blocked' ||
          error.code === 'auth/cancelled-popup-request'
        ) {
          console.warn("Usando signInWithRedirect como alternativa");
          await signInWithRedirect(auth, provider);
        } else {
          alert("Error al iniciar sesión: " + error.message);
        }
      } finally {
        loginInProgress = false;
      }
    });

    // Comprobar estado de sesión
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const hasCookie = document.cookie.includes("token=");

        if (!hasCookie) {
          console.warn("Sesión Firebase detectada, pero no hay token del backend. Cerrando sesión local...");
          await signOut(auth);
          return;
        }

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
