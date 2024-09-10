import React from 'react';
import { useLocation } from 'react-router-dom';
import './quizr.css';  // Asegúrate de que el archivo CSS esté en la ruta correcta

const QuizResult: React.FC = () => {
  const location = useLocation();
  const { score, total, answeredQuestions } = location.state || {};  // Obtenemos las respuestas del estado

  return (
    <div className="result-container">
      <h2>Resultados del Quiz</h2>
      <p>Puntuación: {score} / {total}</p>

      <h3>Corrección de las Preguntas:</h3>
      <ul>
        {answeredQuestions && answeredQuestions.length > 0 ? (
          answeredQuestions.map((question: any, index: number) => (
            <li key={index} className={question.isCorrect ? 'correct' : 'incorrect'}>
              <p><strong>Pregunta {index + 1}:</strong> {question.texto}</p>

              <p><strong>Tu respuesta:</strong> {question.selectedAnswer}</p>
              <p><strong>Respuesta correcta:</strong> {question.Alternativas[question.respuesta_correcta]}</p>

              {question.ImagenURL && (
                <img src={question.ImagenURL} alt="Imagen de la pregunta" className="quiz-image" />
              )}
            </li>
          ))
        ) : (
          <p>No se encontraron respuestas.</p>
        )}
      </ul>
    </div>
  );
};

export default QuizResult;
