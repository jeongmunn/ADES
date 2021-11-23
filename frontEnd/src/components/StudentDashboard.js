import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Container, Row, Col, Sidebar, Nav, NavItem, Card, ListGroup } from 'react-bootstrap';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import '../styling.css'

const styles = theme => ({
    root: {
        // paddingTop: '100px',
        marginTop: "60px",
        width: "250px",
        marginLeft: "40px",
    },
});

const marks = [
    {
        value: 0,
        label: '',
    },
    {
        value: 1,
        label: '',
    },
    {
        value: 2,
        label: '',
    },
    {
        value: 3,
        label: '',
    },
    {
        value: 4,
        label: '',
    },
    {
        value: 5,
        label: '',
    }
];

const logout = async () => {
    await signOut(auth);
    window.location.replace("https://ades-ca1-project.herokuapp.com/quizment");
};


class StudentDashboard extends React.Component {
    state = {
        data: [],
        streaks: 0,
        fullStreaks: 0,
        totalPts: [],
        redeemedPts: [],
        name: [],
        showStreak: false,
        lastLoginData: [],
        currentLogin: new Date().getTime(),
        uid: '',
        id: 0
    }

    componentDidMount() {

        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User is Signed IN ");
                this.setState({ uid: user.uid });
                const config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                }
                axios.get(`https://ades-ca1-project.herokuapp.com/api/userType/` + this.state.uid, config)
                    .then(res => {
                        if (res.data.type === 1) {
                            this.setState({ id: res.data.studentID })

                            axios.get('https://ades-ca1-project.herokuapp.com/api/students/streaks/' + this.state.id)
                                .then(res => {
                                    console.log("number of streak " + res.data[0].streaks)
                                    const streaks = res.data[0].streaks;
                                    this.setState({ streaks });
                                })

                            axios.get('https://ades-ca1-project.herokuapp.com/api/students/points/' + this.state.id)
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

                            axios.get('https://ades-ca1-project.herokuapp.com/api/students/lastLogin/' + this.state.id)
                                .then(res => {
                                    console.log("LAST LOGIN " + res.data[0].lastLogin)
                                    this.setState({ lastLoginData: res.data[0].lastLogin })
                                    console.log("Current login stored: " + this.state.currentLogin)
                                    console.log("Last login stored: " + this.state.lastLoginData)
                                    var diffTime = this.state.currentLogin - this.state.lastLoginData;
                                    var streak = this.state.streaks;
                                    const config = {
                                        headers: {
                                            'content-type': 'application/json'
                                        }
                                    }
                                    const lastLog = {
                                        lastLogin: this.state.currentLogin
                                    }
                                    if (diffTime >= 28800000 && diffTime <= 86400000) {
                                        console.log("Yassss");
                                        // AXIOS PUT STREAK + NEW LOGIN TIME
                                        axios.put('https://ades-ca1-project.herokuapp.com/api/students/lastLoginStreak/' + this.state.id, lastLog, config)
                                            .then(res => {
                                                console.log("RESULTS: " + res);
                                                console.log(res);
                                                console.log("RESULT: " + res.data);
                                            })

                                        axios.put('https://ades-ca1-project.herokuapp.com/api/students/updatePoints/' + this.state.id)
                                            .then(res => {
                                                console.log("RESULTS: " + res);
                                                console.log(res);
                                                console.log("RESULT: " + res.data);
                                            })

                                    } else if (diffTime > 86400000) {
                                        console.log("harooo");
                                        axios.put('https://ades-ca1-project.herokuapp.com/api/students/lastLoginLostStreak/' + this.state.id, lastLog, config)
                                            .then(res => {
                                                console.log("RESULTS: " + res);
                                                console.log(res);
                                                console.log("RESULT: " + res.data);
                                            })

                                    } else {
                                        console.log("BYE");
                                        axios.put('https://ades-ca1-project.herokuapp.com/api/students/lastLogin/' + this.state.id, lastLog, config)
                                            .then(res => {
                                                console.log("RESULTS: " + res);
                                                console.log(res);
                                                console.log("RESULT: " + res.data);
                                            })
                                    }
                                })
                        } else if (res.data.type === 2) {
                            window.location.replace('https://ades-ca1-project.herokuapp.com/quizment/teacherDashboard');
                        } else {
                            window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
                        }
                    })
            } else {
                console.log("THERE IS NO USER");
                signOut(auth);
                window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
            }
        });

        axios.get('https://ades-ca1-project.herokuapp.com/api/students/topStudents/')
            .then(res => {
                this.setState({ data: res.data });
            })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    render() {
        const data = this.state.data;
        const { classes } = this.props;
        return (

            <Container className="toatalContainer" fluid>
                <Row xs={1} className="row">
                    <Col md={3} className="c1 column">
                        <h4 className="mt-5 mb-5">{this.state.name}</h4>
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
                            // onSelect={selectedKey => alert(`selected ${selectedKey}`)}
                            >
                                <div className="sidebar-sticky"></div>
                                <Nav.Item className="navItem " activeClassName="active" >
                                    <Nav.Link className="linkCustomise" href="/quizment/studentDashboard">Dashboard</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" href="/quizment/studentReward">Reward</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" href="/quizment/mapOfMaze">Maze</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" eventKey="link-2">Badges</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="navItem">
                                    <Nav.Link className="linkCustomise" eventKey="link-2">Streak</Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick={logout} className="navItem">
                                    <Nav.Link className="linkCustomise" eventKey="link-2">Sign Out</Nav.Link>
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
                            <Row className="sliderStreak">
                                <Col>
                                    <Slider
                                        className={classes.root}
                                        aria-label="Always visible"
                                        value={this.state.streaks}
                                        step={1}
                                        min={0}
                                        max={5}
                                        marks={marks}
                                        valueLabelDisplay="off"
                                    />
                                </Col>
                                <Col className="streakNum">
                                    <h6>Streaks: {this.state.streaks} </h6>
                                </Col>
                            </Row>
                        </Col>
                        <Card className="leaderBoardBox"  >
                            <Card.Header className="leaderBoardTitle">
                                Leaderboard
                            </Card.Header>
                            <Card.Body>
                                {data && data.map(item =>
                                    <Card className="m-2 " style={{ width: '16rem' }} key={item.studentID}>
                                        <ListGroup variant="flush" >
                                            <ListGroup.Item>
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
            </Container>
        )
    }
}

StudentDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentDashboard);