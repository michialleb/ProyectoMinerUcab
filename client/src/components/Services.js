import React ,{Component} from 'react';
import Title from './Title';
//import img1 from '../images/people.jpg';
//import {TiThermometer,FaHandshake,TiArrowUpThick} from 'react-icons/fa';
export default class Services extends Component{
    state={
        services:[
            {
                icon:"fa fa-thermometer-three-quarters",
                //img: <img1/>,
                title:"Responsabilidad Ambiental",
                info:"Loren ipsum dolor sit amet consectetur adipsjsn aksjbd edad"
            },
            {
                icon:"fa fa-handshake-o",
                title:"Superar al Cliente",
                info:"Loren ipsum dolor sit amet consectetur adipsjsn aksjbd edad"
            },
            {
                icon:"fa fa-cogs",
                title:"Innovación e investigacioón continua",
                info:"Loren ipsum dolor sit amet consectetur adipsjsn aksjbd edad"
            },
            {
                icon:"fa fa-heart",
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
                            <span className={item.icon}/>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                    </article>

                })}
            </div>
        </section>);
    }
}




