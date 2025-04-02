import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Comentario } from "../components/Comentario";
import { supabase } from "../bd/supabaseClient";

export function Comentarios() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [fechaComentario, setFechaComentario] = useState(() =>
    new Date().toISOString().slice(0, 16)
  );
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const obtenerTicket = async () => {
    const { data, error } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("❌ Error al obtener ticket:", error.message);
    } else {
      setTicket(data);
    }
  };

  useEffect(() => {
    obtenerTicket();
  }, [id]);

  const handleAddComment = async () => {
    if (!nuevoComentario.trim() || !fechaComentario) return;

    const comentariosActuales = ticket.comentarios || [];

    const nuevoId =
      comentariosActuales.length > 0
        ? comentariosActuales[comentariosActuales.length - 1].id + 1
        : 1;

    const nuevoComentarioObj = {
      id: nuevoId,
      autor: currentUser?.email || "Anónimo",
      fecha: fechaComentario,
      texto: nuevoComentario,
    };

    const nuevosComentarios = [...comentariosActuales, nuevoComentarioObj];

    const { error } = await supabase
      .from("tickets")
      .update({ comentarios: nuevosComentarios })
      .eq("id", id);

    if (error) {
      console.error("❌ Error al añadir comentario:", error.message);
    } else {
      setNuevoComentario("");
      setFechaComentario(new Date().toISOString().slice(0, 16));
      obtenerTicket(); // Refrescar ticket actualizado
    }
  };

  const handleDeleteComment = async (commentId) => {
    const comentariosActuales = ticket.comentarios || [];

    const comentariosActualizados = comentariosActuales.filter(
      (comentario) => comentario.id !== commentId
    );

    const { error } = await supabase
      .from("tickets")
      .update({ comentarios: comentariosActualizados })
      .eq("id", id);

    if (error) {
      console.error("❌ Error al eliminar comentario:", error.message);
    } else {
      obtenerTicket(); // Refrescar
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
          <div>
            <form
              className="form card p-3 shadow"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="form-label">Comentario:</label>
              <textarea
                className="form-control"
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
              ></textarea>
              <label className="form-label me-2 mt-3">Fecha:</label>
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
