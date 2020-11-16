import React, { useEffect, useState } from "react";
//import Empleadoss from "./Empleado";
import AlumnosForm from "./AlumnosForm";
import { db } from "../firebase";

const Menor = () => {
    const [Empleados, setEmpleados] = useState([]);
    const [currentId, setCurrentId] = useState("");

    const getEmpleados = async () => {
        db.collection('Empleados').orderBy('promedio', 'asc').limit(1).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setEmpleados(docs);
        });
    };

    useEffect(() => {
        getEmpleados();
    }, []);


    return (
        <>
            <h5>Alumno con menor promedio</h5>
            <table class="table table-hover">
                <thead>
                    <tr class="table-danger">
                        <th>Nombre</th>
                        <th>Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    {Empleados.map((Empleado) => (
                        <tr class="table-danger" key={Empleado.id}>
                            <td>{Empleado.nombre}</td>
                            <td>{Empleado.promedio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
};
export default Menor;
