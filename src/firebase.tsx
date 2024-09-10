// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  // Importa Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABB9gar3-3ZP-Mw_puKc-5B2dI9MRJ66E",
  authDomain: "quiz-math-444b4.firebaseapp.com",
  projectId: "quiz-math-444b4",
  storageBucket: "quiz-math-444b4.appspot.com",
  messagingSenderId: "749555705824",
  appId: "1:749555705824:web:c52d31756f48b302f16d85",
  measurementId: "G-9TQD0Q5J1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);  // Inicializa Firestore

// Exportamos app, auth y db para poder usarlos en otros archivos
export { app, auth, db };
