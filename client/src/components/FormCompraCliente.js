import React, { Component } from "react";
import "../styles/Form.css";

class FormCompraCliente extends Component {
  constructor() {
    super();
    this.state = {
        nombre:"Sutanito",
        ci:11111,
        cantidad:"",
        fechaentrega:"",
        mineral:"",
        nombreMineral:[],
        1:"",
        2:""

      };
      this.handleChange=this.handleChange.bind(this);
      this.add=this.add.bind(this);
  }
  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }
  /*<label htmlFor="cargo">Cargo</label>
  <select name="fk_cargo" id="selected" value={this.state.fk_cargo} onChange={this.handleChange}>
    <option></option>
    {this.props.cargos.map((cargo, i) => (
      <option value={cargo.id_cargo} key={i}>{cargo.tipo_cargo}</option>
    ))}
  </select>*/
  add =(cantidad)=>{
    let inputs=[]
    //document.getElementById("cant").readOnly=true;
    /*for(let j=1;j<=cantidad;j++){
      this.setState({nombreMineral:[this.state.nombreMineral[j],j]});
    }
    console.log(this.state.nombreMineral);*/
    for(let i=1;i<=cantidad;i++){
        inputs.push(<div className="min-compra">
            <div>
              <label>Mineral {i}</label>
              <select name='nombre' value={this.state.mineral} onChange={this.handleChange}>
                <option></option>
                {this.props.minerales.map((mineral,i) => (
                  <option value={mineral.id_mineral} key={i}>{mineral.mineral_nombre} </option>
                  
                ))}
               </select>
             </div>
            <div><label>Presentacion</label><input></input></div>
            <div><label>Cantidad</label><input type="number"></input></div>
            </div>)
    }
    return inputs;
  }
  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <div className="title-compra">
            <div className="infocompra">
            <label >Nombre: {this.state.nombre}</label>
            <label>Ci: {this.state.ci}</label>
            <label>Ci: {this.state.ci}</label>
            <label>Ci: {this.state.ci}</label>
            </div>
            <div><label id="title">Orden de Compra</label></div>
            
            </div>
            <form id="compra"className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Cantidad del Mineral:</label>
                <input
                  className=""
                  id="cant"
                  placeholder="Ingrese la cantidad de minerales"
                  type="number"
                  name="cantidad"
                  noValidate
                  value={this.state.cantidad}
                  onChange={this.handleChange}
                />
              </div>
              <div className="secondName">
                <label htmlFor="secondName">Fecha estimada de entrega:</label>
                <input
                  className=""
                  id="cant"
                  placeholder="xx/xx/xxxx"
                  type="date"
                  name="fechaentrega"
                  noValidate
                  value={this.state.fechaentrega}
                  onChange={this.handleChange}
                />
              </div>
             <div>
                 {this.add(this.state.cantidad)}
             </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleAddMineral}>
                  Generar Compra
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormCompraCliente;
