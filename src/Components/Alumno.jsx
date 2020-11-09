import React, { useEffect, useState } from "react";
import AlumnosForm from "./AlumnosForm";

//import { db } from "../Firebase";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Empleados = () => {
  const [Empleados, setEmpleados] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getEmpleados = async () => {
    db.collection("Empleados").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setEmpleados(docs);
    });
  };

  const onDeleteEmpleado = async (id) => {
    if (window.confirm("are you sure you want to delete this Empleado?")) {
      await db.collection("Empleados").doc(id).delete();
      toast("Se elimino un Empleado", {
        type: "error",
        //autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const addOrEditEmpleado = async (EmpleadoObject) => {
    try {
      if (currentId === "") {
        await db.collection("Empleados").doc().set(EmpleadoObject);
        toast("Se agrego un Empleado", {
          type: "success",
        });
      } else {
        await db.collection("Empleados").doc(currentId).update(EmpleadoObject);
        toast("Se actualizo un Empleado", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="col-md-4 p-2">
        <h2>Agregar Empleados</h2>
        <AlumnosForm {...{ addOrEditEmpleado, currentId, Empleados }} />
      </div>

      <div className="col-md-8 p-2">
        <div class="container">
          <h2>Lista Empleados</h2>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Id </th>
                <th>Nombre</th>
                <th>Nota 1</th>
                <th>Nota 2</th>
                <th>Nota 3</th>
                <th>Nota 4</th>
                <th>Nota 5</th>
                <th>Promedio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {Empleados.map((Empleado) => (
                <tr key={Empleado.id}>
                  <td>{Empleado.id}</td>
                  <td>{Empleado.nombre}</td>
                  <td>{Empleado.nota1}</td>
                  <td>{Empleado.nota2}</td>
                  <td>{Empleado.nota3}</td>
                  <td>{Empleado.nota4}</td>
                  <td>{Empleado.nota5}</td>
                  <td>{Empleado.promedio}</td>
                  <td>{Empleado.estado}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => setCurrentId(Empleado.id)}>Editar</button>
                    &nbsp;
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => onDeleteEmpleado(Empleado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Empleados;