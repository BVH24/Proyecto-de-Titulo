import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizMath from './Vistas/Home';
import MainContent from './components/cards/Cardscontent';
import LoginForm from './components/Login'; 
import RegisterForm from './components/Registro';
import QuizGenerator from './components/Quiz';
import QuizDisplay from './components/QuizG';
import Perfil from './components/Profile';
import QuizReview from './components/QuizE';
import QuizCompletion from './components/QuizC';
import QuizResult from './components/QuizR';
import './App.css';

function App() {
  return (
    <Router>
      <div className="content">
        <Routes>
          <Route path="/" element={<QuizMath />} />
          <Route path="/contenido" element={<MainContent />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/quiz" element={<QuizGenerator />} />
          <Route path="/display-quiz" element={<QuizDisplay />} />
          <Route path="/quiz-completion" element={<QuizCompletion />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/quiz-review/:quizId" element={<QuizReview />} />
          <Route path="/quiz-results" element={<QuizResult />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
