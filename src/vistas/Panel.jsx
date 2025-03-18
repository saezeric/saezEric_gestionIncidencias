import React from "react";
import { Link } from "react-router-dom";
import { TiquetsPendents } from "../components/TiquetsPendents";
import { TiquetsResolts } from "../components/TiquetsResolts";

export function Panel() {
  return (
    <>
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>
        <Link to="/nuevo-ticket" className="btn btn-primary px-4 py-2 mt-4">
          Añadir Ticket
        </Link>
        <TiquetsPendents />
        <TiquetsResolts />
      </main>
    </>
  );
}
