import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";
import "../Login.css";
import SignUpForm from "../pages/SignUpForm";
import SignInForm from "../pages/SignInForm";
import Sesion from "./Sesion";
import Empleado from "../entities/Empleado";
import Yacimientos from "../entities/Yacimientos";
import Inventario from "../entities/Inventario";
import Clientes from "../entities/Clientes";
import Proyectos from "../entities/Proyectos";
import Minerales from "../entities/Minerales";
import InfoRelevante from "../entities/InfoRelevante";
import Aliados from "../entities/Aliados";
import Usuarios from "../entities/Usuarios";
import Roles from "../entities/Roles";

const PrivateRoute = ({ component: Component, ...rest }) => (
 
  <Route
    {...rest}
    render={props =>
      props.match.params.id_nombre !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/sign-in",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class Login extends Component {
  render() {
    return (
      <>
        <Router basename="/login/">
          <Switch>
            <Route path="/empleados" component={Empleado} />
            <Route path="/clientes" component={Clientes} />
            <Route path="/inventario" component={Inventario} />
            <Route path="/users" component={Usuarios} />
            <Route path="/roles" component={Roles} />
            <Route path="/yacimientos" component={Yacimientos} />
            <Route path="/proyectos" component={Proyectos} />
            <Route path="/minerales" component={Minerales} />
            <Route path="/info" component={InfoRelevante} />
            <Route path="/aliados" component={Aliados} />
            <PrivateRoute
              path="/protected/:id_usuario/:cedula/:rol/:nombre"
              component={Sesion}
            />

            <div className="Login">
              <div className="Login__Aside">
                <button className="btn-back">
                  <Link to="/" className="btn-back-link">
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
