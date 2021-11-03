import React, { useState } from 'react';
import Home from './components/Home';
import SignIn from './components/SignIn';
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from './firebase.js';

function App() {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    try {
      setUser(currentUser);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  });

  return (
    <div className="App">
      {user ? <Home />:<SignIn />}
    </div>
  );
}

export default App;
