import React from "react";
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
//import img1 from "../images/bauxita.jpg";
//import Title from "../components/Title";

const Proxima =() => {
    
return (
<>
<Hero hero="roomsHero">
    <Banner title="Proxima pagina a relizar">
        <Link to="/" className="btn-primary">Volver al Home</Link>
    </Banner>
</Hero>
</>
)};

export default Proxima;