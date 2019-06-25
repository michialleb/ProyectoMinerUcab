import React, { Component } from "react";
import "../styles/Form.css";

class FormMaquinaria extends Component {
  constructor() {
    super();

    this.state = {
        cantidadMaquinariaList: [],
        maquinariaList:[],
        maquina:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.onDeleteMaquina=this.onDeleteMaquina.bind(this);
    this.handleChangeCantidadMaquinaria=this.handleChangeCantidadMaquinaria.bind(this);
    this.handleChangeMaquina=this.handleChangeMaquina.bind(this);
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

  handleChangeCantidadMaquinaria(e){
    e.preventDefault();
    let cantidades = this.state.cantidadMaquinariaList;
    let target = e.target;
    let value = target.value;
    let name = target.name;
    cantidades[name] = value;
    this.setState({ cantidadMaquinariaList: cantidades });
  }

  handleChangeMaquina(e) {
    e.preventDefault();
    let maquinas = this.state.maquinariaList;
    let target = e.target;
    let value =  target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    if (maquinas.indexOf(name) == -1) {
      // revisar esto, podrias meter dos minerales iguales en un yacimiento
      maquinas.push(value);
      this.setState({ maquinariaList: maquinas });
    }
  }


  onDeleteMaquina(e) {
    let maquinas = this.state.maquinariaList;
    let cantidades = this.state.cantidadMaquinariaList;
    let target = e.target;
    let name = target.name;
    let numero = target.numero;
    var index = maquinas.indexOf(name);
    var index2 = cantidades.indexOf(numero);
    if (index > -1) {
      maquinas.splice(index, 1);
    }
    if (index > -1) {
      cantidades.splice(index2, 1);
    }

    this.setState({ cantidadMaquinariaList: cantidades });
    this.setState({ maquinariaList: maquinas });
  }



  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <h5>Ingresar Maquinaria</h5>
            <form className="form" noValidate>
              <div>
              <select
                    name="maquina"
                    value={this.state.maquinas}
                    onChange={this.handleChangeMaquina}
                    >
                    <option />
                    {this.props.maquinariaList.map((m, i) => (
                      <option value={m.nombre_maquinaria} key={i}>
                        {m.nombre_maquinaria}
                      </option>
                    ))}
                  </select>

                  <table id="t01">
                    {this.state.maquinariaList.map((maquinaria, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {maquinaria}
                            <input
                              className=""
                              placeholder="Cantidad"
                              type="number"
                              name={i}
                              noValidate
                              value={this.state.cantidadMaquinariaList[i]}
                              onChange={this.handleChangeCantidadMaquinaria}
                            />
                            <button
                              numero={i}
                              name={maquinaria}
                              onClick={this.onDeleteMaquina}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.props.handleAceptarCambiosMaquinaria}>
                  Finalizar 
                </button>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.props.handleAgregarOtraEtapa}>
                  Agregar Otra Etapa
                </button>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={(function (e) {this.props.handleIngresarOtraFase(e)}).bind(this)}>
                  Agregar Otra Fase
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormMaquinaria;
