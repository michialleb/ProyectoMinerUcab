import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { MDBDataTable } from "mdbreact";

class ConsultTableClientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cedula: "",
      rif: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetPersona = this.handleGetPersona.bind(this);
    this.handleGetEmpresa = this.handleGetEmpresa.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleGetPersona(e) {
    this.props.getPersonaCedula(this.state.cedula);
    console.log(this.props.personas);
  }

  handleGetEmpresa(e) {
    this.props.getEmpresaRif(this.state.rif);
  }

  Persona() {
    document.getElementById("persona").style.display = "block";
    document.getElementById("empresa").style.display = "none";
    if (document.getElementById("btn-p").style.background === "orange") {
      document.getElementById("btn-p").style.background = "#333";
      document.getElementById("btn-p").style.color = "orange";
    } else {
      document.getElementById("btn-p").style.background = "orange";
      document.getElementById("btn-p").style.color = "#333";
    }
  }

  Empresa() {
    document.getElementById("persona").style.display = "none";
    document.getElementById("empresa").style.display = "block";
    if (document.getElementById("btn-e").style.background === "orange") {
      document.getElementById("btn-e").style.background = "#333";
      document.getElementById("btn-e").style.color = "orange";
    } else {
      document.getElementById("btn-e").style.background = "orange";
      document.getElementById("btn-e").style.color = "#333";
    }
  }
  
  addButtom = empresas =>{
    var emps = [];
    this.props.empresas.map(emp => {
      let e = {
        nombre: emp.nombre,
        rif: emp.rif,
        telefono: emp.telefono,
        correo: emp.correo,
        direccion: emp.estado + ", " + emp.municipio + ", " + emp.provincia,
        mas: (
          <div className="horario">
          <button>
            {" "}
            Ver más{" "}
          </button>
          </div>
        )
      };
      emps.push(e);
    });
    return emps;
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
        mas: (
          <div className="horario">
          <button>
            {" "}
            Ver más{" "}
          </button>
          </div>
        )
      };
      pers.push(e);
    });
    return pers;
  };
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
        }
        ,
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
      rows: this.addBotton(this.props.personas).bind(this)
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
      rows: this.addButtom(this.props.empresas).bind(this)
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
