// Login.jsx
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { supabase } from "../bd/supabaseClient";

export function Login() {
  const navigate = useNavigate();
  const [mensajeExito, setMensajeExito] = useState("");
  const [credenciales, setCredenciales] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const { login } = useContext(UserContext);

  useEffect(() => {
    const usuarioRegistrado = localStorage.getItem("registro_exitoso");

    if (usuarioRegistrado) {
      setMensajeExito(
        `${usuarioRegistrado} se ha registrado correctamente. Ahora puede iniciar sesión.`
      );
      localStorage.removeItem("registro_exitoso");
    }
  }, []);

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: usuarios, error: errorBuscar } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", credenciales.email)
      .single();

    if (errorBuscar) {
      setError("Email o contraseña incorrectos.");
      console.error("❌ Error buscando usuario:", errorBuscar.message);
      return;
    }

    // Verificar contraseña
    if (usuarios.contraseña !== credenciales.password) {
      setError("Email o contraseña incorrectos.");
      return;
    }

    // Iniciar sesión
    login(usuarios); // Guardamos el usuario en el contexto
    localStorage.setItem("currentUser", JSON.stringify(usuarios)); // También lo guardamos en localStorage
    navigate("/");
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Iniciar Sesión</h1>

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
            Email:
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
            Contraseña:
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
