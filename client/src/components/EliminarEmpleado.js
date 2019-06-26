import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";
import "../styles/Form.css";
class EliminarEmpleado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cedula: "",
      horario: "",
      id_empleado: "",
      bool:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetEmpleado = this.handleGetEmpleado.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;

    this.setState({
      cedula: value
    });
  }

  handleGetEmpleado(e) {
    this.props.getEmpleado(this.state.cedula);
    this.props.empleados.map(empl => {
      this.setState({
        id_empleado: empl.id
      });
    });
    this.setState({bool:true})
  }

  
  render() {
    return (
      <>
        <div>
          <span className="searching">
            <input
              className="inp-search"
              type="search"
              placeholder="Ingrese nro de cédula"
              name="cedula"
              value={this.state.cedula}
              onChange={this.handleChange}
            />
            <button
              className="search"
              type="button"
              onClick={this.handleGetEmpleado}
            >
              {<FaSistrix />}
            </button>
          </span>
        </div>
      {this.state.bool ?  
      
      <table id="t01">
      <tr>
        {this.props.consult.consult.map((item, i) => (
          <th key={i}>{item}</th>
        ))}
      </tr>
      {this.props.empleados.map((empleado, i) => {
        return (
          <tr key={i}>
            <td>{empleado.nombre}</td>
            <td>{empleado.apellido}</td>
            <td>{empleado.cedula}</td>
            <td>{empleado.fnac}</td>
        
            <td>
              {"Estado: " +
                empleado.estado +
                ", Municipio: " +
                empleado.municipio +
                ", Provincia: " +
                empleado.provincia}
            </td>
            
            <td>{empleado.sexo}</td>
            <td>{empleado.cargo}</td>
      
          </tr>
        );
      })}
      <button className="btn-eliminar" > Eliminar Empleado </button>
    </table>      
    : 
    <div className="wrapper">
    <div className="form-wrapper">
      <h5>Ingresar empleado </h5>
    </div>
      </div>
        
      }  
       


      </>
    );
  }
}
export default EliminarEmpleado;
