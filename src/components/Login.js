//Import React SDKs
import React, { useState } from 'react';

//Import css
import "./Login.css"

//Import componentes
import Header from "../components/Header"

//Import SDKs firebase
import firebaseApp from "../firebase";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithRedirect,
} from "firebase/auth";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider()




export default function Login() {
    const [estaRegistrandose, setEstaRegistrandose] = useState(false)

    const handleAuth = () => {
        setEstaRegistrandose(!estaRegistrandose);
    }

    const submitHandle = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (estaRegistrandose) {
            const usuario = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
        } else {
            signInWithEmailAndPassword(auth, email, password)
        }
    }

    return (

        <div className='auth'>
            <header>
                <p>
                    Movete
                </p>
            </header>


            <form onSubmit={submitHandle} className='form-auth'>

                <input
                    className='input-login'
                    type="text"
                    id='email'
                    placeholder="Email"
                ></input>


                <input
                    className='input-login'
                    type="password"
                    id='password'
                    placeholder="Contraseña"
                ></input>

                <button className='boton-login'>
                    Inicia Sesion
                </button>
            </form>

            <h2 className='auth-google'>
                <span>
                    accede con
                </span>
            </h2>

            <a>
                <img
                    className='google-logo'
                    src={"images/icons/google.png"}
                    onClick={() => signInWithRedirect(auth, googleProvider)}
                />
            </a>

            <div className='auth-opciones'>
                <h2 className='auth-opciones-texto'>
                    Crear cuenta
                </h2>

                <h2 className='auth-opciones-texto'>
                    Olvidé mi contraseña
                </h2>
            </div>


            {/* <button onClick={() => signInWithPopup(auth, googleProvider)}>
                Acceder con google
            </button> */}

            {/* <button onClick={handleAuth}>
                {estaRegistrandose ? 'Ya tienes cuenta? Inicia sesion' : 'No tenes cuenta? Registrate'}
            </button> */}

        </div>

    )
}
