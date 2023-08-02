import React from "react";
import TablaRow from "./TablaRow";
import "./Tabla.css";

const Tabla = ({ db, eliminarPersona, setDataForm }) => {
  return (
    <>
      {db.length > 0 ? (
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>Nombre</th>
              <th>Nombre Usuario</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {db.map((rowTabla) => (
              <TablaRow
                rowTabla={rowTabla}
                key={rowTabla.id}
                eliminarPersona={eliminarPersona}
                setDataForm={setDataForm}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <h2>Sin Datos</h2>
      )}
    </>
  );
};

export default Tabla;
