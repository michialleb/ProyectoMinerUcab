import React ,{Component} from 'react';
import Title from './Title';
//import img1 from '../images/people.jpg';
import {FaCocktail,FaHandsHelping} from 'react-icons/fa';
//import {TiThermometer,FaHandshake,TiArrowUpThick} from 'react-icons/fa';
export default class Services extends Component{
    state={
        services:[
            {
                icon:<FaCocktail/>,
                //img: <img1/>,
                title:"Responsabilidad Ambiental",
                info:"Loren ipsum dolor sit amet consectetur adipsjsn aksjbd edad"
            },
            {
                icon:<FaHandsHelping/>,
                title:"Superar al Cliente",
                info:"Loren ipsum dolor sit amet consectetur adipsjsn aksjbd edad"
            },
            {
                icon:<FaCocktail/>,
                title:"Innovación e investigacioón continua",
                info:"Loren ipsum dolor sit amet consectetur adipsjsn aksjbd edad"
            },
            {
                icon:<FaCocktail/>,
                title:"Calidad de Servicios",
                info:"Loren ipsum dolor sit amet consectetur adipsjsn aksjbd edad"
            }
        ]
    }
    render(){
        return(<section className="services">
            <Title title="Objetivos"> </Title>
            <div className="services-center">
                { this.state.services.map((item,index)=> { 
                    return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                    </article>

                })}
            </div>
        </section>);
    }
}




