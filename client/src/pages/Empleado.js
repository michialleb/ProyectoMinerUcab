import React, { Component } from "react";
import Menu from "../components/Menu";
import Form from "../components/Form";
import ConsultTable from "../components/ConsultTable";

export default class Empleado extends Component {
  render() {
    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ","Modificar"],
      consult:["ID","Nombre","Apellido","Nacimiento","Cedula","Telefono","Direccion"],
      content:[
        { 
         form:<Form/>,
         id:0
        },
        {
          form:<ConsultTable/>,
          id:1
        }
      ],
     
    };
    
    return <Menu crud={crud} />;
  }
}
