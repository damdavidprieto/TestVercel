function logout() {
    fetch('/api/clear-token')
      .then(() => {
        window.location.href = '/';
      });
  }