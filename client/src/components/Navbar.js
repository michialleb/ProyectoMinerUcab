import React, { Component } from "react";
import logo from "../images/logo.png";
import { FaAlignRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// link de react-icons https://react-icons.netlify.com/#/icons/fa
export default class Navbar extends Component {
  state = {
    isOpen: false
  };
  desplegar = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img className="nav-logo" src={logo} alt="Miner Ucab" />
            </Link>
            <button type="button" className="nav-btn" onClick={this.desplegar}>
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/nosotros">Nosotros</Link>
            </li>
            <li>
              <Link to="/login" className="btn-singup">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
