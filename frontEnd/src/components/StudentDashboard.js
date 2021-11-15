import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Glyphicon, Sidebar, Nav, NavItem, Card, ListGroup } from 'react-bootstrap';
import { Progress } from 'antd';
import { Stepper, Step } from 'react-form-stepper';
import StreakSlider from './Streak.js';


import Box from '@mui/material/Box';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import TickSlider from 'react-tick-slider';



import '../styling.css'



// const { Step } = Steps

export default class StudentDashboard extends React.Component {
    state = {
        data: [],
        streaks: 0,
        totalPts: [],
        redeemedPts: [],

        name: [],

        progress: 0,

    }

    componentDidMount() {
        axios.get('http://localhost:8081/students/topStudents/')
            .then(res => {
                this.setState({ data: res.data });
            })

        axios.get('http://localhost:8081/students/streaks/' + 2)
            .then(res => {
                console.log("number of streak " + res.data[0].streaks)
                const streaks = res.data[0].streaks;




                this.setState({ streaks });

                // let progress = 0;
                // if (this.state.streaks === 1) {
                //     progress += 20
                //     this.setState({ progress: progress })
                // }
                // if (this.state.streaks === 2) {
                //     progress += 40
                //     this.setState({ progress: progress })
                // }
                // if (this.state.streaks === 3) {
                //     progress += 60
                //     this.setState({ progress: progress })
                // }
                // if (this.state.streaks === 4) {
                //     progress += 80
                //     this.setState({ progress: progress })
                // }
                // if (this.state.streaks === 5) {
                //     progress += 100
                //     this.setState({ progress: progress })
                // }


            })

        axios.get('http://localhost:8081/students/points/' + 2)
            .then(res => {
                console.log("number of streak " + res.data[0].totalPts)
                console.log("number of streak " + res.data[0].redeemedPts)
                const totalPts = res.data[0].totalPts;
                const redeemedPts = res.data[0].redeemedPts;
                const name = res.data[0].name;

                this.setState({ totalPts });

                this.setState({ redeemedPts });

                this.setState({ name });

            })




    }




    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }


    render() {
        const data = this.state.data;
        return (


            <Container className="toatalContainer " fluid>



                <Row xs={1} className="row">
                    <Col md={4} className="c1 column">
                        <h3 className="p-3 text-center">Student dashboard</h3>

                        <h4>{this.state.name}</h4>

                        <Card className="mb-3 points">
                            <Card.Body>
                                <Card.Title className="cardContext">Total Points:</Card.Title>

                                <Card.Text className="cardContext">
                                    {this.state.totalPts}

                                </Card.Text>

                            </Card.Body>

                        </Card>

                        <Card className="mb-3 points">
                            <Card.Body>
                                <Card.Title className="cardContext">Redeemable Points</Card.Title>

                                <Card.Text className="cardContext">
                                    {this.state.redeemedPts}

                                </Card.Text>

                            </Card.Body>

                        </Card>


                        <div className="box">




                            <hr />


                            <Nav className="col-md-12 d-none d-md-block sidebar navCustomise sideNavItem"
                                activeKey="/home"
                                onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                            >

                                <div className="sidebar-sticky"></div>
                                <Nav.Item className="navItem " activeClassName="active" >
                                    <Nav.Link className="linkCustomise" href="/home">Dashboard</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" eventKey="link-1">Reward</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" eventKey="link-2">Maze</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" eventKey="link-2">Badges</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" eventKey="link-2">Streak</Nav.Link>
                                </Nav.Item>
                            </Nav>


                        </div>
                    </Col>
                    <Col md={4} className="box2 column">

                        <h4>Assignments To Do:</h4>

                        <Card className="mt-3">
                            <Card.Header>Math</Card.Header>
                            <Card.Body>
                                <Card.Title>Integration Homework 2</Card.Title>
                                <Card.Text>
                                    Learn how to do Integration
                                </Card.Text>
                                <Button variant="danger">Do Now</Button>
                            </Card.Body>
                        </Card>

                        <Card className="mt-3">
                            <Card.Header>Math</Card.Header>
                            <Card.Body>
                                <Card.Title>Integration Homework 3</Card.Title>
                                <Card.Text>
                                    Learn how to do Integration part 3
                                </Card.Text>
                                <Button variant="danger">Do Now</Button>
                            </Card.Body>
                        </Card>


                        <Card className="mt-3">
                            <Card.Header>Math</Card.Header>
                            <Card.Body>
                                <Card.Title>Integration Homework 2</Card.Title>
                                <Card.Text>
                                    Learn how to do Integration
                                </Card.Text>
                                <Button variant="danger">Do Now</Button>
                            </Card.Body>
                        </Card>


                    </Col>
                    <Col md={3} className=" box3 column">
                        <Col>
                            <input type="range"
                                value={this.state.streaks}
                                width="80px"

                                max="5"
                                min="0"
                                orientation="vertical"
                                reversed={true}
                                //  disabled="disabled"

                                className="custom-range" id="customRange1" />



                            <h5>{this.state.streaks} </h5>

                            <StreakSlider/>

                        </Col>

                        <Card className="leaderBoardBox"  >
                            <Card.Header className="leaderBoardTitle">
                                Leaderboard
                            </Card.Header>
                            <Card.Body>
                                {data && data.map(item =>
                                    <Card className="m-2 " style={{ width: '16rem' }} key={item.studentID}>

                                        <ListGroup variant="flush" >

                                            <ListGroup.Item  >
                                                <Row className="leaderBoardItem">
                                                    <Col>
                                                        {item.name}
                                                    </Col>
                                                    <Col>
                                                        {item.totalPts}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                        </ListGroup>

                                    </Card>
                                )}

                            </Card.Body>
                        </Card>


                    </Col>
                </Row>


                {/* <input type="range" className="custom-range" id="customRange1" /> */}
            </Container>







            //                     <Progress
            //                         type="line"
            //                         height='30px'
            //                         strokeColor={{
            //                             '0%': '#f0bb31',
            //                             '50%': '#e39c4f',
            //                             '100%': '#db8427',
            //                         }}

            //                         percent={this.state.progress}
            //                         status="active"
            //                     >

            //                     </Progress>












        )
    }
}
