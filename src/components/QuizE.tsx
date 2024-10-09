import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase';
import './quize.css';

const QuizReview: React.FC = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchQuizData = async () => {
      if (user && quizId) {
        try {
          const quizDoc = doc(db, `users/${user.uid}/quizzesRealizados`, quizId);
          const docSnap = await getDoc(quizDoc);
          if (docSnap.exists()) {
            setQuizData(docSnap.data());
          }
          setLoading(false);
        } catch (error) {
          console.error('Error obteniendo la corrección del quiz:', error);
          setLoading(false);
        }
      }
    };

    fetchQuizData();
  }, [user, quizId]);

  // Funciones para navegar entre preguntas
  const handleNext = () => {
    if (quizData && currentQuestionIndex < quizData.respuestas.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) {
    return <p>Cargando corrección...</p>;
  }

  if (!quizData) {
    return <p>No se encontró la corrección del quiz.</p>;
  }

  const currentQuestion = quizData.respuestas[currentQuestionIndex];

  return (
    <div className="quiz-review-container">
      <h2>Corrección del Quiz</h2>
      <p>Unidad: {quizData.unidad}</p>
      <p>Puntaje: {quizData.puntaje} / {quizData.totalPreguntas}</p>

      <h3>Pregunta {currentQuestionIndex + 1} de {quizData.respuestas.length}</h3>
      <div className={`question-card ${currentQuestion.isCorrect ? 'correct' : 'incorrect'}`}>
        <p><strong>Pregunta:</strong> {currentQuestion.texto}</p>
        {currentQuestion.ImagenURL && (
          <img src={currentQuestion.ImagenURL} alt="Imagen de la pregunta" className="quiz-image" />
        )}
        <ul>
          {currentQuestion.Alternativas.map((opcion: string, index: number) => (
            <li
              key={index}
              className={
                index === currentQuestion.respuesta_correcta
                  ? 'correct-answer' // Verde para la respuesta correcta
                  : opcion === currentQuestion.selectedAnswer
                  ? 'incorrect-answer' // Rojo para la respuesta seleccionada incorrecta
                  : ''
              }
            >
              {opcion}
            </li>
          ))}
        </ul>
      </div>

      <div className="navigation-buttons">
        {currentQuestionIndex > 0 && (
          <button onClick={handlePrevious}>Anterior</button>
        )}
        {currentQuestionIndex < quizData.respuestas.length - 1 && (
          <button onClick={handleNext}>Siguiente</button>
        )}
      </div>
    </div>
  );
};

export default QuizReview;
