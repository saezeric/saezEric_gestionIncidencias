import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditarTicket() {
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

  // Efecto que carga el ticket a editar
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

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  // Guardar el ticket editado en localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!ticket.aula || !ticket.ordenador || !ticket.descripcion) {
      alert("Todos los campos son obligatorios");
      return;
    }

    // Obtener los tickets actuales del localStorage
    const ticketsGuardados =
      JSON.parse(localStorage.getItem("Dades Tickets")) || [];

    // Actualizar el ticket
    const ticketsActualizados = ticketsGuardados.map((t) =>
      t.id === ticket.id ? ticket : t
    );

    // Guardar en localStorage
    localStorage.setItem("Dades Tickets", JSON.stringify(ticketsActualizados));

    // Redirigir al Panel
    navigate("/");
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
