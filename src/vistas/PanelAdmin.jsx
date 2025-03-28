import React, { useEffect, useState } from "react";

export function PanelAdmin() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("dades_usuaris")) || [];
    setUsuarios(datos);
  }, []);

  const handleRoleChange = (id, nuevoRol) => {
    setUsuarios((prevUsuarios) =>
      prevUsuarios.map((usuario) =>
        usuario.id === id ? { ...usuario, rol: nuevoRol } : usuario
      )
    );
  };

  const handleGuardarCambios = () => {
    localStorage.setItem("dades_usuaris", JSON.stringify(usuarios));
    alert("Cambios guardados correctamente.");
  };

  const handleEliminarUsuario = (id) => {
    const confirmacion = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?"
    );
    if (!confirmacion) return;

    const usuariosActualizados = usuarios.filter(
      (usuario) => usuario.id !== id
    );
    setUsuarios(usuariosActualizados);
    localStorage.setItem("dades_usuaris", JSON.stringify(usuariosActualizados));
  };

  return (
    <main className="container mt-5">
      <h1 className="mb-4 text-center">Panel de Administración de Usuarios</h1>

      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-primary" onClick={handleGuardarCambios}>
          Guardar Cambios
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.email}</td>
              <td>{usuario.nombre}</td>
              <td>
                <select
                  className="form-select"
                  value={usuario.rol}
                  onChange={(e) => handleRoleChange(usuario.id, e.target.value)}
                >
                  <option value="alumno">alumno</option>
                  <option value="profesor">profesor</option>
                  <option value="admin">admin</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  title="Eliminar usuario"
                  onClick={() => handleEliminarUsuario(usuario.id)}
                >
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
