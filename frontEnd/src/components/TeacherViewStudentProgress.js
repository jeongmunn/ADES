import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default class TeacherViewStudentProgress extends React.Component {
    state = {
        data: [],
    }

    componentDidMount() {
        axios.get('http://localhost:8081.com/api/studentProgress')
            .then(res => {
                this.setState({ data: res.data });
            })
    }

    render() {
        const data = this.state.data;
        return (
            <div className="viewReward">
                <h3 className="p-3 text-center">Student Progress</h3>

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Streaks</th>
                            <th>Maze Level</th>
                            <th>Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(item =>
                            <tr key={item.studentID}>
                                <td>{item.name}</td>
                                <td>{item.streaks}</td>
                                <td>{item.mazeLvl}</td>
                                <td>{item.totalPts}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}