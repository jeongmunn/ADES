import React, { useState } from 'react';
import Home from './components/Home';
import SignIn from './components/SignIn';
import UploadRewards from './components/UploadReward';
import ViewRewards from './components/Reward';
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
      <div className="View">
        <ViewRewards />
      </div>
      <br/> 
      <div className="Upload">
        <UploadRewards />
      </div>
    </div>
  );
}

export default App;
