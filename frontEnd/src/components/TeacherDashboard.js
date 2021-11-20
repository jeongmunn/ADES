import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import Button from 'react-bootstrap/Button';

// Rewards

export default function TeacherDashboard() {
 
    let navigate = useNavigate();
    const logout = async () => {
      await signOut(auth);
      navigate('/');
    };
    return (
        <div>
            <h1>Teacher Administration</h1>
            <Button onClick={() => {
            navigate('/studentAdmin');
          }}>Student Administration</Button>
          <Button onClick={() => {
            navigate('/rewardsAdmin');
          }}>Rewards Administration</Button>
            <Button onClick={() => {
            navigate('/badgesAdmin');
          }}>Badges Administration</Button>
            <Button onClick={() => {
            navigate('/mazeAdmin');
          }}>Maze Administration</Button>
          <Button onClick={() => {
            navigate('/leaderboardAdmin');
          }}>Leaderboard Administration</Button>
          <Button onClick={() => {
            navigate('/profile');
          }}>Profile</Button>
          <Button onClick={logout}>Sign Out</Button>
        </div>
    );
}