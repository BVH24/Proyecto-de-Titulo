import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderWithNavbar from '../components/header/Navbar';
import './home.css';

function QuizMath() {
  return (
    <>
      <HeaderWithNavbar />

      <div className="quiz-math-content-container">
        <div className="quiz-math-box-large">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/quiz-math-444b4.appspot.com/o/imagen-fondo%2FCaptura%20de%20pantalla%202024-10-10%20132629.png?alt=media&token=45e8382d-d649-47e7-8f93-4b1068e6a7f0" 
            alt="Descripción de la imagen" 
            className="quiz-math-large-image"
          />
        </div>

        <div className="quiz-math-container-lower">
          <div className="quiz-math-box-small">
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/quiz-math-444b4.appspot.com/o/imagen-fondo%2Fimagen_2024-10-23_201715714.png?alt=media&token=3034b9d2-acea-4f9e-adf1-0c12e44f9f44" 
            alt="Descripción de la imagen" 
            className="quiz-math-box-image"
          />
            <div className="quiz-math-info">
            <p>Math Force es un sitio web para reforzar los contenidos de matematicas para los cursos de 8° basico en este año 2024 </p>
            <ul>
            <li>En esta pagina podras realizar varios tipos de quiz para ello tienes que seguir estas instrucciones para realizar un guardado de tu progreso</li>
            <li>1.- Debes registrarte en la pagina desde el inicio de sesion que se encuentra en el icono en el lado derecho de la barra de navegacion.</li>
            <li>2.- Una vez registrado, inicia sesion con tus credenciales</li>
            <li>3.- Realiza un quiz, presionando el boton "Quiz" en la barra de navegacion una vez la sesion iniciada.</li>
            <li>4.- Mientras se realiza el quiz no se pueden retroceder las preguntas asi que ¡Piensa bien tu respuesta!</li>
            <li>5.- Al finalizar el quiz se mostrara la cantidad de preguntas que tuviste correctas</li>
            <li>6.- Puedes revisar tu correccion al presionar el boton "Ver correcion"</li>
            <li>7.- Si quieres revisar quizzes anteriores que hayas realizado, se encontraran en tu Perfil</li>
            <li>8.- ¡Diviertete y aprende con Math Force!</li>      
            </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizMath;
