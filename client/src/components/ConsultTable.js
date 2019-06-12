import React, { Component } from "react";
import "../styles/ConsultTable.css";

class ConsultTable extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0 };
  }

  render() {
    let nombre;
    return (
      <>
        <table id="t01">
          <tr>
            {this.props.consult.consult.map((item, i) => (
              <th key={i}>{item}</th>
            ))}
          </tr>
          {this.props.empleados.map((empleado, i) => {
            return <tr key={i} > {empleado}</tr>;
          })}
          <tr>
            <td>Diego</td>
            <td>Smith</td>
            <td>50</td>
          </tr>
          <tr>
            <td>Eve</td>
            <td>Jackson</td>
            <td>94</td>
          </tr>
          <tr>
            <td>John</td>
            <td>Doe</td>
            <td>80</td>
          </tr>
        </table>
      </>
    );
  }
}
export default ConsultTable;
