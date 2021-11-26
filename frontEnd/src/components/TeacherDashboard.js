import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
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
      <h1>Teacher Dashboard</h1>
      <Row xs={1} md={3} lg={4} className="g-4">
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Student Progress</Card.Title>
              <Button onClick={() => {
                navigate('/studentAdmin');
              }}>Enter</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Rewards Administration</Card.Title>
              <Button onClick={() => {
                navigate('/rewardsAdmin');
              }}>Enter</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Badges Administration</Card.Title>
              <Button onClick={() => {
                navigate('/badgesAdmin');
              }}>Enter</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Maze Administration</Card.Title>
              <Button onClick={() => {
                navigate('/mazeAdmin');
              }}>Enter</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row xs={1} md={3} lg={4} className="g-4">
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Leaderboard Administration</Card.Title>
              <Button onClick={() => {
                navigate('/leaderboardAdmin');
              }}>Enter</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Profile</Card.Title>
              <Button onClick={() => {
                navigate('/profileTeacher');
              }}>Enter</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Logout</Card.Title>
              <Button onClick={logout}>Sign Out</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}