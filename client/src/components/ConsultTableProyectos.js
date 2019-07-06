import React, { Component } from "react";
import "../styles/ConsultTable.css";
import "../styles/Form.css";
import { MDBDataTable } from "mdbreact";
import swal from "@sweetalert/with-react";
import { swap } from "formik";
import swal2 from 'sweetalert';

class ConsultTableProyectos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      proyectoList: [],
      statusEtapa: [],
      cargosFase: [],
      maquinariaFase:[],
      status: []
    };
    this.handleGetInfo = this.handleGetInfo.bind(this);
    this.handleChangeStatus =this.handleChangeStatus.bind(this);
  }


  handleStatusEtapa=(idEtapa)=>{
  //  console.log(idEtapa);
    fetch(`/api/etapas/status/${idEtapa}`)
    .then(res =>res.json())
    .then(res =>{
      this.setState({statusEtapa: res.map((r=>r))})
    }).then(res =>{
      this.state.statusEtapa.map((s)=>{
        swal2({
          title: s.status
        }
        )
      })
        
    })
  }
  
  handleChangeStatus(e) {
    let target = e.target;
    let value = target.value;
   this.setState({
      status: value
    }); 
  }
  modificarStatusEtapa(id_etapa){
    let etapa={ id_etapa: id_etapa, id_status: this.state.status}
    console.log(this.state.status);
    fetch(`/api/status/modificar/status/proyecto/etapa/status/modificar/manual`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ etapa: etapa})
    }).then(res => res.json())
    
  }
  modificarStatusFase(id_fase){
    let fase={ id_fase: id_fase, id_status: this.state.status}
    fetch(`/api/fases/modificar/status/proyecto/etapa/status/modificar/buscar`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ fase: fase})
    }).then(res => res.json())
  }
  cambiarStatusEtapa(id_etapa){
    swal(
      <select
      onChange={this.handleChangeStatus} >
      <option />
      {this.props.status.map((s, i) => (
        <option value={s.nombre_tipo_status} key={i}>
          {s.nombre_tipo_status}
        </option>
      ))}
    </select>
     ).then (res=>{
      this.modificarStatusEtapa(id_etapa);
     })
  }

  
  cambiarStatusFase(id_fase, status){
    let st="Status ";
    this.props.status.map((s)=>{
  
       if (s.id_tipo_status==status){
         st=st+s.nombre_tipo_status
       }
    })
    swal(
      <div>
      <span> <h5>{st}</h5></span>
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
     ).then (res=>{
      this.modificarStatusFase(id_fase);
     })
  }
  handleCargoFase=(idFase, status)=>{
    fetch(`/api/fases/cargo/fase/${idFase}`)
    .then(res =>res.json())
    .then(res =>{
      this.setState({cargosFase: res.map((r=>r))})
    }).then(res =>{
      console.log("hola");
        swal(
          <table id="t02">
          <tr>
            <th>Cargos</th> 
            <th></th>  
          </tr>

          {this.state.cargosFase.map((cargo, i) => {
            return (
              <tr key={i}>
                <td> {cargo.cargo}</td>
              </tr>
            );
          })}
        </table>
        )
  })
}
  handleMaquinariaFase=(idFase)=>{
  fetch(`/api/fases/get/maquinaria/fase/${idFase}`)
  .then(res =>res.json())
  .then(res =>{
    this.setState({maquinariaFase: res.map((r=>r))})
  }).then (res =>{
    swal(
      <table id="t02">
      <tr>
        <th>Maquinaria Necesitada</th>  
      </tr>

      {this.state.maquinariaFase.map((maquinaria, i) => {
        return (
          <tr key={i}>
            <td> {maquinaria.maquinaria}</td>
          </tr>
        );
      })}
    </table>
    )
  })
  }

  handleGetInfo =(id_proyecto)=>{
    fetch(`/api/proyecto/etapa/fase/${id_proyecto}`)
    .then(res => res.json())
    .then(res => {
      if (res !== []) this.setState({ proyectoList: res.map(r => r) });
      console.log(res);
    })
    .then(res => {
     swal(
        <table id="t02">
          <label>Etapas y Fases </label>
          <tr>
            <th>Etapa</th>
            <th></th>
            <th>Fase</th>  
            <th></th>    
          </tr>

          {this.state.proyectoList.map((proyecto, i) => {
            console.log(proyecto);
            return (
              <tr key={i}>
                <td>{proyecto.etapa}</td>
                <td>
                  <div className="horario2">
                  <button  onClick={function(e) {
                       this.handleStatusEtapa(proyecto.idetapa);
                       }.bind(this)} > Status Etapa</button>
                   <button  onClick={function(e) {
                       this.cambiarStatusEtapa(proyecto.idetapa);
                       }.bind(this)} >Cambiar</button>     
                       </div>
                </td>
                <td>{proyecto.fase}</td>
                <td>
                  <div className="horario2">
                  <button  onClick={function(e) {
                       this.handleCargoFase(proyecto.idfase, proyecto.f_status);
                       }.bind(this)}> Cargos Fase</button></div>
                    <div className="horario2">
                  <button  onClick={function(e) {
                       this.handleMaquinariaFase(proyecto.idfase);
                       }.bind(this)}> Maquinaria Fase</button>
                    </div>
                    <div className="horario2">
                    <button  onClick={function(e) {
                       this.cambiarStatusFase(proyecto.idfase,proyecto.f_status);
                       }.bind(this)} >Cambiar</button> 
                    </div>
                     
                </td>
                
              </tr>
            );
          })}
        </table>
      );
      // this.setState({ selected : !this.state.selected});
    });
  }

  cambiarStatusEmpleado(id_fase){
    let fase={
      id_fase:id_fase,
      id_status:5
    }
    console.log("cambiando empl");
    fetch(`/api/status/modificar/status/proyecto/etapa/fase/empleados`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ fase: fase})
    }).then(res => res.json())
      .then(res=>{
        console.log("emp"+res);
        if (res.error)
        swal2("Error al asignar los empleados!", "Intente de nuevo!", "error");
        else swal2("La explotación ha iniciado!", "Todo bien", "success");;
      });
  }
  iniciarFase(id_etapa){
    let fase={
      id_etapa: id_etapa,
      id_status:2
    }
    fetch(`/api/status/modificar/status/proyecto/etapa/fase`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ fase: fase})
    }).then(res => res.json())
      .then(res=>{
        console.log("fas"+ res)
        if (res.error)
        swal2("Error al iniciar fase!", "Intente de nuevo!", "error");
        else this.cambiarStatusEmpleado(res[0].id_fase);
      });
  }
  iniciarEtapa(proyecto){
    fetch(`/api/status/modificar/status/proyecto/etapa`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ proyecto: proyecto})
    }).then(res => res.json())
      .then(res=>{
       
        if (res.error)
        swal2("Error al iniciar etapa!", "Intente de nuevo!", "error");
        
        else this.iniciarFase(res[0].id_etapa);
        console.log("eta"+res[0].id_etapa);
      });
    
  }
  iniciarYacimiento(proyecto, id_yacimiento){
    
  let yacimiento={
      id_yacimiento: id_yacimiento,
      id_status:2
  }
  fetch(`/api/status/modificar/status/yacimiento`, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ yacimiento: yacimiento})
  }).then(res => res.json())
    .then(res=>{
      console.log("yac"+res);
      if (res.error)
      swal2("Error al explotar yacimiento!", "Intente de nuevo!", "error");
      else this.iniciarEtapa(proyecto)
    });
  }
  iniciar(id_proyecto){
    let proyecto={
      id_status: 2,
      id_proyecto:id_proyecto
    }
    fetch(`/api/proyecto/cambiarStatus`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ proyecto: proyecto})
    }).then(res => res.json())
      .then(res=>{
        console.log("pro"+res);
        if (res.error)
        swal2("Error al iniciar le proyecto!", "Intente de nuevo!", "error");
        else   this.iniciarYacimiento(proyecto,res[0].fk_yacimiento);
      })
      
    
  
    
  }
 handleIniciar=(id_proyecto, status)=>{
 if (status==='Asignado'){
  this.iniciar(id_proyecto);
 } else if (status==='En ejecucion'){
  swal2("El proyecto está en explotacioón!", "Inicie otro proyecto!", "warning");
 }
 else{
  swal2("El proyecto no ha sido asignado aún!", "Inicie otro proyecto!", "warning");

 }
 }
  
 addBotton = proyectos => {
    var proyecto = [];
    this.props.proyectos.map(proyec => {
      let p = {
        nombre: proyec.proyecto,
        yacimiento: proyec.yacimiento,
        duracion: proyec.duracion,
        status: proyec.status,
        ver_mas: (
          <div className="horario">
               <button
                       onClick={function(e) {
                       this.handleGetInfo(proyec.id);
                       }.bind(this)}  >  Ver más 
             </button>
             </div>
        ),
        iniciar: (
          <div className="horario">
               <button
                       onClick={function(e) {
                       this.handleIniciar(proyec.id, proyec.status);
                       }.bind(this)}  >  Iniciar
             </button>
             </div>
        )
      };
      proyecto.push(p);
    });
    return proyecto;
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
          label: "Yacimiento Explotado",
          field: "yacimiento",
          sort: "asc",
          width: 200
        },
        {
          label: "Duracion",
          field: "duracion",
          sort: "asc",
          width: 270
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
          width: 270
        }
       
      ],
      rows: this.addBotton(this.props.proyectos)
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
export default ConsultTableProyectos;
