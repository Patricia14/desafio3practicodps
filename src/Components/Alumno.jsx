import React, { useEffect, useState } from "react";
import AlumnosForm from "./AlumnosForm";
import MenorSalario from "./Menor";
import MayorSalario from "./Mayor";
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
        console.log(doc.id)
        if(doc.promedio > 8){
          doc.promedio = parseInt(docs.promedio) +1
        }
      });
      setEmpleados(docs);
    });
  };

  const onDeleteEmpleado = async (id) => {
    if (window.confirm("are you sure you want to delete this Empleado?")) {
      await db.collection("Empleados").doc(id).delete();
      toast("Se elimino un Alumno", {
        type: "error",
        //autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const addOrEditEmpleado = async (EmpleadoObject) => {
    Empleados.map((Empleado) => (
      console.log(Math.max(Empleado.promedio))
      ))
    try {
      if (currentId === "") {
        await db.collection("Empleados").doc().set(EmpleadoObject);
        toast("Se agrego un Alumno", {
          type: "success",
        });
      } else {
        await db.collection("Empleados").doc(currentId).update(EmpleadoObject);
        toast("Se actualizo un Alumno", {
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
      <br></br>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 offset-md-0">
            <h2>Agregar Alumno</h2>
            <AlumnosForm {...{ addOrEditEmpleado, currentId, Empleados }} />
          </div>
          <div className="col-md-4 offset-md-0">
            <div className="container-fluid ">
              <h2>Lista Alumnos</h2>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr class="table-active">
                    <th>Nombre</th>
                    <th>Nota 1</th>
                    <th>Nota 2</th>
                    <th>Nota 3</th>
                    <th>Nota 4</th>
                    <th>Nota 5</th>
                    <th>Promedio</th>
                    <th>Estado</th>
                    <th>Operaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {Empleados.map((Empleado) => (
                    <tr className="container-fluid" key={Empleado.id}>
                      <td>{Empleado.nombre}</td>
                      <td>{Empleado.nota1}</td>
                      <td>{Empleado.nota2}</td>
                      <td>{Empleado.nota3}</td>
                      <td>{Empleado.nota4}</td>
                      <td>{Empleado.nota5}</td>
                      <td>{Empleado.promedio}</td>
                      <td>{Empleado.estado}</td>
                      <td className="container-fluid">
                        <button className="btn btn-success container-fluid" onClick={() => setCurrentId(Empleado.id)}>Editar</button>
                        <button className="btn btn-danger container-fluid" onClick={() => onDeleteEmpleado(Empleado.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 offset-md-0">
        <MayorSalario {...{ addOrEditEmpleado, currentId, Empleados }} />
      </div>
      <div className="col-md-4 offset-md-0">
        <MenorSalario {...{ addOrEditEmpleado, currentId, Empleados }} />
      </div>
    </>
  );
};

export default Empleados;