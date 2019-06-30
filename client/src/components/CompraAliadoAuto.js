import React, { Component } from "react";
import { process } from "mdbreact";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "../styles/Form.css";

class CompraAliadoAuto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mineralesList: [],
      costoMinerales: []
    };
  }

  getMineralesCompuestos(id_mineral) {
    fetch(`/api/minerales/mineralCompuesto/${id_mineral}`)
      .then(res => res.json())
      .then(res => {
        var mineralesList = res.map(r => r);
        this.setState({ mineralesList });
      })
      .then(res => {});
  }

  getCostoMineralesCompuestos = id_mineral => {
    fetch(`/api/minerales/mineralCompuesto/costo/${id_mineral}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        var costoMinerales = res.map(r => r);
        return costoMinerales;
      });
  };

  // hacer la funcion costo 
  componentDidMount() {
    this.getMineralesCompuestos(this.props.id_mineral);
  }

  render() {
    return (
      <>
        <div className="wrapper">
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
              {this.state.mineralesList.map(mineral => {
                return (
                  <tr>
                    <th>{mineral.nombre}</th>
                    <th>{this.props.cantidad}</th>
                    <th>
                      {this.getCostoMineralesCompuestos(mineral.id)[0].costo}
                    </th>
                    <th> {this.props.cantidad * mineral.costo} </th>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
      </>
    );
  }
}
export default CompraAliadoAuto;
