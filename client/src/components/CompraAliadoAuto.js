import React, { Component } from "react";
import { process } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "../styles/Form.css";
import swal from "sweetalert";
import ActivarProyecto from "./ActivarProyecto";

function  GetEmpresas (props){

  var empresas=[];
  props.ids.map((id)=>{
    fetch(`/api/empresaAliada/empresa/mineral/${id}`)
    .then(res => res.json())
    .then(res => {
       var empresa= res.map(r => r)
       empresas.push( empresa);
      })
    });
    return (
          empresas.map((e)=>
          ( <h4> e.nombre</h4>)
      )
    );
      
   
}
class CompraAliadoAuto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mineralesList: [],
      costoMinerales: [],
      total:0,
      listaId: [], 
      avanzarProyecto: false
    };
    this.handleAvanzarProyecto = this.handleAvanzarProyecto.bind(this);
  }

  getMineralesCompuestos(id_mineral) {
    console.log("get costo mineral"+id_mineral);
    fetch(`/api/minerales/mineralCompuesto/${id_mineral}`)
      .then(res => res.json())
      .then(res => {
        var mineralesList = res.map(r => r);
        this.setState({ mineralesList : mineralesList});
        var total= 0, id=[];
        mineralesList.map((m)=>{
           total=(m.costo * m.cantidad) + total;
          id.push(m.id);
        })
        
        this.setState({total: total, listaId:id})
      })
      
  }

  handleAvanzarProyecto(){

   
    console.log("holaaa")
    
     swal({
      title: "Estás seguro?",
      text: "Comenzarás el proceso de configuración de la explotación",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
        this.setState({ avanzarProyecto: !this.state.avanzarProyecto});
      } else {
        swal("Your imaginary file is safe!");
      }
    })   
  }
  // hacer la funcion costo 
  componentDidMount() {
    this.getMineralesCompuestos(this.props.id_mineral);
 
  }

  render() {
    return (
      <>
        
        <div  className={this.state.avanzarProyecto? "wrapper-c_no_show" : "wrapper-c"  }>
          <h7>Orden de Compra</h7>
          <div>
            <GetEmpresas ids={this.state.listaId}/>
        </div>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <td>Mineral</td>
                <td>Cantidad</td>
                <td>Costo</td>
                <td>Total</td>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {this.state.mineralesList.map((mineral) => {
                
                return (
                  <tr>
                    <th>{mineral.nombre}</th>
                    <th>{mineral.cantidad}</th>
                    <th> {mineral.costo}
                    </th>
                    <th> {mineral.cantidad * mineral.costo} </th>
                  </tr>
                );
              })}
            </MDBTableBody>
            <MDBTableHead>
              <tr>
                <td></td>
                <td></td>
                <td>Subtotal</td>
                <td> {this.state.total} </td>
              </tr>
            </MDBTableHead>
          </MDBTable>
          <buttom className="ingresarUsuario" onClick ={function(e) {
                    this.handleAvanzarProyecto(e);
                  }.bind(this)}> Aceptar compra </buttom>
          </div>
          {this.state.avanzarProyecto ? <ActivarProyecto /> : null}
       
      </>
    );
  }
}
export default CompraAliadoAuto;
