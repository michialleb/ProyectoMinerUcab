import React, { Component } from "react";
import "../styles/Form.css";

class FormMaquinaria extends Component {
  constructor() {
    super();

    this.state = {
        cantidadList :[],
        cantidadMaquinariaList: [],
        maquinariaList:[],
        maquina:"",
        cantidad:""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this); 
    this.onDeleteMaquina=this.onDeleteMaquina.bind(this);
    this.handleChangeCantidadMaquinaria=this.handleChangeCantidadMaquinaria.bind(this);
    this.handleChangeMaquina=this.handleChangeMaquina.bind(this);
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


  handleChangeMaquina(e) {
    let maquinas = this.state.maquinariaList;
    let target = e.target;
    let value = target.value;
    let name = target.name;
    let  costo_maquinaria="", id_maquinaria;
    this.props.maquinariaList.map((maquina) =>{
      if ( maquina.nombre_maquinaria=== value){
        costo_maquinaria= maquina.costo_maquinaria;
        id_maquinaria= maquina.id_maquinaria;
      }
    });
    this.setState({
      [name]: value
    });
    let maquinaria={
       nombre_maquinaria: value,
       costo_maquinaria: costo_maquinaria,
       id_maquinaria: id_maquinaria,
       cantidad:0,
       costo:0
    }
     let repetido=false;
     maquinas.map((maquina)=> {
       if (maquina.nombre_maquinaria=== value) repetido=true;
    });
    if (repetido===false){
      maquinas.push(maquinaria);
      this.setState({ maquinariaList: maquinas });
    }
  }


  handleChangeCantidadMaquinaria(e){
    e.preventDefault();
    let cantidades=this.state.cantidadList,
     maquinariaCosto = this.state.cantidadMaquinariaList,
     target = e.target,
     value = target.value,
     name = target.name,
     repetido= false;

    cantidades[name] = value;
    this.setState({
      cantidad: value
    });
   
    maquinariaCosto.map((maquina)=>{
      if (maquina.nombre_maquinaria===this.state.maquinariaList[name].nombre_maquinaria){
          repetido=true;
      }
    });
    
    if (repetido==false){
      let maquinariaCantidad ={
        id_maquinaria: this.state.maquinariaList[name].id_maquinaria,
        nombre_maquinaria:  this.state.maquinariaList[name].nombre_maquinaria,
        cantidad: value,
        costo: parseInt ((this.state.maquinariaList[name].costo_maquinaria) * parseInt(value))
      }
      maquinariaCosto.push(maquinariaCantidad);
    }else{
       maquinariaCosto[name].costo=parseInt ((this.state.maquinariaList[name].costo_maquinaria) * parseInt(value));
       maquinariaCosto[name].cantidad=value;
    }
  
    
    this.setState({ cantidadMaquinariaList: maquinariaCosto});
    console.log(this.state.cantidadMaquinariaList);
  }

  onDeleteMaquina(e) {
    let maquinas = this.state.maquinariaList, cantidades=this.state.cantidadList,
    target = e.target,
    name = target.name,
    maquinaEliminar,
    posicion;
    
    maquinas.map((m,i) =>{
       if (m.costo_maquinaria === name){
            maquinaEliminar=m;
            posicion=i;
       }
    });

    let index= maquinas.indexOf(maquinaEliminar);
    maquinas.splice(index, 1);
    cantidades.splice(posicion,1);
    this.setState({ maquinariaList: maquinas });
  }



  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <h5>Ingresar Maquinaria</h5>
            <form className="form" noValidate>
              <div>
              <select
                    name="maquina"
                    value={this.state.maquinas}
                    onChange={this.handleChangeMaquina}
                    >
                    <option />
                    {this.props.maquinariaList.map((m, i) => (
                      <option value={m.nombre_maquinaria} key={i}>
                        {m.nombre_maquinaria}
                      </option>
                    ))}
                  </select>

                  <table id="t01">
                    {this.state.maquinariaList.map((maquinaria, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {maquinaria.nombre_maquinaria}
                            <input
                              className=""
                              placeholder="Cantidad"
                              type="number"
                              name={i}
                              noValidate
                              value={this.state.cantidadList[i]}
                              onChange={this.handleChangeCantidadMaquinaria}
                            />
                            <button
                              numero={i}
                              name={maquinaria.nombre_maquinaria}
                              onClick={this.onDeleteMaquina}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={(function (e) {this.props.handleAceptarCambiosMaquinaria(e, this.state.cantidadMaquinariaList)}).bind(this)}>
                  Finalizar     
                </button>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={  (function (e) {this.props.handleAgregarOtraEtapa(e, this.state.cantidadMaquinariaList)}).bind(this)}>
                  Agregar Otra Etapa 
                </button>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={(function (e) {this.props.handleIngresarOtraFase(e, this.state.cantidadMaquinariaList)}).bind(this)}>
                  Agregar Otra Fase
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormMaquinaria;
