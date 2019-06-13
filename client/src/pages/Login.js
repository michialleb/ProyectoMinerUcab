import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch
} from "react-router-dom";
import SignUpForm from "../pages/SignUpForm";
import SignInForm from "../pages/SignInForm";
import Sesion from "./Sesion";
import Empleado from "./Empleado";
import Yacimientos from "./Yacimientos";

import "../Login.css";
import Inventario from "./Inventario";
import Clientes from "../pages/Clientes";
class Login extends Component {
  render() {
    return (
      <>
        <Router basename="/login/">
          <Switch>
            <Route exact path="/sesion" component={Sesion} />
            <Route path="/empleados" component={Empleado} />
            <Route path="/clientes" component={Clientes} />
            <Route path="/inventario" component={Inventario} />
            <Route path="/yacimientos" component={Yacimientos} />

            <div className="Login">
              <div className="Login__Aside">
                <button className="btn-back">
                  <Link to="/home" className="btn-back-link">
                    Regresar
                  </Link>
                </button>
              </div>
              <div className="Login__Form">
                <div className="PageSwitcher">
                  <NavLink
                    to="/sign-in"
                    activeClassName="PageSwitcher__Item--Active"
                    className="PageSwitcher__Item"
                  >
                    Iniciar Sesion
                  </NavLink>
                  <NavLink
                    exact
                    to="/"
                    activeClassName="PageSwitcher__Item--Active"
                    className="PageSwitcher__Item"
                  >
                    Registrarse
                  </NavLink>
                </div>

                <div className="FormTitle">
                  <NavLink
                    to="/sign-in"
                    activeClassName="FormTitle__Link--Active"
                    className="FormTitle__Link"
                  >
                    Iniciar sesion
                  </NavLink>{" "}
                  o{" "}
                  <NavLink
                    exact
                    to="/"
                    activeClassName="FormTitle__Link--Active"
                    className="FormTitle__Link"
                  >
                    Registrarse
                  </NavLink>
                </div>

                <Route exact path="/" component={SignUpForm} />
                <Route path="/sign-in" component={SignInForm} />
              </div>
            </div>
          </Switch>
        </Router>
      </>
    );
  }
}

export default Login;
