import React, { useState } from 'react';
//import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ReactNotification from 'react-notifications-component';
import Home from './components/Home';
import SignIn from './components/SignIn';
import RewardAdmin from './components/RewardAdmin';
import RewardAdminEdit from './components/RewardAdminEdit';
import TeacherLeaderboard from './components/TeacherLeaderboard';
import StudentPointsHistory from './components/StudentPointsHistory';
import StudentReward from './components/StudentReward';
import Notification from './components/Notification';

import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from './firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css';

function App() {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    try {
      setUser(currentUser);
      console.log(currentUser);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  });

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/Quiz" element={<Quiz/>}></Route>
    //     <Route path="/RewardAdmin" element={<RewardAdmin/>}></Route>
    //     <Route path="/RewardAdminEdit" element={<RewardAdminEdit/>}></Route>
    //     <Route path="/TeacherLeaderboard" element={<TeacherLeaderboard/>}></Route>
    //     <Route path="/StudentPointHistory" element={<StudentPointsHistory/>}></Route>
    //     <Route path="/StudentReward" element={<StudentReward/>}></Route>
    //   </Routes>
    // </BrowserRouter>
    <div className="App">
      <ReactNotification />
      <RewardAdminEdit />
    </div>
  );
}

export default App;