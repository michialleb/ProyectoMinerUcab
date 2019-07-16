
import React, { Component } from "react";
import "../styles/ConsultTable.css";
import "../styles/Form.css";
import swal from "@sweetalert/with-react";
import Pago from "./Pago";
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
      configurar:false,
      procesarPago:false
    
    };
  this.handleChangeHorario=this.handleChangeHorario.bind(this);
  this.procesarCambios = this.procesarCambios.bind(this);
  }

  procesarCambios(){
  this.setState({procesarPago: true})
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
      }).then(res => res.json())
      .then(res =>{
        console.log("fase" + this.state.id_fase);
      })
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
    fetch(`/api/fases/get/proyecto/empleados/cargos/${this.state.id_fase}`)
    .then(res => res.json())
    .then(res => {
      this.setState({empleadosList: res.map((r=>r))})})
  }

  handleConfigurar(id_cargo, id_empleado){
    let numero=0, cantidad=0;
    this.state.cargosList.map((cl)=>{
      if (cl.cargo==id_cargo){
        cantidad=cl.cantidad;
      }
    })
    console.log(this.state.cargosAgregados);
    console.log("con id"+ id_cargo)
    this.state.cargosAgregados.map((c)=>{
      if (c==id_cargo){
        numero++;
      }
    });
    console.log("has agregado "+ numero +" y necesitas" + cantidad)
    if (numero<cantidad){
      let cargo=this.state.cargosAgregados;
      cargo.push(id_cargo);
      this.setState({configurar: !this.state.configurar, id_cargo:id_cargo, id_empleado: id_empleado, cargosAgregados:cargo});
      let empleado_fase={
        id_cargo:id_cargo,
        id_fase:this.state.id_fase,
        id_empleado: id_empleado,
        id_status: "Asignado"
      } 
      fetch("/api/empleados/actualizar/status", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ empleado: empleado_fase })
      }).then(res => res.json())
    
        .then(res=>{
          fetch("/api/fases/empleado/fase", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ empleado_fase: empleado_fase })
          }).then(res => res.json())
            .then(res=>{
              this.setState({id_empleado_fase: res[0].id_empleado_cargo_fase})
            })
        })
     
    }else {
      swal("Ya tienes la cantidad suficiente de empleados", "por este cargo","error");
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
    this.setState({id_fase: id_fase, cargosAgregados: []});
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
    fetch(`/api/fases/proyecto/${id_proyecto}`) //buscaFases de un proyecto
    .then(res => res.json())
    .then(res => {
      var fasesList= res.map((r=>r));
      this.setState({fasesList:fasesList});
      fasesList.map((f)=>{
        fetch(`/api/maquinaria/maquinariaCantidad/${f.id}`) //busca la maquinaria necesaria para cada fase
        .then(res => res.json())
        .then(res=>{
          var maquinaria= res.map((r=>r));
          maquinaria.map((m)=>{
            var i=0;
            let maqui ={
              id_maquinaria: m.maquinaria,
              id_tipo_status:8,
              id_fase: f.id
            }
            for (i=0; i<m.cantidad ; i++){
              fetch("/api/maquinaria/maquinaria/activa", {
                method: "post",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ maqui: maqui })
              }).then(res => res.json());

              
            }
          })
        })
      })
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
        <div className={this.state.procesarPago ? "wrapper-c_no_show" : "wrapper-c"  }>
          <div className="form-wrapper">
            <h5>Asignar Empleados</h5>
            <div className="ingresarUsuario">
               <button type="submit" onClick={this.procesarCambios}>
                 Procesar Cambios
              </button>
            </div>
            <MDBContainer>
                 <MDBListGroup style={{ width: "18rem" }}>
                {this.state.fasesList.map((fase)=>{
                   return  <MDBListGroupItem onClick={(function (e) {this.getEmpleadosCargo(e,fase.id)}).bind(this)}>{fase.nombre}</MDBListGroupItem>})}
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
  
   </div>
   </div>
        <Pago fecha_compra={this.props.fecha_compra}
         id_compra={this.props.id_compra}
         total={this.props.total}
         className={this.state.procesarPago ? "Pago": "Pago_no_show"} ></Pago>
  
      </>
    );
  }
}
export default ActivarProyecto;