import React, { Component } from "react";
import "../styles/Form.css";

class FormEtapa2 extends Component {
  constructor() {
    super();

    this.state = {
        nombreEtapa:"", 
        numeroEtapa: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    

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
                    <label>Nombre Etapa:</label>
                    <input 
                    type="text"
                    name="nombreEtapa"
                    value={this.state.nombreEtapa}
                    onChange={this.handleChange}/>
                    </div>
                </div>
                
              </div>
              <div className="ingresarUsuario">
                <button type="submit" onClick={(function (e) {this.props.handleIngresarFase(e,this.state.nombreEtapa)}).bind(this)}>
                  Aceptar
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormEtapa2;
