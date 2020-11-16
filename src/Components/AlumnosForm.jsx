import React, { useState, useEffect } from "react";
import { db } from "../firebase";
//import { toast } from "react-toastify";

const AlumnosForm = (props) => {

  const [Empleados, setEmpleados] = useState([]);
  const initialStateValues = {
    nombre: "",
    nota1: "",
    nota2: "",
    nota3: "",
    nota4: "",
    nota5: "",
    promedio: "",
    estado: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    //Sacando el promedio
    values.promedio = (parseInt(values.nota1) + parseInt(values.nota2) + parseInt(values.nota3) +
      parseInt(values.nota4) + parseInt(values.nota5)) / (parseInt(5))

    //Estado reprobado, regular, aprobado 
    if (parseInt(values.promedio) >= parseInt(7)) {
      values.estado = "Aprobado";
    } else if (parseInt(values.promedio) >= parseInt(4) && parseInt(values.promedio) < parseInt(7)) {
      values.estado = "Regular";
    } else if (parseInt(values.promedio) < parseInt(4)) {
      values.estado = "Reprobado";
    }
    

    props.addOrEditEmpleado(values);
    setValues({ ...initialStateValues });
  };

  const getEmpleadoById = async (id) => {
    const doc = await db.collection("Empleados").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
      if (props.currentId !== null && props.currentId !== undefined) {
        getEmpleadoById(props.currentId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">contact_page</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Ingrese nombre"
          value={values.nombre}
          required = "true"
          name="nombre"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">exposure</i>
        </div>
        <input
          type="number"
          value={values.nota1}
          placeholder="Nota 1"
          required ="true"
          min = "0"
          max = "10"
          name="nota1"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">exposure</i>
        </div>
        <input
          type="number"
          value={values.nota2}
          placeholder="Nota 2"
          required ="true"
          min = "0"
          max = "10"
          name="nota2"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">exposure</i>
        </div>
        <input
          type="number"
          value={values.nota3}
          placeholder="Nota 3"
          required ="true"
          min = "0"
          max = "10"
          name="nota3"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">exposure</i>
        </div>
        <input
          type="number"
          value={values.nota4}
          placeholder="Nota 4"
          required ="true"
          min = "0"
          max = "10"
          name="nota4"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">exposure</i>
        </div>
        <input
          type="number"
          value={values.nota5}
          placeholder="Nota 5"
          required ="true"
          min = "0"
          max = "10"
          name="nota5"
          onChange={handleInputChange}
        />
      </div>

      <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "Guardar" : "Actualizar"}
      </button>
    </form>
  );
};

export default AlumnosForm;