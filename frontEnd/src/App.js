import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import StudentDashboard from './components/StudentDashboard';
import Profile from './components/Profile';
import TeacherAdministration from './components/TeacherHome';
import BadgeAdmin from './components/BadgeAdmin';
import RewardAdmin from './components/RewardAdmin';
import UploadReward from './components/UploadReward';
import MazeAdmin from './components/MazeAdmin';
import EditMaze from './components/EditMazeContent';
import EditBadge from './components/EditBadge';
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
        <Route path="/studentDashboard" element={<StudentDashboard />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/teacherAdmin" element={<TeacherAdministration/>}></Route>
        <Route path="/badgesAdmin" element={<BadgeAdmin/>}></Route>
        <Route path="/rewardsAdmin" element={<RewardAdmin/>}></Route>
        <Route path="/uploadReward" element={<UploadReward/>}></Route>
        <Route path="/mazeAdmin" element={<MazeAdmin/>}></Route>
        <Route path="/EditMazeContent" element={<EditMaze/>}></Route>
        <Route path="/EditBadge" element={<EditBadge/>}></Route>
      </Routes>
  );
}

export default App;
