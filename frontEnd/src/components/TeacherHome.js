import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

// Rewards

export default function TeacherAdministration() {
    let navigate = useNavigate();
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
            
        </div>
    );
}