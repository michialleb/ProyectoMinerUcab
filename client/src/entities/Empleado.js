import React, { Component } from "react";
import Menu from "../components/Menu";
import Form from "../components/Form";
import ConsultTable from "../components/ConsultTable";

export default class Empleado extends Component {
  constructor() {
    super();

    this.state = {
      cargoList: [],
      empleadoList: "",
      empleadoCedula: ""
    };
  }

  handleGetEmpleado = cedula => {
    fetch(`/api/empleados/${cedula}`)
      .then(res => res.json())
      .then(res => {
        var empleadoList = res.map(r => r);
        this.setState({ empleadoList });
      });
  };

  getCargoList = () => {
    fetch("/api/cargos")
      .then(res => res.json())
      .then(res => {
        var cargoList = res.map(r => r);
        this.setState({ cargoList });
      });
  };

  getEmpleadoList = () => {
    fetch("/api/empleados")
      .then(res => res.json())
      .then(res => {
        var empleadoList = res.map(r => r);
        this.setState({ empleadoList });
      });
  };

  componentDidMount() {
    this.getCargoList();
    this.getEmpleadoList();
  }
  render() {
    var empleados = this.state.empleadoList;
    var cargos = this.state.cargoList;
    var consult = {
      consult: [
        "Nombre",
        "Apellido",
        "Cedula",
        "Nacimiento",
        "Telefono",
        "Direccion",
        "Cargo"
      ]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: <Form cargos={cargos} />,
          id: 0
        },
        {
          form: (
            <ConsultTable
              consult={consult}
              empleados={empleados}
              getEmpleado={this.handleGetEmpleado}
            />
          ),
          id: 1
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
