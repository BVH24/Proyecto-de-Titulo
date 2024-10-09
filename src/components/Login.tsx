import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import HeaderWithNavbar from './header/Navbar'; // Ajusta la ruta según corresponda
import './login.css'; // Importamos los estilos CSS

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor verifica tus credenciales.');
    }
  };

  return (
    <>
      {/* Incluir el Navbar en la parte superior */}
      <HeaderWithNavbar />

      <Container className="login-container">
        {/* Aplicamos solo la clase login-form */}
        <Form className="login-form" onSubmit={handleLogin}>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          {/* Campo de correo */}
          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </Form.Group>
          
          {/* Campo de contraseña */}
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </Form.Group>
          
          {/* Botón de inicio de sesión */}
          <Button type="submit" className="login-button">
            Iniciar Sesión
          </Button>

          <Row className="text-center mt-3">
            <Col>
              <Link to="/register" className="login-link">
                ¿No tienes una cuenta? Registrarse
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default LoginForm;
