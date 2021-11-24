import '../styling2.css';
import React, { useState, useRef, useEffect } from 'react';
import {
    onAuthStateChanged,
    signOut,
    updateEmail,
    updatePassword,
} from "firebase/auth";
import { auth } from '../firebase.js';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function Profile() {
    // const emailData = useRef("");
    const passwordData = useRef("");
    const [uidOfUser, setUid] = useState();
    const [emailData, setEmail] = useState("");
    const [user, setUser] = useState({});

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (user) {
                setUser(currentUser);
                setEmail(user.email);
                setUid(user.uid);
            } else {
                console.log("error")
                signOut(auth);
                window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
            }
        });
    });


    const handleChange = (event) => {
        setEmail(event.target.value);
    };
    const logout = async () => {
        await signOut(auth);
        window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
    };
    const updateEmailFunction = async () => {
        updateEmail(user, emailData).then(() => {
            console.log("Update Of Email Successful!");
            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }
            const emailDetails = {
                email: emailData
            };
            console.log(emailDetails.email);
            axios.put('https://ades-ca1-project.herokuapp.com/api/email/' + uidOfUser, emailDetails, config)
                .then(res => {
                    console.log(res);
                    window.location.reload();
            })
        }).catch((error) => {
            alert('Email did not update. Please try again.');
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(JSON.stringify(errorCode));
            console.log(JSON.stringify(errorMessage));
        });
    };


    const updatePasswordFunction = async () => {
        updatePassword(user, passwordData.current.value).then(() => {
            console.log("Update Of Password Successful!");
            window.location.reload();
        }).catch((error) => {
            alert('Password did not update. Please try again.');
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(JSON.stringify(errorCode));
            console.log(JSON.stringify(errorMessage));
        });
    };
    return (
        <div className="profile">
            <h1>Profile Administration</h1>
            <TextField
                required
                fullWidth
                id="filled-required" 
                label="Email"
                margin="dense"
                type="email"
                placeholder={emailData}
                onChange={handleChange}
            />
            <Button sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', paddingTop: '10px', paddingBottom: '10px', margin: '10px', width: '100%' }} variant="contained" onClick={updateEmailFunction}> Update Email</Button>
            <TextField
                required
                fullWidth
                inputRef={passwordData}
                id="outlined-password-input"
                label="Change Password"
                margin="dense"
                type="password"
                autoComplete="current-password"
            />
            <Button sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', paddingTop: '10px', paddingBottom: '10px', margin: '10px', width: '100%' }} variant="contained" onClick={updatePasswordFunction}> Update Password</Button>
            <Button sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', paddingTop: '10px', paddingBottom: '10px', margin: '15px', width: '100%' }} variant="contained" onClick={logout}> Logout</Button>
        </div>
    );
}