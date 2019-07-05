import React, { Component } from "react";
import Menu from "../components/Menu";
import Banner from "../components/Banner";
class Sesion extends Component {
  render() {
    var crud = {
      options: [""],
      content: [
        {
          form:  <Banner
          banner="welcome"
          title="Bienvenido"
          subtitle="" />,
          id: 0
        }
      ]
    };
    return <Menu crud={crud} />;
  }
}

export default Sesion;
