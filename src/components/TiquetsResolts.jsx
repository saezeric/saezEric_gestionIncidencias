import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function TiquetsResolts() {
  const [arrayResueltos, setArrayResueltos] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const esAdmin = currentUser && currentUser.rol === "admin";
  const esAutenticado = currentUser !== null;

  useEffect(() => {
    const actualizarTickets = () => {
      const ticketsGuardados =
        JSON.parse(localStorage.getItem("Dades Tickets")) || [];
      setArrayResueltos(
        ticketsGuardados.filter((ticket) => ticket.estado === "resuelto")
      );
    };

    actualizarTickets();
    window.addEventListener("storage", actualizarTickets);
    return () => window.removeEventListener("storage", actualizarTickets);
  }, []);

  const handleRowClick = (id) => {
    navigate(`/vista-ticket/${id}`);
  };

  const handleDelete = (id) => {
    const ticketsGuardados =
      JSON.parse(localStorage.getItem("Dades Tickets")) || [];
    const nuevosTickets = ticketsGuardados.filter((ticket) => ticket.id !== id);
    localStorage.setItem("Dades Tickets", JSON.stringify(nuevosTickets));
    setArrayResueltos(
      nuevosTickets.filter((ticket) => ticket.estado === "resuelto")
    );
  };

  return (
    <>
      <h2 className="mt-5">Tickets resueltos</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha resuelto</th>
            <th>Aula</th>
            <th>Ordenador</th>
            <th>Descripcion</th>
            <th>Alumno</th>
            <th>Comentarios</th>
            {(esAutenticado || esAdmin) && <th>Eliminar</th>}
          </tr>
        </thead>
        <tbody>
          {arrayResueltos.map((ticket) => {
            const esCreador =
              currentUser && ticket.usuario_creador === currentUser.email;

            return (
              <tr
                key={ticket.id}
                onClick={() => handleRowClick(ticket.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{ticket.id}</td>
                <td>{ticket.fecha_creacion}</td>
                <td>{ticket.aula}</td>
                <td>{ticket.ordenador}</td>
                <td>{ticket.descripcion}</td>
                <td>{ticket.usuario_creador}</td>
                <td>
                  <Link
                    to={`/comentarios/${ticket.id}`}
                    className="btn btn-info"
                    title="Ver comentarios"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="bi bi-chat-left-text"></i>
                  </Link>
                </td>
                {esCreador || esAdmin ? (
                  <td>
                    <Link
                      to="#"
                      className="btn btn-danger"
                      title="Eliminar ticket"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(ticket.id);
                      }}
                    >
                      <i className="bi bi-trash3"></i>
                    </Link>
                  </td>
                ) : esAutenticado ? (
                  <td></td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
