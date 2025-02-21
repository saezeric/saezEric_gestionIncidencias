import React from "react";
import dades_tickets from "../dades_tiquets.json";

export function TiquetsPendents() {
  const textDadesTickets = JSON.stringify(dades_tickets); // Convertimos el array de objetos a string
  localStorage.setItem("Dades Tickets", textDadesTickets); // Seteamos el array convertido a string en nuestro Local Storage
  // Ahora captamos los valores para parsearlos a objeto de nuevo y de esta manera poder modificar, filtrar, buscar...
  const stringObj = localStorage.getItem("Dades Tickets"); // Captamos los valores del Local Storage
  const objParseado = JSON.parse(stringObj); // Parseamos el string a objeto y ahora podemos realizar acciones con el

  // Hacemos un filtrado en el array de nuestro local storage para captar e introducir valores en una constante
  // Hacemos un filter de parseDadesTickets para obtener los tickets segun su estado
  const arrayPendientes = objParseado.filter(
    (objeto) => objeto.estado == "pendiente"
  );

  return (
    <>
      <h2 className="mt-5">Tickets pendientes</h2>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Aula</th>
            <th>Grupo</th>
            <th>Ordenador</th>
            <th>Descripción</th>
            <th>Alumno</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arrayPendientes.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.id}</td>
              <td>{ticket.fecha_creacion}</td>
              <td>{ticket.aula}</td>
              <td>{ticket.ordenador}</td>
              <td>{ticket.descripcion}</td>
              <td>{ticket.usuario_creador}</td>
              <td>
                <button className="btn btn-success" title="Resolver ticket">
                  Resolver
                </button>
              </td>
              <td>
                <button className="btn btn-warning" title="Añadir comentario">
                  <i
                    className="bi  bi-pencil"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  ></i>
                </button>
              </td>
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
