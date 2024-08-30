import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './registro.css'; // Asegúrate de tener este archivo para tus estilos personalizados

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí podrías manejar el registro del usuario
    // Después de registrar, redirige a la página de inicio de sesión
    navigate('/login');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form className="register-form bg-light p-4 rounded shadow-sm" onSubmit={handleRegister}>
        <h2 className="text-center mb-4">Registrarse</h2>
        <Form.Group className="mb-3">
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu nombre completo" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control type="email" placeholder="Ingresa tu correo" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" placeholder="Ingresa tu contraseña" />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Registrarse
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
