// public/js/firebaseClient.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Config de Firebase (segura para frontend)
const firebaseConfig = {
  apiKey: "AIzaSyBh6tdi3NswyHj4RVNfIEGYIP9CoMe-BsQ",
  authDomain: "sepultururosvercelapp.firebaseapp.com",
  projectId: "sepultururosvercelapp",
  storageBucket: "sepultururosvercelapp.appspot.com",
  messagingSenderId: "4986417399",
  appId: "1:4986417399:web:537bc902d6037dbc9d23f2",
  measurementId: "G-BYSTFYZPBJ"
};

// Inicializa Firebase solo si aún no fue inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Exporta instancia de auth (puedes agregar más si usas Firestore, etc.)
const auth = getAuth(app);

export { auth };
if (typeof window !== 'undefined') {
  window.firebaseAuth = auth;
}