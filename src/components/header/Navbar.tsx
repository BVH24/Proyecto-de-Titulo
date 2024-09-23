import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';  // Tu archivo de estilos

function HeaderWithNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState<any>(null);  // Estado para almacenar el usuario autenticado
  const auth = getAuth();  // Obtener la instancia de Firebase Auth

  // Escuchar cambios en el estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Usuario está autenticado
        setUser(currentUser);
      } else {
        // Usuario no está autenticado
        setUser(null);
      }
    });

    // Limpiar el listener al desmontar el componente
    return () => unsubscribe();
  }, [auth]);

  // Manejar el cierre de sesión
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);  // Limpiar el usuario en el estado
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <header className="custom-navbar">
      <Navbar expand="lg" expanded={expanded}>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}>
            <FontAwesomeIcon icon={faBars} />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto menu">
              <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Inicio</Nav.Link>
              <Nav.Link as={Link} to="/contenido" onClick={() => setExpanded(false)}>Contenido</Nav.Link>
              <Nav.Link as={Link} to="/quiz" onClick={() => setExpanded(false)}>Quiz</Nav.Link>
            </Nav>

            {/* Si el usuario está autenticado, mostrar su nombre y opciones */}
            {user ? (
              <Nav>
                <NavDropdown title={user.displayName || user.email} id="user-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>Cerrar sesión</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              // Si el usuario no está autenticado, mostrar el enlace de inicio de sesión
              <Nav.Link as={Link} to="/login" className="user-icon">
                <FontAwesomeIcon icon={faUser} />
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default HeaderWithNavbar;
