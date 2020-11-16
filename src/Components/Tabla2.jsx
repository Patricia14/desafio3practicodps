import React, { useEffect, useState } from "react";
//import Empleadoss from "./Empleado";
import AlumnosForm from "./AlumnosForm";
import { db } from "../firebase";

const MayorSalario = () => {
    const [Empleados, setEmpleados] = useState([]);

    const getEmpleados = async () => {
        db.collection('Empleados').orderBy('promedio', 'desc').onSnapshot((querySnapshot) => {
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
                            <td >{Empleado.promedio}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
};
export default MayorSalario;