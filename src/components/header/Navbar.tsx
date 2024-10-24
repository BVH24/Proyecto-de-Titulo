import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './navbar.css';

function HeaderWithNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const auth = getAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header className={`custom-navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <Navbar expand="lg" expanded={expanded} className="navbar">
        <Container>
          {/* Agrega el logo en el lado izquierdo */}
          <Navbar.Brand as={Link} to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/quiz-math-444b4.appspot.com/o/imagen-fondo%2FCaptura%20de%20pantalla%202024-10-10%20132629.png?alt=media&token=45e8382d-d649-47e7-8f93-4b1068e6a7f0"
              alt="Logo"
              className="navbar-logo"
            />
          </Navbar.Brand>

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
