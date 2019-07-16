import React, { Component } from "react";
import "../styles/ConsultTable.css";
import "../styles/Form.css";
import { MDBDataTable } from "mdbreact";
import swal from "@sweetalert/with-react";
import { ListGroup } from "react-bootstrap";

class ConsultTableRol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permisosList: [],
      newPermisosList: [],
      noAsignadoList: [],
      tipo_rol: "",
      descripcion_rol: "",
      id_rol: 0,
      nuevo_rol: "",
      nueva_descripcion: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleGetPermisos = this.handleGetPermisos.bind(this);
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

  handleChangePermisos(e) {
    e.preventDefault();
    let permisos = this.state.newPermisosList;
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    if (permisos.indexOf(name) === -1) {
      permisos.push(value);
      this.setState({ newPermisosList: permisos });
    }
  }

  permisosNoAsignados = id_rol => {
    fetch(`/api/roles/permisos/noAsignado/${id_rol}`)
      .then(res => res.json())
      .then(res => {
        var noAsignadoList = res.map(r => r);
        this.setState({ noAsignadoList });
      });
  };

  addPermiso = (e, id_Rol) => {
    e.preventDefault();
    fetch(`/api/roles/permisos/noAsignado/${id_Rol}`)
      .then(res => res.json())
      .then(res => {
        var noAsignadoList = res.map(r => r);
        this.setState({ noAsignadoList });
      })
      .then(res => {
        console.log(
          "entro en add permiso y no asignados es : " +
            this.state.noAsignadoList
        );

        this.setState({ newPermisosList: [] });

        swal(
          <div>
            <div className="add_minerales">
              <label> Permisos </label>
              <select
                className="permisoSelect"
                onChange={this.handleChangePermisos}
              >
                <option />
                {this.state.noAsignadoList.map((per, i) => (
                  <option value={per.nombre_permiso} key={i}>
                    {per.nombre_permiso}
                  </option>
                ))}
              </select>

              <table id="t01">
                {this.state.newPermisosList.map((permiso, i) => {
                  return (
                    <tr key={i}>
                      <td>{permiso}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <button
              className="ingresarUsuario"
              onClick={function(e) {
                this.handleIngresarPermisos(id_Rol);
              }.bind(this)}
            >
              {" "}
              Añadir permisos{" "}
            </button>
          </div>
        );
      });
  };

  handleIngresarPermisos = id_rol => {
    console.log("entro " + id_rol);
    this.state.newPermisosList.map((permiso, i) => {
      let permiso_rol = {
        permiso: permiso,
        id_rol: id_rol
      };
      this.handleAddPermisoRol(permiso_rol);
    });
    this.setState({ noAsignadoList: "", newPermisosList: [] });
  };

  handleAddPermisoRol = rol => {
    fetch("/api/roles/permisoRol", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ rol: rol })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log("error es: " + res.error);
          swal("Datos invalidos", "Intente de nuevo!", "error");
        } else swal("Permiso añadido!", "Satisfactoriamente!", "success");
      });
  };

  handleGetPermisos = id_rol => {
    fetch(`/api/roles/permisos/${id_rol}`)
      .then(res => res.json())
      .then(res => {
        if (res !== []) this.setState({ permisosList: res.map(r => r) });
      })
      .then(res => {
        swal(
          <table id="t02">
            <label>Permisos del rol: </label>
            <button
              className="add"
              onClick={function(e) {
                this.addPermiso(e, id_rol);
              }.bind(this)}
            >
              {" "}
              +{" "}
            </button>
            <tr>
              <th>Tipo de permiso</th>
              <th>Descripcion</th>
              <th />
            </tr>

            {this.state.permisosList.map((per, i) => {
              return (
                <tr key={i}>
                  <td>{per.nombre_permiso}</td>
                  <td>{per.descripcion_permiso}</td>
                  <td>
                    {" "}
                    <button
                      className="btn_eliminarPermiso"
                      onClick={function(e) {
                        this.deletePermiso(i, e, id_rol);
                      }.bind(this)}
                    >
                      {" "}
                      Eliminar{" "}
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        );
      });
    console.log(this.state.permisosList);
  };

  deletePermiso(i, e, id_rol) {
    e.preventDefault();
    let permiso = {
      id_permiso: "",
      id_rol: id_rol
    };

    this.state.permisosList.map((per, n) => {
      if (n == i) {
        permiso.id_permiso = per.id_permiso;
      }
    });

    fetch(`/api/roles/eliminarPermisos`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ permiso: permiso })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
        } else {
          swal("Permiso eliminado", "Satisfactoriamente!", "success");
        }
      });
  }

  deleteRol(rol, e) {
    e.preventDefault();

    let idRol = rol.id_rol;
    console.log(idRol);

    fetch(`/api/roles/eliminarRol/${idRol}`, { method: "DELETE" })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
        } else {
          swal("Rol eliminado", "Satisfactoriamente!", "success");
        }
      });
  }

  UpdateRol = rol => {
    this.setState({
      tipo_rol: rol.tipo_rol,
      id_rol: rol.id_rol
    });
    swal(
      <div className="form-wrapper">
        <h5>Ingresar Rol </h5>
        <form className="form" noValidate>
          <div className="firstName">
            <label htmlFor="firstName">Nombre del Rol</label>
            <input
              className=""
              placeholder={rol.tipo_rol}
              type="text"
              name="nuevo_rol"
              // value={this.state.tipo_rol}
              onChange={this.handleChange}
            />
          </div>
          <div className="firstName">
            <label htmlFor="firstName">Descripcion del rol</label>
            <input
              className=""
              placeholder={rol.descripcion_rol}
              type="text"
              name="nueva_descripcion"
              // value={this.state.descripcion}
              onChange={this.handleChange}
            />
          </div>
          <div className="ingresarUsuario">
            <button
              type="submit"
              onClick={function(e) {
                this.handleUpdateRol(e);
              }.bind(this)}
            >
              Modificar Rol
            </button>
          </div>
        </form>
      </div>
    );
  };

  handleUpdateRol(e) {
    if (this.state.nuevo_rol == "")
      this.setState({ nuevo_rol: this.state.tipo_rol });

    e.preventDefault();
    let rol = {
      tipo_rol: this.state.nuevo_rol,
      descripcion_rol: this.state.nueva_descripcion,
      id_rol: this.state.id_rol
    };

    fetch(`/api/roles/modificar`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ rol: rol })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          console.log("error es: " + res.error);
          swal("Datos invalidos", "Intente de nuevo!", "error");
        } else {
          swal("Rol Modificado!", "Satisfactoriamente!", "success");
          this.setState({
            nuevo_rol: "",
            nueva_descripcion: "",
            tipo_rol: "",
            descripcion_rol: "",
            id_rol: 0
          });
        }
      });
  }

  addBotton = () => {
    var Roles = [];
    this.props.roles.map(rol => {
      let m = {
        tipo: rol.tipo_rol,
        descripcion: rol.descripcion_rol,
        permisos: (
          <div className="horario">
            <button
              onClick={function(e) {
                this.handleGetPermisos(rol.id_rol);
              }.bind(this)}
            >
              {" "}
              Permisos
            </button>
          </div>
        ),
        editar: (
          <div className="horario">
            <button
              onClick={function(e) {
                this.UpdateRol(rol);
              }.bind(this)}
            >
              {" "}
              Editar
            </button>
          </div>
        ),
        eliminar: (
          <div className="horario">
            <button
              onClick={function(e) {
                this.deleteRol(rol, e);
              }.bind(this)}
            >
              {" "}
              Eliminar Rol
            </button>
          </div>
        )
      };
      Roles.push(m);
    });
    return Roles;
  };

  render() {
    const data = {
      columns: [
        {
          label: "Tipo de Rol",
          field: "tipo",
          sort: "asc",
          width: 1000
        },
        {
          label: "Descripcion",
          field: "descripcion",
          sort: "asc",
          width: 1000
        },
        {
          label: "Permisos",
          field: "permisos",
          sort: "asc",
          width: 1000
        },
        {
          label: "Editar",
          field: "editar",
          sort: "asc",
          width: 1000
        },
        {
          label: "Eliminar rol",
          field: "eliminar",
          sort: "asc",
          width: 1000
        }
      ],
      rows: this.addBotton(this.props.roles)
    };
    return (
      <>
        <div>
          <MDBDataTable btn striped bordered hover data={data} />
        </div>
      </>
    );
  }
}
export default ConsultTableRol;
