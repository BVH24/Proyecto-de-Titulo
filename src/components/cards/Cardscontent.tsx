import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Card from './Cards';
import HeaderWithNavbar from '../header/Navbar'; // Asegúrate de ajustar la ruta si es necesario
import './cardcontent.css';

const MainContent: React.FC = () => {
  const cardsData = [
    { title: 'Números Enteros', text: 'En esta unidad, los estudiantes desarrollarán una comprensión profunda de la multiplicación y división...' },
    { title: 'Números Racionales', text: 'Esta unidad se centra en la utilización de la multiplicación y división de números racionales...' },
    { title: 'Potencias', text: 'Los estudiantes aprenderán a explicar y aplicar la multiplicación y división de potencias...' },
    { title: 'Raíces', text: 'En esta unidad, se abordará la comprensión y aplicación de las raíces cuadradas de números naturales...' },
    { title: 'Ecuaciones Lineales', text: 'Los estudiantes aprenderán a modelar y resolver situaciones cotidianas usando ecuaciones...' },
    { title: 'Función Afín', text: 'Esta unidad aborda la comprensión y uso de la función afín, enseñando a los estudiantes a generalizarla...' },
    { title: 'Teorema de Pitágoras', text: 'Se enseñará a aplicar el teorema de Pitágoras en la resolución de problemas geométricos y cotidianos...' },
    { title: 'Transformaciones Geométricas 2D', text: 'En esta unidad, los estudiantes describirán y aplicarán transformaciones geométricas de figuras 2D...' },
    { title: 'Medidas de Posición', text: 'Esta unidad se enfoca en el cálculo y aplicación de medidas de posición como percentiles y cuartiles...' },
  ];

  const [selectedCard, setSelectedCard] = useState<{ title: string, text: string } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (card: { title: string, text: string }) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Navbar */}
      <HeaderWithNavbar />

      <main className="main-content-container">
        <h1 className="heading">Contenido de Matemáticas</h1>
        {/* Contenedor específico para las tarjetas */}
        <div className="cards-grid">
          {cardsData.map((card, index) => (
            <div key={index} onClick={() => handleCardClick(card)} className="card-item">
              <h2 className="card-item-title">{card.title}</h2> {/* Mostrar solo el título */}
            </div>
          ))}
        </div>
      </main>

      {/* Modal para mostrar detalles de la tarjeta seleccionada */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCard?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedCard?.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MainContent;
