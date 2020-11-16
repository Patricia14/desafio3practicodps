import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";

import Info from "./Home/Info"
import Contacto from "./Home/Contacto"
import Help from "./Home/Help"
import User from "./Home/User"
import AlumnosForm from "./AlumnosForm";
import Alumno from "./Alumno";


const ProfilePage = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <a class="navbar-brand" href="/">Notas de estudiantes</a>
          <ul className="nav navbar-nav">
            <li style={{
                  background: `url(${photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcStE6eAcu7rAnDUrwr8W42CkI0lobXZEd9usw&usqp=CAU'})  no-repeat center center`,
                  backgroundSize: "cover",
                  height: "50px",
                  width: "50px"
                }}
                className="border border-blue-300"></li>
            <li className="btn"><Link to="/">{displayName}</Link></li>
            <button className="btn btn-danger" onClick={() => { signOut() }}>
              Cerrar sesión</button>
          </ul>
        </div>
      </nav>
      <Router>
        <Info exact path="info" />
        <Contacto exact path="contacto" />
        <Help exact path="help" />
        <User exact path="user" />
      </Router>

     {/* <div className="d-flex align-items-baseline">
        <div className="row">
          <div className="col-md-12">
            <span className="float-center">
              <div
                style={{
                  background: `url(${photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcStE6eAcu7rAnDUrwr8W42CkI0lobXZEd9usw&usqp=CAU'})  no-repeat center center`,
                  backgroundSize: "cover",
                  height: "50px",
                  width: "50px"
                }}
                className="border border-blue-300"
              ></div>
              <br></br>
             Nombre : <h2 className="text-2xl font-semibold">{displayName}</h2>
              <br></br>
             Correo: <h3 className="italic">{email}</h3>
            </span>
          </div>
        </div>
      </div>
              */}
      <Alumno></Alumno>
    </div>
  )
};

export default ProfilePage;

