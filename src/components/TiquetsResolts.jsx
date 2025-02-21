import React from "react";
import dades_tickets from "../dades_tiquets.json";

export function TiquetsResolts() {
  const textDadesTickets = JSON.stringify(dades_tickets); // Convertimos el array de objetos a string
  localStorage.setItem("Dades Tickets", textDadesTickets); // Seteamos el array convertido a string en nuestro Local Storage
  // Ahora captamos los valores para parsearlos a objeto de nuevo y de esta manera poder modificar, filtrar, buscar...
  const stringObj = localStorage.getItem("Dades Tickets"); // Captamos los valores del Local Storage
  const objParseado = JSON.parse(stringObj); // Parseamos el string a objeto y ahora podemos realizar acciones con el

  // Hacemos un filtrado en el array de nuestro local storage para captar e introducir valores en una constante
  // Hacemos un filter de parseDadesTickets para obtener los tickets segun su estado
  const arrayResueltos = objParseado.filter(
    (objeto) => objeto.estado == "resuelto"
  );

  return (
    <>
      <h2 className="mt-5">Tickets resueltos</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Fecha resuelto</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Ordenador</th>
            <th>Descripción</th>
            <th>Acciones</th>
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
