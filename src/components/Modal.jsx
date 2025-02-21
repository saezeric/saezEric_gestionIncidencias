import React, { useState } from "react";

export function Modal() {
  const [comment, setComment] = useState(
    "Este es un comentario sobre esta incidencia"
  );
  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Observaciones
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Código incidencia: <span>123546</span>
              </p>
              <label htmlFor="comentario" className="form-label">
                Comentario:
              </label>
              <input
                className="form-control"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <p className="small text-end">
                Autor: <span>Pepe Loco</span>
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-primary">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
