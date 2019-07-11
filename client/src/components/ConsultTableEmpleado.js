import React, { Component } from "react";
import "../styles/ConsultTable.css";
import swal from "@sweetalert/with-react";
import { MDBDataTable } from "mdbreact";


class ConsultTableEmpleado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      empl: [],
      horarioList: [],
      status:""
    };

    this.handleGetHorario = this.handleGetHorario.bind(this);
    this.handleGetStatusEmpleado = this.handleGetStatusEmpleado.bind(this);
    this.handleChangeStatus =this.handleChangeStatus.bind(this);
  }

  handleGetHorario = id => {
    fetch(`/api/empleados/empl/${id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res !== []) this.setState({ horarioList: res.map(r => r) });
      })
      .then(res => {
        if (this.state.horarioList.length!=0){
          swal(
            <table id="t02">
                <label>{" Salario Actual :  "+ this.state.horarioList[0].salario }</label>
              <label>Horario del empleado </label>
              <tr>
                <th>Dia de semana</th>
                <th>Hora de inicio</th>
                <th>Hora de salida</th>
              </tr>
  
              {this.state.horarioList.map((horario, i) => {
                return (
                  <tr key={i}>
                    <td>{horario.dia}</td>
                    <td>{horario.inicio}</td>
                    <td>{horario.salida}</td>
                  </tr>
                );
              })}
            </table>
          );
        }else {
          swal(<label>El empleado no está asignado a ninguna fase </label>)
        }
        
        // this.setState({ selected : !this.state.selected});
      });
    console.log(this.state.horarioList);
  };
  // mostrar y modificar le status del empleado
  handleChangeStatus(e) {
    let target = e.target;
    let value = target.value;
   this.setState({
      status: value
    }); 
  }
  modificarStatusEmpleado(id_empleado){
    let empleado={ id_empleado: id_empleado, id_status: this.state.status}
    fetch(`/api/empleados/actualizar/status`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ empleado: empleado})
    }).then(res => res.json())
     .then(res=>{
      if (res.error) {
        console.log("error es: " + res.error);
        swal("Lo siento", "Hubo un error!", "error");
      } else swal("Status Actualizado!", "Satisfactoriamente!", "success");
     })
    
  }
  handleGetStatusEmpleado=(id)=>{
  let s= "";
  console.log(this.props.status);
  //Busco el status del empleado
  this.props.empleados.map((empleado)=>{
    if (empleado.id== id){
      s=empleado.status;
    }
  });
    swal(
      <div>
    <label>{s!=null ? "Status Actual: " + s : "Status por asignar"}</label>
    <div> 
    <select
      onChange={this.handleChangeStatus} >
      <option />
      {this.props.status.map((s, i) => (
        <option value={s.nombre_tipo_status} key={i}>
          {s.nombre_tipo_status}
        </option>
      ))}
    </select>
    </div>
   
    </div>).then (res=>{
      if(this.state.status!="")
         this.modificarStatusEmpleado(id);
      this.setState({status : ""})
    })
  
  }
  componentDidMount() {
    this.setState({ empl: this.props.empleados });
  }

  addBotton = empleados => {
    var empl = [];
    this.props.empleados.map(emp => {
      var date = emp.fnac.split(["T"], [1]);
      let e = {
        nombre: emp.nombre,
        apellido: emp.apellido,
        cedula: emp.cedula,
        fnac: date,
        sexo: emp.sexo,
        cargo: emp.cargo,
        direccion: emp.estado + ", " + emp.municipio + ", " + emp.provincia,
        correo: emp.correo,
        telefono: emp.telefono,
        horario: (
          <div className="horario">
          <button 
            onClick={function(e) {
              this.handleGetHorario(emp.id);
            }.bind(this)}
          >
            {" "}
            Horario{" "}
          </button>
          </div>
        ),
        status: (
          <div className="horario">
          <button 
            onClick={function(e) {
              this.handleGetStatusEmpleado(emp.id);
            }.bind(this)}
          >
            {" "}
            Status{" "}
          </button>
          </div>
        )
      };
      empl.push(e);
    });
    return empl;
  };

  render() {
    const data = {
      columns: [
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
          width: 150
        },
        {
          label: "Apellido",
          field: "apellido",
          sort: "asc",
          width: 270
        },
        {
          label: "Cédula",
          field: "cedula",
          sort: "asc",
          width: 200
        },
        {
          label: "Fecha de nacimiento",
          field: "fnac",
          sort: "asc",
          width: 100
        },
        {
          label: "Sexo",
          field: "sexo",
          sort: "asc",
          width: 150
        },
        {
          label: "Cargo",
          field: "cargo",
          sort: "asc",
          width: 100
        },
        {
          label: "Direccion",
          field: "direccion",
          sort: "asc",
          width: 100
        },

        {
          label: "Correo",
          field: "correo",
          sort: "asc",
          width: 100
        },
        {
          label: "Telefono",
          field: "telefono",
          sort: "asc",
          width: 100
        },
        {
          label: "",
          field: "buttom",
          sort: "asc",
          width: 100
        }
      ],
      rows: this.addBotton(this.props.empleados)
    };

    return (
      <>
        <div>
          <MDBDataTable btn striped bordered hover data={data} />
        </div>
      </>
    );
  }
}
export default ConsultTableEmpleado;
