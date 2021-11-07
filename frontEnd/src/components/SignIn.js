import '../SignIn.css';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from '../firebase.js';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
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
                email,
                password
            );
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
                setEmail(event.target.value);
            }} />
            <input placeholder="password" type="password" onChange={(event) => {
                setPassword(event.target.value);
            }} />
            <Button variant="outline-secondary" onClick={login}> Sign In</Button>
            <h1>Sign up</h1>
            <input placeholder="email" type="email" onChange={(event) => {
                setEmail(event.target.value);
            }} />
            <input placeholder="password" type="password" onChange={(event) => {
                setPassword(event.target.value);
            }} />
            <Button variant="outline-secondary" onClick={register}>Sign Up</Button>
        </div>
    )
}
export default SignIn;
