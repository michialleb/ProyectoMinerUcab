import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";
import { MDBDataTable, MDBBtn } from "mdbreact";

class ConsultTableYacimientos extends Component {
  constructor(props) {
    super(props);
  }
  
  handleGetMinerales = () =>{
    
  }
  componentDidMount() {
    this.setState({ empl: this.props.empleados });
  }

  addBotton = yacimientos => {
    var yacimiento= [];
    this.props.yacimientos.map(yaci => {
      let y = {
        nombre: yaci.nombre_yacimiento,
        kilometros: yaci.kilometros,
        direccion: yaci.estado + ", " + yaci.municipio + ", " + yaci.provincia,
        status: yaci.nombre_status,
        minerales: (
          <button
            onClick={function(e) {
              this.handleGetMinerales(yaci.id_yacimiento);}.bind(this)} > Minerales 
          </button>
        )
      };
      yacimiento.push(y);
    });
    return yacimiento;
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
          label: "Kilometros",
          field: "kilometros",
          sort: "asc",
          width: 270
        },
        {
          label: "Direccion",
          field: "direccion",
          sort: "asc",
          width: 200
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
          width: 100
        }
      ],
      rows: this.addBotton(this.props.yacimientos)
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
export default ConsultTableYacimientos;
