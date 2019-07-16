import React, { Component } from "react";
import "../styles/Form.css";

import { MDBDataTable} from "mdbreact";

class ConsultTableInventario extends Component {
  constructor() {
    super();
  }
  
  render() {

    const data = {
      columns: [
        {
          label: "Mineral",
          field: "mineral",
          sort: "asc",
          width: 150
        },
        {
          label: "Presentación",
          field: "prsentacion",
          sort: "asc",
          width: 270
        },
        {
          label: "Cantidad",
          field: "cantidad",
          sort: "asc",
          width: 200
        }
      ],
      rows: this.props.inventario
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

export default ConsultTableInventario;
