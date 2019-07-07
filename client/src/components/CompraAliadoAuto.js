import React, { Component } from "react";
import { process } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "../styles/Form.css";
import swal from "sweetalert";
import ActivarProyecto from "./ActivarProyecto";
import swal2 from 'sweetalert';


class CompraAliadoAuto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mineralesList: [],
      costoMinerales: [],
      total:0,
      listaId: [], 
      avanzarProyecto: false,
      empresasList:[],
      montoMineralComprado:0,
      id_proyecto:0,
      id_compra_cliente:0,
      fecha_compra:""
    };
    this.handleAvanzarProyecto = this.handleAvanzarProyecto.bind(this);
  }

  getMineralesCompuestos(id_mineral) {
    console.log("get id mineral"+id_mineral);
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

  cambiarStatusProyecto(id_proyecto){
    let proyecto={
      id_status:8,
      id_proyecto:id_proyecto
    }
    fetch("/api/proyecto/cambiarStatus", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ proyecto: proyecto })
    }).then(res => res.json())
      .then (res=>{
        let yacimiento={
          id_status:8,
          id_yacimiento:res[0].fk_yacimiento
        }
        fetch("/api/status/modificar/status/yacimiento", {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ yacimiento: yacimiento })
        }).then(res => res.json())    
      })
  }
  addCompraCliente(){
    let compra={
      cantidad: this.props.cantidad,
      monto:  this.state.montoMineralComprado,
      cliente:this.props.cliente,
      id_mineral: this.props.id_mineral,
      id_mineral_presentacion: this.props.id_mineral_presentacion,
      status:2
    };
    fetch("/api/clientes/compra/persona", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ compra: compra })
    }).then(res => res.json())
    .then (res =>{
      let proyecto ={
         id_mineral: this.props.id_mineral,
         cantidad: this.props.cantidad,
         compra_cliente: res[0].id_compra_cliente
      }
      let h=res[0].fecha_compra.split(["T"]);
      this.setState({id_compra_cliente: res[0].id_compra_cliente, fecha_compra: h})
    
      fetch("/api/clientes/proyecto/compra/persona", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ proyecto: proyecto})
      }).then(res => res.json())
       .then(res=>{
        
        if (res[0].fk_proyecto==null) swal2("No se encontraron yacimientos disponibles", "Intente de nuevo!", "error")
         else {
           this.setState({id_proyecto: res[0].fk_proyecto})
           this.cambiarStatusProyecto(res[0].fk_proyecto)};
      })
      .then(res=>{
        this.setState({ avanzarProyecto: !this.state.avanzarProyecto});
      })
    })
  
}

  addCompraAliado(){
    this.state.listaId.map((id,i)=>{
      fetch(`/api/empresaAliada/empresa/mineral/${id}`)
      .then(res => res.json())
      .then(res => {
       // console.log("estas son las empresas"+res);
        let compra={
          cantidad: this.state.mineralesList[i].cantidad,
          monto:  this.state.mineralesList[i].cantidad * this.state.mineralesList[i].costo,
          empresas:res[0].nombre_empresa,
          id_mineral: this.props.id_mineral,
          id_mineral_presentacion: this.state.mineralesList[i].id_mp
        };
       fetch("/api/empresaAliada", {
          method: "post",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ compra: compra })
        }).then(res => res.json())
        .then (res =>{
         
        })

       });
    });
    this.addCompraCliente(); 
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
        
      } else {
        swal("Your imaginary file is safe!");
      }
    })   
  }
  getInfo(id_mineral_presentacion){
    fetch(`/api/clientes/factura/compra/cliente/getInfo/${id_mineral_presentacion}`)
    .then(res => res.json())
    .then(res => {
     var mineral = res.map((r=> r));
     var total=0;
     mineral.map((m)=>{
      total= m.costo * this.props.cantidad
     });
     this.setState({montoMineralComprado: total}) 
     });
  }

  componentDidMount() {
    this.getMineralesCompuestos(this.props.id_mineral);
    this.getInfo(this.props.id_mineral_presentacion);
  }

  render() {
    return (
      <>
        
        <div  className={this.state.avanzarProyecto? "wrapper-c_no_show" : "wrapper-c"  }>
        <div className="form-wrapper">
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
          </div>
          {this.state.avanzarProyecto ? <ActivarProyecto proyecto={this.state.id_proyecto} 
                                                         fecha_compra={this.state.fecha_compra}
                                                         id_compra={this.state.id_compra_cliente}
                                                         total={this.state.montoMineralComprado}/> : null}
       
      </>
    );
  }
}
export default CompraAliadoAuto;