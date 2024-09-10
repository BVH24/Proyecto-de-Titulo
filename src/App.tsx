import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizMath from './Vistas/Home';
import HeaderWithNavbar from './components/header/Navbar';
import MainContent from './components/cards/Cardscontent';
import LoginForm from './components/Login'; 
import RegisterForm from './components/Registro';
import QuizGenerator from './components/Quiz';
import QuizDisplay from './components/QuizG';
import QuizResult from './components/QuizR';
import './App.css';

function App() {
  return (
    <Router>
  <HeaderWithNavbar />
  <div className="content">
    <Routes>
      <Route path="/" element={<QuizMath />} />
      <Route path="/contenido" element={<MainContent />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/quiz" element={<QuizGenerator />} />
      <Route path="/display-quiz" element={<QuizDisplay />} />
      <Route path="/quiz-result" element={<QuizResult />} />
    </Routes>
  </div>
</Router>

  );
}

export default App;
