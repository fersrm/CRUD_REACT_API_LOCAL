import React from "react";

const TablaRow = ({ rowTabla, eliminarPersona, setDataForm }) => {
  const { name, username, email } = rowTabla;

  return (
    <tr>
      <td>{name}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td className="row-acciones">
        <button className="btn-edit" onClick={() => setDataForm(rowTabla)}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button className="btn-del" onClick={() => eliminarPersona(rowTabla)}>
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </td>
    </tr>
  );
};

export default TablaRow;
