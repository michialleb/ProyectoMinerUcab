import React, { Component } from "react";
import {
  FaHome,
  FaUser,
  FaHammer,
  FaBoxOpen,
  FaHardHat,
  FaBook,
  FaBars,
  FaPowerOff
} from "react-icons/fa";
import Account from "./Account";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import perfil from "../images/perfil.png";

// link de react-icons https://react-icons.netlify.com/#/icons/fa
export default class Menu extends Component {
  state = {
    isOpen: false,
    option: [
      {
        icon: <FaHome />,
        title: "Home"
      },
      {
        icon: <FaHardHat />,
        title: "Empleados"
      },
      {
        icon: <FaHammer />,
        title: "Yacimientos"
      },
      {
        icon: <FaUser />,
        title: "Clientes"
      },
      {
        icon: <FaBoxOpen />,
        title: "Inventario"
      },
      {
        icon: <FaBook />,
        title: "Información Reelevante"
      }
    ]
  };
  desplegar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="menu">
        <div className={this.state.isOpen ? "header-show" : "header"}>
          <button
            type="button"
            className="sidenav-btn"
            onClick={this.desplegar}
          >
            <FaBars className="sidenav-icon" />
          </button>
        </div>
        <div className="sidenav">
          <div
            className={this.state.isOpen ? "sidenav-show" : "sidenav-noshow"}
          >
            <ul>
              {this.state.option.map((item, index) => {
                return (
                  <li key={index} isSelect>
                    <span className="icons">{item.icon}</span>
                    <span>{item.title}</span>
                  </li>
                );
              })}
              <Account />
              <div className="log-out">
                <span>Log Out</span>
                <span className="log-btn">
                  <FaPowerOff>
                    <Link to="/" />
                  </FaPowerOff>
                </span>
              </div>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
