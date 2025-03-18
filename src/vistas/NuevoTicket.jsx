import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function NuevoTicket() {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState({
    id: 0, // Generar un ID único
    fecha_creacion: new Date().toLocaleDateString("es-ES"),
    aula: "",
    ordenador: "",
    descripcion: "",
    estado: "pendiente",
    usuario_creador: "ejemplo@example.com", // Temporalmente estático, luego se puede vincular al usuario logueado
    comentarios: [],
  });

  // Efecto que actualizara la ID al ultimo ID posible
  useEffect(() => {
    //Obtener los tickets actuales del localStorage
    const ticketsGuardados =
      JSON.parse(localStorage.getItem("Dades Tickets")) || [];

    // Obtener el último ID y asignar el nuevo ID
    const ultimoId =
      ticketsGuardados.length > 0
        ? ticketsGuardados[ticketsGuardados.length - 1].id
        : 0;
    setTicket({ ...ticket, id: ultimoId + 1 });
  }, []);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  // Guardar el ticket en localStorage
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

    // Agregar el nuevo ticket
    ticketsGuardados.push(ticket);

    // Guardar en localStorage
    localStorage.setItem("Dades Tickets", JSON.stringify(ticketsGuardados));

    // Redirigir al Panel
    navigate("/");
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
