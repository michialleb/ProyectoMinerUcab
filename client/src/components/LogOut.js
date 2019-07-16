import React, { Component } from "react";
import { FaPowerOff } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";

export default class LogOut extends Component {

  constructor() {
    super();

    this.state = {
    salir: false
    };

    this.loggingOut = this.loggingOut.bind(this);
   
   
  }
  loggingOut (e){
    localStorage.clear();
  this.setState({salir: true})
  }
  render() {
 
    return (
      <div>
        {this.state.salir ?  <Redirect to='/sign-in' /> : (
           <div className="log-out"  onClick={this.loggingOut}>
           <span>Log Out</span>
           <span className="log-btn">
             <FaPowerOff />
           </span>
         </div>
        )}
      </div>
     
    );
  }
}
