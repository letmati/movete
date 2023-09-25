//SDKs React
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//Import componentes
import Home from './components/Home';
import Login from './components/Login';

//Import paginas
import AgregarRutina from './pages/AgregarRutina'
import Rutina from './pages/Rutina'

//Import CSS
import "./App.css"

//Import SDKs firebase / componente firebase
import firebaseApp from './firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth"
const auth = getAuth(firebaseApp)


export default function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null)
 

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      setUsuarioGlobal(usuarioFirebase);
    } else {
      setUsuarioGlobal(null);
    }
  })


  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={usuarioGlobal ? <Home usuario={usuarioGlobal} /> : <Login />} />
          <Route path={usuarioGlobal && `/agregarRutina/:id`} element={<AgregarRutina />} />
          <Route path='/rutinas/:id' element={usuarioGlobal && <Rutina usuario={usuarioGlobal} />} />
        </Routes>
      </Router>
    </div>
  )
}





