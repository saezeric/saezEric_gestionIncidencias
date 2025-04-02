import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../bd/supabaseClient";

export function Registro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = usuario.email.trim();
    const password = usuario.password.trim();

    const { data: usuarioExistente, error: errorBuscar } = await supabase
      .from("usuarios")
      .select("id")
      .eq("email", email)
      .single();

    if (usuarioExistente) {
      setError("Este email ya está registrado.");
      return;
    }

    // errorBuscar solo existe si ocurrió algún error en la consulta .select(...) a Supabase.
    // Este código de error (PGRST116) significa "No se encontró ningún registro", es decir, el email no existe todavía, lo cual es esperado en el contexto del registro.
    // Si hay un error (errorBuscar) y NO es el típico error de que no se encontró nada (PGRST116), entonces sí que es un error real que hay que mostrar.
    if (errorBuscar && errorBuscar.code !== "PGRST116") {
      console.error("Error al verificar el usuario:", errorBuscar.message);
      setError("Error al verificar el correo.");
      return;
    }

    const nombre = email.split("@")[0];

    const { error: errorInsertar } = await supabase.from("usuarios").insert([
      {
        nombre,
        email,
        contraseña: password,
        rol: "alumno",
      },
    ]);

    if (errorInsertar) {
      console.error("Error al registrar el usuario:", errorInsertar.message);
      setError("No se pudo completar el registro.");
      return;
    }

    // ✅ Restaurar mensaje de éxito
    localStorage.setItem("registro_exitoso", email);

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
            Email:
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

          <label htmlFor="password" className="mt-2 form-label">
            Contraseña:
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
