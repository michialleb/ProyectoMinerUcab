import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";
import "../styles/Form.css";
//import InlineConfirmButton from "react-inline-confirm";


class EliminarEmpleado extends Component {
  constructor() {
    super(); //props elimine
    this.state = {
      cedula: "",
      horario: "",
      id_empleado: "",
      bool:false,
      empleado:[],
      show:false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleGetEmpleado = this.handleGetEmpleado.bind(this);
    this.deleteEmpleado = this.deleteEmpleado.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;

    this.setState({
      cedula: value
    });
  }
  /*handleGetEmpleado = cedula => {
    fetch(`/api/empleados/${cedula}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ empleado: res.map(r => r) });
      });
      console.log(this.state.empleado);
  };*/
  handleGetEmpleado(e) {
    e.preventDefault();
  //  e.preventDefault();
    //this.props.getEmpleado(this.state.cedula);
    fetch(`/api/empleados/${this.state.cedula}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ empleado: res.map(r => r) });
      });
    this.state.empleado.map(empl => {
      this.setState({
        id_empleado: empl.id
      });
    });
   
    this.setState({bool:true})
    
  }
  deleteEmpleado (e,ced) {
    e.preventDefault();
    console.log(ced)
    console.log(ced+'id de diego 0')
    fetch(`/api/empleados/${ced}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(res => {
     /* if (res.success) {
        alert('Empleado eliminado');
      } else {alert('No eliminado')}*/
    });
   // alert('Empleado eliminado');
    document.getElementById("t01").style.display="none";
    document.getElementById("eliminado").style.display="block";
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
              onClick={(function (e) {this.handleGetEmpleado(e)}).bind(this)}
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
      {this.state.empleado.map((empleado, i) => {
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
      
      <button className="btn-eliminar" onClick={(function (e) {this.deleteEmpleado(e,this.state.id_empleado)}).bind(this)}> Eliminar Empleado </button>
    </table>      
    : 
    <div className="wrapper">
    <div className="form-wrapper">
      <h5>Ingresar empleado </h5>
    </div>
      </div>
        
      }  
       <div  id="eliminado" className="wrapper">
          <div className="form-wrapper">
            <h5>Empleado Eliminado!!!</h5></div></div>
        

      </>
    );
  }
}
export default EliminarEmpleado;
