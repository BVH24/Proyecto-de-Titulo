import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './quizc.css';

const QuizCompletion: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || {};  

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
