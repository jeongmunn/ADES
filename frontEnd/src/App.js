import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import TeacherAdministration from './components/TeacherHome';
import BadgeAdmin from './components/BadgeAdmin';
import RewardAdmin from './components/RewardAdmin';
import UploadReward from './components/UploadReward';
import MazeAdmin from './components/MazeAdmin';
import EditMaze from './components/EditMazeContent';
import EditBadge from './components/EditBadge';
import Quiz from './components/Quiz';
import MapOfMaze from './components/MapOfMaze';
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
      console.log(currentUser);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  });

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/signIn" element={<SignIn/>}></Route>

        <Route path="/teacherAdmin" element={<TeacherAdministration/>}></Route>
        <Route path="/badgesAdmin" element={<BadgeAdmin/>}></Route>
        <Route path="/rewardsAdmin" element={<RewardAdmin/>}></Route>
        <Route path="/uploadReward" element={<UploadReward/>}></Route>
        <Route path="/mazeAdmin" element={<MazeAdmin/>}></Route>
        <Route path="/EditMazeContent" element={<EditMaze/>}></Route>
        <Route path="/EditBadge" element={<EditBadge/>}></Route>
        <Route path="/Quiz" element={<Quiz/>}></Route>\
        <Route path="/MapOfMaze" element={<MapOfMaze/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
