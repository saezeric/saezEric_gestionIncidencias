import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../bd/supabaseClient";

export function NuevoTicket() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [ticket, setTicket] = useState({
    aula: "",
    ordenador: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticket.aula || !ticket.ordenador || !ticket.descripcion) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const nuevoTicket = {
      fecha_creacion: new Date().toISOString(), // Formato válido para timestamp
      aula: ticket.aula,
      ordenador: ticket.ordenador,
      descripcion: ticket.descripcion,
      estado: "pendiente",
      usuario_creador: currentUser?.email || "ejemplo@example.com",
      comentarios: [], // JSON vacío por defecto
    };

    const { error } = await supabase.from("tickets").insert(nuevoTicket);

    if (error) {
      console.error("❌ Error al crear ticket:", error.message);
      alert("No se pudo crear el ticket.");
    } else {
      navigate("/");
    }
  };

  return (
    <main className="container mt-5">
      <h1>Nuevo Ticket</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Aula</label>
          <input
            type="text"
            name="aula"
            className="form-control"
            value={ticket.aula}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ordenador</label>
          <input
            type="text"
            name="ordenador"
            className="form-control"
            value={ticket.ordenador}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="3"
            value={ticket.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Ticket
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/")}
        >
          Cancelar
        </button>
      </form>
    </main>
  );
}
