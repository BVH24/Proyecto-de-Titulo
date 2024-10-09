import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderWithNavbar from '../components/header/Navbar';
import './home.css';

function QuizMath() {
  return (
    <>
      {/* Incluir el Navbar en la parte superior */}
      <HeaderWithNavbar />

      <div className="content-container">
        {/* Contenedor overlay */}
        <div className="overlay">
          {/* Logo */}
          <img
            src="URL_DE_TU_LOGO" 
            alt="Logo de la Página"
            className="logo"
          />
          
          <h1>Mate Force</h1>

          {/* Descripción */}
          <p className="lead">
            {/* Descripción del objetivo */}
            [Descripción del objetivo de la página]
          </p>
          <div>
            [Método de aprendizaje y cómo usar la página]
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizMath;