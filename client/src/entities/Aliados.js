import React, { Component } from "react";
import Menu from "../components/Menu";
import Hero from "../components/Hero";
import ConsultTableAliados from "../components/ConsultTableAliados";

export default class Aliados extends Component {
  constructor() {
    super();

    this.state = {
    
    };
  }
  
  render() {
  
    var crud = {
      options: ["Consultar Compras Aliados"],
      content: [
        {
          form: <ConsultTableAliados />,
          id: 0
        }
      ],
      a: <Hero />
    };

    return <Menu crud={crud} />;
  }
}
