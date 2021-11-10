import '../SignIn.css';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from '../firebase.js';
import React, { useState } from 'react'

const SignIn = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        }
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(JSON.stringify(user.user.uid));
    
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        }
    };

    return (
        <div className="signin">
                <h1>Sign in</h1>
                <input placeholder="email" type="email" onChange={(event) => {
                    setLoginEmail(event.target.value);
                }} />
                <input placeholder="password" type="password" onChange={(event) => {
                    setLoginPassword(event.target.value);
                }} />
                <button onClick={login}> Sign In</button>
                
                <h1>Sign up</h1>
                <input placeholder="email" type="email" onChange={(event) => {
                    setRegisterEmail(event.target.value);
                }} />
                <input placeholder="password" type="password" onChange={(event) => {
                    setRegisterPassword(event.target.value);
                }} />
                <button onClick={register}>Sign Up</button>
        </div>
    )
}
export default SignIn;
