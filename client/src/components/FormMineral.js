import React, { Component } from "react";
import "../styles/Form.css";
import "../styles/multiSelect.css";
import swal from "sweetalert";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

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
      nacionalizacion: "",
      mineral: "",
      cantidadList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddMineral = this.handleAddMineral.bind(this);
    this.handleChangeMinerales = this.handleChangeMinerales.bind(this);
    this.handleChangeCantidad = this.handleChangeCantidad.bind(this);
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
    console.log(this.state);
  }

  handleAddMineral = e => {
    e.preventDefault(e);
    fetch("/api/minerales", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ minerales: this.state })
    })
      .then(res => res.json())
      .catch(res => {
        //swal("Revisar campos obligatorios!", "You clicked the button!", "error");
      })
      .then(res => {
        if (res.error) swal("Datos Invalidos!", "Intente de nuevo!", "error");
        else {
          swal("Mineral Ingresado!", "Satisfactoriamentes!", "success");
          this.handleIngresarMinerales(res[0].id_mineral);
        }
      });
  };

  handleChangeMinerales(e) {
    console.log("entrooo");
    console.log(this.state.mineralList);
    let minerales = this.state.mineralList;
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    if (minerales.indexOf(name) === -1) {
      minerales.push(value);
      console.log("pise mineral " + minerales);
      this.setState({ mineralList: minerales });
    }
  }

  handleIngresarMinerales = id_mineral => {
    this.state.mineralList.map((mineral, i) => {
      let mineral_mineral = {
        mineral: mineral,
        id_mineral: id_mineral,
        cantidad: this.state.cantidadList[i],
      };
      this.handleAddMineralMineral(mineral_mineral);
    });
  };

  handleAddMineralMineral = mineral => {
    fetch("/api/minerales/mineralMineral", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ mineral: mineral })
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

              <div className="add_minerales">
                <label>Minerales que lo componen: </label>
                <select
                  name="mineral"
                  value={this.state.mineral}
                  onChange={this.handleChangeMinerales}
                >
                  <option />
                  {this.props.minerales.map((miner, i) => (
                    <option value={miner.nombre_mineral} key={i}>
                      {miner.nombre_mineral}
                    </option>
                  ))}
                </select>

                <table id="t01">
                  {this.state.mineralList.map((mineral, i) => {
                    return (
                      <tr key={i}>
                        <td>{mineral}
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
                            >
                              x
                            </button>
                        </td>
                      </tr>
                    );
                  })}
                </table>
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
