import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function VistaTicket() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState({
    id: 0,
    fecha_creacion: "",
    aula: "",
    ordenador: "",
    descripcion: "",
    estado: "pendiente",
    usuario_creador: "",
    comentarios: [],
  });

  // Efecto que carga el ticket a visualizar
  useEffect(() => {
    // Obtener los tickets actuales del localStorage
    const ticketsGuardados =
      JSON.parse(localStorage.getItem("Dades Tickets")) || [];

    // Encontrar el ticket por ID
    const ticketEncontrado = ticketsGuardados.find(
      (ticket) => ticket.id === parseInt(id)
    );

    if (ticketEncontrado) {
      setTicket(ticketEncontrado);
    } else {
      alert("Ticket no encontrado");
      navigate("/");
    }
  }, [id, navigate]);

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
