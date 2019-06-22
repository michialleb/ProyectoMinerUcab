import React, { Component } from "react";
import "../styles/Form.css";
import { FaSistrix } from "react-icons/fa";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      apellido: "",
      fnac: "",
      cedula: "",
      direccion: "",
      telefono: "",
      sexo: "",
      cedulaBuscada: "",
      fk_cargo: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGetEmpleado = this.handleGetEmpleado.bind(this);
    this.addInfoEmpleado = this.addInfoEmpleado.bind(this);
    this.handleUpdateEmpleado = this.handleUpdateEmpleado.bind(this);
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
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    console.log(this.state);
  }

  handleUpdateEmpleado = () => {
    fetch(`/api/empleados/empleado`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ empleado: this.state })
    }).then(res => res.json());
  };

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  addInfoEmpleado(empleado) {
    empleado.map(empl => {
      this.setState({
        nombre: empl.nombre,
        apellido: empl.apellido,
        fnac: empl.fnac,
        cedula: empl.cedula,
        direccion: empl.direccion,
        telefono: empl.telefono,
        sexo: empl.sexo,
        fk_cargo: empl.cargo
      });
    });
  }

  handleGetEmpleado(e) {
    // this.setState(null);
    this.props.getEmpleado(this.state.cedulaBuscada);
    this.addInfoEmpleado(this.props.empleado);
    console.log(this.props.empleado);
    // this.setState({
    // nombre: this.props.empleados.empleado_nombre
    //});
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
              name="cedulaBuscada"
              value={this.state.cedulaBuscada}
              onChange={this.handleChange}
            />

            <button
              className="search"
              type="button"
              onClick={this.handleGetEmpleado}
            >
              {<FaSistrix />}
            </button>
          </span>
        </div>
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
                <select
                  name="fk_cargo"
                  onChange={this.handleChange}
                  value={this.state.fk_cargo}
                >
                  <option />
                  {this.props.cargos.map((cargo, i) => (
                    <option value={cargo.id_cargo} key={i}>
                      {cargo.tipo_cargo}
                    </option>
                  ))}
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
              <div className="sexo">
                <label htmlFor="sexo">Sexo</label>
                <select
                  name="sexo"
                  value={this.state.sexo}
                  onChange={this.handleChange}
                >
                  <option />
                  <option>M</option>
                  <option>F</option>
                </select>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleUpdateEmpleado}>
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
