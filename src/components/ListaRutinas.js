//Import React SDKs
import React from 'react';
import { Link } from 'react-router-dom';

//Import CSS
import "./ListaRutinas.css"



export default function ListaEjercicios({ arrayRutinas }) {


    return (
        <>
            <div className='container-rutinas'>
                {arrayRutinas.map((rutina) => {
                    return (
                        <div className='container-rutina' key={rutina}>
                            <img className='container-rutina-imagen' src={`/images/icons/fuerza.png`}></img>
                            <h2 className='container-rutina-nombre'>
                                <Link className='container-rutina-link' to={`/rutinas/${rutina}`}>
                                    {rutina}
                                </Link>
                            </h2>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
