import React, { Component } from "react";
import "../styles/ConsultTable.css";

class ConsultTable extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }

  render() {
    return (
      <>
        <table id="t01">
          <tr>
            {this.props.consult.consult.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
          {this.props.empleados.map((empleado, i) => {
            return <tr key={i}> 
                     <td>{empleado.empleado_nombre}</td>
                     <td>{empleado.empleado_apellido}</td>
                     <td>{empleado.empleado_fnac}</td>
                     <td>{empleado.empleado_cedula}</td>
                     <td>{empleado.empleado_telefono}</td>
                     <td>{empleado.empleado_direccion}</td>
                 
                  </tr>;
          })}
        
        </table>
      </>
    );
  }
}
export default ConsultTable;
