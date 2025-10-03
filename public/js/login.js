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

// Establecer persistencia local
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    // Manejador del botón de login
    document.getElementById('googleLoginBtn').addEventListener('click', () => {
      auth.signInWithPopup(provider)
        .then(async (result) => {
          const token = await result.user.getIdToken();

          // Enviar token al backend para guardar en cookie
          const response = await fetch("/api/set-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          if (!response.ok) throw new Error("Fallo al guardar token en cookie");

          // Redirigir al área privada
          window.location.href = "/private/dashboard.html";
        })
        .catch((error) => {
          console.error("Error en login con Google:", error);
          alert("Error al iniciar sesión: " + error.message);
        });
    });

    // Si ya está logueado, redirigir
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Ya hay sesión activa
        console.log("Sesión detectada: ", user.email);

        // Evita redirección inmediata si ya estás en página protegida
        if (window.location.pathname === "/login.html") {
          window.location.href = "/private/dashboard.html";
        }
      }
    });
  })
  .catch((err) => {
    console.error("Error al establecer persistencia:", err);
  });
