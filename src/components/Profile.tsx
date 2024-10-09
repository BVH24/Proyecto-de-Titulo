import React, { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import HeaderWithNavbar from './header/Navbar'; // Asegúrate de importar correctamente el Navbar
import './profile.css'; // Importamos el archivo CSS

const Perfil: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [newDisplayName, setNewDisplayName] = useState<string>(user?.displayName || '');
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para actualizar el nombre de usuario
  const handleUpdateProfile = async () => {
    if (user && newDisplayName) {
      try {
        await updateProfile(user, { displayName: newDisplayName });
        navigate('/perfil');
      } catch (error) {
        console.error('Error actualizando perfil:', error);
      }
    }
  };

  // Obtener el historial de quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (user) {
        try {
          const userQuizCollection = collection(db, `users/${user.uid}/quizzesRealizados`);
          const quizSnapshot = await getDocs(userQuizCollection);
          const quizzesArray = quizSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setQuizzes(quizzesArray);
          setLoading(false);
        } catch (error) {
          console.error('Error obteniendo el historial de quizzes:', error);
          setLoading(false);
        }
      }
    };

    fetchQuizzes();
  }, [user]);

  const handleViewQuiz = (quizId: string) => {
    navigate(`/quiz-review/${quizId}`);
  };

  return (
    <>
      {/* Incluir el Navbar en la parte superior */}
      <HeaderWithNavbar />

      {/* Contenedor general con dos secciones */}
      <div className="profile-page-container">
        {/* Contenedor para cambiar el nombre de usuario */}
        <div className="profile-card">
          <h2>Perfil de {user?.displayName || 'Usuario'}</h2>

          <div className="edit-profile-section">
            <h3>Actualizar nombre de usuario</h3>
            <input
              type="text"
              placeholder="Nuevo nombre de usuario"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
              className="form-control"
            />
            <button onClick={handleUpdateProfile} className="btn-update">
              Actualizar Nombre
            </button>
          </div>
        </div>

        {/* Contenedor del historial de quizzes con scroll */}
        <div className="quiz-history-card">
          <h3>Historial de Quizzes</h3>
          {loading ? (
            <p>Cargando historial...</p>
          ) : quizzes.length === 0 ? (
            <p>No has realizado ningún quiz.</p>
          ) : (
            <div className="quiz-history-scroll">
              <ul className="quiz-list">
                {quizzes.map((quiz) => (
                  <li key={quiz.id} className="quiz-item">
                    <p><strong>Unidad:</strong> {quiz.unidad}</p>
                    <p><strong>Puntaje:</strong> {quiz.puntaje} / {quiz.totalPreguntas}</p>
                    {quiz.fecha?.seconds ? (
                      <p><strong>Fecha:</strong> {new Date(quiz.fecha.seconds * 1000).toLocaleString()}</p>
                    ) : (
                      <p><strong>Fecha:</strong> No disponible</p>
                    )}
                    <button onClick={() => handleViewQuiz(quiz.id)} className="btn-view-quiz">
                      Ver corrección
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Perfil;
