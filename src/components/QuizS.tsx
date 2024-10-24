import { db } from '../firebase';  
import { doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

const saveQuizResults = async (quizData: any) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error('Usuario no autenticado');
  }

 
  const userQuizRef = doc(db, 'users', currentUser.uid, 'quizzes', quizData.quizId);
  await setDoc(userQuizRef, quizData);

  console.log('Resultados guardados exitosamente');
};

export default saveQuizResults;
