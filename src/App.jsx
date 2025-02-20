import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Header } from "./components/Header";
import { Login } from "./vistas/Login";
import { Registro } from "./vistas/Registro";
import { Panel } from "./vistas/Panel";
import { Comentarios } from "./vistas/Comentarios";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Panel />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="registro" element={<Registro />}></Route>
        <Route path="comentarios" element={<Comentarios />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
