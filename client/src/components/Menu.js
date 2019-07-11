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
import MenuCrud from "./MenuCrud";
import "../styles/Menu.css";
import { get } from "http";

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
        tipo: "/sesion",
        className:"home"
      },
      {
        icon: <FaHardHat />,
        title: "Empleados",
        tipo: "/empleados",
        className: localStorage.getItem('adminEmp')  || localStorage.getItem('adminTodo')? "empleados" : "no_empleados"
      },
      {
        icon: <FaGem />,
        title: "Minerales",
        tipo: "/minerales",
        className: localStorage.getItem('adminMin') || localStorage.getItem('adminTodo') ? "minerales" : "no_minerales"
      },
      {
        icon: <FaHammer />,
        title: "Yacimientos",
        tipo: "/yacimientos",
        className: localStorage.getItem('adminYac') || localStorage.getItem('adminTodo')? "yacimientos" : "no_yacimientos"
      },
      {
        icon: <FaBuilding />,
        title: "Proyectos",
        tipo: "/proyectos",
        className: localStorage.getItem('adminPro') || localStorage.getItem('adminTodo') ? "proyectos" : "no_proyectos"
      },
      {
        icon: <FaUser />,
        title: "Clientes",
        tipo: "/clientes",
        className: localStorage.getItem('adminCli') || localStorage.getItem('adminTodo') ? "clientes" : "no_clientes"

      },
      {
        icon: <FaUser />,
        title: "Aliados",
        tipo: "/aliados",
        className: localStorage.getItem('adminAli') || localStorage.getItem('adminTodo') ? "aliados" : "no_aliados"
      },
      {
        icon: <FaBoxOpen />,
        title: "Inventario",
        tipo: "/inventario",
        className: localStorage.getItem('adminInv')  || localStorage.getItem('adminTodo')? "inventario" : "no_inventario"
      },
      {
        icon: <FaUserCog />,
        title: "Gestion de usuarios",
        tipo: "/users",
        className: localStorage.getItem('adminUser')  || localStorage.getItem('adminTodo') ? "users" : "no_users"
      },
      {
        icon: <FaListOl />,
        title: "Gestion de roles",
        tipo: "/roles",
        className: localStorage.getItem('adminRol')  || localStorage.getItem('adminTodo') ? "roles" : "no_roles"
      },
      {
        icon: <FaBook />,
        title: "Información Relevante",
        tipo: "/info",
        className: localStorage.getItem('adminInfo') || localStorage.getItem('adminTodo') ? "info" : "no_info"
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
                    <Link to={item.tipo} className={item.className}>
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
