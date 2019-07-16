import React, { Component } from "react";
import Menu from "../components/Menu";
import Hero from "../components/Hero";
import ConsultTableAliados from "../components/ConsultTableAliados";

export default class Aliados extends Component {
  constructor() {
    super();

    this.state = {
      comprasList:[],
      statusList:[]
    };
  }
   
  getComprasList = () => {
    fetch("/api/empresaAliada/get/empresa/compras/aliados")
      .then(res => res.json())
      .then(res => {
        var comprasList = res.map(r => r);
        this.setState({ comprasList });
      });
  };
  getStatusList = () => {
    fetch("/api/status/buscar")
      .then(res => res.json())
      .then(res => {
        var statusList = res.map(r => r);
        this.setState({ statusList });
      });
  };
  componentDidMount(){
    this.getComprasList();
    this.getStatusList();
  }
 
  render() {
  
    var crud = {
      options: ["Consultar Compras Aliados", ""],
      content: [
        {
            form: (
              <ConsultTableAliados compras={this.state.comprasList} 
                                   status={this.state.statusList} />
            ),
            id: 0
          }
      ]
   
    };

    return <Menu crud={crud} />;
  }
}
