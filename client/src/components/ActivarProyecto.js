
import React, { Component } from "react";
import "../styles/ConsultTable.css";
import swal from "@sweetalert/with-react";
import { MDBListGroup, MDBListGroupItem, MDBContainer,MDBDataTable  } from "mdbreact";



class ActivarProyecto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      horario:"",
      activeItem: "1",
      id:"",
      id_fase:0,
      id_cargo:0,
      id_empleado:0,
      id_empleado_fase:0,
      fasesList:[], 
      empleadosList:[],
      horarioList:[],
      cargosList:[],
      cargosAgregados:[],
      horarios:[],
      configurar:false
    
    };
  this.handleChangeHorario=this.handleChangeHorario.bind(this);
  
  }

  addHorario(id_horario){
      let horario_emp={
        id_horario: id_horario,
        id_empleado: this.state.id_empleado_fase
      }
  
      fetch("/api/fases/empleado/fase/horario", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ horario_emp: horario_emp })
      }).then(res => res.json());

  
   
  }

  handleChangeHorario(e){
    var h=this.state.horarios, target = e.target,value = target.value, name = target.name, id;
    h.push(value);
    this.setState({[name]: value, horarios: h});
    this.state.horarioList.map((m)=>{
      if (value==m.hora)
         id=m.id_horario
    });
    this.addHorario(id);
    

    

  }
  handleRegresar(){
    this.setState({configurar: !this.state.configurar, horarios: []});
  }
  handleConfigurar(id_cargo, id_empleado){
    let numero=0, cantidad=0;
    this.state.cargosList.map((cl)=>{

      if (cl.cargo==id_cargo){
        cantidad=cl.cantidad;
      }
    })
    this.state.cargosAgregados.map((c)=>{
      if (c==id_cargo){
        numero++;
      }
    });
    console.log(numero +" -"+ cantidad);
    if (numero<cantidad){
      let cargo=[];
      cargo.push(id_cargo);
      this.setState({configurar: !this.state.configurar, id_cargo:id_cargo, id_empleado: id_empleado, cargosAgregados:cargo});
      console.log(this.state.id_empleado);
      let empleado_fase={
        id_cargo:id_cargo,
        id_fase:this.state.id_fase,
        id_empleado: id_empleado
      }
      fetch("/api/fases/empleado/fase", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ empleado_fase: empleado_fase })
      }).then(res => res.json())
        .then(res=>{
          console.log(res[0].id_empleado_cargo_fase);
          this.setState({id_empleado_fase: res[0].id_empleado_cargo_fase})
        })
    }
   
  }
  addBotton = () => {
    var empleados = [];
    this.state.empleadosList.map(emp => {
      let m = {
        nombre: emp.nombre,
        apellido: emp.apellido,
        cedula: emp.cedula,
        cargo: emp.cargo,
        config: (
          <div className="horario">
          <button
            onClick={function(e) {
              this.handleConfigurar(emp.id_cargo, emp.id);
            }.bind(this)}
          >
            {" "}
            Config
          </button>
          </div>
        )
      };
      empleados.push(m);
    });
    return empleados;
  };
  getEmpleadosCargo(e,id_fase){
    this.setState({id_fase: id_fase});
    fetch(`/api/fases/get/proyecto/empleados/cargos/${id_fase}`)
    .then(res => res.json())
    .then(res => {
      this.setState({empleadosList: res.map((r=>r))})
    })
    .then(res=>{
      fetch(`/api/fases/get/proyecto/fase/empleados/cargos/${id_fase}`)
      .then(res => res.json())
      .then(res => {
        this.setState({cargosList: res.map((r=>r))})
      })
    })
  }

  getHorarios(){
    fetch(`/api/horarios/horario`)
    .then(res => res.json())
    .then(res => {
      let horarios=[];
      res.map((r)=>{
        let hora={
          id_horario: r.id_horario,
          hora: r.dia_de_semana+"-"+ r.hora_inicio + "-"+ r.hora_salida
        }
        horarios.push(hora);
      })
      this.setState({horarioList: horarios})
    });
  }

  getFases(id_proyecto){
    fetch(`/api/fases/proyecto/${id_proyecto}`)
    .then(res => res.json())
    .then(res => {
      this.setState({fasesList:res.map((r=>r))});

    });
  }
  componentDidMount(){
   this.getFases(this.props.proyecto);
   this.getHorarios();
  }
  

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
          label: "cedula",
          field: "cedula",
          sort: "asc",
          width: 200
        },
        {
          label: "Cargo",
          field: "cargo",
          sort: "asc",
          width: 200
        }
      ],
      rows: this.addBotton()
    };
    return (
      <>
     <MDBContainer>
        <MDBListGroup style={{ width: "18rem" }}>
          {this.state.fasesList.map((fase)=>{
           return  <MDBListGroupItem onClick={(function (e) {this.getEmpleadosCargo(e,fase.id)}).bind(this)}>{fase.nombre}</MDBListGroupItem>
          })}
        </MDBListGroup>
      </MDBContainer>
    <div className={ this.state.configurar ? "tabla_no_show" : "tablaemp"  }>
          <MDBDataTable btn striped bordered hover data={data} />
   </div>
   <div className={this.state.configurar ? "horarioEmp" : "horarioEmp_no"} >
   <div>
        <select
         name="horario"
         value={this.state.horario}
         onChange={this.handleChangeHorario}>
               <option />
              {this.state.horarioList.map((m, i) => (
                   <option value={m.hora}  key={i}>
                       {m.hora}
                   </option>))}
        </select>
        <table id="t01">
               {this.state.horarios.map((horario, i) => {
              return ( <tr key={i}><td>  {horario}  </td> </tr> ); })}
        </table>
        <button className="horario" onClick={function(e) {
              this.handleRegresar();
            }.bind(this)}> Aceptar </button>
      </div>
   </div>
  
      </>
    );
  }
}
export default ActivarProyecto;