import React, { Component } from "react";
import "../styles/Form.css";
import swal from 'sweetalert';

class Form extends Component {
  constructor() {
    super();

    this.state = {
      //empleadoList: [],
      nombre: "",
      apellido: "",
      fnac: "",
      cedula: "",
      fk_lugar: "",
      telefono: "",
      correo:"",
      sexo: "",
      fk_cargo: "",
      estado: 0,
      estado2: -1,
      municipio: 0,
      municipio2: -1,
      municipioList: [],
      provinciaList: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddEmpleado = this.handleAddEmpleado.bind(this);
    this.getMunicipio = this.getMunicipio.bind(this);
    this.getProvincia = this.getProvincia.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
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

  handleAddEmpleado = (e) => {
    e.preventDefault();
    fetch(`/api/empleados/`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ empleado: this.state })
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
  }

  /*componentDidMount() {
    this.props.getLugares();
  }*/

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <h5>Ingresar empleado </h5>
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
                  type="number"
                  id="selected"
                  value={this.state.fk_cargo}
                  onChange={this.handleChange}
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
                  type="number"
                  name="telefono"
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
                <label htmlFor="direccion">Dirección</label>
                <select
                  className="lugares"
                  type="number"
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
                  type="number"
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
                  type="number"
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
