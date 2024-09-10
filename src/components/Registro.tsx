import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../Auth'; // Importa la función desde Auth.tsx
import './registro.css'; 

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');  // Estado para el nombre de usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser(email, password, username);  // Pasar el nombre de usuario a la función de registro
      navigate('/login');
    } catch (error) {
      setError('Hubo un error al registrarse. Inténtalo de nuevo.');
      console.error(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Form className="register-form bg-light p-4 rounded shadow-sm" onSubmit={handleRegister}>
        <h2 className="text-center mb-4">Registrarse</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form.Group className="mb-3">
          <Form.Label>Nombre de Usuario</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Ingresa tu nombre de usuario" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Ingresa tu correo" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Ingresa tu contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Registrarse
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
