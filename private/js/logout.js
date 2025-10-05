// public/js/logout.js

import { auth } from '../lib/firebaseClient.js';
import { signOut } from 'firebase/auth';

function logout() {
  // Limpiar cookie backend
  fetch('/api/clear-token', {
    method: 'POST',
    credentials: 'include'
  }).finally(() => {
    // Logout Firebase
    signOut(auth).then(() => {
      window.location.href = "/";
    }).catch((err) => {
      console.error('Error cerrando sesión Firebase:', err);
      alert('Error al cerrar sesión: ' + err.message);
    });
  });
}

// Ejemplo de conexión a botón con id="logoutBtn"
document.getElementById('logoutBtn')?.addEventListener('click', logout);

// También podés exportar la función si la usás en otro lugar
export { logout };
