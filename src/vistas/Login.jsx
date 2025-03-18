import React, { useEffect, useState } from "react";

export function Login() {
  const [mensajeExito, setMensajeExito] = useState("");

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
        >
          <label htmlFor="email" className="mt-2 form-label">
            Email:{" "}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control"
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
            required
          />

          <button type="submit" className="mt-4 w-100 btn btn-primary">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </main>
  );
}
