import { logout } from "./firebaseClient";

const handleLogout = async () => {
  try {
    await logout();
    // luego redirige, limpia estado, etc.
  } catch (err) {
    console.error("Logout falló:", err);
    // muestra mensaje al usuario
  }
};
