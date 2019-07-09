import React, { Component } from "react";
import "../styles/ConsultTable.css";
import { MDBDataTable } from "mdbreact";
import swal from "@sweetalert/with-react";
import { ListGroup } from "react-bootstrap";

class ConsultTableRol extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permisosList: []
    };
    this.handleGetPermisos = this.handleGetPermisos.bind(this);
  }

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
            <tr>
              <th>Tipo de permiso</th>
              <th>Descripcion</th>
            </tr>

            {this.state.permisosList.map((per, i) => {
              return (
                <tr key={i}>
                  <td>{per.nombre_permiso}</td>
                  <td>{per.descripcion_permiso}</td>
                </tr>
              );
            })}
          </table>
        );
      });
    console.log(this.state.permisosList);
  };

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
