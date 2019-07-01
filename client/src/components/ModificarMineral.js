import React, { Component } from "react";
import "../styles/Form.css";
import swal from "sweetalert";

import { FaSistrix } from "react-icons/fa";

class FormMineral extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mineralList: [],
      mineralSeleccionado: "",
      nombre: "",
      tipo: "",
      valor: "",
      descripcion: "",
      nacionalizacion: "",
      explotacion: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addInfoMineral = this.addInfoMineral.bind(this);
    this.handleGetMineral = this.handleGetMineral.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleUpdateMineral = e => {
    e.preventDefault();
    fetch(`/api/minerales/modificar/`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ mineral: this.state })
    })
      .then(res => res.json())
      .catch(res => {})
      .then(res => {
        if (res.error)
          swal("Error. Datos Invalidos", "Intente de nuevo!", "error");
        else swal("Mineral modificado!", "Satisfactoriamente!", "success");
      });
  };

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
  }

  addInfoMineral = mineral => {
    var m;
    var date1, date2;
    console.log("entroooo");

    mineral.map(mine => {
      date1 = mine.fecha_ini_explotacion.split(["T"], [1]);
      date2 = mine.fecha_nacionalizacion.split(["T"], [1]);

      this.setState({
        nombre: mine.nombre_mineral,
        valor: mine.valor_economico,
        descripcion: mine.descripcion_mineral,
        explotacion: date1,
        nacionalizacion: date2,
        tipo: mine.tipo_mineral
      });
    });
  };

  handleGetMineral() {
    this.props.getMinerales(this.state.mineralSeleccionado);
    this.addInfoMineral(this.props.mineralBuscado);
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="firstName">
            <label>Seleccione el mineral que desea modificar: </label>
            <select
              name="mineralSeleccionado"
              value={this.state.mineralSeleccionado}
              onChange={this.handleChange}
            >
              <option />
              {this.props.minerales.map((mineral, i) => (
                <option value={mineral.nombre_mineral} key={i}>
                  {mineral.nombre_mineral}
                </option>
              ))}
            </select>
            <button
              className="search"
              type="button"
              onClick={this.handleGetMineral}
            >
              {<FaSistrix />}
            </button>
          </div>

          <div className="form-wrapper">
            <h5>Modificar Mineral</h5>
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
                  type="text"
                  name="explotacion"
                  noValidate
                  value={this.state.explotacion}
                  onChange={this.handleChange}
                />
              </div>
              <div className="firstName">
                <label htmlFor="firstName">Fecha de nacionalización:</label>
                <input
                  className=""
                  placeholder=""
                  type="text"
                  name="nacionalizacion"
                  noValidate
                  value={this.state.nacionalizacion}
                  onChange={this.handleChange}
                />
              </div>

              <div className="status">
                <label htmlFor="status">Valor aproximado:</label>
                <select
                  name="valor"
                  value={this.state.valor}
                  onChange={this.handleChange}
                >
                  <option />
                  <option value="Alto">Alto</option>
                  <option value="Medio">Medio</option>
                  <option value="Bajo">Bajo</option>
                </select>
              </div>
              <div className="status">
                <label htmlFor="status">Tipo:</label>
                <select
                  name="tipo"
                  value={this.state.tipo}
                  onChange={this.handleChange}
                >
                  <option />
                  <option value={"Metalico"}>Metalico</option>
                  <option value={"No metalico"}>No metalico</option>
                </select>
              </div>

              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleUpdateMineral}>
                  Modificar Mineral
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
