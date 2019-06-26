import React, { Component } from "react";
import Menu from "../components/Menu";
import Form from "../components/Form";
import ConsultTable from "../components/ConsultTable";
import ModiEmpleado from "../components/ModiEmpleado";
import EliminarEmpleado from "../components/EliminarEmpleado";

export default class Empleado extends Component {
  constructor() {
    super();

    this.state = {
      cargoList: [],
      empleado: [],
      empleadoList: [],
      lugarList: [],
      horarioList: [],
      empleadoCedula: ""
    };
  }

  handleGetHorario = id => {
    fetch(`/api/empleados/empl/${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ horarioList: res.map(r => r) });
      });
  };

  handleGetEmpleado = cedula => {
    fetch(`/api/empleados/${cedula}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ empleadoList: res.map(r => r) });
      });
      console.log(this.state.empleadoList);
  };
handlegetempleado = cedula =>{
  fetch(`/api/empleados/${cedula}`)
  .then(res => res.json())
  .then(res => {
    this.setState({ empleadolista: res.map(r => r) });
  });
  console.log(this.state.empleadolista);
}
  getLugarList = () => {
    fetch("/api/lugar")
      .then(res => res.json())
      .then(res => {
        var lugarList = res.map(r => r);
        this.setState({ lugarList });
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
//removeEmpleado =()=>{}
  componentDidMount() {
    this.getCargoList();
    this.getEmpleadoList();
    this.getLugarList();
  }

  render() {
    var empleados = this.state.empleadoList;
    var cargos = this.state.cargoList;
    var lugares = this.state.lugarList;
    var horarios = this.state.horarioList;
    var consult = {
      consult: [
        "Nombre",
        "Apellido",
        "Cedula",
        "Nacimiento",
        "Telefono",
        "Direccion",
        "Sexo",
        "Cargo",
        "Correo"
      ]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: (
            <Form
              cargos={cargos}
              lugares={lugares}
            />
          ),
          id: 0
        },
        {
          form: (
            <ConsultTable
              consult={consult}
              empleados={empleados}
              getEmpleado={this.handleGetEmpleado}
              getHorarios={this.handleGetHorario}
              horarios={horarios}
            />
          ),
          id: 1
        },
        {
          form: (
            <EliminarEmpleado
              consult={consult}
              empleados={empleados}
              getEmpleado={this.handleGetEmpleado}
              getHorarios={this.handleGetHorario}
              horarios={horarios}
            />
          ),
          id: 2
        },
        {
          form: (
            <ModiEmpleado
              cargos={cargos}
              consult={consult}
              empleado={empleados}
              lugares={lugares}
              getEmpleado={this.handleGetEmpleado}
            />
          ),
          id: 3
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
