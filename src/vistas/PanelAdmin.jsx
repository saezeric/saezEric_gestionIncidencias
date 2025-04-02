import React, { useEffect, useState } from "react";
import { supabase } from "../bd/supabaseClient";

export function PanelAdmin() {
  const [usuarios, setUsuarios] = useState([]);

  // Obtener usuarios al montar
  useEffect(() => {
    const fetchUsuarios = async () => {
      const { data, error } = await supabase.from("usuarios").select("*");

      if (error) {
        console.error("Error al obtener usuarios:", error.message);
      } else {
        setUsuarios(data);
      }
    };

    fetchUsuarios();
  }, []);

  // Cambiar rol en el estado local
  const handleRoleChange = (id, nuevoRol) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, rol: nuevoRol } : u))
    );
  };

  // Guardar cambios de roles en Supabase
  const handleGuardarCambios = async () => {
    let exitos = 0;
    for (const usuario of usuarios) {
      const { error } = await supabase
        .from("usuarios")
        .update({ rol: usuario.rol })
        .eq("id", usuario.id);

      if (!error) exitos++;
      else
        console.error(
          "Error al actualizar usuario:",
          usuario.email,
          error.message
        );
    }

    if (exitos === usuarios.length) {
      alert("✅ Todos los cambios se han guardado correctamente.");
    } else {
      alert("⚠️ Algunos cambios no se pudieron guardar. Revisa la consola.");
    }
  };

  // Eliminar usuario en Supabase
  const handleEliminarUsuario = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?"
    );
    if (!confirmar) return;

    const { error } = await supabase.from("usuarios").delete().eq("id", id);

    if (error) {
      alert("❌ No se pudo eliminar el usuario.");
      console.error(error);
    } else {
      // Actualizar la tabla en pantalla
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    }
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
