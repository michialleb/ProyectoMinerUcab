import React, { Component } from "react";
import Menu from "../components/Menu";
import Form from "../components/Form";
import ConsultTable from "../components/ConsultTable";
import ModiEmpleado from "../components/ModiEmpleado";
import ConsultTableEmpleado from "../components/ConsultTableEmpleado";

export default class Empleado extends Component {
  constructor() {
    super();

    this.state = {
      cargoList: [],
      empleado: [],
      empleadoList: [],
      lugarList: [],
    //  horarioList: [],
      empleadoCedula: ""
    };
    this.getEmpleadoList = this.getEmpleadoList.bind(this);

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

  cambiarEmpleado(empleado) {
    this.setState(state => {
      return { empleadoList: empleado };
    });
  }
  getEmpleadoList = () => {
    fetch("/api/empleados")
      .then(res => res.json())
      .then(res => {
        var empleadoList = res.map(r => r);
        this.cambiarEmpleado(empleadoList);
        //   this.setState({ empleadoList });
      });
  };

  componentDidMount() {
    this.getCargoList();
    this.getEmpleadoList();
    this.getLugarList();
  }

  render() {
   // var empleado = this.state.empleado;
    var empleados = this.state.empleadoList;
    var cargos = this.state.cargoList;
    var lugares = this.state.lugarList;
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
            //  getHorarios={this.getHorarios}
              //horarios={this.state.horarioList}
            />
          ),
          id: 1
        },
        {
          form: "",

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
