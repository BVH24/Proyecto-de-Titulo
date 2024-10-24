import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../firebase';
import HeaderWithNavbar from './header/Navbar';
import './quiz.css';

const QuizGenerator: React.FC = () => {
  const [units, setUnits] = useState<string[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(10);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Unidades'));
        const unitsArray: string[] = [];
        querySnapshot.forEach((doc) => {
          unitsArray.push(doc.id);
        });
        setUnits(unitsArray);
      } catch (error) {
        console.error('Error obteniendo unidades:', error);
        setError('Error obteniendo unidades');
      }
    };
    fetchUnits(); 
  }, []);

  const handleGenerateQuiz = () => {
    if (selectedUnit && numberOfQuestions > 0) {
      navigate('/display-quiz', { state: { selectedUnit, numberOfQuestions } });
    } else {
      setError('Por favor selecciona una unidad y un número válido de preguntas.');
    }
  };

  if (!user) {
    return <p>Por favor, inicia sesión para acceder a la sección de quizzes.</p>;
  }

  return (
    <>
      <HeaderWithNavbar />
      
      <Container className="quiz-generator-container">
        <h2 className="quiz-generator-title">Generar Quiz</h2>
        {error && <p className="quiz-generator-error">{error}</p>}
        <Form className="quiz-generator-form">
          <Form.Group controlId="formUnit">
            <Form.Label>Selecciona la Unidad</Form.Label>
            <Form.Control
              as="select"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              <option value="">Seleccione una unidad</option>
              {units.length > 0 ? (
                units.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))
              ) : (
                <option>No hay unidades disponibles</option>
              )}
            </Form.Control>
          </Form.Group>
  
          <Form.Group controlId="formNumberOfQuestions" className="mt-3">
            <Form.Label>Número de Preguntas</Form.Label>
            <Form.Control
              as="select"
              className="number-of-questions"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(parseInt(e.target.value, 10))}
            >
              <option value={10}>10 Preguntas</option>
              <option value={20}>20 Preguntas</option>
              <option value={25}>25 Preguntas</option>
            </Form.Control>
          </Form.Group>
  
          <Button
            variant="primary"
            className="quiz-generator-button mt-3"
            onClick={handleGenerateQuiz}
          >
            Generar Quiz
          </Button>
        </Form>
      </Container>
    </>
  );
  
};

export default QuizGenerator;
