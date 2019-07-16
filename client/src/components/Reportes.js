import React, { Component } from "react";
import "../styles/Form.css";
import swal from "sweetalert";
import { MDBListGroup, MDBListGroupItem, MDBContainer,MDBDataTable  } from "mdbreact";


class Reportes extends Component {
  constructor() {
    super();

    this.state = {
    
    };

  this.getReporte1 = this.getReporte1.bind(this);
  }

  
 getReporte1(){
  var url = "http://localhost:8080/jasperserver/rest_v2/reports/reports/Reportes/ReporteEm.pdf";
  window.open(url);
 }

  render() {
    return (
      <>
      <div>
      <MDBContainer className="table-report">
           
           <MDBListGroup style={{ width: "75rem" , padding:0, margin:0 }}>
           <ul>
             <button  className ="btn-report" onClick={this.getReporte1}>
                Empresa Aliada con más compras realizadas
             </button>
          </ul>
          </MDBListGroup>
       </MDBContainer>
      </div>
      
       
      </>
    );
  }
}

export default Reportes;
