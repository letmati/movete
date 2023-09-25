//SDKs React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//Import css
import "./Home.css"

//Import componentes
import ListaRutinas from './ListaRutinas';
import Header from './Header';

//Import SDKs firebase/ componente firebase
import { getFirestore, getDocs, collection } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../firebase';
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


export default function Home({ usuario }) {
  const [rutinas, setRutinas] = useState(null)

  const documentoBuscarCrear = async (idDocumento) => {
    let rutinasFb = []
    const colRef = collection(firestore, `/usuarios/${idDocumento}/rutinas`)
    const consulta = await getDocs(colRef)

    rutinasFb = consulta.docs.map(doc => doc.id)
    return rutinasFb

    // const ids = []
    // consulta.docs.forEach((doc) => ids.map(doc.id))
    // return ids
  }

  useEffect(() => {
    const fetchTareas = async () => {
      const response = await documentoBuscarCrear(usuario.email);
      setRutinas(response);
    }

    fetchTareas();
  }, []);



  return (
    <>
      <Header cerrarSesion={() => signOut(auth)} />
      <div className='home'>
        <span>Rutinas</span>
        {rutinas ? <ListaRutinas arrayRutinas={rutinas} /> : null}
        <button>
          <Link to={`/agregarRutina/${usuario.email}`} >
            AgregarRutina
          </Link>
        </button>
      </div>
    </>
  )
}
