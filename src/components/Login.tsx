import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.css'; // Asegúrate de tener este archivo para tus estilos personalizados

const LoginForm: React.FC = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form className="login-form bg-light p-4 rounded shadow-sm">
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu correo" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingresa tu contraseña" />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-2">
          Iniciar Sesión
        </Button>
        <Row className="text-center">
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
