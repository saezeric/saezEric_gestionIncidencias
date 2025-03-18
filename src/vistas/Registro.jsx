import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Registro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let usuariosGuardados =
      JSON.parse(localStorage.getItem("dades_usuaris")) || [];

    // Verificar si el email ya existe
    for (let i = 0; i < usuariosGuardados.length; i++) {
      if (usuariosGuardados[i].email === usuario.email) {
        alert("Este email ya está registrado.");
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
      rol: "estandar",
    };

    // Guardar el nuevo usuario
    usuariosGuardados.push(nuevoUsuario);
    localStorage.setItem("dades_usuaris", JSON.stringify(usuariosGuardados));

    alert("Registro exitoso, ahora puedes iniciar sesión.");
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
          <label htmlFor="email" className="mt-2 form-label">
            Email:{" "}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="usuario@mail.com"
            value={usuario.email}
            onChange={handleChange}
            required
          />

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
