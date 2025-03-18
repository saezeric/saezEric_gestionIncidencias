// Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext"; // Importar el contexto

export function Header() {
  const { user } = useContext(UserContext); // Obtener el usuario del contexto

  return (
    <>
      <header>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
            <div>
              <Link to="/" className="btn btn-secondary ms-2">
                PANEL
              </Link>
              <Link to="/login" className="btn btn-secondary ms-2">
                LOGIN
              </Link>
              <Link to="/registro" className="btn btn-secondary ms-2">
                REGISTRO
              </Link>
            </div>
            <div>
              {/* Mostrar el nombre del usuario si está logueado */}
              {user && <span>{user.nombre}</span>}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
