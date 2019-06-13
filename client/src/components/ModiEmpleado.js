import React, { Component } from "react";
import "../styles/Form.css";

class Form extends Component {
  constructor() {
    super();

    this.state = {
      empleadoList: [],
      nombre: "pepe",
      apellido: "porras",
      fnac: "10/10/1990",
      cedula: "1212",
      direccion: "caracas",
      telefono: "00"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* getEmpleadoList = ()=>{
    fetch("/api/empleados")
    .then(res => res.json())
    .then(res => {
        var empleadoList = res.map(r=>r)
        this.setState({ empleadoList });
      });
  };*/

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleAddEmpleado = () => {
    fetch("/api/empleados", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ empleado: this.state })
    }).then(res => res.json());
  };

  /*componentDidMount() {
    this.getEmpleadoList();
  }*/

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
            <h5>Datos del Usuario</h5>
            <form className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Nombre Empleado</label>
                <input
                  className=""
                  placeholder="Ingrese el nombre"
                  type="text"
                  name="nombre"
                  value={this.state.nombre}
                  onChange={this.handleChange}
                />
              </div>
              <div className="secondName">
                <label htmlFor="secondName">Apellido Empleado</label>
                <input
                  className=""
                  placeholder="Ingrese el apellido"
                  type="text"
                  name="apellido"
                  noValidate
                  value={this.state.apellido}
                  onChange={this.handleChange}
                />
              </div>
              <div className="cargo">
                <label htmlFor="cargo">Cargo</label>
                <select>
                  <option>x</option>
                  <option>y</option>
                </select>
              </div>
              <div className="ci">
                <label htmlFor="ci">C.I</label>
                <input
                  className=""
                  placeholder="Ingrese cédula"
                  type="text"
                  name="cedula"
                  noValidate
                  value={this.state.cedula}
                  onChange={this.handleChange}
                />
              </div>
              <div className="nacimiento">
                <label htmlFor="nacimiento">Fecha de nacimiento</label>
                <input
                  className=""
                  placeholder="xx/yy/zz"
                  type="date"
                  name="fnac"
                  noValidate
                  value={this.state.fnac}
                  onChange={this.handleChange}
                />
              </div>
              <div className="telefono">
                <label htmlFor="telefono">Número de teléfono</label>
                <input
                  className=""
                  placeholder="Ingrese nro telefónico"
                  type="text"
                  name="telefono"
                  noValidate
                  value={this.state.telefono}
                  onChange={this.handleChange}
                />
              </div>
              <div className="direccion">
                <label htmlFor="direccion">Dirección</label>
                <input
                  className=""
                  placeholder="Ingrese dirección"
                  type="text"
                  name="direccion"
                  noValidate
                  value={this.state.direccion}
                  onChange={this.handleChange}
                />
              </div>
              <div className="horario-act">
                <label htmlFor="horario-act">Desea agregar un horario?</label>
                <div>
                  <div className="check">
                    <input type="checkbox" id="yes" />
                    <label>Si</label>
                  </div>
                  <div className="check">
                    <input type="checkbox" />
                    <label>No</label>
                  </div>
                </div>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleAddEmpleado}>
                  Ingresar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Form;
