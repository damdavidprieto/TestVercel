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

//auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
//  .then(() => {
//    auth.onAuthStateChanged((user) => {
//      if (!user) {
//        // Si no hay usuario, redirige al login
//        window.location.href = "/";
//        return;
//      }
//
//      // Solo mostrar el correo del usuario
//      document.getElementById("userEmail").textContent = user.email;
//    });
//  })
//  .catch((err) => {
//    console.error("Error estableciendo persistencia en home:", err);
//  });
