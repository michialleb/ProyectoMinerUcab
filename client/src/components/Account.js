import React, { Component } from "react";
import people from "../images/people.jpg";
import "../styles/Menu.css"

export default class Account extends Component {
  render() {
    return (
      <div className="account">
        <a> Your Account</a>
        <div className="perfil">
          <img src={people} alt="Andres Arriaga" />
          <h7>{localStorage.getItem('nombre_usuario')}</h7>
        </div>
      </div>
    );
  }
}
