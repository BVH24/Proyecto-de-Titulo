import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { app } from './src/firebase';  // Asegúrate de importar la configuración de Firebase

const auth = getAuth(app);
const db = getFirestore(app);

// Función para registrar un usuario sin iniciar sesión automáticamente
export const registerUser = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Actualizar el perfil del usuario con el nombre de usuario
    await updateProfile(user, {
      displayName: username,
    });

    // Crear una colección de usuarios en Firestore
    await setDoc(doc(db, "usuarios", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: username,
    });

    // Cerrar sesión inmediatamente después del registro
    await auth.signOut();

    // Retornar éxito (o un mensaje que puedas manejar en el componente de registro)
    return { success: true };

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};
