import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";
import { MDBDataTable, MDBBtn } from "mdbreact";

class ConsultTableProyectos extends Component {
  constructor(props) {
    super(props);
  }

  handleGetInfo =(proyecto)=>{

  }
  addBotton = proyectos => {
    var proyecto = [];
    this.props.proyectos.map(proyec => {
      let p = {
        nombre: proyec.nombre_proyecto,
        yacimiento: proyec.yacimiento,
        duracion: proyec.duracion_proyecto,
        ver_mas: (
               <button
                       onClick={function(e) {
                       this.handleGetInfo(proyec.id_proyecto);
                       }.bind(this)}  >  Ver más 
             </button>
        )
      };
      proyecto.push(p);
    });
    return proyecto;
  };

  render() {
    
    const data = {
      columns: [
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
          width: 150
        },
        {
          label: "Yacimiento Explotado",
          field: "yacimiento",
          sort: "asc",
          width: 200
        },
        {
          label: "Duracion",
          field: "duracion",
          sort: "asc",
          width: 270
        }
       
      ],
      rows: this.addBotton(this.props.proyectos)
    };
    
    return (
      <>
      <div>
         <MDBDataTable btn striped bordered hover data={data} />
     </div>
      </>
    );
  }
}
export default ConsultTableProyectos;
