import React, { Component } from "react";
import people from "../images/people.jpg";

export default class Account extends Component {
  render() {
    return (
      <div className="account">
        <a> Your Account</a>
        <div clasName="perfil">
          <img src={people} alt="Filomena Diaz" />
          <a>Filomena</a>
        </div>
      </div>
    );
  }
}
