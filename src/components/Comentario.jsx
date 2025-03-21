import React from "react";

export function Comentario({ comentario, onDelete }) {
  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    if (isNaN(date.getTime())) return "Fecha inválida"; // Previene errores
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="card p-3 mt-2">
      <div className="d-flex justify-content-between">
        <h5>
          Autor: <span>{comentario.autor}</span>
          <span className="ms-4">{formatearFecha(comentario.fecha)}</span>
        </h5>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(comentario.id)}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
      <p>{comentario.texto}</p>
    </div>
  );
}
