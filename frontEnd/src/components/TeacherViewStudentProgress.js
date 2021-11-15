import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import  '../studentProgStyling.css';

export default class TeacherViewStudentProgress extends React.Component {
    state = {
        data: [],
    }

    componentDidMount() {
        axios.get('http://localhost:8081/studentProgress')
            .then(res => {
                this.setState({ data: res.data });
            })
    }


    render() {
        const data = this.state.data;
        return (
            <div className="backgroundImg">
                <h3 className="p-3 text-center">Student Progress</h3>


                <div className="studentDetails  row row-cols-3  row-cols-md-6 ">
                    {data && data.map(item =>
                        <Card  className="studentDetails col mb-4" key={item.studentID} bg="Light" border="info"  style={{ width: '18rem' }}>
                            <Card.Body>

                        
                                <Card.Text>
                                    Student Name:{item.name}
                                </Card.Text>
                                <Card.Text>
                                    Streaks:{item.streaks}
                                </Card.Text>
                                <Card.Text>
                                    Maze Level:{item.mazeLvl}
                                </Card.Text>
                                <Card.Text>
                                    Total Points:{item.totalPts}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    )}
                </div>

            </div>
        )
    }
}
