import React from 'react';
import Card from './Cards';
import './cardcontent.css';

const MainContent: React.FC = () => {
  const cardsData = [
    {
      title: 'Números Enteros',
      text: 'En esta unidad, los estudiantes desarrollarán una comprensión profunda de la multiplicación y división de números enteros, utilizando representaciones concretas, pictóricas y simbólicas, aplicando procedimientos de números naturales, la regla de los signos y resolviendo problemas tanto rutinarios como no rutinarios, todo con un enfoque práctico y cotidiano.',
    },
    {
      title: 'Números Racionales',
      text: 'Esta unidad se centra en la utilización de la multiplicación y división de números racionales, incluyendo fracciones y decimales, en la resolución de problemas, representándolos en la recta numérica, relacionando operaciones con diferentes conjuntos numéricos y utilizando diversas notaciones simbólicas.',
    },
    {
      title: 'Potencias',
      text: 'Los estudiantes aprenderán a explicar y aplicar la multiplicación y división de potencias de base y exponente natural hasta 3, relacionando estas operaciones con situaciones reales y resolviendo ejercicios rutinarios mediante representaciones concretas, pictóricas y simbólicas.',
    },
    {
      title: 'Raíces',
      text: 'En esta unidad, se abordará la comprensión y aplicación de las raíces cuadradas de números naturales, incluyendo su estimación intuitiva, representación de diversas maneras y aplicación en situaciones geométricas y de la vida diaria, como cálculos de áreas y perímetros.',
    },
    {
      title: 'Ecuaciones Lineales',
      text: 'Los estudiantes aprenderán a modelar y resolver situaciones cotidianas y de otras asignaturas usando ecuaciones e inecuaciones lineales, aplicando métodos algebraicos y gráficos para resolver problemas rutinarios y modelar contextos específicos.',
    },
    {
      title: 'Función Afín',
      text: 'Esta unidad aborda la comprensión y uso de la función afín, enseñando a los estudiantes a generalizarla, trasladarla en el plano cartesiano, determinar cambios constantes y relacionarla con conceptos prácticos como el interés simple, mediante gráficos, tablas y problemas cotidianos.',
    },
    {
      title: 'Teorema de Pitágoras',
      text: 'Se enseñará a aplicar el teorema de Pitágoras en la resolución de problemas geométricos y cotidianos, permitiendo a los estudiantes calcular longitudes desconocidas en triángulos rectángulos y despejar algebraicamente la fórmula del teorema en distintas variables.',
    },
    {
      title: 'Transformaciones Geométricas 2D',
      text: 'En esta unidad, los estudiantes describirán y aplicarán transformaciones geométricas de figuras 2D, como traslaciones, rotaciones y reflexiones, utilizando vectores y el plano cartesiano, reconociendo transformaciones isométricas y componiendo traslaciones mediante vectores.',
    },
    {
      title: 'Medidas de Posición',
      text: 'Esta unidad se enfoca en el cálculo y aplicación de medidas de posición como percentiles y cuartiles, enseñando a los estudiantes a representar estas medidas mediante diagramas de cajón, comparar poblaciones y utilizar medidas de tendencia para interpretar datos.',
    },
    {
      title: 'Presentación de Datos',
      text: 'Los estudiantes aprenderán a evaluar la presentación de datos, comparando información en distintos tipos de gráficos, justificando la elección del gráfico más adecuado para representar datos específicos y detectando posibles manipulaciones en la representación de datos.',
    }
  ];

  return (
    <main className="start-screen">
      <h1 className="heading">Contenido de Matemáticas</h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {cardsData.map((card, index) => (
          <Card key={index} title={card.title} text={card.text} />
        ))}
      </div>
    </main>
  );
};

export default MainContent;
