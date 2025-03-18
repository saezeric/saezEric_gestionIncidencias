import React, { useEffect, useState } from "react";

export function Login() {
  const [mensajeExito, setMensajeExito] = useState("");
  const [credenciales, setCredenciales] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Estado para manejar errores de autenticación

  useEffect(() => {
    // Verificar si hay un registro exitoso guardado
    const usuarioRegistrado = localStorage.getItem("registro_exitoso");

    if (usuarioRegistrado) {
      setMensajeExito(
        `${usuarioRegistrado} se ha registrado correctamente. Ahora puede iniciar sesión.`
      );
      localStorage.removeItem("registro_exitoso"); // Eliminar después de mostrar
    }
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    setError(""); // Limpiar error cuando el usuario escriba
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener los usuarios guardados en localStorage
    const usuariosGuardados =
      JSON.parse(localStorage.getItem("dades_usuaris")) || [];

    // Buscar si las credenciales coinciden con un usuario registrado
    let usuarioEncontrado = null;
    for (let i = 0; i < usuariosGuardados.length; i++) {
      if (
        usuariosGuardados[i].email === credenciales.email &&
        usuariosGuardados[i].contraseña === credenciales.password
      ) {
        usuarioEncontrado = usuariosGuardados[i];
        break;
      }
    }

    // Si no se encuentra el usuario, mostrar error
    if (!usuarioEncontrado) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    // TODO: Aquí se gestionará el inicio de sesión correctamente en futuras historias
    alert("Inicio de sesión exitoso."); // Temporal
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Iniciar Sesión</h1>

        {/* Mensaje de éxito si hay un nuevo registro */}
        {mensajeExito && (
          <div className="alert alert-success text-center mt-4" role="alert">
            {mensajeExito}
          </div>
        )}

        <form
          className="form p-4 border shadow mt-5 mx-auto"
          style={{ width: "400px" }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="mt-2 form-label">
            Email:{" "}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${error ? "is-invalid" : ""}`}
            value={credenciales.email}
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
            className={`form-control ${error ? "is-invalid" : ""}`}
            value={credenciales.password}
            onChange={handleChange}
            required
          />
          {error && <div className="invalid-feedback">{error}</div>}

          <button type="submit" className="mt-4 w-100 btn btn-primary">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </main>
  );
}
