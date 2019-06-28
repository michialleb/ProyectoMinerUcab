import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";
import { MDBDataTable, MDBBtn } from "mdbreact";

class ConsultTableMinerales extends Component {
  constructor(props) {
    super(props);
  
  }

  addBotton = minerales => {
    var mineral = [];
    this.props.minerales.map(min => {
      let m = {
        nombre: min.nombre_mineral,
        tipo: min.tipo_mineral,
        valor: min.valor_economico,
        ver_mas: (
               <button
                       onClick={function(e) {
                       this.handleGetInfo(min.id_mineral);
                       }.bind(this)}  >  Ver más 
             </button>
        )
      };
      mineral.push(m);
    });
    return mineral;
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
          label: "Tipo",
          field: "tipo",
          sort: "asc",
          width: 270
        },
        {
          label: "valor",
          field: "valor",
          sort: "asc",
          width: 200
        }
      ],
      rows: this.addBotton(this.props.minerales)
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
export default ConsultTableMinerales;
