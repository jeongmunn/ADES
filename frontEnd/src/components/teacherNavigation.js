import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export default class TeacherNavigation extends React.Component {


    render() {

        return (

            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">Quizment</Navbar.Brand>
                    <Nav className="ml">
                        <Link to={`/EditBadge?id=`}>
                            <Button>General</Button>
                        </Link>
                        <Link to={`/EditBadge?id=`}>
                            <Button>Badges</Button>
                        </Link>
                        <Link to={`/EditBadge?id=`}>
                            <Button>Map of Maze</Button>
                        </Link>
                        <Link to={`/EditBadge?id=`}>
                            <Button>Leaderboard</Button>
                        </Link>
                      

                    </Nav>
                </Container>
            </Navbar>
        )
    }
}