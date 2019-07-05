import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { MDBDataTable} from "mdbreact";
import swal from "@sweetalert/with-react";
import swal2 from "sweetalert";



class ConsultTableAliados extends Component {
  constructor(props) {
    super(props);
    this.state = {
     status:""
    };
  this.handleChangeStatus= this.handleChangeStatus.bind(this);
  }
  handleChangeStatus(e) {
    let target = e.target;
    let value = target.value;
   this.setState({
      status: value
    });
     
  }
  modificarStatus(id_compra){
  let id_status=0;
  this.props.status.map((s)=>{
    if(s.nombre_tipo_status==this.state.status){
     id_status=s.id_tipo_status;
    }
  });
  let compra={
    id_status: id_status,
    id_compra:id_compra
  }

    fetch(`/api/status/modificarStatus`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ compra: compra})
    }).then(res => res.json())
      .then(res=>{
        if (res.error)
        swal2("Ocurrió un error!", "Intente de nuevo!", "error");
      else swal2("Persona modificada!", "Satisfactoriamente!", "success");
      })
  }

  modificarStatusSwal(id){
     swal(
      <select
      onChange={this.handleChangeStatus} >
      <option />
      {this.props.status.map((s, i) => (
        <option value={s.nombre_tipo_status} key={i}>
          {s.nombre_tipo_status}
        </option>
      ))}
    </select>
     ).then (res=>{
      this.modificarStatus(id);
     })
  }

 
  addBotton = () => {
    var compra = [];
    this.props.compras.map(compras => {
      var date = compras.fecha.split(["T"], [1]);
      let m = {
        fecha: date,
        empresa: compras.empresa,
        mineral: compras.mineral +" en "+ compras.presentacion,
        monto: compras.monto,
        status: compras.status,
        
        ver_mas: (
          <div className="horario">
          <button
            onClick={function(e) {
              this.modificarStatusSwal(compras.id);
            }.bind(this)}
          >
            {" "}
            Status
          </button>
          </div>
        )
      };
      compra.push(m);
    });
    return compra;
  };

  render() {
    const data = {
        columns: [
          {
            label: "Fecha",
            field: "fecha",
            sort: "asc",
            width: 150
          },
          {
            label: "Empresa",
            field: "empresa",
            sort: "asc",
            width: 270
          },
          {
            label: "Mineral",
            field: "mineral",
            sort: "asc",
            width: 200
          },
          {
            label: "Total",
            field: "cantidad",
            sort: "asc",
            width: 200
          },
          
          {
            label: "Estatus",
            field: "status",
            sort: "asc",
            width: 200
          }
        ],
        rows: this.addBotton()
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
export default ConsultTableAliados;
