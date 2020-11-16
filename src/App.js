import React from "react";
import Alumno from "./Components/Alumno";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container p-4">
    <UserProvider>
      <Application />
      <ToastContainer />
    </UserProvider>
    </div>
  );
}

export default App;
