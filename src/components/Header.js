import React from 'react';
import "./Header.css"

export default function Header({cerrarSesion}) {

   return (
       <header className='header'>
           <nav className='header-nav'>
               <div className='header-home'>Movete</div>
               <div className='header-logout' onClick={() => cerrarSesion()}>Cerrar sesion</div>
           </nav>
       </header>
   ) 
}
