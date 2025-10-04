// login.js

const firebaseConfig = {
  apiKey: "AIzaSyBh6tdi3NswyHj4RVNfIEGYIP9CoMe-BsQ",
  authDomain: "sepultururosvercelapp.firebaseapp.com",
  projectId: "sepultururosvercelapp",
  storageBucket: "sepultururosvercelapp.appspot.com",
  messagingSenderId: "4986417399",
  appId: "1:4986417399:web:537bc902d6037dbc9d23f2",
  measurementId: "G-BYSTFYZPBJ"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    document.getElementById('googleLoginBtn').addEventListener('click', () => {
      auth.signInWithPopup(provider)
        .then(async (result) => {
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
        })
        .catch((error) => {
          console.error("Error en login con Google:", error);
          alert("Error al iniciar sesión: " + error.message);
        });
    });

    // Verificar si ya hay sesión activa
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // 🔍 Comprobar si la cookie del token existe
        const hasCookie = document.cookie.includes("token=");

        if (!hasCookie) {
          console.warn("Sesión Firebase detectada, pero no hay token del backend. Cerrando sesión local...");
          await auth.signOut();
          return;
        }

        // Redirige solo si estamos en login
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
