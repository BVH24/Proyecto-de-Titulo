import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';  // Para redirigir al usuario
import { db } from '../firebase';  // Importamos la configuración de Firestore
import './quiz.css';  // Archivo de estilos para la generación del quiz

const QuizGenerator: React.FC = () => {
  const [units, setUnits] = useState<string[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  const [error, setError] = useState<string>('');
  const [loadingUnits, setLoadingUnits] = useState<boolean>(true);
  const navigate = useNavigate();  // Para redirigir al usuario

  // useEffect para cargar las unidades desde Firestore
  useEffect(() => {
    const fetchUnits = async () => {
      setLoadingUnits(true);  // Iniciamos el estado de carga
      try {
        const querySnapshot = await getDocs(collection(db, 'Unidades'));
        const unitsArray: string[] = [];
        querySnapshot.forEach((doc) => {
          unitsArray.push(doc.id);  // Obtener el ID de cada unidad
        });
        setUnits(unitsArray);  // Establecer las unidades en el estado
        setLoadingUnits(false); // Finalizamos el estado de carga
      } catch (error) {
        console.error('Error obteniendo unidades:', error);
        setError('Error obteniendo unidades. Por favor intenta de nuevo.');
        setLoadingUnits(false);  // Finalizamos el estado de carga incluso si hay error
      }
    };
    fetchUnits();  // Llamada para cargar unidades
  }, []);

  // Función que maneja el clic en el botón de generar el quiz
  const handleGenerateQuiz = () => {
    setError('');  // Limpiamos el mensaje de error
    if (!selectedUnit) {
      setError('Por favor selecciona una unidad.');
      return;
    }

    if (numberOfQuestions <= 0) {
      setError('El número de preguntas debe ser mayor a 0.');
      return;
    }

    if (numberOfQuestions > 20) {
      setError('El número de preguntas no puede ser mayor a 20.');
      return;
    }

    // Redirigir a la página de display quiz con los parámetros seleccionados
    navigate('/display-quiz', { state: { selectedUnit, numberOfQuestions } });
  };

  return (
    <Container>
      <h2>Generar Quiz</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loadingUnits ? (
        <p>Cargando unidades...</p>
      ) : (
        <Form>
          <Form.Group controlId="formUnit">
            <Form.Label>Selecciona la Unidad</Form.Label>
            <Form.Control
              as="select"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              <option value="">Selecciona una unidad</option>
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
              type="number"
              min="1"
              max="20"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(parseInt(e.target.value, 10))}
            />
          </Form.Group>

          <Button variant="primary" className="mt-3" onClick={handleGenerateQuiz}>
            Generar Quiz
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default QuizGenerator;
