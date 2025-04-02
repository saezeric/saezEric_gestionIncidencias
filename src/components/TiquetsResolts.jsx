import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../bd/supabaseClient";

export function TiquetsResolts() {
  const [arrayResueltos, setArrayResueltos] = useState([]);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const esAdmin = currentUser && currentUser.rol === "admin";
  const esAutenticado = currentUser !== null;

  const obtenerTicketsResueltos = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("estado", "resuelto")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error al obtener tickets resueltos:", error.message);
    } else {
      setArrayResueltos(data);
    }
  };

  useEffect(() => {
    obtenerTicketsResueltos();

    // Escuchar mensajes del canal para actualizar la pagina y mostrar los nuevos tickets resueltos
    const canal = new BroadcastChannel("tickets-resueltos");
    // El canal recibe un mensaje el cual traducimos como evento
    canal.onmessage = (event) => {
      // Si el mensaje que hemos recibido es "resuelto", llamamos a la función para obtener los tickets resueltos de nuevo
      if (event.data === "resuelto") {
        obtenerTicketsResueltos();
      }
    };

    // Limpiar el canal para la proxima vez que tengamos que utilizarlo
    return () => {
      canal.close();
    };
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
      obtenerTicketsResueltos(); // Refrescar la lista
    }
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
                <td>
                  {ticket.fecha_resolucion
                    ? new Date(ticket.fecha_resolucion).toLocaleDateString(
                        "es-ES"
                      )
                    : "—"}
                </td>
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
