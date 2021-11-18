import '../styling2.css';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const emailData = useRef("");
    const passwordData = useRef("");
    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        if (user) {
            setUser(currentUser);
        } else {
            console.log("error")
            signOut(auth);
            navigate('/');
        }
    });
    let navigate = useNavigate();
    const logout = async () => {
        await signOut(auth);
        navigate('/');
    };
    const emailOfUser = user.email;
    console.log(emailOfUser);
    const uidOfUser = user.uid;
    const updateEmailFunction = async () => {
        updateEmail(user, emailData.current.value).then(() => {
            console.log("Update Of Email Successful!");
            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }
            axios.put('https://ades-ca1-project.herokuapp.com/api/email/' + uidOfUser, emailData.current.value, config)
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
            <p></p>
            <TextField
                required
                fullWidth
                inputRef={emailData}
                id="outlined-required"
                label="Email"
                margin="dense"
                type="email"
                defaultValue={emailOfUser}
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