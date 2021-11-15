import React, { useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Quiz from './components/Quiz';
import RewardAdmin from './components/RewardAdmin';
// import RewardAdminEdit from './components/RewardAdminEdit';
import TeacherLeaderboard from './components/TeacherLeaderboard';
import StudentPointsHistory from './components/StudentPointsHistory';
import StudentReward from './components/StudentReward';
import Test from './components/Test';

import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from './firebase.js';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <Quiz />
    </div>
  );
}

export default App;