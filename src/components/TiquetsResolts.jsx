import React, { useEffect, useState } from "react";

export function TiquetsResolts() {
  const [arrayResueltos, setArrayResueltos] = useState([]);

  useEffect(() => {
    const stringObj = localStorage.getItem("Dades Tickets");
    if (stringObj) {
      const objParseado = JSON.parse(stringObj);
      setArrayResueltos(
        objParseado.filter((objeto) => objeto.estado === "resuelto")
      );
    }
  }, []);

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
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {arrayResueltos.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.fecha_creacion}</td>
              <td>{ticket.aula}</td>
              <td>{ticket.ordenador}</td>
              <td>{ticket.descripcion}</td>
              <td>{ticket.usuario_creador}</td>
              <td>
                <button className="btn btn-info" title="Ver comentarios">
                  <i className="bi bi-chat-left-text"></i>
                </button>
              </td>
              <td>
                <button className="btn btn-danger" title="Eliminar ticket">
                  <i className="bi bi-trash3"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
