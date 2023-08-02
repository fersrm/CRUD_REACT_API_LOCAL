import React, { useState, useEffect } from "react";
import "./Formulario.css";

const inicialPersona = {
  name: "",
  username: "",
  email: "",
  id: null,
};

const Formulario = ({
  agregarPersona,
  actualizarPersona,
  dataForm,
  btnClose,
}) => {
  const [form, setForm] = useState(inicialPersona);

  useEffect(() => {
    if (dataForm) {
      setForm(dataForm);
    } else {
      setForm(inicialPersona);
    }
  }, [dataForm]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.username || !form.email) {
      alert("Algun campo esta vacio");
      return;
    }

    if (form.id === null) {
      agregarPersona(form);
    } else {
      actualizarPersona(form);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="groupInput">
        <label htmlFor="nombre" className="form-label">
          Nombre:
        </label>
        <input
          type="text"
          className="form-input"
          id="nombre"
          name="name"
          onChange={handleChange}
          value={form.name}
          required
        />
      </div>
      <div className="groupInput">
        <label htmlFor="nombreUsuario" className="form-label">
          Nombre de Usuario:
        </label>
        <input
          type="text"
          className="form-input"
          id="nombreUsuario"
          name="username"
          onChange={handleChange}
          value={form.username}
          required
        />
      </div>
      <div className="groupInput">
        <label htmlFor="email" className="form-label">
          Email:
        </label>
        <input
          type="email"
          className="form-input"
          id="email"
          name="email"
          onChange={handleChange}
          value={form.email}
          required
        />
      </div>
      <div className="footerModal">
        <button type="reset" className="btn-close" onClick={() => btnClose()}>
          cancelar
        </button>
        <button type="submit" className="btn-succes">
          enviar
        </button>
      </div>
    </form>
  );
};

export default Formulario;
