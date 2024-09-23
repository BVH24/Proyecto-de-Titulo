import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Importamos la autenticación de Firebase
import { db } from '../firebase';  // Configuración de Firestore
import './quizg.css';

const QuizDisplay: React.FC = () => {
  const location = useLocation();
  const { selectedUnit, numberOfQuestions } = location.state || {};  // Aseguramos que 'state' esté disponible
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const auth = getAuth();  // Obtener la instancia de autenticación
  
  const user = auth.currentUser;  // Obtener el usuario autenticado

  // Si los datos de 'state' no están disponibles, muestra un mensaje de error y redirige
  useEffect(() => {
    if (!selectedUnit || !numberOfQuestions) {
      setError('No se han seleccionado unidades o número de preguntas.');
      setLoading(false);
    }
  }, [selectedUnit, numberOfQuestions]);

  // useEffect para cargar las preguntas desde Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedUnit) return;  // Si no hay unidad seleccionada, no hace nada
      try {
        const q = query(collection(db, 'Unidades', selectedUnit, 'Preguntas'));
        const querySnapshot = await getDocs(q);
        const questionsArray: any[] = [];
        querySnapshot.forEach((doc) => {
          questionsArray.push(doc.data());
        });
        // Baraja las preguntas y selecciona las primeras según el número de preguntas
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

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    setAnsweredQuestions([...answeredQuestions, questions[currentQuestionIndex]]);

    // Verificar si se ha llegado al número de preguntas
    if (nextIndex >= numberOfQuestions) {
      // Guardar el historial del quiz al finalizar
      saveQuizHistory(score + (isCorrect ? 1 : 0));  // Sumamos el puntaje correcto antes de guardar
    } else {
      // Cambiar a la siguiente pregunta
      setCurrentQuestionIndex(nextIndex);
    }
  };

  // Función para guardar el historial del quiz en Firestore
  const saveQuizHistory = async (finalScore: number) => {
    if (user) {
      try {
        const userQuizCollection = collection(db, `users/${user.uid}/quizzesRealizados`);
        await addDoc(userQuizCollection, {
          unidad: selectedUnit,
          puntaje: finalScore,
          totalPreguntas: numberOfQuestions,
          fecha: new Date(),
          respuestas: answeredQuestions
        });
        navigate('/quiz-result', { state: { score: finalScore, total: numberOfQuestions } });
      } catch (error) {
        console.error('Error guardando el historial del quiz:', error);
        setError('Hubo un error al guardar el historial del quiz.');
      }
    } else {
      console.error('Usuario no autenticado');
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
    <div className="quiz-container">
      <h2>Quiz de {selectedUnit}</h2>
      {currentQuestion ? (
        <div className="question-card">
          <p>Pregunta {currentQuestionIndex + 1}:</p>
          {currentQuestion.ImagenURL && (
            <img src={currentQuestion.ImagenURL} alt="Imagen de la pregunta" className="quiz-image" />
          )}
          <p>{currentQuestion.texto}</p>  {/* Mostramos el texto de la pregunta */}
          <ul>
            {currentQuestion.Alternativas.map((opcion: string, index: number) => (
              <li
                key={index}
                onClick={() => handleAnswer(index === currentQuestion.respuesta_correcta)}
              >
                {opcion}  {/* Mostramos las opciones de la pregunta */}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No se encontraron preguntas para esta unidad.</p>
      )}
    </div>
  );
};

export default QuizDisplay;
