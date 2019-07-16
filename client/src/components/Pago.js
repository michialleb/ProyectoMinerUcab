
import React, { Component } from "react";
import "../styles/ConsultTable.css";
import "../styles/Form.css";
import swal from "sweetalert";
import { Row, Col, Form, Card} from 'react-bootstrap';


class Pago extends Component {
  constructor(props) {
    super(props);
    this.state = {  
        tipo_pago:"",
        banco:"",
        pagos:[],
        credito:false,
        debito:false,
        cheque:false,
        transferencia:false,
        bancos:[],
        id_tipo_pago:0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeBanco= this.handleChangeBanco.bind(this);
    this.procesarPago =this.procesarPago.bind(this);
  } 
  
  handleChangeBanco(e) {
    let target = e.target;
    let value =  target.value;
    this.setState({
      banco: value
    });
    let i=0;
    this.state.pagos.map((pa)=>{
        if((pa.pago==this.state.tipo_pago)&&(pa.banco==value)){
            i=pa.id;
        }
    })
    this.setState({id_tipo_pago:i})
}
  handleChange(e) {
    let target = e.target;
    let value =  target.value;
    this.setState({
      tipo_pago: value
    });
    switch (value) {
        case "Tarjeta_Credito":
          this.setState({credito: true,debito: false,transferencia: false});
        break
        case "Tarjeta_Debito":
            this.setState({debito: true,credito: false,transferencia: false});
        break
        case "Transferencia":
           this.setState({debito: false,credito: false,transferencia: true})
          break
        default:
          
        break
      }
      let banco=[];
      this.state.pagos.map((pago)=>{
          if(pago.pago==value){
           banco.push(pago.banco)
          }
      });
      this.setState({bancos:banco})


  }
 procesarPago(){
    let pag={
         fecha: this.props.fecha_compra,
         id_compra: this.props.id_compra,
         total:this.props.total,
         id_tipo_pago: this.state.id_tipo_pago
     }
    fetch(`/api/tipo_pago/agregarPago`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ pag: pag})
      })
        .then(res => res.json())
        .then(res=>{
            swal("Compra realizada", "Satisfactoriamentes!", "success");
        })
    
    
 }
getPagos(){
        fetch("/api/tipo_pago/buscar")
          .then(res => res.json())
          .then(res => {
            var pagos = res.map(r => r);
            this.setState({ pagos });
          });
}

componentDidMount(){
    this.getPagos();
}
  render() {
    
    return (
      <>
      <div className="wrapper">
          <div className="form-wrapper">
            <h5>Realizar Pago</h5>
            <form className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Tipo:</label>
                <select
                      value={this.state.tipo_pago}
                      onChange={this.handleChange}>
                      <option />
                      {this.state.pagos.map((pago, i) => (
                      <option value={pago.pago}  key={i}>
                      {pago.pago}
                      </option>))}
                 </select>
              </div>
              <div className="firstName">
                <label htmlFor="firstName">Banco:</label>
                <select
                      onChange={this.handleChangeBanco}>
                      <option />
                      {this.state.bancos.map((banco, i) => (
                      <option value={banco}  key={i}>
                      {banco}
                      </option>))}
                 </select>
              </div>
              <div className={this.state.credito ? "credito": "no_credito"}>
              <Form>
                 <Row>
                    <Col>
                     <Form.Control placeholder="Nombre" />
                    </Col>
                    <Col>
                    <Form.Control placeholder="Apellido" />
                   </Col>
                   <Col>
                    <Form.Control className="pago_cedula" type="number" placeholder="Cedula" />
                   </Col>
                   <Col>
                    <Form.Control  type="number" placeholder="Numero Tarjeta" />
                   </Col>
                   <Col>
                    <Form.Control  type="password" placeholder="Código secreto" />
                   </Col>
                </Row>
              </Form>
              </div>
              <div className={this.state.debito ? "debito": "no_debito"}>
              <Form>
                 <Row>
                    <Col>
                     <Form.Control placeholder="Nombre" />
                    </Col>
                    <Col>
                    <Form.Control placeholder="Apellido" />
                   </Col>
                   <Col>
                    <Form.Control className="pago_cedula" type="number" placeholder="Cedula" />
                   </Col>
                   <Col>
                    <Form.Control  type="number" placeholder="Numero Tarjeta" />
                   </Col>
                   <Col>
                    <Form.Control  type="password" placeholder="Contrasena" />
                   </Col>
                </Row>
              </Form>
              </div>
              <div className={this.state.transferencia ? "transferencia": "no_transferencia"}>
              <Card bg="light" style={{ width: '18rem' }}>
                <Card.Header></Card.Header>
                <Card.Body>
                <Card.Title>Transferir a: </Card.Title>
                <Card.Text> Banco: Mercantil </Card.Text>
                <Card.Text> Cuenta: Corriente </Card.Text>
                <Card.Text> RIF: J-3434523123 </Card.Text>
                <Card.Text> Número de cuenta: 1002324423424454 </Card.Text>
                <Col>
                     <Form.Control placeholder="Ingrese numero de referencia" />
                </Col>
                 </Card.Body>
             </Card>
             </div>
       
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.procesarPago}>
                  Procesar Pago
                </button>
              </div>
            </form>
          </div>
        </div>
  
      </>
    );
  }
}
export default Pago;