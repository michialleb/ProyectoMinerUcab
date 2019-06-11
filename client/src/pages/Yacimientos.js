import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import Form from "../components/Form";
import Hero from "../components/Hero";

export default class Empleado extends Component {
  render() {
    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ","Modificar"],
      content:[
        { 
         form:<Hero/>,
         id:0
        },
        {
          form:<Form/>,
          id:1
        }
      ],
      a:<Hero/>
    };
    
    return <Menu crud={crud} />;
  }
}
