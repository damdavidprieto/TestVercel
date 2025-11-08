// public/js/firebaseClient.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

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

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  console.log("✅ Firebase app inicializada");
} else {
  app = getApp();
  // console.log("🔁 Firebase ya estaba inicializada");
}

// Exporta instancia de auth (puedes agregar más si usas Firestore, etc.)
const auth = getAuth(app);

// Función de logout
const logout = async () => {
  try {
    await signOut(auth);
    console.log("✅ Logout correcto");
  } catch (error) {
    console.error("❌ Error en logout:", error);
    throw error;
  }
};

// Opcional: escucha del estado de autenticación
const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, user => {
    callback(user);
  });
};


export { auth, logout, onAuthChange };
export default app;