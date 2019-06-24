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
            numeroEtapa:0
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
  addEtapa(etapa){
    console.log(etapa.nombre)
    /* fetch("/api/etapas", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ etapa:  etapa})
      }).then(res => res.json());*/
  }
  /*Acciones de botones */
  handleIngresarFase(etapa){
    this.addEtapa(etapa);
    document.getElementById("form_etapa").style.display="none";
    document.getElementById("form_fase").style.display="block";
  }
  handleIngresarCargos(e){
      e.preventDefault();
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
          handleIngresarFase={this.handleIngresarFase.bind(this)}
          nombreProyecto= {this.props.nombreProyecto}/>
      </div>
      <div id ="form_fase">
          <FormFases  
           handleIngresarCargos={this.handleIngresarCargos}
           />.bind(this)
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
