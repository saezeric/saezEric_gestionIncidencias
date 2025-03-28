import React from "react";
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

function App() {
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
