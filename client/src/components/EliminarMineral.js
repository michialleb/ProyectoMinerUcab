import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";
import "../styles/Form.css";
import swal from 'sweetalert';
//import InlineConfirmButton from "react-inline-confirm";


class EliminarMineral extends Component {
  constructor() {
    super(); //props elimine
    this.state = {
      nombre: "",
      nombre_min: "",
      bool:false,
      mineral:[],
      show:false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleGetMineral = this.handleGetMineral.bind(this);
    this.deleteMineral = this.deleteMineral.bind(this);
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
  handleGetMineral(e) {
    e.preventDefault();
  //  e.preventDefault();
    //this.props.getEmpleado(this.state.cedula);
    fetch(`/api/minerales/${this.state.nombre}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ mineral: res.map(r => r) });
      });
    this.state.mineral.map(empl => {
      this.setState({
        nombre_min: empl.nombre_mineral
      });
    });
   
    this.setState({bool:true})
    
  }
  deleteMineral (e,nombre) {
    e.preventDefault();
    fetch(`/api/minerales/${nombre}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(res => {
        if (res.error){}
      else {
        swal("Mineral eliminado", "Satisfactoriamentes!", "success");}
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
              placeholder="Ingrese mineral"
              name="nombre"
              value={this.state.nombre}
              onChange={this.handleChange}
            />
            <button
              className="search"
              type="button"
              onClick={(function (e) {this.handleGetMineral(e)}).bind(this)}
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
      {this.state.mineral.map((mineral, i) => {
        return (
          <tr key={i}>
            <td>{mineral.nombre_mineral}</td>
            <td>{mineral.valor_economico}</td>
            <td>{mineral.descripcion_mineral}</td>
            <td>{mineral.fecha_ini_explotacion}</td>
            <td>{mineral.fecha_nacionalizacion}</td>
            <td>{mineral.tipo_mineral}</td>
          </tr>
        );
      })}
      {console.log(this.state.nombre_min)}
      <button className="btn-eliminar" onClick={(function (e) {this.deleteMineral(e,this.state.nombre_min)}).bind(this)}> Eliminar Empleado </button>
    </table>      
    : 
    <div className="wrapper">
    <div className="form-wrapper">
      <h5>Ingresar Mineral </h5>
    </div>
      </div>
        
      }  
       <div  id="eliminado" className="wrapper">
          <div className="form-wrapper">
            <h5>Mineral Eliminado!!!</h5></div></div>
        

      </>
    );
  }
}
export default EliminarMineral;
