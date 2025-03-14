import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function TiquetsPendents() {
  const [arrayPendientes, setArrayPendientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ticketsGuardados =
      JSON.parse(localStorage.getItem("Dades Tickets")) || [];
    setArrayPendientes(
      ticketsGuardados.filter((ticket) => ticket.estado === "pendiente")
    );
  }, []);

  const handleRowClick = (id) => {
    navigate(`/vista-ticket/${id}`);
  };

  const handleDelete = (id) => {
    const ticketsGuardados =
      JSON.parse(localStorage.getItem("Dades Tickets")) || [];
    const nuevosTickets = ticketsGuardados.filter((ticket) => ticket.id !== id);
    localStorage.setItem("Dades Tickets", JSON.stringify(nuevosTickets));
    setArrayPendientes(
      nuevosTickets.filter((ticket) => ticket.estado === "pendiente")
    );
  };

  return (
    <>
      <h2 className="mt-5">Tickets pendientes</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Aula</th>
            <th>Ordenador</th>
            <th>Descripcion</th>
            <th>Alumno</th>
            <th></th>
            <th>Editar</th>
            <th>Comentarios</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {arrayPendientes.map((ticket, index) => (
            <tr
              key={index}
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
                  to="#"
                  className="btn btn-success"
                  title="Resolver ticket"
                  onClick={(e) => e.stopPropagation()}
                >
                  Resolver
                </Link>
              </td>
              <td>
                <Link
                  to={`/editar-ticket/${ticket.id}`}
                  className="btn btn-warning"
                  title="Editar Ticket"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i
                    className="bi  bi-pencil"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  ></i>
                </Link>
              </td>
              <td>
                <Link
                  to="/comentarios"
                  className="btn btn-info"
                  title="Ver comentarios"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="bi bi-chat-left-text"></i>
                </Link>
              </td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
