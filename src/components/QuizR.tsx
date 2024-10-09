import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './quizr.css';  // Asegúrate de que el archivo CSS esté en la ruta correcta

const QuizResult: React.FC = () => {
  const location = useLocation();
  const { score, total, answeredQuestions } = location.state || {};  // Obtenemos las respuestas del estado

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = answeredQuestions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < answeredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="result-container">
      <h2>Resultados del Quiz</h2>
      <p>Puntuación: {score} / {total}</p>

      {answeredQuestions && answeredQuestions.length > 0 && currentQuestion && (
        <div className="question-card">
          <h3>Pregunta {currentQuestionIndex + 1}:</h3>
          {currentQuestion.ImagenURL && (
            <img
              src={currentQuestion.ImagenURL}
              alt="Imagen de la pregunta"
              className="quiz-image"
            />
          )}
          <p>{currentQuestion.texto}</p>
          <ul>
            {currentQuestion.Alternativas.map((opcion: string, index: number) => (
              <li
                key={index}
                className={`option ${
                  index === currentQuestion.respuesta_correcta
                    ? 'correct'
                    : currentQuestion.selectedAnswer === opcion
                    ? 'incorrect'
                    : ''
                }`}
              >
                {opcion}
              </li>
            ))}
          </ul>

          {/* Botones de navegación */}
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button onClick={handlePrevious}>Anterior</button>
            )}
            {currentQuestionIndex < answeredQuestions.length - 1 && (
              <button onClick={handleNext}>Siguiente</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizResult;
