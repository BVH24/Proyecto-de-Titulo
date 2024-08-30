import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';

function HeaderWithNavbar() {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <header className="custom-navbar">
  <Navbar expand="lg" expanded={expanded}>
    <Container>
      <Navbar.Brand>
        <Nav.Link as={Link} to="/login" className="user-icon">
          <FontAwesomeIcon icon={faUser} />
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}>
        <FontAwesomeIcon icon={faBars} />
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto menu">
          <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>Inicio</Nav.Link>
          <Nav.Link as={Link} to="/contenido" onClick={() => setExpanded(false)}>Contenido</Nav.Link>
          <Nav.Link as={Link} to="/quiz" onClick={() => setExpanded(false)}>Quiz</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
</header>
  );
}

export default HeaderWithNavbar;
