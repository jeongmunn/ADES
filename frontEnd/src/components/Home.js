// import logo from '../logo.svg';
// import '../App.css';
// import React from 'react'
// import { auth } from '../firebase.js';
// import { useNavigate } from 'react-router-dom';
// import {
//     onAuthStateChanged,
//     signOut
// } from "firebase/auth";

// const Home = () => {
//     let navigate = useNavigate();
//     const logout = async () => {
//         await signOut(auth);
//         navigate('/');
//     };
//     // const user = auth.currentUser;
//     // console.log(JSON.stringify(user));
//     return (
//         <div>
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p>
//                     Edit <code>src/App.js</code> and save to reload.
//                 </p>
//                 <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
//                 <button onClick={logout}>Sign Out</button>
//             </header>
//         </div>
//     )
// }
// export default Home;