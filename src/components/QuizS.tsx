import { db } from '../firebase';  // Ruta a tu configuración de Firebase
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Asegúrate de importar Firebase Auth

const saveQuizResults = async (quizData: any) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Usuario no autenticado');
  }

  // Guardar los resultados en la subcolección 'quizzes' dentro del usuario
  const userQuizRef = doc(db, 'users', currentUser.uid, 'quizzes', quizData.quizId);
  await setDoc(userQuizRef, quizData);

  console.log('Resultados guardados exitosamente');
};

export default saveQuizResults;
