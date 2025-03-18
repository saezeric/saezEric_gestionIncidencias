// Header.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import UserContext from "../contexts/UserContext"; // Importar el contexto

export function Header() {
  const { user, logout } = useContext(UserContext); // Obtener el usuario y la función de logout
  const navigate = useNavigate(); // Hook para redirigir

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Cerrar sesión
    navigate("/login"); // Redirigir a la pantalla de inicio de sesión
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-light bg-light position-relative">
          <div className="container-fluid d-flex justify-content-between align-items-center">
            {/* Título a la izquierda */}
            <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>

            {/* Contenedor para los botones de navegación (centrados) */}
            <div
              className="position-absolute start-50 translate-middle-x d-flex gap-2"
              style={{ transform: "translateX(-50%)" }} // Centrado horizontal
            >
              {/* Mostrar el botón PANEL siempre */}
              <Link to="/" className="btn btn-secondary">
                PANEL
              </Link>

              {/* Mostrar LOGIN y REGISTRO solo si no hay usuario logueado */}
              {!user && (
                <>
                  <Link to="/login" className="btn btn-secondary">
                    LOGIN
                  </Link>
                  <Link to="/registro" className="btn btn-secondary">
                    REGISTRO
                  </Link>
                </>
              )}
            </div>

            {/* Contenedor para el nombre del usuario y el botón de cerrar sesión (derecha) */}
            <div className="d-flex align-items-center gap-2">
              {user && (
                <>
                  <span>{user.nombre}</span>
                  <button onClick={handleLogout} className="btn btn-danger">
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
