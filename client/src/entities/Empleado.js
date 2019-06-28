import React, { Component } from "react";
import Menu from "../components/Menu";
import Form from "../components/Form";
import ConsultTable from "../components/ConsultTable";
import ModiEmpleado from "../components/ModiEmpleado";
<<<<<<< HEAD
import EliminarEmpleado from "../components/EliminarEmpleado";
=======
import ConsultTableEmpleado from "../components/ConsultTableEmpleado";
>>>>>>> diegucho

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

  /*handleGetHorario = id => {
    fetch(`/api/empleados/empl/${id}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ horarioList: res.map(r => r) });
      });
  };*/

 /* handleGetEmpleado = cedula => {
    fetch(`/api/empleados/${cedula}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ empleado: res.map(r => r) });
      });
      console.log(this.state.empleado);
  };
  handleGetEmpleado = cedula => {
    fetch(`/api/empleados/${cedula}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ empleadoList: res.map(r => r) });
      });
<<<<<<< HEAD
  };
=======
  };*/

>>>>>>> diegucho
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
deleteEmpleado = ced =>{

  console.log(ced)
  console.log(ced+'id de diego 0')
  fetch(`/api/empleados/${ced}`, {method: 'DELETE'})
  .then(res => res.json())
  .then(res => {
   /* if (res.success) {
      alert('Empleado eliminado');
    } else {alert('No eliminado')}*/
  });
}

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
<<<<<<< HEAD
          this.setState({ empleadoList });
        
=======
        this.cambiarEmpleado(empleadoList);
        //   this.setState({ empleadoList });
>>>>>>> diegucho
      });
  };
//removeEmpleado =()=>{}
  componentDidMount() {
    this.getCargoList();
    this.getEmpleadoList();
    this.getLugarList();
  }
  render() {
<<<<<<< HEAD
    var empleados = this.state.empleadoList;
    var cargos = this.state.cargoList;
    var lugares = this.state.lugarList;
    var horarios = this.state.horarioList;
    var empleado= this.state.empleado;
=======
   // var empleado = this.state.empleado;
    var empleados = this.state.empleadoList;
    var cargos = this.state.cargoList;
    var lugares = this.state.lugarList;
>>>>>>> diegucho
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
<<<<<<< HEAD
              empleado={empleado}
              getEmpleado={this.handleGetEmpleado}
              getHorarios={this.handleGetHorario}
              horarios={horarios}
=======
            //  getHorarios={this.getHorarios}
              //horarios={this.state.horarioList}
>>>>>>> diegucho
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
