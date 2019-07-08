import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from "react-router-dom";
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
          title={this.props.match.params.nombre}
          subtitle="" />,
          id: 0
        }
      ]
    };
    return <Menu crud={crud} />;
  }
}

export default Sesion;
