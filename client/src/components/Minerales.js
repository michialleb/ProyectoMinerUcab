import React ,{Component} from 'react';
import Title from './Title';
import img1 from "../images/bauxita.jpg";
import img2 from "../images/carbon.jpg";
import img3 from "../images/cobre.jpg";
import img4 from "../images/diamante.jpg";
import img5 from "../images/hierro.jpg";
import img6 from "../images/manganeso.jpg";
import img7 from "../images/niquel.png";
import img8 from "../images/oro.jpg";
import TitleMineral from './TitleMineral';
//import {TiThermometer,FaHandshake,TiArrowUpThick} from 'react-icons/fa';
export default class Minerales extends Component{
    state={
       minerals:[
           {
               name:'Bauxita',
               image:img1,
               type:'mineral'
           },
           {
            name:'Carbon',
            image:img2,
            type:'mineral'

        },
        {
            name:'Cobre',
            image:img3,
            type:'mineral'
        },
        {
            name:'Diamante',
            image:img4,
            type:'mineral'
        },
        {
            name:'Hierro',
            image:img5,
            type:'mineral'
        },
        {
            name:'Manganeso',
            image:img6,
            type:'mineral'
        },
        {
            name:'Niquel',
            image:img7,
            type:'mineral'
        },
        {
            name:'Oro',
            image:img8,
            type:'mineral'
        }
       ]
    }
    render(){
        return(
        <article className="featured-rooms">
            <Title className="section-title" title="Algunos minerales"></Title>
            <article className="featured-rooms-center">
            { this.state.minerals.map((item,index)=> { 
                    return <article key={index} className="room">
                            <TitleMineral title={item.name}/>
                    <div className="img-container">
                        <img src={item.image} alt =""></img>
                    </div>
                    </article>
                })}
            </article>  
        </article>
        );
    }
}