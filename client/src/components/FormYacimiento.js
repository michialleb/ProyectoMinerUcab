import React, { Component } from "react";
import "../styles/Form.css";
import ConfiguracionProyecto from "../components/ConfiguracionProyecto";

class FormYacimiento extends Component {
  constructor() {
    super();

    this.state = {
      yacimientoList: [],
      nombre: "",
      direccion: "",
      kilometros: 0,
      mineral: "",
      mineralList: [],
      cantidadList: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeMineral = this.handleChangeMineral.bind(this);
    this.handleChangeCantidad = this.handleChangeCantidad.bind(this);
    this.handleIngresarYacimiento = this.handleIngresarYacimiento.bind(this);
    this.handleIngresarMinerales = this.handleIngresarMinerales.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  handleChangeMineral(e) {
    e.preventDefault();
    let minerales = this.state.mineralList;
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    console.log(minerales.indexOf(name));
    if (minerales.indexOf(name) === -1) {
      // revisar esto, podrias meter dos minerales iguales en un yacimiento
      minerales.push(value);
      this.setState({ mineralList: minerales });
    }
  }

  handleChangeCantidad(e) {
    e.preventDefault();
    let cantidades = this.state.cantidadList;
    let target = e.target;
    let value = target.value;
    let name = target.name;

    cantidades[name] = value;
    this.setState({ cantidadList: cantidades });
  }
  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }
  onDelete(e) {
    let minerales = this.state.mineralList;
    let cantidades = this.state.cantidadList;
    let target = e.target;
    let name = target.name;
    let numero = target.numero;
    var index = minerales.indexOf(name);
    var index2 = cantidades.indexOf(numero);
    if (index > -1) {
      minerales.splice(index, 1);
    }
    if (index > -1) {
      cantidades.splice(index2, 1);
    }

    this.setState({ cantidadList: cantidades });
    this.setState({ mineralList: minerales });
  }
  handleIngresarYacimiento = (e) => {
    e.preventDefault();
    this.handleAddYacimiento();
  
  };

  handleIngresarMinerales =(e)=> {
    e.preventDefault();
    this.generarProyectoE();
    console.log('generando ory');
   this.state.mineralList.map((mineral,i) => {
      let mineral_yacimiento={
        mineral:mineral,
        cantidad: this.state.cantidadList[i],
        nombre: this.state.nombre
      }
      this.handleAddMineralYacimiento(mineral_yacimiento);
   })  
    document.getElementById("form-yac").style.display="none";
  }


  handleAddYacimiento = (e) => {
    fetch("/api/yacimientos", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ yacimiento:  this.state})
    }).then(res => res.json());
    
  };

  handleAddMineralYacimiento = (yacimiento) => {
    fetch("/api/mineralYacimiento", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ yacimiento: yacimiento})
    }).then(res => res.json());
  };

  generarProyectoE (){
    let proyecto ={
      nombre: this.state.nombre,
      duracion_proyecto: 0
    }
    console.log('generando proyecto');
    fetch("/api/proyecto", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ proyecto:  proyecto})
    }).then(res => res.json());
  };


 

  handleSubmit(e) {
    e.preventDefault();
    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }
componentDidMount(){}
 
  render() {
    var cargoList=this.props.cargos;
    var maquinariaList=this.props.maquinaria;
    return (
      <>
        <div id="form-yac" className="wrapper">
          <div  className="form-wrapper">
            <h5>Ingresar Yacimiento</h5>
            <form className="form" noValidate>
              <div className="firstName">
                <label htmlFor="firstName">Nombre Yacimiento:</label>
                <input
                  className=""
                  placeholder="Ingrese el nombre"
                  type="text"
                  name="nombre"
                  noValidate
                  value={this.state.nombre}
                  onChange={this.handleChange}
                />
              </div>
              <div className="capacidad">
                <label htmlFor="capacidad">Capacidad en km^2:</label>
                <input
                  className=""
                  placeholder="Ingrese capacidad"
                  type="number"
                  name="kilometros"
                  noValidate
                  value={this.state.kilometros}
                  onChange={this.handleChange}
                />
              </div>
              
              <div className="ubicacion">
                <label htmlFor="ubicacion">Ubicacion</label>
                <input
                  className=""
                  placeholder="Ingrese la ubicacion"
                  type="text"
                  name="direccion"
                  noValidate
                  value={this.state.direccion}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <div className="add_minerales">
                  <select
                    name="mineral"
                    value={this.state.mineral}
                    onChange={this.handleChangeMineral}
                  >
                    <option />
                    {this.props.minerales.map((mineral, i) => (
                      <option value={mineral.nombre_mineral} key={i}>
                        {mineral.nombre_mineral}
                      </option>
                    ))}
                  </select>

                  <table id="t01">
                    {this.state.mineralList.map((mineral, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {mineral}
                            <input
                              className=""
                              placeholder=" Cantidad"
                              type="number"
                              name={i}
                              noValidate
                              value={this.state.cantidadList[i]}
                              onChange={this.handleChangeCantidad}
                            />
                            <button
                              numero={i}
                              name={mineral}
                              onClick={this.onDelete}>
                              x
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                
                </div>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleIngresarYacimiento}>
                  Ingresar Yacimiento
                </button>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.handleIngresarMinerales}>
                  Ingresar Minerales
                </button>
              </div>
              
            </form>
          </div> 
        </div>
        <div id="form-etapa">
        <ConfiguracionProyecto  nombreProyecto={"Proyecto "+ this.state.nombre}
                   cargoList={cargoList} 
                   maquinariaList={maquinariaList} 
                   handleAddEtapa={this.handleAddEtapa}/>
        </div>
      </>
    );
  }
}

export default FormYacimiento;
