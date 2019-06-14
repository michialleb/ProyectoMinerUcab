import React, { Component } from "react";
import Menu from "../components/Menu";
import Form from "../components/Form";
import ConsultTable from "../components/ConsultTable";
import ModiEmpleado from "../components/ModiEmpleado";

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
<<<<<<< HEAD:client/src/pages/Empleado.js
        var empleadoList = res;
=======
        var empleadoList = res.map(r => r);
>>>>>>> michialleb:client/src/entities/Empleado.js
        this.setState({ empleadoList });
      });
  };

  componentDidMount() {
    this.getCargoList();
    this.getEmpleadoList();
  }
  render() {
    var empleados = this.state.empleadoList;
<<<<<<< HEAD:client/src/pages/Empleado.js
=======
    var cargos = this.state.cargoList;
>>>>>>> michialleb:client/src/entities/Empleado.js
    var consult = {
      consult: [
        "Nombre",
        "Apellido",
        "Nacimiento",
        "Cedula",
        "Telefono",
        "Direccion"
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
        },
        {
          form: <ModiEmpleado consult={consult} empleados={empleados} />,
          id: 2
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
