const firebaseConfig = {
  apiKey: "AIzaSyBh6tdi3NswyHj4RVNfIEGYIP9CoMe-BsQ",
  authDomain: "sepultururosvercelapp.firebaseapp.com",
  projectId: "sepultururosvercelapp",
  storageBucket: "sepultururosvercelapp.appspot.com",
  messagingSenderId: "4986417399",
  appId: "1:4986417399:web:537bc902d6037dbc9d23f2",
  measurementId: "G-BYSTFYZPBJ"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        // No hay usuario, redirige al login
        window.location.href = "/";
        return;
      }

      // Verificar que la cookie 'token' exista
      const hasCookie = document.cookie.includes("token=");

      if (!hasCookie) {
        console.warn("Sesión Firebase activa pero no hay cookie token, cerrando sesión local...");
        await auth.signOut();
        window.location.href = "/";
        return;
      }

      // Usuario autorizado, mostrar email
      document.getElementById("userEmail").textContent = user.email;
    });
  })
  .catch((err) => {
    console.error("Error estableciendo persistencia en home:", err);
  });

function logout() {
  // Hacer logout Firebase y limpiar cookie backend
  fetch('/api/clear-token', {
    method: 'POST',
    credentials: 'include'
  }).finally(() => {
    auth.signOut().then(() => {
      window.location.href = "/";
    });
  });
}
