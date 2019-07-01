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
      statusEtapa: []
    };
    this.handleGetInfo = this.handleGetInfo.bind(this);
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
  handleStatusFase=(id)=>{

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
                  <div className="horario">
                  <button  onClick={function(e) {
                       this.handleStatusEtapa(proyecto.idetapa);
                       }.bind(this)} > Status Etapa</button></div>
                </td>
                <td>{proyecto.fase}</td>
                <td>
                  <div className="horario">
                  <button  onClick={function(e) {
                       this.handleMasInfoFase(proyecto.idfase);
                       }.bind(this)}> Mas Info Fase</button></div>
                </td>
              </tr>
            );
          })}
        </table>
      );
      // this.setState({ selected : !this.state.selected});
    });
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
