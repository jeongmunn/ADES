import React, { useState, useRef, useEffect } from 'react';
import {
    onAuthStateChanged,
    signOut,
    updateEmail,
    updatePassword,
} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import Button from '@mui/material/Button';
import StudentNavigation from './StudentNavigaton';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import sample from '../logoLoading.webm';
import '../App.css';
import '../css/styling2.css';

export default function Profile() {
    let navigate = useNavigate();
    const passwordData = useRef("");
    const [uidOfUser, setUid] = useState();
    const [emailData, setEmail] = useState("");
    const [user, setUser] = useState({});
    const [display, setDisplay] = useState('block');
    const [display2, setDisplay2] = useState('none');
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (user) {
                setDisplay('none');
                setDisplay2('block');
                setUser(currentUser);
                setEmail(user.email);
                setUid(user.uid);
                const config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                }
                axios.get(`http://localhost:8081.com/api/userType/` + currentUser.uid, config)
                    .then(res => {
                        if (res.data.type === 1) {
                        } else if (res.data.type === 2) {
                            navigate('/profileTeacher');
                        }
                })
            } else {
                console.log("error")
                signOut(auth);
                window.location.replace('http://localhost:8081.com/quizment');
            }
        });
    });


    const handleChange = (event) => {
        setEmail(event.target.value);
    };
    const logout = async () => {
        await signOut(auth);
        window.location.replace('http://localhost:8081.com/quizment');
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
            axios.put('http://localhost:8081.com/api/email/' + uidOfUser, emailDetails, config)
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
        <div>
            <video style={{ display: display, width: '100%', height: 'auto' }} className='videoLoader' autoPlay loop muted>
                <source src={sample} type='video/webm' />
            </video>
        <div style={{ display: display2 }}>
            <StudentNavigation  className="navBar">
      </StudentNavigation>
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
            <Button sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', paddingTop: '10px', paddingBottom: '10px', marginTop: '15px', marginBottom: '15px', width: '100%' }} variant="contained" onClick={updateEmailFunction}> Update Email</Button>
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
            <Button sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', paddingTop: '10px', paddingBottom: '10px', marginTop: '15px', marginBottom: '15px', width: '100%' }} variant="contained" onClick={updatePasswordFunction}> Update Password</Button>
            <Button sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', paddingTop: '10px', paddingBottom: '10px', marginTop: '15px', marginBottom: '15px', width: '100%' }} variant="contained" onClick={logout}> Logout</Button>
        </div>
        </div>
        </div>
    );
}