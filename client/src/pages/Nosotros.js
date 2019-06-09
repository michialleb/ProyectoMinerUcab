import React from "react";
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import Seleccion from '../components/Seleccion';
import Navbar from "../components/Navbar";
//import img1 from "../images/bauxita.jpg";
//import Title from "../components/Title";

const Nosotros =() => {
    
return (
<>
<Navbar/>
<Hero hero="roomsHero">
<Banner banner="banner" title="Nosotros" >
</Banner>
</Hero>
<Seleccion/>

</>
)};

export default Nosotros;

