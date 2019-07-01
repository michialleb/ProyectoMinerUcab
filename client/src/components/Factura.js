import React, { Component } from "react";
import "../styles/Form.css";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import swal from "sweetalert";
class Factura extends Component {

  constructor(props) {
    super(props);
    this.state = {
     mineral:[], 
     total:0,
     compra :false
    };

  
  }

  addCompraCliente(){
        let compra={
          cantidad: this.props.cantidad,
          monto:  this.state.total,
          cliente:this.props.cliente,
          id_mineral: this.props.id_mineral,
          id_mineral_presentacion: this.props.id_mineral_presentacion
        };
        console.log(compra);
        
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
          fetch("/api/clientes/proyecto/compra/persona", {
            method: "post",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ proyecto: proyecto})
          }).then(res => res.json())

        })
      
  }
  handleTerminarCompra(){

    swal({
     title: "Estás seguro?",
     text: "Tu compra será procesada",
     icon: "warning",
     buttons: true,
     dangerMode: true,
   })
   .then((willDelete) => {
     if (willDelete) {
       swal("Poof! Your imaginary file has been deleted!", {
         icon: "success",
       });
       this.addCompraCliente();
      // this.setState({ compra: !this.state.compra});
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
     })
    console.log(res);
     this.setState({ mineral: mineral});
     this.setState({total:total})
     
     })
  }

  componentDidMount(){
    this.getInfo(this.props.id_mineral_presentacion);
  }
  render() {
    return (
      <>
       {console.log(this.props.nombre_persona)}
        <div  className={this.state.avanzarProyecto? "wrapper-c_no_show" : "wrapper-c"  }>
        <div className="form-wrapper">
          <h7>Factura: </h7>
          <div>
          <div>
              <span>{this.props.nombre_persona}</span>
              <h7>{this.props.apellido_persona}</h7>
              <h7>{this.props.cliente}</h7>
          </div>
        </div>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <td>Mineral</td>
                <td>Presentación</td>
                <td>Cantidad</td>
                <td>Costo</td>
                <td>Total</td>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
            {this.state.mineral.map((min) => {
                return (
                  <tr>
                    <th>{min.mineral }</th>
                    <th>{min.presentacion }</th>
                    <th>{this.props.cantidad}</th>
                    <th> {min.costo}
                    </th>
                    <th> {this.props.cantidad* min.costo} </th>
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
                    this.handleTerminarCompra(e);
                  }.bind(this)}> Aceptar compra </buttom>
          </div>
          </div>
      </>
    );
  }
}
export default Factura;
