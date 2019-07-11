import React, { Component } from "react";
import Menu from "../components/Menu";
import Form from "../components/Form";
import ConsultTable from "../components/ConsultTable";
import ModiEmpleado from "../components/ModiEmpleado";
import EliminarEmpleado from "../components/EliminarEmpleado";
import ConsultTableEmpleado from "../components/ConsultTableEmpleado";

export default class Empleado extends Component {
  constructor() {
    super();

    this.state = {
      cargoList: [],
      empleado: [],
      empleadoList: [],
      lugarList: [],
      statusList:[],
      //  horarioList: [],
      empleadoCedula: ""
    };
    this.getEmpleadoList = this.getEmpleadoList.bind(this);
    this.handleGetEmpleado = this.handleGetEmpleado.bind(this);
    this.handleGetHorario = this.handleGetHorario.bind(this);
  
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
  };

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
  deleteEmpleado = ced => {
    console.log(ced);
    console.log(ced + "id de diego 0");
    fetch(`/api/empleados/${ced}`, { method: "DELETE" }).then(res =>
      res.json()
    );
  };
  getEmpleadoList = () => {
    fetch("/api/empleados")
      .then(res => res.json())
      .then(res => {
        var empleadoList = res.map(r => r);
        this.setState({ empleadoList });
      });
  };

  getStatusList = () => {
    fetch("/api/status/buscar")
      .then(res => res.json())
      .then(res => {
        var statusList = res.map(r => r);
        this.setState({ statusList });
      });
  };
  //removeEmpleado =()=>{}
  componentDidMount() {
    this.getCargoList();
    this.getEmpleadoList();
    this.getLugarList();
    this.getStatusList();
  }
  render() {
    var empleados = this.state.empleadoList;
    var cargos = this.state.cargoList;
    var lugares = this.state.lugarList;
    var horarios = this.state.horarioList;
    var empleado = this.state.empleado;
    var consult = {
      consult: [
        "Nombre",
        "Apellido",
        "Cedula",
        "Nacimiento",
        "Direccion",
        "Sexo",
        "Cargo",
        "Correo",
        "Telefono"
      ]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: <Form cargos={cargos} lugares={lugares} />,
          id: 0
        },
        {
          form: (
            // <ConsultTable
            //     consult={consult}
            //    empleados={empleados}
            //    getEmpleado={this.handleGetEmpleado}
            //     getHorarios={this.handleGetHorario}

            <ConsultTableEmpleado
              empleados={empleados}
              empleado={empleado}
              getEmpleado={this.handleGetEmpleado}
              getHorarios={this.handleGetHorario}
              horarios={horarios}
              status={this.state.statusList}
            />
          ),
          id: 1
        },
        {
          form: (
            <EliminarEmpleado
              consult={consult}
              empleados={empleados}
              empleado={empleado}
              getEmpleado={this.handleGetEmpleadoced}
              getHorarios={this.handleGetHorario}
              horarios={horarios}
              eliminar={this.deleteEmpleado}
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
