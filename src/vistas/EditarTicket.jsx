import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../bd/supabaseClient";

export function EditarTicket() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [ticket, setTicket] = useState({
    aula: "",
    ordenador: "",
    descripcion: "",
  });

  // Obtener el ticket desde Supabase por ID
  useEffect(() => {
    const cargarTicket = async () => {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("id", id)
        .single(); // ← devuelve un solo objeto, no un array

      if (error || !data) {
        alert("❌ Ticket no encontrado");
        navigate("/");
      } else {
        setTicket(data);
      }
    };

    cargarTicket();
  }, [id, navigate]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ticket.aula || !ticket.ordenador || !ticket.descripcion) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const { error } = await supabase
      .from("tickets")
      .update({
        aula: ticket.aula,
        ordenador: ticket.ordenador,
        descripcion: ticket.descripcion,
      })
      .eq("id", id);

    if (error) {
      alert("❌ Error al guardar cambios");
      console.error(error);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="container mt-5">
      <h1>Editar Ticket</h1>
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
          Guardar Cambios
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
