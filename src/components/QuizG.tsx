import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  
import { db } from '../firebase';  
import HeaderWithNavbar from './header/Navbar';
import './quizg.css';

const QuizDisplay: React.FC = () => {
  const location = useLocation();
  const { selectedUnit, numberOfQuestions } = location.state || {};  
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [quizFinished, setQuizFinished] = useState(false);  
  const [quizId, setQuizId] = useState<string>('');  // Estado para guardar el quizId generado
  const navigate = useNavigate();
  const auth = getAuth();  
  
  const user = auth.currentUser;  

  useEffect(() => {
    if (!selectedUnit || !numberOfQuestions) {
      setError('No se han seleccionado unidades o número de preguntas.');
      setLoading(false);
    }
  }, [selectedUnit, numberOfQuestions]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedUnit) return;  
      try {
        const q = query(collection(db, 'Unidades', selectedUnit, 'Preguntas'));
        const querySnapshot = await getDocs(q);
        const questionsArray: any[] = [];
        querySnapshot.forEach((doc) => {
          questionsArray.push(doc.data());
        });
        const shuffledQuestions = questionsArray.sort(() => 0.5 - Math.random());
        setQuestions(shuffledQuestions.slice(0, numberOfQuestions));
        setLoading(false);
      } catch (error) {
        console.error('Error obteniendo preguntas:', error);
        setError('Error obteniendo preguntas.');
        setLoading(false);
      }
    };

    if (selectedUnit) {
      fetchQuestions();
    }
  }, [selectedUnit, numberOfQuestions]);

  const handleAnswer = (isCorrect: boolean, selectedAnswer: string) => {
    const updatedAnswers = [
      ...answeredQuestions,
      {
        ...questions[currentQuestionIndex],
        isCorrect,
        selectedAnswer,  
      },
    ];

    setAnsweredQuestions(updatedAnswers);  

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= numberOfQuestions) {
      setQuizFinished(true);  
      saveQuizHistory(score + (isCorrect ? 1 : 0), updatedAnswers);  
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const saveQuizHistory = async (finalScore: number, updatedAnswers: any[]) => {
    if (user) {
      try {
        const userQuizCollection = collection(db, `users/${user.uid}/quizzesRealizados`);
        const quizDocRef = await addDoc(userQuizCollection, {
          unidad: selectedUnit,
          puntaje: finalScore,
          totalPreguntas: numberOfQuestions,
          fecha: new Date(),
          respuestas: updatedAnswers,  
        });
        setQuizId(quizDocRef.id);  // Guardamos el ID del quiz recién creado
      } catch (error) {
        console.error('Error guardando el historial del quiz:', error);
        setError('Hubo un error al guardar el historial del quiz.');
      }
    } else {
      console.error('Usuario no autenticado');
    }
  };

  const handleReviewQuiz = () => {
    if (quizId) {
      navigate(`/quiz-review/${quizId}`);  // Navegar a la corrección usando el quizId
    }
  };

  if (loading) {
    return <p>Cargando preguntas...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <HeaderWithNavbar />
  
      <div className="quizg-container">
        {quizFinished ? (
          <div className="quiz-completion">
            <h2>¡Quiz Terminado!</h2>
            <p>Tu puntaje final es: {score} / {numberOfQuestions}</p>
            <button onClick={handleReviewQuiz} className="review-button">
              Ver Corrección
            </button>
          </div>
        ) : (
          currentQuestion ? (
            <div className="quizg-question-card">
              <p>Pregunta {currentQuestionIndex + 1}:</p>
              {currentQuestion.ImagenURL && (
                <img src={currentQuestion.ImagenURL} alt="Imagen de la pregunta" className="quizg-image" />
              )}
              <p>{currentQuestion.texto}</p>
              <ul className="quizg-options-list">
                {currentQuestion.Alternativas.map((opcion: string, index: number) => (
                  <li
                    key={index}
                    className="quizg-option"
                    onClick={() => handleAnswer(index === currentQuestion.respuesta_correcta, opcion)}
                  >
                    {opcion}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No se encontraron preguntas para esta unidad.</p>
          )
        )}
      </div>
    </>
  );  
};

export default QuizDisplay;
