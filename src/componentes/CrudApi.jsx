import React, { useState, useEffect, useCallback } from "react";
import Modal from "./Modal";
import { useModal } from "../hook/useModal";
import "./CrudApi.css";
import "normalize.css";
import Formulario from "./Formulario";
import Tabla from "./Tabla";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";

const CrudApi = () => {
  const [isOpenModal, openModal, closeModal] = useModal();

  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [loadig, setLoadig] = useState(false);
  const [dataForm, setDataForm] = useState(null);

  const handleOpenModal = useCallback(() => {
    if (dataForm) {
      openModal();
    }
  }, [dataForm, openModal]);

  useEffect(() => {
    handleOpenModal();
  }, [handleOpenModal]);

  const btnAgregar = () => {
    setDataForm(null);
    openModal();
  };

  const btnClose = () => {
    setDataForm(null);
    closeModal();
  };

  let url = "http://localhost:5000/personas";

  useEffect(() => {
    setLoadig(true);
    helpHttp()
      .get(url)
      .then((res) => {
        console.dir(res);
        if (!res.err) {
          setDb(res);
          setError(null);
        } else {
          setDb(null);
          setError(res);
        }
        setLoadig(false);
      });
  }, [url]);

  const agregarPersona = (data) => {
    console.log(data);
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    helpHttp()
      .post(url, options)
      .then((res) => {
        console.log(res);
        if (!res.err) {
          setDb([...db, res]);
          btnClose();
        } else {
          setError(res);
        }
      });
  };

  const actualizarPersona = (data) => {
    let endpoint = `${url}/${data.id}`;
    console.log(endpoint);
    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    helpHttp()
      .put(endpoint, options)
      .then((res) => {
        console.log(res);
        if (!res.err) {
          let newData = db.map((el) => (el.id === data.id ? data : el));
          setDb(newData);
          btnClose();
        } else {
          setError(res);
        }
      });
  };

  const eliminarPersona = (data) => {
    let isDelete = window.confirm(
      `¿Estas seguro de eliminar el resgistro ${data.username}?`
    );

    if (isDelete) {
      let endpoint = `${url}/${data.id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };

      helpHttp()
        .del(endpoint, options)
        .then((res) => {
          console.log(res);
          if (!res.err) {
            let newData = db.filter((el) => el.id !== data.id);
            setDb(newData);
            btnClose();
          } else {
            setError(res);
          }
        });
    } else {
      return;
    }
  };

  return (
    <>
      <button className="btn" onClick={btnAgregar}>
        Agregar
      </button>
      <Modal
        isOpen={isOpenModal}
        closeModal={btnClose}
        title={dataForm === null ? "Agregar" : "Editar"}
      >
        <Formulario
          agregarPersona={agregarPersona}
          actualizarPersona={actualizarPersona}
          dataForm={dataForm}
          btnClose={btnClose}
        />
      </Modal>
      {loadig && <Loader />}
      {error && (
        <Message
          msg={`Error: ${error.status}: ${error.statusText}`}
          bgColor="#dc3545"
        />
      )}
      {db && (
        <Tabla
          db={db}
          eliminarPersona={eliminarPersona}
          setDataForm={setDataForm}
        />
      )}
    </>
  );
};

export default CrudApi;
