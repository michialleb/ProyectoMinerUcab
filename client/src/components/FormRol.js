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
      permisosList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddRol = this.handleAddRol.bind(this);
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
        } else swal("Rol Ingresado!", "Satisfactoriamentes!", "success");
      });
  };

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
  }

  result(params) {
    console.log(params);
  }

  addData = () => {
    var permisos = [];
    this.props.permisos.map(per => {
      let m = {
        name: per.nombre_permiso,
        value: per.nombre_permiso
      };
      permisos.push(m);
    });

    return permisos;
  };

  render() {
    const data = [this.addData()];
    console.log(data);

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
              <div className="multiselect">
                <Multiselect options={data} onSelectOptions={this.result} />
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
