import React from "react";

export function Registro() {
  return (
    <>
      <main className="container mt-5">
        <div className="pt-5">
          <h1 className="w-100 text-center">Registro</h1>
          <form
            action=""
            className="form p-4 border shadow bordered mt-5 mx-auto"
            style={{ width: "400px;" }}
          >
            <label htmlFor="email" className="mt-2 form-label">
              User:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="usuario@mail.com"
            />

            <label htmlFor="pass" className="mt-2 form-label">
              Contraseña:{" "}
            </label>
            <input type="text" className="form-control" />

            <input
              type="text"
              className="mt-4 w-100 btn btn-primary"
              defaultValue="Entrar"
              id="enviar"
            />
          </form>
        </div>
      </main>
    </>
  );
}
