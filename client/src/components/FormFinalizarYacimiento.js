import React, { Component } from "react";
import "../styles/Form.css";

class FormFinalizarYacimiento extends Component {
 
  render() {
    return (
      <>
        <div className="wrapper">
          <div className="form-wrapper">
            <form className="form" noValidate>
            <h5>Yacimiento agregado exitosamente</h5>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default FormFinalizarYacimiento;
