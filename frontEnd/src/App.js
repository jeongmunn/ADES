import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import StudentDashboard from './components/StudentDashboard';
import StudentPointsHistory from './components/StudentPointsHistory';
import StudentReward from './components/StudentReward';
import Profile from './components/Profile';
import TeacherDashboard from './components/TeacherDashboard';
import BadgeAdmin from './components/BadgeAdmin';
import RewardAdmin from './components/RewardAdmin';
import EditReward from './components/RewardAdminEdit';
import MazeAdmin from './components/MazeAdmin';
import EditMaze from './components/EditMazeContent';
import EditBadge from './components/EditBadge';
import Quiz from './components/Quiz';
import MapOfMaze from './components/MapOfMaze';
import ReactNotification from 'react-notifications-component';
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from './firebase.js';
import 'bootstrap/dist/css/bootstrap.css';

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
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/studentDashboard" element={<StudentDashboard/>}></Route>
        <Route path="/studentPoints" element={<StudentPointsHistory/>}></Route>
        <Route path="/studentReward" element={<StudentReward/>}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/teacherDashboard" element={<TeacherDashboard/>}></Route>
        <Route path="/badgesAdmin" element={<BadgeAdmin/>}></Route>
        <Route path="/rewardsAdmin" element={<RewardAdmin/>}></Route>
        <Route path="/editReward" element={<EditReward/>}></Route>
        <Route path="/mazeAdmin" element={<MazeAdmin/>}></Route>
        <Route path="/EditMazeContent" element={<EditMaze/>}></Route>
        <Route path="/EditBadge" element={<EditBadge/>}></Route>
        <Route path="/quiz" element={<Quiz/>}></Route>
        <Route path="/mapOfMaze" element={<MapOfMaze/>}></Route>
      </Routes>
  );
}

export default App;
