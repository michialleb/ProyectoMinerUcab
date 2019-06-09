import React, { Component } from "react";
import { FaPowerOff } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class LogOut extends Component {
  render() {
    return (
      <div className="log-out">
        <span>Log Out</span>
        <span className="log-btn">
          <FaPowerOff>
            <Link to="" />
          </FaPowerOff>
        </span>
      </div>
    );
  }
}
