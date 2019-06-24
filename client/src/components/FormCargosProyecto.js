import React, { Component } from "react";
import "../styles/Form.css";

class FormCargosProyecto extends Component {
  constructor() {
    super();

    this.state = {
        cargo:"",
        cargoList: [],
        cantidadCargoList:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCargo =this.handleChangeCargo.bind(this);
    this.handleChangeCantidad = this.handleChangeCantidad.bind(this);
    this.onDelete=this.onDelete.bind(this);   
  }
  
  handleChange(e) {
    let target = e.target;
    let value = target.value;
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

  handleChangeCargo(e) {
    e.preventDefault();
    let cargos = this.state.cargoList;
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    if (cargos.indexOf(name) == -1) {
      // revisar esto, podrias meter dos minerales iguales en un yacimiento
      cargos.push(value);
      this.setState({ cargoList: cargos });
    }
  }

  handleChangeCantidad(e) {
    e.preventDefault();
    let cantidades = this.state.cantidadCargoList;
    let target = e.target;
    let value = target.value;
    let name = target.name;

    cantidades[name] = value;
    this.setState({ cantidadCargoList: cantidades });
  }

  onDelete(e) {
    let cargos = this.state.cargoList;
    let cantidades = this.state.cantidadcargoList;
    let target = e.target;
    let name = target.name;
    let numero = target.numero;
    var index = cargos.indexOf(name);
    var index2 = cantidades.indexOf(numero);
    if (index > -1) {
      cargos.splice(index, 1);
    }
    if (index > -1) {
      cantidades.splice(index2, 1);
    }

    this.setState({ cantidadCargoList: cantidades });
    this.setState({ cargoList: cargos });
  }

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <h5>Ingresar Cargos</h5>
            <form className="form" noValidate>
              <div>
              <select
                    name="cargo"
                    value={this.state.cargo}
                    onChange={this.handleChangeCargo}
                    >
                    <option />
                    {this.props.cargoList.map((cargo, i) => (
                      <option value={cargo.tipo_cargo} key={i}>
                        {cargo.tipo_cargo}
                      </option>
                    ))}
                  </select>
                  <table id="t01">
                    {this.state.cargoList.map((cargo, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {cargo}
                            <input
                              className=""
                              placeholder="Cantidad"
                              type="number"
                              name={i}
                              noValidate
                              value={this.state.cantidadCargoList[i]}
                              onChange={this.handleChangeCantidad}
                            />
                            <button
                              numero={i}
                              name={cargo}
                              onClick={this.onDelete}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.props.handleIngresarMaquinaria}>
                  Aceptar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormCargosProyecto;
