import '../SignIn.css';
import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';


const SignIn = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [email, setEmail] = useState("");
    let navigate = useNavigate();

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }

            var dateData = JSON.stringify(user.user.metadata.createdAt);
            dateData = parseInt(JSON.parse(dateData));
            const personalDetails = {
                name: JSON.parse(JSON.stringify(user.user.email)),
                Uid: JSON.parse(JSON.stringify(user.user.uid)),
                streaks: 0,
                totalPts: 0,
                mazeLvl: 1,
                redeemedPts: 0,
                type: 1,
                lastLogin: dateData
            };
            axios.post('https://ades-ca1-project.herokuapp.com/api/newStudent', personalDetails, config)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    navigate('/studentDashboard');
                })
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(JSON.stringify(errorCode));
            console.log(JSON.stringify(errorMessage));
        }
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }
            var uid = JSON.parse(JSON.stringify(user.user.uid));
            axios.get(`http://localhost:8081/api/userType/` + uid, config)
                .then(res => {
                    if (res.data.type == 1) {
                        navigate('/studentDashboard');
                    } else if (res.data.type == 2) {
                        navigate('/teacherAdmin');
                    } else {
                        navigate('/');
                    }
                })
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(JSON.stringify(errorCode));
            console.log(JSON.stringify(errorMessage));
        }
    };

    const forgotPassword = async () => {
        try {
            const user = await sendPasswordResetEmail(
                auth,
                email);
        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(JSON.stringify(errorCode));
            console.log(JSON.stringify(errorMessage));
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

            <h1>Forgot Password</h1>
            <input placeholder="email" type="email" onChange={(event) => {
                setEmail(event.target.value);
            }} />
            <button onClick={forgotPassword}>Forgot Password</button>
        </div>
    )
}
export default SignIn;
