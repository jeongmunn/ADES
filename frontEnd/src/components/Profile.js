import '../styling2.css';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function Profile() {
    const emailData = useRef("");
    const passwordData = useRef("");
    let navigate = useNavigate();
    const logout = async () => {
        await signOut(auth);
        navigate('/');
    };

    return (
        <div className="profile">
            <h1>Profile</h1>
            <p></p>
            <TextField
                required
                fullWidth
                inputRef={emailData}
                id="outlined-required"
                label="Email"
                margin="dense"
                type="email"
            />
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
            <Button sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', paddingTop: '10px', paddingBottom: '10px', marginTop: '10px', width: '100%' }} variant="contained"> Submit</Button>
        </div>
    );
    // const user = auth.currentUser;
}