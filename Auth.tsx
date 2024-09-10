import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { app } from '../proyecto/src/firebase'; // Importa la inicialización de Firebase

// Inicializa la autenticación de Firebase
const auth = getAuth(app);

// Función para registrar un nuevo usuario
export const registerUser = async (email: string, password: string, username: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: username }); // Actualizar el perfil del usuario con el nombre de usuario
  return userCredential;
};

// Función para iniciar sesión
export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Función para cerrar sesión
export const logoutUser = () => {
  return signOut(auth);
};
