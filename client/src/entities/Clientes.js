import React, { Component } from "react";
import Menu from "../components/Menu";
import Hero from "../components/Hero";
import Form from "../components/Form";
import FormCliente from "../components/FormClienteEmpresa";
import FormCompraCliente from "../components/FormCompraCliente";
import ConsultarCliente from "../components/ConsultTableClientes";
import EliminarCliente from "../components/EliminarCliente";
export default class Clientes extends Component {
  constructor() {
    super();

    this.state = {
      mineralesList: [],
      lugarList: [],
      personaList: [],
      empresaList: []
    };
  }

  handleGetPersonaCedula = cedula => {
    fetch(`/api/clientes/${cedula}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ personaList: res.map(r => r) });
      });
  };

  handleGetEmpresaRif = rif => {
    fetch(`/api/clientes/empresa/${rif}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ empresaList: res.map(r => r) });
      });
  };

  getMineralesList = () => {
    fetch("/api/minerales")
      .then(res => res.json())
      .then(res => {
        var mineralesList = res.map(r => r);
        this.setState({ mineralesList });
      });
  };
  getLugarList = () => {
    fetch("/api/lugar")
      .then(res => res.json())
      .then(res => {
        var lugarList = res.map(r => r);
        this.setState({ lugarList });
      });
  };

  getPersonaList = () => {
    fetch(`/api/clientes/getPersona`)
      .then(res => res.json())
      .then(res => {
        var personaList = res.map(r => r);
        this.setState({ personaList });
      });
  };

  getEmpresaList = () => {
    fetch(`/api/clientes/getEmpresa`)
      .then(res => res.json())
      .then(res => {
        var empresaList = res.map(r => r);
        this.setState({ empresaList });
      });
  };

  componentDidMount() {
    this.getMineralesList();
    this.getLugarList();
    this.getEmpresaList();
    this.getPersonaList();
  }
  render() {
    var minerales = this.state.mineralesList;
    var lugares = this.state.lugarList;
    var personas = this.state.personaList;
    var empresas = this.state.empresaList;
    var consult = {
      persona: [
        "Nombre",
        "Apellido",
        "Cedula",
        "Nacimiento",
        "Direccion",
        "Sexo",
        "Correo",
        "Telefono"
      ],
      empresa:[
        "Nombre",
        "Rif",
        "Correo",
        "Telefono",
        "Direccion"
      ]
    };
    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar", "Compra"],
      content: [
        {
          form: <FormCliente lugares={lugares} />,
          id: 0
        },
        {
          form: (
            <ConsultarCliente
              personas={personas}
              empresas={empresas}
        
            />
          ),
          id: 1
        },
        {
          form: (<EliminarCliente
          consult={consult}/>),
          id: 2
        },
        {
          form: "",
          id: 3
        },
        {
          form: (
            <FormCompraCliente
              minerales={minerales}
              personas={personas}
              empresas={empresas}
              getPersonaCedula={this.handleGetPersonaCedula}
              getEmpresaRif={this.handleGetEmpresaRif}
            />
          ),
          id: 4
        }
      ],
      a: <Hero />
    };

    return <Menu crud={crud} />;
  }
}
