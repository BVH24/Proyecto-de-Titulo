import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = getAuth(); // Obtener la instancia de Firebase Auth

  // Manejar el evento de inicio de sesión
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    setError(null); // Limpiar cualquier error previo

    try {
      // Intentar iniciar sesión con Firebase
      await signInWithEmailAndPassword(auth, email, password);
      // Si el inicio de sesión es exitoso, redirigir al usuario a la vista de inicio
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor verifica tus credenciales.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form className="login-form bg-light p-4 rounded shadow-sm" onSubmit={handleLogin}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Iniciar Sesión
        </Button>

        {/* Botón para redirigir a la página de registro */}
        <Row className="text-center mt-3">
          <Col>
            <p>¿No tienes una cuenta?</p>
            <Link to="/register">
              <Button variant="outline-primary" className="w-100">
                Registrarse
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default LoginForm;
