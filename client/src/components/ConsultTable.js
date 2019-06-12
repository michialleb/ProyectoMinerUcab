import React, { Component } from "react";
import "../styles/ConsultTable.css";
import {FaSistrix} from 'react-icons/fa';
import Empleados from "../pages/Empleado";
class ConsultTable extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 ,
                  // empleadoCedula: null,
                  // empleado: null,
                   //empleados: this.props.empleados
                };
    
  //  this.handleChange = this.handleChange.bind(this);
  }

 /* desplegar = () => {
    Empleados.handleGetEmpleado(this.state.empleadoCedula,this.state.empleado);
    this.setState ({empleados: this.state.empleado})
  };


  handleChange(e) {
    let target = e.target;
    let value = target.value;


    this.setState({
      empleadoCedula: value
    });
  }*/

  render() {
    return (
      <>
      <div>
          <span className="searching">
              <input className="inp-search"
                     type="search" 
                     placeholder="Ingrese nro de cédula"
                     name="empleadoCedula"
                    // value={this.state.empleadoCedula}
                    // onChange={this.handleChange}
                     ></input>
              <button 
                 className="search" 
                 type="button" 
                // onClick={this.desplegar() }
                >
                 {<FaSistrix/>}
            </button>
          </span>
      </div>
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
