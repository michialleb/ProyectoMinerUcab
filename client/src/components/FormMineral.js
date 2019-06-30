import React, { Component } from "react";
import "../styles/Form.css";
import swal from 'sweetalert';


class FormMineral extends Component {
  constructor() {
    super();

    this.state = {
      mineralList: [],
      nombre: "",
      direccion: "",
      tipo: "",
      valor: "",
      descripcion: "",
      inicio: "",
      nacionalizacion: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddMineral = this.handleAddMineral.bind(this);
  }
  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  handleAddMineral = (e) => {
  e.preventDefault (e);
    fetch("/api/minerales", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ minerales: this.state })
    }).then(res => res.json())
    .catch (res =>{
      //swal("Revisar campos obligatorios!", "You clicked the button!", "error");
     })
       .then (res =>{
         if(res.error)
         swal("Revisar campos vacios!", "Intente de nuevo!", "error")
        
        else 
        swal("Mineral Ingresado!", "Satisfactoriamentes!", "success");
        ;
      })
      
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
            <h5>Ingresar Mineral</h5>
            <form className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Nombre del Mineral:</label>
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
              <div className="ubicacionmin">
                <label htmlFor="ubicacionmin">Descripción:</label>
                <input
                  className=""
                  placeholder="Ingrese la descripcion"
                  type="text"
                  name="descripcion"
                  noValidate
                  value={this.state.descripcion}
                  onChange={this.handleChange}
                />
              </div>
              <div className="firstName">
                <label htmlFor="firstName">Primera fecha de explotación:</label>
                <input
                  className=""
                  placeholder=""
                  type="date"
                  name="inicio"
                  noValidate
                  value={this.state.inicio}
                  onChange={this.handleChange}
                />
              </div>
              <div className="firstName">
                <label htmlFor="firstName">Fecha de nacionalización:</label>
                <input
                  className=""
                  placeholder=""
                  type="date"
                  name="nacionalizacion"
                  noValidate
                  value={this.state.nacionalizacion}
                  onChange={this.handleChange}
                />
              </div>
              <div className="status">
                <label htmlFor="status">Valor aproximado:</label>
                <select name="valor" value={this.state.valor} onChange={this.handleChange}>
                  <option></option>
                  <option value="Alto">Alto</option>
                  <option value="Medio">Medio</option>
                  <option value="Bajo">Bajo</option>
                </select>
              </div>
              <div className="status">
                <label htmlFor="status">Tipo:</label>
                <select name="tipo" value={this.state.tipo} onChange={this.handleChange}>
                  <option></option>
                  <option value={"Metalico"}>Metalico</option>
                  <option value={"No metalico"}>No metalico</option>
                </select>
              </div>

              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleAddMineral}>
                  Ingresar Mineral
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormMineral;
