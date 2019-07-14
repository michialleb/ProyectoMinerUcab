import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Sesion from "./Sesion";
import { isThisHour } from "date-fns";

class SignInForm extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      usuariosLogin:[],
      authen:false
    };

    this.handleChange = this.handleChange.bind(this);
  //  this.handleSubmit = this.handleSubmit.bind(this);
   
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
  //  e.preventDefault();
    localStorage.setItem('user', this.state.email);
    localStorage.setItem('password', this.state.password);
    console.log("The form was submitted with the following data:");
  }

  isAuthenticated(e){
    var autenticar=this.state.authen;
   this.state.usuariosLogin.map((users)=>{
     if (users.usuario == localStorage.getItem('user')){
       if (users.contraseña ==  parseInt(localStorage.getItem('password'))){
          autenticar=this.getPermisos(users.id_usuario, users.nombre);
       }
     }
   })

  return autenticar;
  }
  
  getPermisos (id_usuario, nombre){
    fetch(`/api/usuarios/log/in/permisos/${id_usuario}`)
    .then(res => res.json())
    .then(res => {
      var permisos = res.map((r => r)) ;
      permisos.map((p)=>{
        localStorage.setItem(p.nombre_permiso,JSON.stringify(p.nombre_permiso));
        localStorage.setItem('id_usuario', id_usuario);
        localStorage.setItem('nombre_usuario', nombre);

      })
    
    });
    return true;
  }

  getUsuarios (){
    fetch("/api/usuarios/all/usuarios/users/passwords")
    .then(res=> res.json())
    .then(res=>{
      if (res.error) console.log("error al obtener  usuarios");
      else {
           var l=res.map((r=>r));
           this.setState({usuariosLogin : l})}   
    })
  }
  
  componentDidMount (){
    this.getUsuarios();
  }
  render() {
    const isAlreayAuthenticared = this.isAuthenticated();
    return (
      <>
      <div >
        {  isAlreayAuthenticared  ? <Redirect to='/sesion' /> : (
          <div className="FormCenter">
          <form
            onSubmit={this.handleSubmit.bind(this)}
            className="FormFields"
          >
            <div className="FormField">
              <label className="FormField__Label" htmlFor="email">
                Usuario
              </label>
              <input
                type="text"
                id="email"
                className="FormField__Input"
                placeholder="Introduce tu usuario"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>

            <div className="FormField">
              <label className="FormField__Label" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                className="FormField__Input"
                placeholder="Introduce tu contraseña"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

            <div className="FormField">
              <button type="submit"> Iniciar Sesion </button>
              <Link to="/" className="FormField__Link">
                Crear cuenta
              </Link>
            </div>
          </form>
        </div>
        )}
      </div>
      </>
    );
  }
}

export default SignInForm;


/*             <Link
                to="/sesion"
                className="FormField__Button mr-20"
              
              >
                Iniciar Sesion
              </Link> */


              /*  
        */