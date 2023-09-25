//Import SDKs React
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

//Import CSS
import "./AgregarRutina.css"

//Import SDKs firebase / componente firebase
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseApp from '../firebase';
const firestore = getFirestore(firebaseApp)


export default function AgregarRutina() {
    const { id } = useParams()

    const [dataRutina, setDataRutina] = useState({ nombre: '', tipo: '' })
    const [dataFormulario, setDataFormulario] = useState([{
        descripcion: '',
        series: '',
        repeticiones: ''
    }])

    //Funciones
    const handleChangeRutina = (event) => {
        const { name, value } = event.target
        setDataRutina(dataRutinaPrevia => {
            return {
                ...dataRutinaPrevia,
                [name]: value
            }
        })
    }

    const handleChangeFormulario = (i, e) => {
        setDataFormulario(prevDataFormulario => {
            let nuevaDataFormulario = [...prevDataFormulario]
            nuevaDataFormulario[i][e.target.name] = e.target.value
            return nuevaDataFormulario
        })
    }

    const agregarFormularioEjercicio = () => {
        console.log(dataFormulario)
        setDataFormulario(prevDataFormulario => {
            return [...prevDataFormulario, { descripcion: '', series: '', repeticiones: '' }]
        })
    }


    const handleSubmit = async (event) => {
        event.preventDefault()
        const docRef = doc(firestore, `usuarios/${id}/rutinas/${dataRutina.nombre}`)
        await setDoc(docRef, { ...dataFormulario, tipo: dataRutina.tipo })
        console.log('EXITOS BROOOOOOOOOOOO')
    }

    //Componentes
    const formularioEjercicios = (
        <form className='form-descripcion-rutina'>
            {dataFormulario.map((elemento, index) => (
                <div key={index}>
                    <input
                        name='descripcion'
                        type='text'
                        placeholder='Nombre ejercicio'
                        value={elemento.descripcion}
                        onChange={(e) => handleChangeFormulario(index, e)}
                    />
                    <input
                        name='series'
                        type='number'
                        placeholder='Series'
                        value={elemento.series}
                        onChange={(e) => handleChangeFormulario(index, e)}
                    />
                    <input
                        name='repeticiones'
                        type='number'
                        placeholder='Repeticiones'
                        value={elemento.repeticiones}
                        onChange={(e) => handleChangeFormulario(index, e)}
                    />
                </div>
            ))}
        </form>
    )

    return (
        <div className='agregar-rutina'>
            <h1>Guardá tu rutina</h1>

            <form className='form-nombre-rutina'>
                <input
                    name='nombre'
                    type='text'
                    placeholder='Nombre de rutina'
                    value={dataRutina.nombre}
                    onChange={handleChangeRutina}
                />
                <select className='input-select' value={dataRutina.tipo} name='tipo' onChange={handleChangeRutina}>
                    <option value=''>Tipo de rutina</option>
                    <option value='fuerza'>Fuerza</option>
                    <option value='cardio'>Cardio</option>
                </select>
            </form>

            {dataRutina.tipo && formularioEjercicios}

            <button onClick={() => agregarFormularioEjercicio()}>Agregar Ejercicio</button>
            <button onClick={handleSubmit}>Guardar Rutina</button>
        </div>
    )
}