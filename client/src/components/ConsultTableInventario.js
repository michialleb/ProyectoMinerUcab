import React, { Component } from "react";
import "../styles/Form.css";

class ConsultTableInventario extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: 0,
      isOpen: false,
      inventarioList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.desplegar = this.desplegar.bind(this);
  }
  
  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  getInventario() {
    let repetido = false;
    var inventarioLista = this.props.inventarioAliado;
    var i = 0;
    var cont = 0;

    this.props.inventarioCliente.map((inv, i) => {
      cont = cont+1;
      console.log(cont);
    });

    for (i = 0; i < cont; i++) {
      repetido = false;
      var mineral = this.props.inventarioCliente[i].mineral;
      var presentacion = this.props.inventarioCliente[i].presentacion;
      var cantidad = this.props.inventarioCliente[i].cantidad;
      inventarioLista.map(inventario => {
        if (inventario.mineral == mineral &&inventario.presentacion == presentacion) {
          inventario.cantidad =parseInt(cantidad) + parseInt(inventario.cantidad);
          repetido = true;
        }
      });
      if (repetido === false) {
        inventarioLista.push(this.props.inventarioCliente[i]);
      }
    }

    this.setState({ inventarioList: inventarioLista });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  desplegar = () => {
    this.setState({ isOpen: !this.state.isOpen });
    if (this.state.isOpen) {
      document.getElementById("show").style.display = "block";
    } else {
      document.getElementById("noshow").style.display = "none";
    }
  };

  componentDidMount() {
    this.getInventario();
  }
  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <h5>Inventario</h5>
            <form className="form" noValidate>
              <table id="t01">
                <tr>
                  {this.props.consult.consult.map((item, i) => (
                    <th key={i}>{item}</th>
                  ))}
                </tr>
                {console.log(this.state.inventarioList)}
                {this.state.inventarioList.map((item, i) => (
                  <tr key={i}>
                    <td> {item.mineral}</td>
                    <td>{item.presentacion}</td>
                    <td>{item.cantidad}</td>
                  </tr>
                ))}
              </table>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default ConsultTableInventario;
