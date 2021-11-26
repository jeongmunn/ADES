import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import StudentNavigation from './StudentNavigaton';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import sample from '../logoLoading.webm';
import '../App.css';
import '../css/navigation.css';
import '../css/pointsHistory.css';

export default class ptsHistory extends React.Component {
    state = {
        data: [],
        uid: '',
        id: 0,
        display: 'block',
        display2: 'none'
    }

    componentDidMount() {
        // Auth
        auth.onAuthStateChanged((user) => {
            // IF there's user
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

                // Get the user type
                axios.get(`http://localhost:8081.com/api/userType/` + this.state.uid, config)
                    .then(res => {
                        // IF is student
                        if (res.data.type === 1) {
                            this.setState({ id: res.data.studentID })
                            // GET student's points history
                            axios.get('http://localhost:8081.com/api/ptsHistory/' + this.state.id)
                                .then(res => {
                                    this.setState({ data: res.data });
                                })
                            // IF is teacher
                        } else if (res.data.type === 2) {
                            window.location.replace('http://localhost:8081.com/quizment/teacherDashboard');
                            // ELSE kick them out
                        } else {
                            window.location.replace('http://localhost:8081.com/quizment');
                        }
                    })
                // ELSE kick them out
            } else {
                console.log("THERE IS NO USER");
                signOut(auth);
                window.location.replace('http://localhost:8081.com/quizment');
            }
        });
    }

    render() {

        const data = this.state.data;

        return (
            <div className="PointsHistory">
                <video style={{ display: this.state.display, width: '100%', height: 'auto' }} className='videoLoader' autoPlay loop muted>
                    <source src={sample} type='video/webm' />
                </video>
                <div style={{ display: this.state.display2 }}>
                <StudentNavigation className="navBar">
                </StudentNavigation>
                <h1>Points History</h1>
                <div className="history">
                    {data && data.map(item =>
                        <Card className="card" border="primary" body>You've earned {item.pointsAwarded} points from event {item.eventName}</Card>
                    )}
                </div>
                </div>
            </div>
        )
    }
}