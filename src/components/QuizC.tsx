import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizCompletion: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || {};  // Obtenemos el puntaje y total de preguntas desde el estado

  return (
    <div className="quiz-completion-container">
      <h2>¡Quiz Terminado!</h2>
      <p>Has completado el quiz.</p>
      <p>Puntaje obtenido: {score} / {total}</p>
      <button onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
};

export default QuizCompletion;
