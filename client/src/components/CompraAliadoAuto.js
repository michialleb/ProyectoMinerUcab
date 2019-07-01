import React, { Component } from "react";
import { process } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "../styles/Form.css";
import swal from "sweetalert";
import ActivarProyecto from "./ActivarProyecto";


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


getEmpresa = (id)=> {
      var empresas=[];
      fetch(`/api/empresaAliada/empresa/mineral/${id}`)
      .then(res => res.json())
      .then(res => {
        empresas= res.map(r => r)
        return empresas;
       })
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

  addCompraAliado(){
    this.state.listaId.map((id,i)=>{
      let compra={
        cantidad: this.state.mineralesList[i].cantidad,
        monto:  this.state.mineralesList[i].cantidad * this.state.mineralesList[i].costo,
        empresas: this.getEmpresa(id),
        id_mineral: this.props.id_mineral,
        id_mineral_presentacion: this.state.mineralesList[i].id_mp
      };
      console.log(compra);
   /*   fetch("/api/empresaAliada", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ compra_aliado: compra })
      }).then(res => res.json())*/
    })
   
  }

  handleAvanzarProyecto(){

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
        this.addCompraAliado();
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
