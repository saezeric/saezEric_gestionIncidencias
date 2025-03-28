import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Comentario } from "../components/Comentario";

export function Comentarios() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [fechaComentario, setFechaComentario] = useState(() => {
    return new Date().toISOString().slice(0, 16);
  });

  useEffect(() => {
    const ticketsGuardados =
      JSON.parse(localStorage.getItem("Dades Tickets")) || [];
    const ticketEncontrado = ticketsGuardados.find(
      (ticket) => ticket.id === parseInt(id)
    );
    setTicket(ticketEncontrado);
  }, [id]);

  const handleAddComment = () => {
    if (!nuevoComentario.trim() || !fechaComentario) return;

    const ticketsGuardados =
      JSON.parse(localStorage.getItem("Dades Tickets")) || [];
    const ticketIndex = ticketsGuardados.findIndex(
      (ticket) => ticket.id === parseInt(id)
    );

    if (ticketIndex !== -1) {
      const nuevoId =
        ticketsGuardados[ticketIndex].comentarios.length > 0
          ? ticketsGuardados[ticketIndex].comentarios[
              ticketsGuardados[ticketIndex].comentarios.length - 1
            ].id + 1
          : 1;

      const nuevoComentarioObj = {
        id: nuevoId,
        autor: "Usuario",
        fecha: fechaComentario, // Se guarda en formato ISO compatible
        texto: nuevoComentario,
      };

      ticketsGuardados[ticketIndex].comentarios.push(nuevoComentarioObj);
      localStorage.setItem("Dades Tickets", JSON.stringify(ticketsGuardados));
      setTicket({ ...ticketsGuardados[ticketIndex] });
      setNuevoComentario("");
      setFechaComentario(new Date().toISOString().slice(0, 16));
    }
  };

  const handleDeleteComment = (commentId) => {
    const ticketsGuardados =
      JSON.parse(localStorage.getItem("Dades Tickets")) || [];
    const ticketIndex = ticketsGuardados.findIndex(
      (ticket) => ticket.id === parseInt(id)
    );

    if (ticketIndex !== -1) {
      ticketsGuardados[ticketIndex].comentarios = ticketsGuardados[
        ticketIndex
      ].comentarios.filter((comentario) => comentario.id !== commentId);

      localStorage.setItem("Dades Tickets", JSON.stringify(ticketsGuardados));
      setTicket({ ...ticketsGuardados[ticketIndex] });
    }
  };

  return (
    <main className="container mt-5">
      <div className="d-flex">
        <h1>Comentarios</h1>
        <button className="btn btn-link ms-auto" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>

      {ticket ? (
        <>
          <h2 className="my-4">
            Código ticket: <span>{ticket.id}</span>
          </h2>
          <div className="">
            <form
              className="form card p-3 shadow"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="comentario" className="form-label">
                Comentario:
              </label>
              <textarea
                className="form-control"
                cols="3"
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
              ></textarea>
              <label htmlFor="fecha" className="form-label me-2 mt-3">
                Fecha:
              </label>
              <div className="d-flex align-items-center">
                <input
                  type="datetime-local"
                  className="form-control w-25"
                  value={fechaComentario}
                  onChange={(e) => setFechaComentario(e.target.value)}
                />
                <button
                  className="btn btn-success ms-auto"
                  onClick={handleAddComment}
                >
                  Añadir comentario
                </button>
              </div>
            </form>

            <div className="mt-4">
              {ticket.comentarios && ticket.comentarios.length > 0 ? (
                ticket.comentarios.map((comentario) => (
                  <Comentario
                    key={comentario.id}
                    comentario={comentario}
                    onDelete={handleDeleteComment}
                  />
                ))
              ) : (
                <p>No hay comentarios aún.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Cargando ticket...</p>
      )}
    </main>
  );
}
