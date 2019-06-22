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
    cargoList:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddEtapa = this.handleAddEtapa.bind(this);
    this.handleAddFase = this.handleAddFase.bind(this);
    this.handleChangeCargo=this.handleChangeCargo.bind(this);
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

  handleAddFase (e){
    let faseList=this.state.fases;
    e.preventDefault();
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
      this.setState({nombreFase: "", duracionFase:"",costoFase:""});
      console.log(this.state.fases);
  }

  handleAddEtapa(e) {
   e.preventDefault();
   let dias=0;
   let bs=0;
   this.state.fases.map((f)=>{
       dias=parseInt(dias)+ parseInt(f.duracionFase);
       bs= parseInt(bs)+parseInt(f.costoFase);
   })
   let EtapaList=this.state.etapas;
   let numero=parseInt(this.state.numeroEtapa)+1;
   this.setState({ numeroEtapa: numero})
    e.preventDefault();
      let etapa={
          nombreEtapa: this.state.nombreEtapa,
          duracionEtapa: dias,
          costoEtapa: bs,
          numeroEtapa: this.state.numeroEtapa
      }
      EtapaList.push(etapa);
      this.setState({ etapas: EtapaList});
      this.setState({nombreEtapa: ""});
      console.log(this.state.etapas);
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
