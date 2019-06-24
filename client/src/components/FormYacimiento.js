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

      mineral: "",
      mineralList: [],
      cantidadList: [],
      estado: 0,
      estado2: -1,
      municipio: 0,
      municipio2: -1,
      municipioList: [],
      provinciaList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeMineral = this.handleChangeMineral.bind(this);
    this.handleChangeCantidad = this.handleChangeCantidad.bind(this);
    this.handleIngresarYacimiento = this.handleIngresarYacimiento.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.getMunicipio = this.getMunicipio.bind(this);
    this.getProvincia = this.getProvincia.bind(this);
  }

  handleChangeMineral(e) {
    e.preventDefault();
    let minerales = this.state.mineralList;
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    console.log(minerales.indexOf(name));
    if (minerales.indexOf(name) == -1) {
      // revisar esto, podrias meter dos minerales iguales en un yacimiento
      minerales.push(value);
      this.setState({ mineralList: minerales });
    }
  }

  handleChangeCantidad(e) {
    e.preventDefault();
    let cantidades = this.state.cantidadList;
    let target = e.target;
    let value = target.value;
    let name = target.name;

    cantidades[name] = value;
    this.setState({ cantidadList: cantidades });
  }
  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }
  onDelete(e) {
    let minerales = this.state.mineralList;
    let cantidades = this.state.cantidadList;
    let target = e.target;
    let name = target.name;
    let numero = target.numero;
    var index = minerales.indexOf(name);
    var index2 = cantidades.indexOf(numero);
    if (index > -1) {
      minerales.splice(index, 1);
    }
    if (index > -1) {
      cantidades.splice(index2, 1);
    }

    this.setState({ cantidadList: cantidades });
    this.setState({ mineralList: minerales });
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

  handleIngresarYacimiento = () => {
    this.handleAddYacimiento();
    this.handleAddMineralYacimiento();
  };

  handleAddYacimiento = () => {
    let yacimiento = this.state;
    fetch("/api/yacimientos", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ yacimiento: yacimiento })
    }).then(res => res.json());
  };

  handleAddMineralYacimiento = () => {
    let yacimientoMineral = this.state;
    fetch("/api/mineralYacimiento", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ yacimiento: yacimientoMineral })
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
                  placeholder="Ingrese capacidad"
                  type="number"
                  name="kilometros"
                  noValidate
                  value={this.state.kilometros}
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
                  name="direccion"
                  value={this.state.direccion}
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
              <div>
                <div className="add_minerales">
                  <label>Minerales                   </label>
                  <select
                    name="mineral"
                    value={this.state.mineral}
                    onChange={this.handleChangeMineral}
                  >
                    <option />
                    {this.props.minerales.map((mineral, i) => (
                      <option value={mineral.nombre_mineral} key={i}>
                        {mineral.nombre_mineral}
                      </option>
                    ))}
                  </select>

                  <table id="t01">
                    {this.state.mineralList.map((mineral, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {mineral}
                            <input
                              className=""
                              placeholder=" Cantidad"
                              type="number"
                              name={i}
                              noValidate
                              value={this.state.cantidadList[i]}
                              onChange={this.handleChangeCantidad}
                            />

                            <button
                              numero={i}
                              name={mineral}
                              onClick={this.onDelete}
                            >
                              x
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                  {console.log(this.state.mineralList)}
                  {console.log(this.state.cantidadList)}
                </div>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleIngresarYacimiento}>
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
