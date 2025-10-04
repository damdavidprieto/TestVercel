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
