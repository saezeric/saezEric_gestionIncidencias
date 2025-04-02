import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { Login } from "./vistas/Login";
import { Registro } from "./vistas/Registro";
import { Panel } from "./vistas/Panel";
import { Comentarios } from "./vistas/Comentarios";
import { Modal } from "./components/Modal";
import { NuevoTicket } from "./vistas/NuevoTicket";
import { EditarTicket } from "./vistas/EditarTicket";
import { VistaTicket } from "./vistas/VistaTicket";
import { PanelAdmin } from "./vistas/PanelAdmin";
import { supabase } from "./bd/supabaseClient";

function App() {
  useEffect(() => {
    const probarConexion = async () => {
      const usuariosResponse = await supabase.from("usuarios").select("*");
      const ticketsResponse = await supabase.from("tickets").select("*");

      if (usuariosResponse.error) {
        console.log(
          "❌ Error al conectar con Supabase (usuarios):",
          usuariosResponse.error.message
        );
      } else {
        console.log(
          "✅ Supabase conectado correctamente. Usuarios:",
          usuariosResponse.data
        );
      }

      if (ticketsResponse.error) {
        console.log(
          "❌ Error al conectar con Supabase (tickets):",
          ticketsResponse.error.message
        );
      } else {
        console.log(
          "✅ Supabase conectado correctamente. Tickets:",
          ticketsResponse.data
        );
      }
    };

    probarConexion();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Panel />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="registro" element={<Registro />}></Route>
        <Route path="nuevo-ticket" element={<NuevoTicket />}></Route>
        <Route path="editar-ticket/:id" element={<EditarTicket />}></Route>
        <Route path="vista-ticket/:id" element={<VistaTicket />}></Route>
        <Route path="comentarios/:id" element={<Comentarios />}></Route>
        <Route path="panel-admin" element={<PanelAdmin />}></Route>
      </Routes>
      <Modal />
    </Router>
  );
}

export default App;
