import React, { Component } from "react";
import "../styles/Form.css";

class FormFases extends Component {
  constructor() {
    super();

    this.state = {
       nombreEtapa:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
   
  }
  
  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <h5>Ingresar Fase</h5>
            <form className="form" noValidate>
              <div>
                <div className="add_minerales">
                    <div>
                    <label>Nombre Fase:</label>
                    <input 
                    type="text"
                    name="nombreEtapa"
                    value={this.state.nombreEtapa}
                    onChange={this.handleChange}/></div>
                </div>
                    <label>Duración (dias):</label>
                      <input 
                      type="number"
                      name="duracionFase"
                      value={this.state.duracionFase}
                      onChange={this.handleChange}></input>
                  <label>Costo (bs):</label>
                      <input 
                      type="number"
                      name="costoFase"
                      value={this.state.costoFase}
                      onChange={this.handleChange}></input>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.props.handleIngresarCargos}>
                  Agregar cargos
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormFases;
