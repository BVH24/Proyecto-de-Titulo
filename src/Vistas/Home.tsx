// Importar React y Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';

function QuizMath() {
  return (
    <div className="content-container">
      <section className="content">
        <div className="container mt-5">
          <h2>¿Cómo usar la página de Quiz de Matemáticas?</h2>
          <div className="tutorial-step">
            <h3>Paso 1: Navegar a la sección de Quiz</h3>
            <img
              src="../Img/paso 1.png"
              alt="Navegar a la sección de Quiz"
              className="img-fluid"
            />
          </div>
          <div className="tutorial-step">
            <h3>Paso 2: Seleccionar Unidad</h3>
            <img
              src="../Img/paso 2.png"
              alt="Seleccionar un tema"
              className="img-fluid"
            />
          </div>
          <div className="tutorial-step">
            <h3>Paso 3: Responder las preguntas</h3>
            <img
              src="ruta-a-tu-imagen-3.jpg"
              alt="Responder las preguntas"
              className="img-fluid"
            />
          </div>
          <div className="tutorial-step">
            <h3>Paso 4: Enviar el Quiz</h3>
            <img
              src="ruta-a-tu-imagen-4.jpg"
              alt="Enviar el Quiz"
              className="img-fluid"
            />
          </div>
          <div className="tutorial-step">
            <h3>Paso 5: Revisar tus resultados</h3>
            <img
              src="ruta-a-tu-imagen-5.jpg"
              alt="Revisar tus resultados"
              className="img-fluid"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default QuizMath;
