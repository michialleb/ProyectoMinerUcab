import React, { Component } from "react";
import "../styles/ConsultTable.css";
import swal from "@sweetalert/with-react";
import swal2 from "sweetalert";
import { MDBDataTable } from "mdbreact";

class ConsultTableClientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cedula: "",
      rif: "",
      status:"",
      comprasList: [],
      comprasEmpresaList: []
    };
    this.handleChangeStatus= this.handleChangeStatus.bind(this);
  }

  Persona() {
    document.getElementById("persona").style.display = "block";
    document.getElementById("empresa").style.display = "none";
    if (document.getElementById("btn-p").style.backgroundColor === "orange") {
      document.getElementById("btn-p").style.backgroundColor = "#333";
      document.getElementById("btn-p").style.color = "orange";
      document.getElementById("btn-e").style.backgroundColor = "orange";
    } else {
      document.getElementById("btn-p").style.background = "orange";
      document.getElementById("btn-p").style.color = "#333";
      document.getElementById("btn-e").style.backgroundColor = "#333";
    }
  }
  Empresa() {
    document.getElementById("persona").style.display = "none";
    document.getElementById("empresa").style.display = "block";
    if (document.getElementById("btn-e").style.backgroundColor === "orange") {
      document.getElementById("btn-e").style.backgroundColor = "#333";
      document.getElementById("btn-e").style.color = "orange";
      document.getElementById("btn-p").style.backgroundColor = "orange";
    } else {
      document.getElementById("btn-e").style.backgroundColor = "orange";
      document.getElementById("btn-e").style.color = "#333";
      document.getElementById("btn-p").style.backgroundColor = "#333";
    }
  }
  addButtom = empresas => {
    var empresa = [];
    this.props.empresas.map(emp => {
      let e = {
        nombre: emp.nombre,
        rif: emp.rif,
        telefono: emp.telefono,
        correo: emp.correo,
        direccion: emp.estado + ", " + emp.municipio + ", " + emp.provincia,
        compras: (
          <div className="horario">
            <button
              onClick={function(e) {
                this.getComprasEmpresa(emp.id);
              }.bind(this)}
            >
              {" "}
              Compras{" "}
            </button>
          </div>
        )
      };
      empresa.push(e);
    });
    return empresa;
  };
  addBotton = personas => {
    var pers = [];
    this.props.personas.map(per => {
      let e = {
        nombre: per.nombre,
        apellido: per.apellido,
        cedula: per.cedula,
        fnac: per.fnac,
        sexo: per.sexo,
        direccion: per.estado + ", " + per.municipio + ", " + per.provincia,
        correo: per.correo,
        telefono: per.telefono,
        Compras: (
          <div className="horario">
            <button
              onClick={function(e) {
                this.getComprasPersona(per.id);
              }.bind(this)}
            >
              {" "}
              Compras{" "}
            </button>
          </div>
        )
      };
      pers.push(e);
    });
    return pers;
  };

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
  
      fetch(`/api/status/modificarStatus/cliente`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ compra: compra})
      }).then(res => res.json())
        .then(res=>{
          if (res.error)
          swal2("Ocurrió un error!", "Intente de nuevo!", "error");
        else swal2("Cliente modificado!", "Satisfactoriamente!", "success");
        })
    }

  handleChangeStatus(e) {
    let target = e.target;
    let value = target.value;
   this.setState({
      status: value
    });
     
  }
  modificarStatusSwal(id_compra){
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
     this.modificarStatus(id_compra);
    })
 }
  getComprasEmpresa(id) {
    fetch(`/api/clientes/consultar/compras/empresa/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res !== []) this.setState({ comprasEmpresaList: res.map(r => r) });
      })
      .then(res => {
        swal(
          <table id="t02">
            <label>Compras Realizadas </label>
            <tr>
              <th>Fecha</th>
              <th>Mineral</th>
              <th>Presentacion</th>
              <th>Costo</th>
              <th>Total </th>
              <th>Status</th>
              <th></th>
            </tr>

            {this.state.comprasEmpresaList.map((compra, i) => {
              return (
                <tr key={i}>
                  <td>{compra.fecha.split(["T"], [1])}</td>
                  <td>{compra.mineral}</td>
                  <td>{compra.presentacion}</td>
                  <td>{compra.costo}</td>
                  <td>{compra.total}</td>
                  <td>{compra.status}</td>
                  <td>
                    <button className="horario" onClick={function(e) {
                                 this.modificarStatusSwal(compra.id);
                                 }.bind(this)} > Status</button>
                  </td>
                </tr>
              );
            })}
          </table>
        );
        // this.setState({ selected : !this.state.selected});
      });
  }

  getComprasPersona(id) {
    fetch(`/api/clientes/consultar/compras/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res !== []) this.setState({ comprasList: res.map(r => r) });
      })
      .then(res => {
        swal(
          <table id="t02">
            <label>Compras Realizadas</label>
            <tr>
              <th>Fecha</th>
              <th>Mineral</th>
              <th>Presentacion</th>
              <th>Cantidad</th>
              <th>Total </th>
              <th>Status</th>
              <th>      </th>
            </tr>

            {this.state.comprasList.map((compra, i) => {
              return (
                <tr key={i}>
                  <td>{compra.fecha.split(["T"], [1])}</td>
                  <td>{compra.mineral}</td>
                  <td>{compra.presentacion}</td>
                  <td>{compra.cantidad}</td>
                  <td>{compra.total}</td>
                  <td>{compra.status}</td>
                  <td>
                    <button className="horario" onClick={function(e) {
                                 this.modificarStatusSwal(compra.id);
                                 }.bind(this)}> Status</button>
                  </td>
                </tr>
              );
            })}
          </table>
        );
        // this.setState({ selected : !this.state.selected});
      });
  }
  render() {
    const dataPersona = {
      columns: [
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
          width: 150
        },
        {
          label: "Apellido",
          field: "apellido",
          sort: "asc",
          width: 150
        },
        {
          label: "Sexo",
          field: "sexo",
          sort: "asc",
          width: 100
        },
        {
          label: "Cedula",
          field: "cedula",
          sort: "asc",
          width: 200
        },
        {
          label: "Fecha Nacimiento",
          field: "fnac",
          sort: "asc",
          width: 200
        },
        {
          label: "Correo",
          field: "correo",
          sort: "asc",
          width: 200
        },
        {
          label: "Telefono",
          field: "telefono",
          sort: "asc",
          width: 200
        },
        {
          label: "Direccion",
          field: "direccion",
          sort: "asc",
          width: 270
        }
      ],
      rows: this.addBotton(this.props.personas)
    };
    const dataEmpresa = {
      columns: [
        {
          label: "Nombre",
          field: "nombre",
          sort: "asc",
          width: 150
        },
        {
          label: "RIF",
          field: "rif",
          sort: "asc",
          width: 270
        },
        {
          label: "Telefono",
          field: "telefono",
          sort: "asc",
          width: 200
        },
        {
          label: "Correo",
          field: "correo",
          sort: "asc",
          width: 200
        },
        {
          label: "Direccion",
          field: "direccion",
          sort: "asc",
          width: 200
        }
      ],
      rows: this.addButtom(this.props.empresas)
    };
    return (
      <>
        <div className="wrapper">
          <div className="buttonClienteshow">
            <button id="btn-p" type="submit" onClick={e => this.Persona(e)}>
              Consultar Cliente Persona
            </button>
            <button id="btn-e" type="submit" onClick={e => this.Empresa(e)}>
              Consultar Cliente Empresa
            </button>
          </div>

          <div id="persona">
            <MDBDataTable btn striped bordered hover data={dataPersona} />
          </div>
          <div id="empresa">
            <MDBDataTable btn striped bordered hover data={dataEmpresa} />
          </div>
        </div>
      </>
    );
  }
}

export default ConsultTableClientes;
