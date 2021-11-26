import React, { useState, useRef, useEffect } from 'react';
import {
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import sample from '../logoLoading.webm';
import '../App.css';
import '../css/styling2.css';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const SignIn = () => {
    let navigate = useNavigate();
    const loginEmailInput = useRef("");
    const loginPasswordInput = useRef("");
    const registerEmailInput = useRef("");
    const registerPasswordInput = useRef("");
    const emailInput = useRef("");
    // const [registerEmail, setRegisterEmail] = useState("");
    // const [registerPassword, setRegisterPassword] = useState("");
    // const [loginEmail, setLoginEmail] = useState("");
    // const [loginPassword, setLoginPassword] = useState("");
    // const [email, setEmail] = useState("");
    const [value, setValue] = useState(0);
    const [display, setDisplay] = useState('none');
    const [display2, setDisplay2] = useState('block');

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setDisplay('block');
                setDisplay2('none');
                const config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                }
                axios.get(`https://ades-ca1-project.herokuapp.com/api/userType/` + currentUser.uid, config)
                    .then(res => {
                        if (res.data.type === 1) {
                            navigate('/studentDashboard');
                        } else if (res.data.type === 2) {
                            navigate('/teacherDashboard');
                        }
                    })
            }
        })
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                registerEmailInput.current.value,
                registerPasswordInput.current.value
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
                mazeLvl: 0,
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
                loginEmailInput.current.value,
                loginPasswordInput.current.value
            );
            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }
            var uid = JSON.parse(JSON.stringify(user.user.uid));
            axios.get(`https://ades-ca1-project.herokuapp.com/api/userType/` + uid, config)
                .then(res => {
                    if (res.data.type === 1) {
                        navigate('/studentDashboard');
                    } else if (res.data.type === 2) {
                        navigate('/teacherDashboard');
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
                emailInput.current.value);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(JSON.stringify(errorCode));
            console.log(JSON.stringify(errorMessage));
        }
    };

    return (
            <div>
            <video style={{ display: display, width: '100%', height: 'auto' }} className='videoLoader' autoPlay loop muted>
                <source src={sample} type='video/webm' />
            </video>
            <div style={{ display: display2 }}>
                <div className="signin">
                    <h1>Authentication</h1>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderColor: 'divider' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                textColor="secondary"
                                indicatorColor="secondary"
                                aria-label="secondary tabs example"
                                centered
                            >
                                <Tab label="Sign In" {...a11yProps(0)} />
                                <Tab label="Sign Up" {...a11yProps(1)} />
                                <Tab label="Forgot Password" {...a11yProps(2)} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                {/* <input placeholder="email" type="email" onChange={(event) => {
                            setLoginEmail(event.target.value);
                        }} /> */}
                                {/* <input placeholder="password" type="password" onChange={(event) => {
                            setLoginPassword(event.target.value);
                        }} /> */}
                                <TextField
                                    required
                                    fullWidth
                                    inputRef={loginEmailInput}
                                    id="outlined-required"
                                    label="Email"
                                    margin="dense"
                                    type="email"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    inputRef={loginPasswordInput}
                                    id="outlined-password-input"
                                    label="Password"
                                    margin="dense"
                                    type="password"
                                    autoComplete="current-password"
                                />
                                <Button sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', paddingTop: '10px', paddingBottom: '10px', marginTop: '10px', width: '100%' }} variant="contained" onClick={login}> Sign In</Button>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <TextField
                                    required
                                    fullWidth
                                    inputRef={registerEmailInput}
                                    id="outlined-required"
                                    label="Email"
                                    margin="dense"
                                    type="email"
                                />
                                <TextField
                                    required
                                    fullWidth
                                    inputRef={registerPasswordInput}
                                    id="outlined-password-input"
                                    label="Password"
                                    margin="dense"
                                    type="password"
                                    autoComplete="current-password"
                                />
                                <Button sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', paddingTop: '10px', paddingBottom: '10px', marginTop: '10px', width: '100%' }} variant="contained" onClick={register}> Sign Up</Button>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                {/* <input placeholder="email" type="email" onChange={(event) => {
                            setEmail(event.target.value);
                        }} /> */}
                                <TextField
                                    required
                                    fullWidth
                                    inputRef={emailInput}
                                    id="outlined-required"
                                    label="Email"
                                    margin="dense"
                                    type="email"
                                />
                                <Button sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', color: 'white', paddingTop: '10px', paddingBottom: '10px', marginTop: '10px', width: '100%' }} variant="contained" onClick={forgotPassword}> Forgot Password</Button>
                            </TabPanel>
                        </Box>
                    </Box>
                </div>
            </div>
        </div>
    )
}
export default SignIn;
