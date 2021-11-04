import logo from '../logo.svg';
import '../App.css';
import React from 'react'
import { auth } from '../firebase.js';
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import Button from 'react-bootstrap/Button';

const Home = () => {
    const logout = async () => {
        await signOut(auth);
    };
    return (
        <div>
            <h1>Hello</h1>
            <Button onClick={logout}>Sign Out</Button>
        </div>
    )
}
export default Home;