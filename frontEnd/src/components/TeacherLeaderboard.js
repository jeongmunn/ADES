import React, { useState, useEffect } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import '../css/teacherLeaderboard.css';

export default class ViewLeaderboard extends React.Component {
    state = {
        data: [],
        uid: ''
    }

    componentDidMount() {
        // Auth
        auth.onAuthStateChanged((user) => {
            // IF there's user
            if (user) {
                console.log("User is Signed IN ");
                this.setState({ uid: user.uid });
                const config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                }

                // Get the user type
                axios.get(`http://localhost:8081/api/userType/` + this.state.uid, config)
                    .then(res => {
                        // IF is student
                        if (res.data.type === 1) {
                            window.location.replace('http://localhost:8081/quizment/studentDashboard');
                            // IF is teacher
                        } else if (res.data.type === 2) {
                            // GET all leaderboard data
                            axios.get('http://localhost:8081/api/allLeaderboard')
                                .then(res => {
                                    this.setState({ data: res.data });
                                })
                            // ELSE kick them out
                        } else {
                            window.location.replace('http://localhost:8081/quizment');
                        }
                    })
                // ELSE kick them out
            } else {
                console.log("THERE IS NO USER");
                signOut(auth);
                window.location.replace('http://localhost:8081/quizment');
            }
        });
    }

    render() {

        const data = this.state.data;

        return (
            <div className="teacherLeaderboard">
                <h1>Leaderboard</h1>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Rank#</th>
                            <th>Name</th>
                            <th>Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) =>
                            <tr key={item.studentID}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.totalPts}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}