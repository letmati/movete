//Import React SDKs
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//Import CSS
import "./Rutina.css"

//Import Firebase SDKs // Componentes
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import firebaseApp from '../firebase';
const firestore = getFirestore(firebaseApp)



export default function Rutina({ usuario }) {
  const { id } = useParams()
  const [tipoRutina, setTipoRutina] = useState('')
  const [rutina, setRutina] = useState([])

  const buscarRutinaFs = async (idRutina) => {
    const docRef = doc(firestore, `/usuarios/${usuario ? usuario.email : null}/rutinas/${idRutina}`)
    const consulta = await getDoc(docRef)
    const consultaTest = consulta.data()
    // console.log(consultaFilter.filter(elemento => {if (typeof(elemento) === 'object') return elemento}))
    return (Object.values(consultaTest))
  }




  useEffect(() => {
    const fetchRutina = async () => {
      const respuesta = await buscarRutinaFs(id)
      // setTipoRutina(
      //   respuesta.filter(elemento => typeof (elemento) === 'string')
      // )
      respuesta.filter(elemento => { if (typeof (elemento) === 'string') {
        setTipoRutina(elemento)
      }})


      setRutina(
        respuesta.filter(elemento => typeof (elemento) === 'object')
      )
    }

    fetchRutina()
  }, [])



  return (
    <div className='rutina-container'>

      <h1>{id}</h1>
      {tipoRutina && <img className='rutina-img' src={`/images/icons/${tipoRutina}.png`}/>}

      <table className='rutina-tabla'>
        <tbody>
          <tr className='rutina-tabla-header'>
            <th>Ejercicio</th>
            <th>Series</th>
            <th>Repeticiones</th>
          </tr>
          {rutina.map(elemento => {
            return (
              <tr className='rutina' key={elemento.descripcion}>
                <td className='rutina-descripcion'> {elemento.descripcion} </td>
                <td className='rutina-series'> {elemento.series} </td>
                <td className='rutina-repeticiones'> {elemento.repeticiones} </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>

    </div>
  )
}
