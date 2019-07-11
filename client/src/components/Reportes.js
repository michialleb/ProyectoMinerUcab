import React, { Component } from "react";
import "../styles/Form.css";
import swal from "sweetalert";

class Reportes extends Component {
  constructor() {
    super();

    this.state = {
    
    };

   this.mostrarMinerales = this.mostrarMinerales.bind(this);
  }

  
mostrarMinerales(){
 
    fetch(`http://localhost:8080/jasperserver/rest_v2/reports/reports/Reportes/ReportePrueba.pdf?ID_MINERAL=4`)
      .then(res => res.json())
      .then(res => {
        console.log("se logro");
      });

}
  render() {
    return (
      <>
         <div className="ingresarUsuario">
         <button onClick={this.mostrarMinerales}>Minerales</button>
         </div>
       
      </>
    );
  }
}

export default Reportes;
