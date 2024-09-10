import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
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

  const handleAnswer = (isCorrect: boolean, selectedAnswer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
  
    // Actualizamos answeredQuestions inmediatamente después de responder
    const updatedAnsweredQuestions = [
      ...answeredQuestions,
      {
        ...currentQuestion,
        isCorrect,
        selectedAnswer,
      },
    ];
  
    if (isCorrect) {
      // Aumentamos la puntuación
      setScore((prevScore) => prevScore + 1);
    }
  
    const nextIndex = currentQuestionIndex + 1;
  
    // Si hemos llegado al final del quiz
    if (nextIndex >= numberOfQuestions) {
      // Redirigir a la página de resultados con las respuestas actualizadas
      navigate('/quiz-result', {
        state: {
          score: isCorrect ? score + 1 : score, // Aseguramos que el score se pase correctamente
          total: numberOfQuestions,
          answeredQuestions: updatedAnsweredQuestions,
        },
      });
    } else {
      // Pasamos a la siguiente pregunta
      setAnsweredQuestions(updatedAnsweredQuestions); // Actualizamos el estado de las respuestas
      setCurrentQuestionIndex(nextIndex);
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
                onClick={() => handleAnswer(index === currentQuestion.respuesta_correcta, opcion)}
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
