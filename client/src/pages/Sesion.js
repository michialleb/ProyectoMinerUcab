import React, { Component } from "react";
import Menu from "../components/Menu";
import Banner from "../components/Banner";

class Sesion extends Component {
  constructor(){
    super();
    this.state={
    }
   }


  render() {
    var crud = {
      options: [""],
      content: [
        {
          form:  <Banner
          banner="welcome"
          title={"Bienvenido a MinerUcab "}
          subtitle={localStorage.getItem('nombre_usuario')} />,
          id: 0
        }
      ]
    };
    return <Menu crud={crud} />;
  }
}

export default Sesion;
