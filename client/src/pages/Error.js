import React from "react";
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';

const Error =() => {
return (
<Hero>
    <Banner title="404" subtitle="Page Not Found">
        <Link to="/" className="btn-primary">
            Volver a Home
        </Link>
    </Banner>
</Hero> // por defento su clase es defaultHero

)};

export default Error;