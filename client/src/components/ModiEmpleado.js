import React, { Component } from "react";
import "../styles/Form.css";
import { FaSistrix } from "react-icons/fa";
import swal from "sweetalert";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: "",
      apellido: "",
      fnac: "",
      cedula: 0,
      fk_lugar: "",
      telefono: "",
      correo: "",
      sexo: 0,
      cedulaBuscada: "",
      fk_cargo: "",
      estado: 0,
      estado2: -1,
      municipio: 0,
      municipio2: -1,
      estadoAnterior: "",
      municipioAnterior: "",
      provinciaAnteriror: "",
      municipioList: [],
      provinciaList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGetEmpleado = this.handleGetEmpleado.bind(this);
    this.addInfoEmpleado = this.addInfoEmpleado.bind(this);
    this.handleUpdateEmpleado = this.handleUpdateEmpleado.bind(this);
    this.getMunicipio = this.getMunicipio.bind(this);
    this.getProvincia = this.getProvincia.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  getMunicipio = codigo => {
    fetch(`/api/lugar/${codigo}`)
      .then(res => res.json())
      .then(res => {
        var municipioList = res.map(r => r);
        this.setState({ municipioList });
      });
  };
  buscarMunicipios = (codigo, codigo2) => {
    if (codigo != codigo2) {
      this.getMunicipio(codigo2);
      this.setState({ estado: codigo2, municipio2: "" });
    }
  };

  getProvincia = codigo => {
    fetch(`/api/lugar/${codigo}`)
      .then(res => res.json())
      .then(res => {
        var provinciaList = res.map(r => r);
        this.setState({ provinciaList });
      });
  };

  buscarProvincias = (codigo, codigo2) => {
    if (codigo != codigo2) {
      this.getProvincia(codigo2);
      this.setState({ municipio: codigo2 });
    }
  };

  handleUpdateEmpleado = e => {
    e.preventDefault();
    fetch(`/api/empleados/actualizar`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ empleado: this.state })
    })
      .then(res => res.json())
      .catch(res => {})
      .then(res => {
        if (res.error)
          swal("Error. Datos invalidos!", "Intente de nuevo!", "error");
        else swal("Empleado modificado!", "Satisfactoriamente!", "success");
      });
  };

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    // console.log(this.state);
  }

  addInfoEmpleado(empleado) {
    empleado.map(empl => {
      var date = empl.fnac.split(["T"], [1]);
      this.setState({
        nombre: empl.nombre,
        apellido: empl.apellido,
        fnac: date,
        cedula: empl.cedula,
        fk_lugar: empl.provincia,
        telefono: empl.telefono,
        sexo: empl.sexo,
        fk_cargo: empl.cargo,
        estadoAnterior: empl.estado,
        municipioAnterior: empl.municipio,
        provinciaAnteriror: empl.provincia,
        correo: empl.correo
      });
    });
  }

  handleGetEmpleado(e) {
    e.preventDefault();
    //console.log(this.state.cedula);
    this.props.getEmpleado(this.state.cedulaBuscada);
    this.addInfoEmpleado(this.props.empleado);
    //  console.log(this.props.empleado);
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
                  type="number"
                  name="cedula"
                  value={this.state.cedula}
                  onChange={this.handleChange}
                />
              </div>
              <div className="nacimiento">
                <label htmlFor="nacimiento">Fecha de nacimiento</label>
                <input
                  className=""
                  placeholder="yyyy/mm/dd"
                  type="text"
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
                  type="number"
                  name="telefono"
                  noValidate
                  value={this.state.telefono}
                  onChange={this.handleChange}
                />
              </div>

              <div className="correo">
                <label htmlFor="correo">Correo Electronico</label>
                <input
                  className=""
                  placeholder="Ingrese su correo electronico"
                  type="email"
                  name="correo"
                  value={this.state.correo}
                  onChange={this.handleChange}
                />
              </div>

              <div className="direccion">
                <label htmlFor="direccion">
                  {" "}
                  Dirección: <br />
                  {this.state.estadoAnterior +
                    ", " +
                    this.state.municipioAnterior +
                    ", " +
                    this.state.provinciaAnteriror}
                </label>
                <select
                  className="lugares"
                  type="text"
                  name="estado2"
                  value={this.state.estado2}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.props.lugares.map((lugar, i) => (
                    <option value={lugar.id_lugar} key={i}>
                      {lugar.nombre_lugar}
                    </option>
                  ))}
                </select>
                {this.buscarMunicipios(this.state.estado, this.state.estado2)}
                <select
                  className="lugares"
                  type="text"
                  name="municipio2"
                  value={this.state.municipio2}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.state.municipioList.map((lugar, i) => (
                    <option value={lugar.id_lugar} key={i}>
                      {lugar.nombre_lugar}
                    </option>
                  ))}
                </select>
                {this.buscarProvincias(
                  this.state.municipio,
                  this.state.municipio2
                )}
                <select
                  className="lugares"
                  type="text"
                  name="fk_lugar"
                  value={this.state.fk_lugar}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.state.provinciaList.map((lugar, i) => (
                    <option value={lugar.id_lugar} key={i}>
                      {lugar.nombre_lugar}
                    </option>
                  ))}
                </select>
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
                  Modificar Empleado
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
