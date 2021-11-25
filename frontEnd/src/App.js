import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Error from './components/Error'
import StudentDashboard from './components/StudentDashboard';
import StudentPointsHistory from './components/StudentPointsHistory';
import StudentBadges from './components/StudentBadges'
import StudentReward from './components/StudentReward';
import Profile from './components/Profile';
import TeacherDashboard from './components/TeacherDashboard';
import ViewLeaderboard from './components/TeacherLeaderboard';
import BadgeAdmin from './components/BadgeAdmin';
import TeacherViewStudentProgress from './components/TeacherViewStudentProgress'
import RewardAdmin from './components/RewardAdmin';
import MazeAdmin from './components/MazeAdmin';
import Quiz from './components/Quiz';
import MapOfMaze from './components/MapOfMaze';
import ReactNotification from 'react-notifications-component';
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from './firebase.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications-component/dist/theme.css';

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
    <>
    <ReactNotification />
      <Routes>
        <Route path="/" element={<SignIn />}></Route>
        <Route path="/studentDashboard" element={<StudentDashboard/>}></Route>
        <Route path="/studentPoints" element={<StudentPointsHistory/>}></Route>
        <Route path="/studentBadges" element={<StudentBadges/>}></Route>
        <Route path="/studentReward" element={<StudentReward/>}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/teacherDashboard" element={<TeacherDashboard/>}></Route>
        <Route path="/leaderboardAdmin" element={<ViewLeaderboard/>}></Route>
        <Route path="/studentAdmin" element={<TeacherViewStudentProgress/>}></Route>
        <Route path="/badgesAdmin" element={<BadgeAdmin/>}></Route>
        <Route path="/rewardsAdmin" element={<RewardAdmin/>}></Route>
        <Route path="/mazeAdmin" element={<MazeAdmin/>}></Route>
        <Route path="/quiz" element={<Quiz/>}></Route>
        <Route path="/mapOfMaze" element={<MapOfMaze/>}></Route>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
    </>
  );
}

export default App;
