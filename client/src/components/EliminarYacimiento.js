import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";
import "../styles/Form.css";
import swal from 'sweetalert';
//import InlineConfirmButton from "react-inline-confirm";


class EliminarYacimiento extends Component {
  constructor() {
    super(); //props elimine
    this.state = {
      nombre: "",
      nombre_yacimiento: "",
      bool:false,
      yacimiento:[],
      show:false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleGetYacimiento = this.handleGetYacimiento.bind(this);
    this.deleteYacimiento = this.deleteYacimiento.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;

    this.setState({
      nombre: value
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
  handleGetYacimiento(e) {
    e.preventDefault();
  //  e.preventDefault();
    //this.props.getEmpleado(this.state.cedula);
    fetch(`/api/yacimientos/${this.state.nombre}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ yacimiento: res.map(r => r) });
      });
    this.state.yacimiento.map(empl => {
      this.setState({
        nombre_yacimiento: empl.nombre_yacimiento
      });
    });
   
    this.setState({bool:true}) 
  }
  deleteYacimiento (e,nombre) {
    e.preventDefault();
      console.log(nombre);
    fetch(`/api/yacimientos/${nombre}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(res => {
      if (res.error){}
      else {
        swal("Yacimiento eliminado", "Satisfactoriamentes!", "success");}

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
              placeholder="Ingrese nombre yacimiento"
              name="cedula"
              value={this.state.nombre}
              onChange={this.handleChange}
            />
            <button
              className="search"
              type="button"
              onClick={(function (e) {this.handleGetYacimiento(e)}).bind(this)}
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
      {this.state.yacimiento.map((yacimiento, i) => {
        return (
          <tr key={i}>
            <td>{yacimiento.nombre_yacimiento}</td>
            <td>{yacimiento.nombre_status}</td>
        
            <td>
              {"Estado: " +
                yacimiento.estado +
                ", Municipio: " +
                yacimiento.municipio +
                ", Provincia: " +
                yacimiento.provincia}
            </td>
            
            <td>{yacimiento.kilometros}</td>
          </tr>
        );
      })}
      
      <button className="btn-eliminar" onClick={(function (e) {this.deleteYacimiento(e,this.state.nombre)}).bind(this)}> Eliminar Empleado </button>
    </table>      
    : 
    <div className="wrapper">
    <div className="form-wrapper">
      <h5>Ingrese el yacimiento </h5>
    </div>
      </div>
        
      }  
       <div  id="eliminado" className="wrapper">
          <div className="form-wrapper">
            <h5>Yacimiento Eliminado!!!</h5></div></div>
        

      </>
    );
  }
}
export default EliminarYacimiento;
