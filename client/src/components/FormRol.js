import React, { Component } from "react";
import "../styles/Form.css";
import swal from "sweetalert";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import Multiselect from "multiselect-dropdown-react";

class FormRol extends Component {
  constructor() {
    super();
    this.state = {
      tipo_rol: "",
      descripcion: "",
      permisoList: [],
      permiso: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddRol = this.handleAddRol.bind(this);
    this.handleChangePermisos = this.handleChangePermisos.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleAddRol = e => {
    e.preventDefault();
    fetch(`/api/roles/`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ rol: this.state })
    })
      .then(res => res.json())
      .catch(res => {
        //swal("Revisar campos obligatorios!", "You clicked the button!", "error");
      })
      .then(res => {
        if (res.error) {
          console.log("error es: " + res.error);
          swal("Datos invalidos", "Intente de nuevo!", "error");
        } else{ swal("Rol Ingresado!", "Satisfactoriamentes!", "success");
                this.handleIngresarPermisos(res[0].id_rol)}
      });
  };

  handleIngresarPermisos = (id_rol) => {

    this.state.permisoList.map((permiso, i) => {
      let permiso_rol = {
        permiso: permiso,
        id_rol: id_rol
      };
      this.handleAddPermisoRol(permiso_rol);
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
  }


  handleChangePermisos(e) {
    e.preventDefault();
    let permisos = this.state.permisoList;
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    if (permisos.indexOf(name) === -1) {
      permisos.push(value);
      this.setState({ permisoList: permisos });
    }
  }

  handleAddPermisoRol = rol => {
    fetch("/api/roles/permisoRol", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ rol: rol })
    }).then(res => res.json());
  };

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <h5>Ingresar Rol </h5>
            <form className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Nombre del Rol</label>
                <input
                  className=""
                  placeholder="Ingrese el nombre"
                  type="text"
                  name="tipo_rol"
                  value={this.state.tipo_rol}
                  onChange={this.handleChange}
                />
              </div>
              <div className="firstName">
                <label htmlFor="firstName">Descripcion del rol</label>
                <input
                  className=""
                  placeholder="Ingrese la descripcion"
                  type="text"
                  name="descripcion"
                  value={this.state.descripcion}
                  onChange={this.handleChange}
                />
              </div>
              <div className="add_minerales">
                <label>Permisos </label>
                <select
                  name="permiso"
                  value={this.state.permiso}
                  onChange={this.handleChangePermisos}
                >
                  <option />
                  {this.props.permisos.map((per, i) => (
                    <option value={per.nombre_permiso} key={i}>
                      {per.nombre_permiso}
                    </option>
                  ))}
                </select>

                <table id="t01">
                  {this.state.permisoList.map((permiso, i) => {
                    return (
                      <tr key={i}>
                        <td>{permiso}</td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleAddRol}>
                  Ingresar Rol
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}
export default FormRol;
