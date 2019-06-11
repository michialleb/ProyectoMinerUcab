import React, { Component } from "react";
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { Tabs, Tab } from "react-mdl";
import "../styles/MenuCRUD.css";

export default class MenuCrud extends Component {
  constructor(props) {
    super(props);
    this.state = { activeTab: 0};

  }

  render() {
    return (
      <div className="demo-tabs">
        <Tabs className="tabs-crud"
          activeTab={this.state.activeTab}
          onChange={tabId => this.setState({ activeTab: tabId })}
          ripple
        >
          {this.props.crud.options.map((option, i)=> <Tab className="options" 
          key={i}>{option}</Tab>)}
        </Tabs>
        <section>
          <div className="content"> 
          { this.props.crud.content.map((item)=> { 
                   if (item.id===this.state.activeTab){
                    return <div>{item.form}</div>
                   }else
                     return null;
                })}
          </div>
        </section>
      </div>
    );
  }
}
