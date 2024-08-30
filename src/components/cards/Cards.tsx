import React from 'react';
import './cards.css';

interface CardProps {
  title: string;
  text: string;
}

const Card: React.FC<CardProps> = ({ title, text }) => {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-content">
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

export default Card;
