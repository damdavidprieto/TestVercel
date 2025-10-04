// logout.js

// Asegúrate de tener Firebase importado y configurado igual que en login.js
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

function logout() {
  // Primero limpias la cookie backend
  fetch('/api/clear-token', {
    method: 'POST',
    credentials: 'include'
  }).finally(() => {
    // Luego haces logout Firebase
    auth.signOut().then(() => {
      window.location.href = "/";
    });
  });
}

// Exportar o conectar con botón según cómo uses este script
