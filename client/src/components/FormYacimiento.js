import React, { Component } from "react";
import "../styles/Form.css";

class FormYacimiento extends Component {
  constructor() {
    super();

    this.state = {
      yacimientoList: [],
      nombre: "",
      direccion: "",
      kilometros: "",
      status: 2,
      descripcion: ""
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
  
  handleAddYacimiento = () => {
    fetch("/api/yacimientos", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ yacimiento: this.state })
    }).then(res => res.json());
  };

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
            <h5>Ingresar Yacimiento</h5>
            <form className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Nombre Yacimiento:</label>
                <input
                  className=""
                  placeholder="Ingrese el nombre"
                  type="text"
                  name="nombre"
                  noValidate
                  value={this.state.nombre}
                  onChange={this.handleChange}
                />
              </div>
              <div className="capacidad">
                <label htmlFor="capacidad">Capacidad en km^2:</label>
                <input
                  className=""
                  placeholder=""
                  type="number"
                  name="kilometros"
                  noValidate
                  value={this.state.kilometros}
                  onChange={this.handleChange}
                /> 
              </div>
              <div className="firstName">
                <label htmlFor="firstName">Descripcion:</label>
                <input
                  className=""
                  placeholder="Ingrese una descripcion"
                  type="text"
                  name="descripcion"
                  noValidate
                  value={this.state.descripcion}
                  onChange={this.handleChange}
                />
              </div>            
              <div className="ubicacion">
                <label htmlFor="ubicacion">Ubicacion</label>
                <input
                  className=""
                  placeholder="Ingrese la ubicacion"
                  type="text"
                  name="direccion"
                  noValidate
                  value={this.state.direccion}
                  onChange={this.handleChange}
                />
              </div>

              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleAddYacimiento}>
                  Ingresar Yacimiento
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormYacimiento;
