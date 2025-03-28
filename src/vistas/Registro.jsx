import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Registro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Estado para mensaje de error

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
    setError(""); // Limpiar error cuando el usuario escriba
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let usuariosGuardados =
      JSON.parse(localStorage.getItem("dades_usuaris")) || [];

    // Verificar si el email ya existe
    for (let i = 0; i < usuariosGuardados.length; i++) {
      if (usuariosGuardados[i].email === usuario.email) {
        setError("Este email ya está registrado.");
        return;
      }
    }

    // Obtener el último ID utilizado y sumarle 1
    let nuevoId = 1;
    if (usuariosGuardados.length > 0) {
      const ultimoUsuario = usuariosGuardados[usuariosGuardados.length - 1];
      nuevoId = ultimoUsuario.id + 1;
    }

    // Crear nuevo usuario
    const nuevoUsuario = {
      id: nuevoId,
      nombre: usuario.email.split("@")[0],
      email: usuario.email,
      contraseña: usuario.password,
      rol: "alumno",
    };

    // Guardar el nuevo usuario en localStorage
    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("dades_usuaris", JSON.stringify(usuariosGuardados));

    // Guardar mensaje de éxito en localStorage
    localStorage.setItem("registro_exitoso", usuario.email);

    // Redirigir al login
    navigate("/login");
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Registro</h1>
        <form
          onSubmit={handleSubmit}
          className="form p-4 border shadow mt-5 mx-auto"
          style={{ width: "400px" }}
        >
          {/* Email */}
          <label htmlFor="email" className="mt-2 form-label">
            Email:{" "}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${error ? "is-invalid" : ""}`}
            placeholder="usuario@mail.com"
            value={usuario.email}
            onChange={handleChange}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}

          {/* Contraseña */}
          <label htmlFor="password" className="mt-2 form-label">
            Contraseña:{" "}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control"
            value={usuario.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="mt-4 w-100 btn btn-primary">
            Registrarse
          </button>
        </form>
      </div>
    </main>
  );
}
