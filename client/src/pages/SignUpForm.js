import React, { Component } from "react";
import { Link } from "react-router-dom";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
  return valid;
};

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      //empleadoList: [],
      email: "",
      password: "",
      name: "",
      apellido: "",
      usario: "",
      cedula: "",
      hasAgreed: false,

      formErrors: {
        emailError: "",
        passwordError: "",
        cedulaError: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "email":
        const emailRegex = RegExp(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        );
        formErrors.emailError = emailRegex.test(value)
          ? ""
          : "Direccion de correo invalida";
        break;
      case "password":
        formErrors.passwordError =
          value.length < 7 ? "Se requieren 7 caracteres como minimo" : "";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors,
        [name]: value
      },
      () => console.log(this.state)
    );
  }

  handleAddUsuario = () => {
    if (formValid(this.state)) {
      fetch("/api/usuarios", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ usuario: this.state })
      }).then(res => res.json());
      /* .then(res => {
      this.getUsuarioList();
      this.setState({ name: "" });
    });*/
      alert("Usuario creado satisfactoriamente :)");
    } else {
      alert("Datos invalidos, revise el formulario");
    }
  };

  /*componentDidMount() {
    this.getUsuarioList();
  }*/

  handleSubmit(e) {
    e.preventDefault();
    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  render() {
    const { formErrors } = this.state;
    /*const { handleBlur,
           touched,
           errors,
            emai=this.state.email,
          pass=this.state.password
         } = this.state;
   
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email("El correo debe ser valido")
        .required(),
      password: Yup.string()
        .required()
        .min(7, "La contraseña es muy corta, debe tener 7 caracteres minimo")
    });
*/
    return (
      <div className="FormCenter">
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">
              Nombres
            </label>
            <input
              type="text"
              id="name"
              className="FormField__Input"
              placeholder="Introduce tu nombre completo"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="apellido">
              Apellidos
            </label>
            <input
              type="text"
              id="apellido"
              className="FormField__Input"
              placeholder="Introduce tus apellidos"
              name="apellido"
              value={this.state.apellido}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="usuario">
              Usuario
            </label>
            <input
              type="text"
              id="usuario"
              className="FormField__Input"
              placeholder="Introduce un nombre de usuario"
              name="usuario"
              value={this.state.usuario}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="FormField">
            <label className="FormField__Label" htmlFor="ci">
              Cédula
            </label>
            <input
              type="number"
              id="cedula"
              className="FormField__Input"
              placeholder="Introduce tu numero de cedula"
              name="cedula"
              value={this.state.cedula}
              onChange={this.handleChange}
              errorText={this.state.cedulaError}
              required
            />
          </div>
          <div className="FormField">
            <label
              className="FormField__Label"
              htmlFor="password"
              //help={touched.pass && errors.pass ? errors.pass : ""} validateStatus={touched.pass && errors.pass ? "error" : undefined}
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="FormField__Input"
              placeholder="Introduce tu contraseña"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              //onBlur={handleBlur}
              errorText={this.state.passwordError}
              required
            />

            {this.state.password.length > 0 && (
              <span className="errorMessage">{formErrors.passwordError}</span>
            )}
          </div>
          <div className="FormField">
            <label
              className="FormField__Label"
              htmlFor="email"
              //help={touched.emai && errors.emai ? errors.emai : ""} validateStatus={touched.emai && errors.emai ? "error" : undefined}
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="FormField__Input"
              placeholder="Introduce tu correo electrónico"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              //onBlur={handleBlur}
              errorText={this.state.emailError}
              required
            />
            {this.state.email.length > 0 && (
              <span className="errorMessage">{formErrors.emailError}</span>
            )}
          </div>

          <div className="FormField">
            <label className="FormField__CheckboxLabel">
              <input
                className="FormField__Checkbox"
                type="checkbox"
                name="hasAgreed"
                value={this.state.hasAgreed}
                onChange={this.handleChange}
              />{" "}
              Estoy de acuerdo con los terminos de servicio{" "}
              <a href="" className="FormField__TermsLink">
                terms of service
              </a>
            </label>
          </div>

          <div className="FormField">
            <button
              type="submit"
              className="FormField__Button mr-20"
              onClick={this.handleAddUsuario}
            >
              Registrarse
            </button>{" "}
            <Link to="/sign-in" className="FormField__Link">
              Ya soy un usuario
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;
