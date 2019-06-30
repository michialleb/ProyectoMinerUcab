import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { FaSistrix } from "react-icons/fa";
import "../styles/Form.css";

class EliminarCliente extends Component {
  constructor() {
    super(); //props elimine
    this.state = {
      cedula: "",
      rif:"",
      id_cliente: "",
      rif_empresa:"",
      bool:false,
      bool2:false,
      cliente:[],
      show:false,
      empresa:[]
    };
    
    this.handleChangePersona = this.handleChangePersona.bind(this);
    this.handleChangeEmpresa= this.handleChangeEmpresa.bind(this);
   // this.handleGetCliente = this.handleGetEmpleado.bind(this);
   // this.deleteEmpleado = this.deleteEmpleado.bind(this);
  }
  handleChangePersona(e) {
    let target = e.target;
    let value = target.value;

    this.setState({
      cedula: value
    });
  }
  handleChangeEmpresa(e) {
    let target = e.target;
    let value = target.value;

    this.setState({
      rif: value
    });
  }
 
  handleGetPersona(e) {
    e.preventDefault();
  //  e.preventDefault();
    //this.props.getEmpleado(this.state.cedula);
    fetch(`/api/clientes/${this.state.cedula}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ cliente: res.map(r => r) });
      });

    this.state.cliente.map(cli => {
      this.setState({
        id_cliente: cli.id
      });
    });
   
    this.setState({bool:true})
    console.log(this.state.cedula);
  }
  deleteCliente(e,ced) {
    e.preventDefault();
    fetch(`/api/clientes/persona/${ced}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(res => {

    });
    document.getElementById("t01").style.display="none";
    document.getElementById("eliminado").style.display="block";
  }
  handleGetEmpresa(e) {
    e.preventDefault();
  //  e.preventDefault();
    //this.props.getEmpleado(this.state.cedula);
    fetch(`/api/clientes/empresa/${this.state.rif}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ empresa: res.map(r => r) });
      });
    this.state.empresa.map(cli => {
      this.setState({
        rif_empresa: cli.rif
      });
    });
   
    this.setState({bool2:true})
    
  }
  deleteEmpresa(e,rif) {
    e.preventDefault();
    console.log(rif);
    fetch(`/api/clientes/empresa/${rif}`, {method: 'DELETE'})
    .then(res => res.json())
    .then(res => {

    });
    document.getElementById("t01").style.display="none";
    document.getElementById("eliminado").style.display="block";
  }
  Personas() {
    document.getElementById("persona").style.display = "block";
    document.getElementById("empresa").style.display = "none";
    if (document.getElementById("btn-pp").style.backgroundColor === "orange") {
      document.getElementById("btn-pp").style.backgroundColor = "#333";
      document.getElementById("btn-pp").style.color = "orange";
      document.getElementById("btn-ee").style.backgroundColor = "orange";
    } else {
      document.getElementById("btn-pp").style.background = "orange";
      document.getElementById("btn-pp").style.color = "#333";
      document.getElementById("btn-ee").style.backgroundColor = "#333";
    }
  }
  Empresas() {
    document.getElementById("persona").style.display = "none";
    document.getElementById("empresa").style.display = "block";
    if (document.getElementById("btn-ee").style.backgroundColor === "orange") {
      document.getElementById("btn-ee").style.backgroundColor = "#333";
      document.getElementById("btn-ee").style.color = "orange";
      document.getElementById("btn-pp").style.backgroundColor = "orange";
    } else {
      document.getElementById("btn-ee").style.backgroundColor = "orange";
      document.getElementById("btn-ee").style.color = "#333";
      document.getElementById("btn-pp").style.backgroundColor = "#333";
    }
  }
  render() {
    return (
      <>

       <div className="wrapper">
           <div className="btns">
               
          <div className="buttonClienteshow">
            <button id="btn-pp" type="submit" onClick={e => this.Personas(e)}>
              Ingresar Persona
            </button>
            <button id="btn-ee" type="submit" onClick={e => this.Empresas(e)}>
              Ingresar Empresa
            </button>
          </div></div>
         <div className="form-wrapper">

         </div>
          <div id="persona" >
                    <div>
                    <span className="searching">
                        <input
                        className="inp-search"
                        type="search"
                        placeholder="Ingrese cédula"
                        name="cedula"
                        value={this.state.cedula}
                        onChange={this.handleChangePersona}
                        />
                        <button
                        className="search"
                        type="button"
                        onClick={(function (e) {this.handleGetPersona(e)}).bind(this)}
                        >
                        {<FaSistrix />}
                        </button>
                    </span>
                    </div>

                    {this.state.bool ?  
      
      <table id="t01">
      <tr>
        {this.props.consult.persona.map((item, i) => (
          <th key={i}>{item}</th>
        ))}
      </tr>
      {this.state.cliente.map((cliente, i) => {
        return (
          <tr key={i}>
            <td>{cliente.nombre}</td>
            <td>{cliente.apellido}</td>
            <td>{cliente.cedula}</td>
            <td>{cliente.fnac}</td>
        
            <td>
              {"Estado: " +
                cliente.estado +
                ", Municipio: " +
                cliente.municipio +
                ", Provincia: " +
                cliente.provincia}
            </td>
            
            <td>{cliente.sexo}</td>
            <td>{cliente.correo}</td>
            <td>{cliente.telefono}</td>
          </tr>
        );
      })}
      
      <button className="btn-eliminar" onClick={(function (e) {this.deleteCliente(e,this.state.id_cliente)}).bind(this)}> Eliminar Empleado </button>
    </table>      
    : 
    <div className="wrapper">
    <div className="form-wrapper">
      <h5>Ingresar cliente </h5>
    </div>
      </div>
        
      }  
       <div  id="eliminado" className="wrapper">
          <div className="form-wrapper">
            <h5>Cliente Eliminado!!!</h5></div>
            </div>
          </div>

      

          <div id="empresa" >
                    <div>
                    <span className="searching">
                        <input
                        className="inp-search"
                        type="search"
                        placeholder="Ingrese rif"
                        name="cedula"
                        value={this.state.rif}
                        onChange={this.handleChangeEmpresa}
                        />
                        <button
                        className="search"
                        type="button"
                        onClick={(function (e) {this.handleGetEmpresa(e)}).bind(this)}
                        >
                        {<FaSistrix />}
                        </button>
                    </span>
                    </div>

                    {this.state.bool2 ?  
      
      <table id="t01">
      <tr>
        {this.props.consult.empresa.map((item, i) => (
          <th key={i}>{item}</th>
        ))}
      </tr>
      {this.state.empresa.map((empresa, i) => {
        return (
          <tr key={i}>
            <td>{empresa.nombre}</td>
            <td>{empresa.rif}</td>
            <td>{empresa.correo}</td>
            <td>{empresa.telefono}</td>
        
            <td>
              {"Estado: " +
                empresa.estado +
                ", Municipio: " +
                empresa.municipio +
                ", Provincia: " +
                empresa.provincia}
            </td>
            

          </tr>
        );
      })}
      {console.log(this.state.rif_empresa+'holaaaaa')}
      <button className="btn-eliminar" onClick={(function (e) {this.deleteEmpresa(e,this.state.rif_empresa)}).bind(this)}> Eliminar Cliente </button>
    </table>      
    : 
    <div className="wrapper">
    <div className="form-wrapper">
      <h5>Ingresar empresa </h5>
    </div>
      </div>
        
      }  
       <div  id="eliminado" className="wrapper">
          <div className="form-wrapper">
            <h5>Cliente Eliminado!!!</h5></div>
            </div>
          </div>
         
            </div>

            
      </>
    );
  }
}
export default EliminarCliente;
