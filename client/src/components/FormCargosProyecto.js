import React, { Component } from "react";
import "../styles/Form.css";

class FormCargosProyecto extends Component {
  constructor() {
    super();

    this.state = {
        cargo:"",
        cantidad:"",
        cargoList: [],
        cantidadList: [],
        cantidadCargoList:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeCargo =this.handleChangeCargo.bind(this);
    this.handleChangeCantidad = this.handleChangeCantidad.bind(this);
    this.onDelete=this.onDelete.bind(this);   
  }
  
  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("The form was submitted with the following data:");
    console.log(this.state);
  }

  handleChangeCargo(e) {
    let cargos = this.state.cargoList;
    let target = e.target;
    let value = target.value;
    let name = target.name;
    let salarioCargo="";
    this.props.cargoList.map((cargo) =>{
      if ( cargo.tipo_cargo=== value){
        salarioCargo= cargo.salario_empleado
      }
    });
    console.log(value);
    console.log(name);
    console.log(salarioCargo);
    this.setState({
      [name]: value
    });
    let cargo={
       tipo_cargo: value,
       salario: salarioCargo
    }
     let repetido=false;
     cargos.map((c)=> {
       if (c.tipo_cargo=== value) repetido=true;
    });
    if (repetido===false){
      cargos.push(cargo);
      this.setState({ cargoList: cargos });
    }
   
    this.state.cargoList.map((cargo) =>{
      console.log(cargo);
    })
   
  }

  handleChangeCantidad(e) {
    e.preventDefault();
    let cantidades=this.state.cantidadList;
    let cargoCosto = this.state.cantidadCargoList;
    let target = e.target;
    let value = target.value;
    let name = target.name;

    cantidades[name] = value;
    this.setState({
      cantidad: value
    });
    let cargoCantidad ={
      tipo_cargo:  this.state.cargoList[name].tipo_cargo,
      costo: parseInt ((this.state.cargoList[name].salario) * parseInt(value))
    }

    console.log(cargoCantidad);
    cargoCosto.push(cargoCantidad);
    this.setState({ cantidadCargoList: cargoCosto});
  }

  onDelete(e) {

    let cargos = this.state.cargoList, cantidades=this.state.cantidadList;
    let target = e.target;
    let name = target.name;
    let cargoEliminar;
    let posicion;
    cargos.map((c,i) =>{
       if (c.tipo_cargo=== name){
            cargoEliminar=c;
            posicion=i;
       }
    });

    let index= cargos.indexOf(cargoEliminar);
    cargos.splice(index, 1);
    cantidades.splice(posicion,1);
    this.setState({ cargoList: cargos });

  }

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <h5>Ingresar Cargos</h5>
            <form className="form" noValidate>
              <div>
              <select
                    name="cargo"
                    value={this.state.cargo}
                    onChange={this.handleChangeCargo}
                    >
                    <option />
                    {this.props.cargoList.map((cargo, i) => (
                      <option 
                          value={cargo.tipo_cargo} 
                          key={i}>
                         {cargo.tipo_cargo}
                      </option>
                    ))}
              </select>
                  <table id="t01">
                    {this.state.cargoList.map((cargo, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {cargo.tipo_cargo}
                    
                            <input
                              className=""
                              placeholder="Cantidad"
                              type="number"
                              name={i}
                              noValidate
                              value={this.state.cantidadList[i]}
                              onChange={this.handleChangeCantidad}
                            />
                            <button
                              name={cargo.tipo_cargo}
                              onClick={this.onDelete}
                              >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={this.props.handleIngresarMaquinaria}>
                  Aceptar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormCargosProyecto;
