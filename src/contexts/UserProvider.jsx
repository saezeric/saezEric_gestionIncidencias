// UserProvider.jsx
import React, { useState, useEffect } from "react";
import UserContext from "./UserContext"; // Importar el contexto

// Proveedor del contexto
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Verificar si hay un usuario en localStorage al cargar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      console.log(storedUser);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  // Proveer el contexto con el usuario y las funciones de login/logout
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
