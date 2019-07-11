import React, { Component } from "react";
import Menu from "../components/Menu";
import Banner from "../components/Banner";

class Sesion extends Component {
  constructor(){
    super();
    this.state={
      permisos:[],
      id_usuario:1, // este dato depende de la persona que ingrese
      adminTodo:"",
      adminAli:"",
      adminYac:"",
      adminCli:"",
      adminEmp:"",
      adminMin:"",
      adminInfo:"",
      adminPro:"",
      adminRol:"",
      adminInv:"",
      adminUser:""
    }
   }

  getPermisos (){
    fetch(`/api/usuarios/log/in/permisos/${this.state.id_usuario}`)
    .then(res => res.json())
    .then(res => {
      this.setState({ permisos: res.map(r => r) });

    });
  }

  componentDidMount(){
        this.getPermisos();
  }
 componentWillMount(){
  ( localStorage.getItem('adminTodo')||  localStorage.getItem('adminCli')|| 
   localStorage.getItem('adminMin')||  localStorage.getItem('adminYac')|| 
   localStorage.getItem('adminPro')||   localStorage.getItem('adminEmp')|| 
   localStorage.getItem('adminAli')||    localStorage.getItem('adminInv')|| 
   localStorage.getItem('adminUser')||  localStorage.getItem('adminRol')|| 
   localStorage.getItem('adminInfo')) && this.setState({
     adminAli: localStorage.getItem('adminAli'),
     adminTodo: localStorage.getItem('adminTodo'),
     adminMin: localStorage.getItem('adminMin'),
     adminPro: localStorage.getItem('adminPro'),
     adminUser: localStorage.getItem('adminUser'),
     adminInfo: localStorage.getItem('adminInfo'),
     adminCli: localStorage.getItem('adminCli'),
     adminYac: localStorage.getItem('adminYac'),
     adminEmp: localStorage.getItem('adminEmp'),
     adminInv: localStorage.getItem('adminInv'),
     adminRol: localStorage.getItem('adminRol')
   })
 }
  componentWillUpdate(nextProps, nextState){
    nextState.permisos.map((p)=>{
      localStorage.setItem(p.nombre_permiso,JSON.stringify(p.nombre_permiso));
    })
  
   localStorage.setItem('id_usuario', JSON.stringify(nextState.id_usuario))
  }
  render() {
    var crud = {
      options: [""],
      content: [
        {
          form:  <Banner
          banner="welcome"
          title={this.props.match.params.nombre}
          subtitle="" />,
          id: 0
        }
      ]
    };
    return <Menu crud={crud} />;
  }
}

export default Sesion;
