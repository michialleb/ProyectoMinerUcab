import React from 'react';
// dos componentes hijos , para el home (defaulthero) y para otras paginas (roomshero)
export default function Hero({children,hero}){
    return(<header className={hero}>{children}</header>
        
        )
}
Hero.defaultProps={
    hero:"defaultHero"
}; // pone por defecto la imagen que tiene el home 