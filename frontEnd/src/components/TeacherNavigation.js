import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import '../css/navigation.css';
import sample from '../logoLoading.webm';

const logout = async () => {
    await signOut(auth);
    window.location.replace("http://localhost:8081.com/quizment");
};

export default class TeacherNavigation extends React.Component {


    render() {
        return (
            <Navbar collapseOnSelect expand='sm' bg="light" variant="light" className="shadow p-3 mb-5 bg-white rounded">
                <Container>
                    <Navbar.Toggle aria-controls='resoponsive-navbar-nav' />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Navbar.Brand href="#home">
                            <video className='videoTag' autoPlay loop muted>
                                <source src={sample} type='video/webm' />
                            </video>
                        </Navbar.Brand>
                        <Nav >
                            <Nav.Link>
                                <Link to={`/teacherDashboard`} className="navlink nav-link-ltr">
                                    Dashboard
                                </Link>
                            </Nav.Link>
                            <Nav.Link  >
                                <Link to={`/studentAdmin`} className="navlink nav-link-ltr">
                                    Student Administration
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={`/rewardsAdmin`} className="navlink nav-link-ltr">
                                    Rewards Administration
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={`/badgesAdmin`} className="navlink nav-link-ltr">
                                    Badges Administration
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={`/mazeAdmin`} className="navlink nav-link-ltr">
                                    Maze Administration
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={`/leaderboardAdmin`} className="navlink nav-link-ltr">
                                    Leaderboard Administration
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to={`/profile`} className="navlink nav-link-ltr">
                                    Profile
                                </Link>
                            </Nav.Link>
                            <Nav.Link onClick={logout}>
                                <Link to={`/`} className="navlink nav-link-ltr">
                                    Logout
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        )
    }
}