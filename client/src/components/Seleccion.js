import React,{Component} from "react";
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import img1 from '../images/maq1.jpg';
import img2 from '../images/maq2.jpg';
import img3 from '../images/maq3.jpg';
import img4 from '../images/maq4.jpg';
import img5 from '../images/maq5.jpg';
import img6 from '../images/maq7.jpg';
import img7 from '../images/maq8.jpg';
import img8 from '../images/maq9.jpg';
import img9 from '../images/maq10.jpg';
import img10 from '../images/maq11.jpg';
import img11 from '../images/caracas.jpg';
import img12 from '../images/amazonas.jpg';
import img13 from '../images/Guarico.jpg';
import img14 from '../images/twitter.png';
import img15 from '../images/insta.png';
import img16 from '../images/face.png';
import img17 from '../images/wha.jpg'
import {Tabs,Tab,Grid,Cell,Card,CardTitle,CardText,CardActions,Button,CardMenu,IconButton} from 'react-mdl';
//import img1 from "../images/bauxita.jpg";
//import Title from "../components/Title";

class seleccion extends Component{
    constructor(props){
        super(props);
        this.state={activeTab :0}
    }

    desplegarinstalaciones(){
        if(this.state.activeTab===0){
            return(<div className="maquinaria">

        <div class="column">
          <div class="card">
            <img  src={img1} alt="Avatar" />
            <div class="container">
              <h6><b>Dragalina</b></h6> 
              </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img  src={img2} alt="Avatar" />
            <div class="container">
              <h6><b>Pala excavadora</b></h6> 
              </div>
          </div>
        </div>
        <div class="column">
          <div class="card">
            <img  src={img3} alt="Avatar" />
            <div class="container">
              <h6><b>Rotopala</b></h6> 
            </div>
          </div>
        </div>
          <div class="column">
          <div class="card">
            <img src={img4} alt="Avatar"/ >
            <div class="container">
              <h6><b>Mototrailla</b></h6> 
            </div>
          </div>
          </div>
          <div class="column">
          <div class="card">
            <img src={img5} alt="Avatar" />
            <div class="container">
              <h6><b>Bulldozer</b></h6> 
            </div>
          </div>
          </div>
          <div class="column">
          <div class="card">
            <img src={img6} alt="Avatar" />
            <div class="container">
              <h6><b>Camion</b></h6> 
            </div>
          </div>
          </div>
          <div class="column">
          <div class="card">
            <img src={img7} alt="Avatar" />
            <div class="container">
              <h6><b>Jumbo</b></h6> 
            </div>
        </div>
        </div>
            <div class="column">
          <div class="card">
            <img src={img8} alt="Avatar" />
            <div class="container">
              <h6><b>Grua Levante</b></h6> 
            </div>
          </div>
          </div>
          <div class="column">
          <div class="card">
            <img src={img9} alt="Avatar" />
            <div class="container">
              <h6><b>Robochott</b></h6> 
            </div>
          </div>
          </div>
          <div class="column">
          <div class="card">
            <img src={img10} alt="Avatar" />
            <div class="container">
              <h6><b>Rozadora</b></h6> 
            </div>
          </div>
          </div>
          </div>

          )
        }else if (this.state.activeTab===1){
            return<div><div class="column">
            <div class="card">
              <img  src={img11} alt="Avatar" />
              <div class="container">
                <h6><b>Caracas</b></h6> 
                </div>
            </div>
          </div>
  
          <div class="column">
            <div class="card">
              <img  src={img12} alt="Avatar" />
              <div class="container">
                <h6><b>Amazonas</b></h6> 
                </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <img  src={img13} alt="Avatar" />
              <div class="container">
                <h6><b>Guárico</b></h6> 
              </div>
            </div>
          </div></div>
        }else if (this.state.activeTab===2){
            return<div>
                 <div class="column">
            <div class="card">
              <img  src={img14} alt="Avatar" />
              <div class="container">
                <h6><b>@minerucab19</b></h6> 
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <img  src={img15} alt="Avatar" />
              <div class="container">
                <h6><b>@minerucab_</b></h6> 
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <img  src={img16} alt="Avatar" />
              <div class="container">
                <h6><b>Miner Ucab C.A</b></h6> 
              </div>
            </div>
          </div>
          <div class="column">
            <div class="card">
              <img  src={img17} alt="Avatar" />
              <div class="container">
                <h6><b>+584141221422</b></h6> 
              </div>
            </div>
          </div>
            </div>
        }
    }
    render(){
        return (
           <div className="categoria-tabs">
               <Tabs activeTab={this.state.activeTab} onChange={(tabId) => this.setState({ activeTab: tabId })} ripple>
                   <Tab>Maquinaria</Tab>
                   <Tab>Sucursales</Tab>
                   <Tab>Redes Sociales</Tab>
               </Tabs>
               <section className="nosotros">
                   <Grid>
                    <Cell col={12}>
                        <div className="contenido">{this.desplegarinstalaciones()}</div>
                    </Cell>
                   </Grid>       
               </section>
           </div>
        )}
}
    



export default seleccion;
