import React, { Component } from "react";
import Menu from "../components/Menu";
import Reportes from "../components/Reportes";

export default class InfoRelevante extends Component {
  render() {
    var crud = {
      options: ["Reportes"],
      content: [
        {
          form: <Reportes/>,
          id: 0
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
