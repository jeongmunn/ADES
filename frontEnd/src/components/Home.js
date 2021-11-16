import logo from '../logo.svg';
import '../App.css';
import React from 'react'
import { auth } from '../firebase.js';
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";

const Home = () => {
    const logout = async () => {
        await signOut(auth);
    };
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
                <button onClick={logout}>Sign Out</button>
            </header>
        </div>
    )
}
export default Home;