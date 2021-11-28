import React, { Component } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Container, Row, Col, Sidebar, Nav, NavItem, Card, ListGroup } from 'react-bootstrap';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Slider from '@material-ui/core/Slider';
import sample from '../logoLoading.webm';
import '../App.css';
import '../styling.css'
import StudentNavigation from './StudentNavigaton';

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
        id: 0,
        display: 'block',
        display2: 'none'
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ display: 'none' });
                this.setState({ display2: 'block' });
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
                            // here are those
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
                                    var name = res.data[0].name;
                                    name = name.slice(0, name.indexOf("@", 0));
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
            
            <Container className="totalContainer" fluid>
                 <StudentNavigation className="navBar">
                </StudentNavigation>
                <video style={{ display: this.state.display, width: '100%', height: 'auto' }} className='videoLoader' autoPlay loop muted>
                    <source src={sample} type='video/webm' />
                </video>
                <div style={{ display: this.state.display2 }}>
                  
                                      
                                    <div>
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
                                   
                                        <h6>Streaks: {this.state.streaks} </h6>
                                    </div>
                            
                    <Row xs={1} className="row">
                       
                        <Col md={7} className="box2 column">
                            <h4>Assignments To Do:</h4>
                            <Card className="mt-3">
                               
                                <Card.Body>
                                    <Card.Title>Quizes</Card.Title>
                                    <Card.Text>
                                        Do Quiz to earn Points
                                </Card.Text>
                                    <Button variant="danger">Do Now</Button>
                                </Card.Body>
                            </Card>
                         
                            
                        </Col>
                       
                           
                        
                         <Col md={3} className=" column">
                               <Row className="c1" >
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
                               
                            </div>
                            </Row>

                            <Row>
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
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
        )
    }
}

StudentDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentDashboard);