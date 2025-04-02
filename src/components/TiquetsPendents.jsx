import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../bd/supabaseClient";

export function TiquetsPendents() {
  const [arrayPendientes, setArrayPendientes] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const esAdmin = currentUser && currentUser.rol === "admin";
  const esAutenticado = currentUser !== null;

  const obtenerTicketsPendientes = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("estado", "pendiente")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error al obtener tickets pendientes:", error.message);
    } else {
      setArrayPendientes(data);
    }
  };

  useEffect(() => {
    obtenerTicketsPendientes();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/vista-ticket/${id}`);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("tickets").delete().eq("id", id);

    if (error) {
      alert("❌ Error al eliminar el ticket");
      console.error(error);
    } else {
      obtenerTicketsPendientes(); // Recargar lista
    }
  };

  const handleResolver = async (id) => {
    const fechaHoy = new Date().toISOString();

    const { error } = await supabase
      .from("tickets")
      .update({ estado: "resuelto", fecha_resolucion: fechaHoy })
      .eq("id", id);

    if (error) {
      alert("❌ Error al resolver el ticket");
      console.error(error);
    } else {
      // Eliminamos el ticket resuelto directamente del estado
      setArrayPendientes((prev) => prev.filter((t) => t.id !== id));
    }

    // Enviamos a Tiquets Resueltos el mensaje de que se ha resuelto un ticket y que se debe acutalizar la lista
    const canal = new BroadcastChannel("tickets-resueltos");
    // Enviamos un mensaje via post que recibimos en la pagina de panel, donde a su vez la utilizaremos en el componente de tickets resueltos
    canal.postMessage("resuelto");
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
            <th>Descripción</th>
            <th>Alumno</th>
            {esAdmin && <th>Resolver</th>}
            {esAutenticado && <th>Editar</th>}
            <th>Comentarios</th>
            {esAutenticado && <th>Eliminar</th>}
          </tr>
        </thead>
        <tbody>
          {arrayPendientes.map((ticket) => {
            const esCreador =
              currentUser && ticket.usuario_creador === currentUser.email;
            return (
              <tr
                key={ticket.id}
                onClick={() => handleRowClick(ticket.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{ticket.id}</td>
                <td>
                  {new Date(ticket.fecha_creacion).toLocaleDateString("es-ES")}
                </td>
                <td>{ticket.aula}</td>
                <td>{ticket.ordenador}</td>
                <td>{ticket.descripcion}</td>
                <td>{ticket.usuario_creador}</td>
                {esAdmin && (
                  <td>
                    <Link
                      to="#"
                      className="btn btn-success"
                      title="Resolver ticket"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleResolver(ticket.id);
                      }}
                    >
                      Resolver
                    </Link>
                  </td>
                )}
                {esCreador || esAdmin ? (
                  <td>
                    <Link
                      to={`/editar-ticket/${ticket.id}`}
                      className="btn btn-warning"
                      title="Editar Ticket"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                  </td>
                ) : esAutenticado ? (
                  <td></td>
                ) : null}
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
                        e.preventDefault();
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
