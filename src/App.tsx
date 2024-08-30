import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QuizMath from './Vistas/Home';
import HeaderWithNavbar from './components/header/Navbar';
import MainContent from './components/cards/Cardscontent';
import LoginForm from './components/Logins/Login'; 
import RegisterForm from './components/Registro/Registro';
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
    </Routes>
  </div>
</Router>

  );
}

export default App;
