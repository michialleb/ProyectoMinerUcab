import React, { Component } from "react";
import Menu from "../components/Menu";
import "../styles/Form.css";
import { FaSistrix } from "react-icons/fa";
import swal from "@sweetalert/with-react";

export default class InfoRelevante extends Component {
  constructor() {
    super();

    this.state = {
      fi: "",
      ff: "",
      empleado: "",
      cedulaBuscada: "",
      nombreEmpleado: "",
      año: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleGetEmpleado = (cedula, e) => {
    fetch(`/api/empleados/${cedula}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          empleado: res.map(r => r)
        });

        if (this.state.empleado == "")
          swal("Cedula No Encontrada", "Intente de nuevo!", "error");
        else
          this.setState({
            nombreEmpleado:
              this.state.empleado[0].nombre +
              " " +
              this.state.empleado[0].apellido
          });
      });
    //  console.log("nombre" + this.state.nombreEmpleado)
  };

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    var crud = {
      options: [
        "Reporte 1",
        "Reporte 2",
        "Reporte 3",
        "Reporte 4",
        "Reporte 5",
        "Reporte 6",
        "Reporte 7",
        "Reporte 8",
        "Reporte 9",
        "Reporte 10"
      ],
      content: [
        {
          form: (
            <div className="wrapper2">
              <div className="form-wrapper2">
                <h3> EMPRESA ALIADA A LA QUE SE REALIZARON MAS COMPRAS </h3>
                <form className="form" noValidate>
                  <div className="ingresarUsuario">
                    <button>Generar reporte</button>
                  </div>
                </form>
              </div>
            </div>
          ),
          id: 0
        },
        {
          form: (
            <div className="wrapper2">
              <div className="form-wrapper2">
                <h3> FASES QUE PRESENTAN RETRASOS</h3>
                <form className="form" noValidate>
                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha inicial</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="fi"
                      noValidate
                      value={this.state.fi}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha final</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="ff"
                      noValidate
                      value={this.state.ff}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="ingresarUsuario">
                    <button>Generar reporte</button>
                  </div>
                </form>
              </div>
            </div>
          ),
          id: 1
        },
        {
          form: (
            <div className="wrapper">
              <div className="form-wrapper">
                <h3> PROYECTO MAS COSTOSO Y MAS ECONOMICO POR MES</h3>
                <form className="form" noValidate>
                  <div className="sexo">
                    <label htmlFor="sexo">Mes</label>
                    <select
                      name="mes"
                      value={this.state.mes}
                      onChange={this.handleChange}
                    >
                      <option />
                      <option>Enero</option>
                      <option>Febrero</option>
                      <option>Marzo</option>
                      <option>Abril</option>
                      <option>Mayo</option>
                      <option>Junio</option>
                      <option>Julio</option>
                      <option>Agosto</option>
                      <option>Septiembre</option>
                      <option>Octubre</option>
                      <option>Noviembre</option>
                      <option>Diciembre</option>
                    </select>
                  </div>
                  <div className="ingresarUsuario">
                    <button>Generar reporte</button>
                  </div>
                </form>
              </div>
            </div>
          ),
          id: 2
        },
        {
          form: (
            <div className="wrapper2">
              <div className="form-wrapper2">
                <h3> TOP 10 PEORES EMPLEADOS</h3>
                <form className="form" noValidate>
                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha inicial</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="fi"
                      noValidate
                      value={this.state.fi}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha final</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="ff"
                      noValidate
                      value={this.state.ff}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="ingresarUsuario">
                    <button>Generar reporte</button>
                  </div>
                </form>
              </div>
            </div>
          ),
          id: 3
        },

        {
          form: (
            <div className="wrapper">
              <div className="form-wrapper">
                <h3>
                  {" "}
                  ETAPAS Y FASES DE LOS PROYECTOS QUE ESTAN PENDIENTES POR
                  INICIAR
                </h3>
                <form className="form" noValidate>
                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha inicial</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="fi"
                      noValidate
                      value={this.state.fi}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha final</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="ff"
                      noValidate
                      value={this.state.ff}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="ingresarUsuario">
                    <button>Generar reporte</button>
                  </div>
                </form>
              </div>
            </div>
          ),
          id: 4
        },
        {
          form: (
            <div className="wrapper">
              <div className="form-wrapper">
                <h3>
                  EMPLEADOS QUE HAN PARTICIPADO MAS DE 2 VECES EN PROYECTOS EN
                  EL MISMO MES
                </h3>
                <form className="form" noValidate>
                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha inicial</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="fi"
                      noValidate
                      value={this.state.fi}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha final</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="ff"
                      noValidate
                      value={this.state.ff}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="ingresarUsuario">
                    <button>Generar reporte</button>
                  </div>
                </form>
              </div>
            </div>
          ),
          id: 5
        },
        {
          form: (
            <div className="wrapper">
              <div className="form-wrapper">
                <h3>TOTAL DE PROYECTOS EN LOS QUE TRABAJO UN EMPLEADO</h3>
                <div>
                  <span className="searching">
                    <input
                      className="inp-search"
                      type="number"
                      placeholder="Ingrese nro de cédula"
                      name="cedulaBuscada"
                      value={this.state.cedulaBuscada}
                      onChange={this.handleChange}
                    />
                    <button
                      className="search"
                      type="button"
                      onClick={function(e) {
                        this.handleGetEmpleado(this.state.cedulaBuscada, e);
                      }.bind(this)}
                    >
                      {<FaSistrix />}
                    </button>
                  </span>
                </div>
                <form className="form" noValidate>
                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha inicial</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="fi"
                      noValidate
                      value={this.state.fi}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="firstName">
                    <label htmlFor="firstName">Nombre Empleado</label>
                    <input
                      className=""
                      type="text"
                      name="nombre"
                      value={this.state.nombreEmpleado}
                      disabled
                    />
                  </div>

                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha final</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="ff"
                      noValidate
                      value={this.state.ff}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="ingresarUsuario">
                    <button>Generar reporte</button>
                  </div>
                </form>
              </div>
            </div>
          ),
          id: 6
        },
        {
          form: (
            <div className="wrapper">
              <div className="form-wrapper">
                <h3>
                  PRESENTACION DEL MINERAL MENOS SOLICITADO POR LOS CLIENTES POR
                  AÑO
                </h3>
                <div className="firstName">
                  <label htmlFor="firstName">Año a buscar</label>
                  <input
                    className=""
                    type="text"
                    name="año"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="ingresarUsuario">
                  <button>Generar reporte</button>
                </div>
              </div>
            </div>
          ),
          id: 7
        },
        {
          form: (
            <div className="wrapper">
              <div className="form-wrapper">
                <h3> MAQUINARIA MENOS UTILIZADA EN LOS PROYECTOS</h3>
                <form className="form" noValidate>
                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha inicial</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="fi"
                      noValidate
                      value={this.state.fi}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha final</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="ff"
                      noValidate
                      value={this.state.ff}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="ingresarUsuario">
                    <button>Generar reporte</button>
                  </div>
                </form>
              </div>
            </div>
          ),
          id: 8
        },
        {
          form: (
            <div className="wrapper">
              <div className="form-wrapper">
                <h3> MOVIMIENTO DE INVENTARIO</h3>
                <form className="form" noValidate>
                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha inicial</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="fi"
                      noValidate
                      value={this.state.fi}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="nacimiento">
                    <label htmlFor="nacimiento">Fecha final</label>
                    <input
                      className=""
                      placeholder="xx/yy/zz"
                      type="date"
                      name="ff"
                      noValidate
                      value={this.state.ff}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="ingresarUsuario">
                    <button>Generar reporte</button>
                  </div>
                </form>
              </div>
            </div>
          ),
          id: 9
        }
      ]
    };

    return <Menu crud={crud} />;
  }
}
