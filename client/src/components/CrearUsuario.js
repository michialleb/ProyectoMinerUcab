import React, { Component } from "react";
import "../styles/Form.css";
import swal from "sweetalert";

class CrearUsuario extends Component {
  constructor(props) {
    super(props);

    this.state = {
        nombre: "",
        usuario:"",
        contrasena:"",
        fk_empleado:"",
        fk_cliente:"",
        fk_rol:""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddUsuario = this.handleAddUsuario.bind(this);

  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  
  handleAddUsuario = e => {
    e.preventDefault();
    fetch(`/api/usuarios/`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ usuario: this.state })
    })
      .then(res => res.json())
      .catch(res => {
        //swal("Revisar campos obligatorios!", "You clicked the button!", "error");
      })
      .then(res => {
        if (res.error) {
          console.log("error es: " + res.error);
          swal("Datos invalidos", "Intente de nuevo!", "error");
        } else swal("Usuario y rol asignado!", "Satisfactoriamente!", "success");
      });
  };

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
  }


  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <h5>Creacion de usuario </h5>
            <form className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Nombre Persona</label>
                <input
                  className=""
                  type="text"
                  name="nombre"
                  disabled
                  value={this.state.nombre}

                />
              </div>
              <div className="secondName">
                <label htmlFor="secondName">Nombre de usuario</label>
                <input
                  className=""
                  placeholder="Ingrese el nombre de usuario"
                  type="text"
                  name="usuario"
                  noValidate
                  value={this.state.usuario}
                  onChange={this.handleChange}
                />
              </div>

              <div className="secondName">
                <label htmlFor="secondName">Contraseña</label>
                <input
                  className=""
                  placeholder="Ingrese la Contraseña"
                  type="password"
                  name="contrasena"
                  noValidate
                  value={this.state.contrasena}
                  onChange={this.handleChange}
                />
              </div>

              <div className="cargo">
                <label htmlFor="cargo">Rol</label>
                <select
                  name="fk_cargo"
                  type="number"
                  id="selected"
                  value={this.state.fk_rol}
                  onChange={this.handleChange}
                >
                  <option />
                  {this.props.roles.map((rol, i) => (
                    <option value={rol.id_rol} key={i}>
                      {rol.tipo_rol}
                    </option>
                  ))}
                </select>
              </div>

              
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleAddUsuario}>
                  Ingresar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default CrearUsuario;