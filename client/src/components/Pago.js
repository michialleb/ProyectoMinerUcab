
import React, { Component } from "react";
import "../styles/ConsultTable.css";
import "../styles/Form.css";
import swal from "@sweetalert/with-react";


class Pago extends Component {
  constructor(props) {
    super(props);
    this.state = {  
        tipo_pago:"",
        pagos:[],
        credito:false,
        debito:false,
        cheque:false,
        transferencia:false
    };
    this.handleChange = this.handleChange.bind(this);
  } 
  
  handleChange(e) {
    let target = e.target;
    let value =  target.value;
    this.setState({
      pagos: value
    });
    switch (value) {
        case "Tarjeta_Credito":
          this.setState({credito: true});
        break
        case "Tarjeta_Debito":
            this.setState({debito: true});
        break
        case "Cheque":
            this.setState({cheque: true});
        break
        case "Transferencia":
           this.setState({transferencia: true})
          break
        default:
          
        break
      }


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