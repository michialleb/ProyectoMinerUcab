import React, { Component } from "react";
import "../styles/Form.css";

class FormEtapa extends Component {
  constructor() {
    super();

    this.state = {
     etapas:[],
     fases:[],
     nombreEtapa: "",
     duracionEtapa:0,
     costoEtapa:0,
     nombreFase:"",
     duracionFase:"",
     numeroFase:1,
     numeroEtapa:1,
    cargo:"",
    maquina:"",
    cargoList:[],
    maquinariaList:[],
    cantidadcargoList:[],
    cantidadmaquinariaList:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddEtapa = this.handleAddEtapa.bind(this);
    this.handleAddFase = this.handleAddFase.bind(this);
    this.handleChangeCargo=this.handleChangeCargo.bind(this);
    this.handleChangeMaquina=this.handleChangeMaquina.bind(this);
    this.handleChangeCargo=this.handleChangeCargo.bind(this);
    this.handleChangeCantidad=this.handleChangeCantidad.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onDeleteMaquina=this.onDeleteMaquina.bind(this);
   
  }
  handleChangeCantidad(e) {
    e.preventDefault();
    let cantidades = this.state.cantidadcargoList;
    let target = e.target;
    let value = target.value;
    let name = target.name;

    cantidades[name] = value;
    this.setState({ cantidadcargoList: cantidades });
  }
  handleChangeCantidadMaquinaria(e){
    e.preventDefault();
    let cantidades = this.state.cantidadmaquinariaList;
    let target = e.target;
    let value = target.value;
    let name = target.name;

    cantidades[name] = value;
    this.setState({ cantidadmaquinariaList: cantidades });
  }
  onDelete(e) {
    let cargos = this.state.cargoList;
    let cantidades = this.state.cantidadcargoList;
    let target = e.target;
    let name = target.name;
    let numero = target.numero;
    var index = cargos.indexOf(name);
    var index2 = cantidades.indexOf(numero);
    if (index > -1) {
      cargos.splice(index, 1);
    }
    if (index > -1) {
      cantidades.splice(index2, 1);
    }

    this.setState({ cantidadList: cantidades });
    this.setState({ cargoList: cargos });
  }
  onDeleteMaquina(e) {
    let maquinas = this.state.maquinariaList;
    let cantidades = this.state.cantidadmaquinariaList;
    let target = e.target;
    let name = target.name;
    let numero = target.numero;
    var index = maquinas.indexOf(name);
    var index2 = cantidades.indexOf(numero);
    if (index > -1) {
      maquinas.splice(index, 1);
    }
    if (index > -1) {
      cantidades.splice(index2, 1);
    }

    this.setState({ cantidadList: cantidades });
    this.setState({ maquinariaList: maquinas });
  }
  handleChangeCargo(e) {
    e.preventDefault();
    let cargos = this.state.cargoList;
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    if (cargos.indexOf(name) == -1) {
      // revisar esto, podrias meter dos minerales iguales en un yacimiento
      cargos.push(value);
      this.setState({ cargoList: cargos });
    }
  }
  handleChangeMaquina(e) {
    e.preventDefault();
    let maquinas = this.state.maquinariaList;
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
    if (maquinas.indexOf(name) == -1) {
      // revisar esto, podrias meter dos minerales iguales en un yacimiento
      maquinas.push(value);
      this.setState({ maquinariaList: maquinas });
    }
  }
  handleAddFase (e){
    e.preventDefault();
    let faseList=this.state.fases;
    let numero=this.state.numeroFase+1;
    this.setState({ numeroFase: numero})
      let fase={
          nombreFase: this.state.nombreFase,
          duracionFase: this.state.duracionFase,
          costoFase: this.state.costoFase,
          numeroFase: this.state.numeroFase
      }
      faseList.push(fase);
      this.setState({ fases: faseList});
      this.setState({nombreFase: "", duracionFase:"", costoFase:""});
      console.log(this.state.fases);
  }

  handleAddEtapa(e) {
   e.preventDefault();
   let dias=0;
   let bs=0;
   this.state.fases.map((f)=>{
       dias=parseInt(dias)+ parseInt(f.duracionFase);
       bs= parseInt(bs)+parseInt(f.costoFase);
   });
   let EtapaList=this.state.etapas;
   let numero=parseInt(this.state.numeroEtapa)+1;
   this.setState({ numeroEtapa: numero});
      let etapa={
          nombreEtapa: this.state.nombreEtapa,
          duracionEtapa: dias,
          costoEtapa: bs,
          numeroEtapa: this.state.numeroEtapa
      }
      EtapaList.push(etapa);
      this.setState({ etapas: EtapaList});
      console.log(this.state.etapas);
      this.setState({nombreEtapa: ""});
      var vacio=[];
      var cero=0, uno=1;
      this.setState({ etapas: vacio});
      this.setState({ fases: vacio});
      this.setState({ duracionFase: cero});
      this.setState({ costoFase: cero});
      this.setState({ numeroFase: uno})
     
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
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

  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <h5>Ingresar Etapas</h5>
            <form className="form" noValidate>
              <div>
                <div className="add_minerales">
                <div>
                    <div>
                    <label>Nombre Etapa:</label>
                    <input 
                    type="text"
                    name="nombreEtapa"
                    value={this.state.nombreEtapa}
                    onChange={this.handleChange}/></div>
                    <div>
                    <label>Nombre Fase:</label>
                    <input 
                    type="text"
                    name="nombreFase"
                    value={this.state.nombreFase}
                    onChange={this.handleChange}/>
                    <label>Duración (dias):</label>
                    <input 
                    type="number"
                    name="duracionFase"
                    value={this.state.duracionFase}
                    onChange={this.handleChange}></input>
                    <label>Costo (bs):</label>
                    <input 
                    type="number"
                    name="costoFase"
                    value={this.state.costoFase}
                    onChange={this.handleChange}></input>
                    <button onClick={this.handleAddFase}>Agregar Fase</button>
                    <select
                    name="cargo"
                    value={this.state.cargo}
                    onChange={this.handleChangeCargo}
                    >
                    <option />
                    {this.props.cargoList.map((cargo, i) => (
                      <option value={cargo.tipo_cargo} key={i}>
                        {cargo.tipo_cargo}
                      </option>
                    ))}
                  </select>
                  <table id="t01">
                    {this.state.cargoList.map((cargo, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            {cargo}
                            <input
                              className=""
                              placeholder=""
                              type="number"
                              name={i}
                              noValidate
                              value={this.state.cantidadcargoList[i]}
                              onChange={this.handleChangeCantidad}
                            />
                            <button
                              numero={i}
                              name={cargo}
                              onClick={this.onDelete}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
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
                            {maquinaria}
                            <input
                              className=""
                              placeholder=""
                              type="number"
                              name={i}
                              noValidate
                              value={this.state.cantidadmaquinariaList[i]}
                              onChange={this.handleChangeCantidadMaquinaria}
                            />
                            <button
                              numero={i}
                              name={maquinaria}
                              onClick={this.onDeleteMaquina}>
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                    </div>
                </div>
                  <button onClick={this.handleAddEtapa}>Agregar etapa</button>

                </div>
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick="">
                  Ingresar Etapas
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormEtapa;
