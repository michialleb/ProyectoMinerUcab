import React, { Component } from "react";
import Menu from "../components/Menu";
import ConsultTableEmpresas from "../components/ConsultTableEmpresas";

export default class EmpresasAliadas extends Component {
  constructor() {
    super();

    this.state = {
      empresaAliadaList: ""
    };
  }

  getEmpresaAliada = nombre => {
    fetch(`/api/empresaAliada/${nombre}`)
      .then(res => res.json())
      .then(res => {
        var empresaAliadaList = res.map(r => r);
        this.setState({ empresaAliadaList });
      });
  };

  getempresaAliadaList = () => {
    fetch("/api/empresaAliada")
      .then(res => res.json())
      .then(res => {
        var empresaAliadaList = res.map(r => r);
        this.setState({ empresaAliadaList });
      });
  };

  componentDidMount() {
    this.getEmpresaAliada();
  }
  render() {
    var empresaAliada = this.state.empresaAliadaList;
    var consult = {
      consult: ["Nombre", "Fecha de creación", "Valor"]
    };

    var crud = {
      options: ["Ingresar ", "Consultar ", "Eliminar ", "Modificar"],
      content: [
        {
          form: null, //colocar formato de ingreso
          id: 0
        },
        {
          form: (
            <ConsultTableEmpresas
              empresas={empresaAliada}
              consult={consult}
              getEmpresa={this.getEmpresaAliada}
            />
          ),
          id: 1
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
