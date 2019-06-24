import React, { Component } from "react";
import FormEtapa from "./FormEtapa2";
import FormFases from "./FormFases";
import FormCargos from "./FormCargosProyecto";
import FormMaquinaria from "./FormMaquinaria" ;
import FormFinalizarYacimiento from "./FormFinalizarYacimiento";


class ConfiguracionProyecto extends Component {
  constructor(props) {
    super(props);
    this.state = {
            etapaList:[], 
            numeroEtapa:1,
            nombreEtapa: "",
            numeroFase: 1,
            costoFase: "",
            duracionFase:""
    };
    this.handleChange = this.handleChange.bind(this);   
    this.handleIngresarFase = this.handleIngresarFase.bind(this);
    this.handleIngresarCargos = this.handleIngresarCargos.bind(this);
    this.handleIngresarMaquinaria = this.handleIngresarMaquinaria.bind(this);
    this.handleAgregarOtraEtapa = this.handleAgregarOtraEtapa.bind(this);
    this.handleAceptarCambiosMaquinaria = this.handleAceptarCambiosMaquinaria.bind(this);
  
   
  }
  
  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name] : value
    });
  }
  /* Ingresar en bd */
  addEtapa(nombreEtapa){
   let etapa={
        nombre: nombreEtapa,
        numero: this.state.numeroEtapa,
        nombreProyecto: this.props.nombreProyecto,
        duracionEtapa: 0,
        costoEtapa:0
    }
    fetch("/api/etapas", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ etapa:  etapa})
      }).then(res => res.json());
  }

  addFase (nombreFase,duracionFase,costoFase){
    let fase={
        nombreFase: nombreFase,
        duracion: duracionFase,
        costo:costoFase,
        numeroFase:this.state.numeroFase,
        nombreProyecto:this.props.nombreProyecto,
        numeroEtapa: this.state.numeroEtapa
      }
      console.log(fase);
      fetch("/api/fases", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ fase:  fase})
      }).then(res => res.json());
  }
  /*Acciones de botones */
  handleIngresarFase(e, nombreEtapa){
    e.preventDefault();
    let numero=(this.state.numeroEtapa + 1); // cuenta las etapas que se van agregando
    this.setState({numeroEtapa: numero});
    this.setState({nombreEtapa: nombreEtapa});
    this.addEtapa(nombreEtapa);
   
    document.getElementById("form_etapa").style.display="none";
    document.getElementById("form_fase").style.display="block";
  }
  handleIngresarCargos(e, nombreFase, duracionFase,costoFase){
      e.preventDefault();
      let costo= parseInt(costoFase)+parseInt(this.state.costoFase);
      let duracion= parseInt(duracionFase)+parseInt(this.state.duracionFase);
      let numero=(this.state.numeroFase + 1); // cuenta las fases que se van agregando
      this.addFase(nombreFase,duracionFase,costoFase);
      this.setState({numeroFase: numero,
                     costoFase: costo,
                     duracionFase: duracion});

      document.getElementById("form_fase").style.display="none";
      document.getElementById("form_cargos").style.display="block";
  }

  handleIngresarOtraFase(e){
    e.preventDefault();
    document.getElementById("form_fase").style.display="block";
    document.getElementById("form_maquinaria").style.display="none";
}
  handleAgregarOtraEtapa (e){
    e.preventDefault();
    let cero= 0;
    let cero2=0;
    let numero= 1; // cuenta las etapas que se van agregando
    this.setState({numeroFase: numero,
                   costoFase: cero,
                   duracionFase: cero2});
    document.getElementById("form_etapa").style.display="block";
    document.getElementById("form_maquinaria").style.display="none";
    
  }
  handleIngresarMaquinaria(e){
    e.preventDefault();
    document.getElementById("form_maquinaria").style.display="block";
    document.getElementById("form_cargos").style.display="none";
    
  }
  handleAceptarCambiosMaquinaria(e){
    e.preventDefault();
    document.getElementById("form_maquinaria").style.display="none";
    document.getElementById("form_finalizar").style.display="block";
    
  }

  render() {
    return (
      <>
      <div id ="form_etapa">
          <FormEtapa  
          handleIngresarFase={this.handleIngresarFase}/>
      </div>
      <div id ="form_fase">
          <FormFases  
           handleIngresarCargos={this.handleIngresarCargos}
           />
      </div>
      <div id ="form_cargos">
          <FormCargos  
          handleIngresarMaquinaria={this.handleIngresarMaquinaria} 
          cargoList={this.props.cargoList} />
      </div>
      <div id ="form_maquinaria">
          <FormMaquinaria 
          handleAceptarCambiosMaquinaria={this.handleAceptarCambiosMaquinaria}
          handleAgregarOtraEtapa={this.handleAgregarOtraEtapa}
          handleIngresarOtraFase={this.handleIngresarOtraFase}
          maquinariaList={this.props.maquinariaList} />
      </div>
      <div id ="form_finalizar">
          <FormFinalizarYacimiento />
      </div>
      </>
    );
  }
}
export default ConfiguracionProyecto;
