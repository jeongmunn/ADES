import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Progress } from 'antd';
import { Stepper } from 'react-form-stepper';

import { Slider } from '@material-ui/core';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';



import '../styling.css'



// const { Step } = Steps

export default class StudentDashboard extends React.Component {
    state = {
        data: [],
        streaks: [],
        totalPts: [],
        redeemedPts: [],
        email: "",
        password: "",
        address: "",
        name: "",
        progress: 0,

    }

    componentDidMount() {
        axios.get('http://localhost:8081/students/topStudents/')
            .then(res => {
                this.setState({ data: res.data });
            })

        axios.get('http://localhost:8081/students/streaks/' + 1)
            .then(res => {
                console.log("number of streak " + res.data[0].streaks)
                const streaks = res.data[0].streaks;




                this.setState({ streaks });

                let progress = 0;
                if (this.state.streaks === 1) {
                    progress += 20
                    this.setState({ progress: progress })
                }
                if (this.state.streaks === 2) {
                    progress += 40
                    this.setState({ progress: progress })
                }
                if (this.state.streaks === 3) {
                    progress += 60
                    this.setState({ progress: progress })
                }
                if (this.state.streaks === 4) {
                    progress += 80
                    this.setState({ progress: progress })
                }
                if (this.state.streaks === 5) {
                    progress += 100
                    this.setState({ progress: progress })
                }


            })

        axios.get('http://localhost:8081/students/points/' + 1)
            .then(res => {
                console.log("number of streak " + res.data[0].totalPts)
                console.log("number of streak " + res.data[0].redeemedPts)
                const totalPts = res.data[0].totalPts;
                const redeemedPts = res.data[0].redeemedPts;

                this.setState({ totalPts });

                this.setState({ redeemedPts });


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



            <div className='toatalContainer' >



                {/* 

                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', paddingLeft: '75px', paddingRight: '500px', paddingTop: '100px' }}>



                    <Progress
                        type="line"
                        height='30px'
                        strokeColor={{
                            '0%': '#f0bb31',
                            '50%': '#e39c4f',
                            '100%': '#db8427',
                        }}

                        percent={this.state.progress}
                        status="active"
                    >

                    </Progress>


                </div> */}




                {/* 

                <table
                style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: '75px', marginTop:'100px' }}
                
                
                className="table table-striped table-bordered leader-table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Total Points</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(item =>
                            <tr key={item.studentID}>
                                <td>{item.name}</td>
                                <td>{item.totalPts}</td>



                            </tr>
                        )}
                    </tbody>
                </table>

 */}

                <div className="c2">




                    <div className="c1">
                        <h3 className="p-3 text-center">Student dashboard</h3>

                        <h4>Monika</h4>

                        <div className="box">

                            <div className="points">
                                <div className="pointsCon">
                                    <h5>Total Points:</h5>
                                   
                                    <h5>{this.state.totalPts}</h5>
                                </div>

                            </div>

                         





                            <div className="points">
                                <div className="pointsCon">
                                    <h5>Redeemable Points:</h5>
                                   
                                    <h5>{this.state.redeemedPts}

                                    </h5>
                                </div>
                            </div>

                        </div>



                    </div>

                    <div className="AssignmentBox">
                        <h3>Assignment To Do:</h3>

                        <div className="AssignmentItem">
                            <div className="AssignmentTitle">
                            <h5>Math Algebra Homework
                                Due Next week 23/11/2020
                            </h5>
                            </div>
                            <Button>Do It Now</Button>
                        </div>
                        <div className="AssignmentItem">
                            <div className="AssignmentTitle">
                            <h5>Math Algebra Homework
                                Due Next week 23/11/2020
                            </h5>
                            </div>
                            <Button>Do It Now</Button>
                        </div>
                        <div className="AssignmentItem">
                            <div className="AssignmentTitle">
                            <h5>Math Algebra Homework
                                Due Next week 23/11/2020
                            </h5>
                            </div>
                            <Button>Do It Now</Button>
                        </div>
                        <div className="AssignmentItem">
                            <div className="AssignmentTitle">
                            <h5>Math Algebra Homework
                                Due Next week 23/11/2020
                            </h5>
                            </div>
                            <Button>Do It Now</Button>
                        </div>
                        <div className="AssignmentItem">
                            <div className="AssignmentTitle">
                            <h5>Math Algebra Homework
                                Due Next week 23/11/2020
                            </h5>
                            </div>
                            <Button>Do It Now</Button>
                        </div>
                    </div>


                    
                    <div className="leaderboardBox">
                        
                        <h5>Leaderboard</h5>
                        {data && data.map(item =>
                            <tr className="leaderBoardItem" key={item.studentID}>
                                <td>{item.name}</td>
                                <td>{item.totalPts}</td>



                            </tr>
                        )}
                    </div>








                </div>

            </div>


        )
    }
}
