import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../bd/supabaseClient";

export function VistaTicket() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const cargarTicket = async () => {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        alert("Ticket no encontrado");
        navigate("/");
      } else {
        setTicket(data);
      }
    };

    cargarTicket();
  }, [id, navigate]);

  if (!ticket) return <p className="text-center mt-5">Cargando ticket...</p>;

  return (
    <main className="container mt-5">
      <h1>Vista Ticket</h1>
      <div className="mt-4">
        <div className="mb-3">
          <label className="form-label">Aula</label>
          <input
            type="text"
            name="aula"
            className="form-control"
            value={ticket.aula}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ordenador</label>
          <input
            type="text"
            name="ordenador"
            className="form-control"
            value={ticket.ordenador}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="3"
            value={ticket.descripcion}
            readOnly
          ></textarea>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
    </main>
  );
}
