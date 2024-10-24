import React from 'react';
import './cards.css';

interface CardProps {
  title: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ title, text }) => {
  return (
    <div className="card-item">
      <div className="card-item-title">{title}</div>
      <div className="card-item-content">
        <p className="card-item-text">{text}</p>
      </div>
    </div>
  );
};

export default Card;
