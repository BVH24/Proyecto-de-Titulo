import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

function HeaderWithNavbar() {
  const [expanded, setExpanded] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="custom-navbar">
      <Navbar expand="lg" expanded={expanded} className="navbar">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto menu">
              <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Inicio</Nav.Link>
              <Nav.Link as={Link} to="/contenido" onClick={() => setExpanded(false)}>Contenido</Nav.Link>
              <Nav.Link as={Link} to="/quiz" onClick={() => setExpanded(false)}>Quiz</Nav.Link>
            </Nav>
            {user ? (
              <Nav>
                <NavDropdown title={`${user.displayName}`} id="user-dropdown">
                  <NavDropdown.Item as={Link} to="/perfil">Perfil</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleSignOut}>Cerrar Sesión</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (

              <Nav>
                <Nav.Link as={Link} to="/login" className="user-icon">
                  <FontAwesomeIcon icon={faUser} />
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default HeaderWithNavbar;
