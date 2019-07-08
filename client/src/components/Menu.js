import React, { Component } from "react";
import {
  FaHome,
  FaUser,
  FaUserCog,
  FaListOl,
  FaHammer,
  FaBoxOpen,
  FaHardHat,
  FaBook,
  FaBars,
  FaGem,
  FaBuilding
} from "react-icons/fa";
import Account from "./Account";
import LogOut from "./LogOut";
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import perfil from "../images/perfil.png";
import MenuCrud from "./MenuCrud";
import "../styles/Menu.css";

// link de react-icons https://react-icons.netlify.com/#/icons/fa
export default class Menu extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    isOpen: false,
    crud: this.props.crud,
    option: [
      {
        icon: <FaHome />,
        title: "Home",
        tipo: "/"
      },
      {
        icon: <FaHardHat />,
        title: "Empleados",
        tipo: "/empleados"
      },
      {
        icon: <FaGem />,
        title: "Minerales",
        tipo: "/minerales"
      },
      {
        icon: <FaHammer />,
        title: "Yacimientos",
        tipo: "/yacimientos"
      },
      {
        icon: <FaBuilding />,
        title: "Proyectos",
        tipo: "/proyectos"
      },
      {
        icon: <FaUser />,
        title: "Clientes",
        tipo: "/clientes"
      },
      {
        icon: <FaBoxOpen />,
        title: "Inventario",
        tipo: "/inventario"
      },
      {
        icon: <FaUserCog />,
        title: "Gestion de usuarios",
        tipo: "/users"
      },
      {
        icon: <FaListOl />,
        title: "Gestion de roles",
        tipo: "/roles"
      },
      {
        icon: <FaBook />,
        title: "Información Relevante",
        tipo: "/info"
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
          <MenuCrud crud={this.props.crud} />
        </div>
        <div className="sidenav">
          <div
            className={this.state.isOpen ? "sidenav-show" : "sidenav-noshow"}
          >
            <ul>
              {this.state.option.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.tipo} className="sidenav-links">
                      <span className="icons">{item.icon}</span>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              <Account />
              <LogOut />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
