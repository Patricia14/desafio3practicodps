import React, { useEffect, useState } from "react";
//import Empleadoss from "./Empleado";
import AlumnosForm from "./AlumnosForm";
import { db } from "../firebase";

const Mayor = () => {
    const [Empleados, setEmpleados] = useState([]);
    const [currentId, setCurrentId] = useState("");

    const getEmpleados = async () => {
        db.collection('Empleados').orderBy('promedio', 'desc').limit(1).onSnapshot((querySnapshot) => {
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
            <h5>Alumno con mayor promedio</h5>
            <table class="table table-hover">
                <thead>
                    <tr class="table-success">
                        <th>Nombre</th>
                        <th>Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    {Empleados.map((Empleado) => (
                        <tr class="table-success" key={Empleado.id}>
                            <td>{Empleado.nombre}</td>
                            <td>{Empleado.promedio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
};
export default Mayor;