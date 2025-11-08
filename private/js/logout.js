function logout() {
  fetch('/api/clear-token', {
    method: 'POST',
    credentials: 'include'
  }).finally(() => {
    if (!window.firebaseAuth) {
      alert("Firebase no está cargado.");
      return;
    }

    window.firebaseAuth.signOut()
      .then(() => {
        window.location.href = "/";
      })
      .catch(err => {
        console.error('Error cerrando sesión Firebase:', err);
        alert('Error al cerrar sesión: ' + err.message);
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('cerrarSesionButton');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  } else {
    console.warn('Botón de logout no encontrado');
  }
});
