import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import StudentNavigation from './StudentNavigaton';
import QuizPopUp from './QuizPopup';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import '../css/navigation.css';
import '../css/quiz.css';

export default class Quiz extends React.Component {

    constructor() {
        super();
        this.state = {
            showModalPopup: false,
            data: [],
            uid: '',
            id: 0,
            quizID: 0,
            totalMarks: 0,
            totalPoints: 0
        }
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
                    .then(res => {//call maze animation

                        if (res.data.type === 1) {
                            this.setState({ id: res.data.studentID })
                            // area to put your axios with the student id

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
        axios.get(`https://ades-ca1-project.herokuapp.com/api/quiz`)
            .then(res => {
                console.log(res.data.length);
                this.setState({ data: res.data });

                console.log(res.data.length);

                this.setState({ data: res.data });


            });
    }

    handleClose = () => {
        let status = false
        this.setState({ showModalPopup: status });
    }

    isShowPopup = (status, quizID, totalMarks, totalPoints) => {
        this.setState({ showModalPopup: status });
        this.setState({ quizID: quizID });
        this.setState({ totalMarks: totalMarks });
        this.setState({ totalPoints: totalPoints });
        this.handleScoreAndPoints();

    }
    handleScoreAndPoints = event => {
        console.log("BUTTON CLICKED");
        const quizID = this.state.quizID
        const totalMarks = this.state.totalMarks
        const totalPoints = this.state.totalPoints

        const quiz = {
            quizID: quizID,
            studentID: this.state.id,
            pointsEarned: totalPoints,
            marksEarned: totalMarks
        };
        const studentUpdatePoint = {
            studentID: this.state.id,
            pointsEarned: totalPoints
        }

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        axios.post('https://ades-ca1-project.herokuapp.com/api/quizHistory', quiz, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                console.log("AXIOS POSTING")

            })
        axios.put(`https://ades-ca1-project.herokuapp.com/api/studentPoints`, studentUpdatePoint, config)
            .then(res => {
                console.log("HELLO WORK PLS");
                console.log(res);
                console.log(res.data);
                console.log("AXIOS PUTTING")
                window.alert("points awarded");//NEED NOTY HERE STATING THAT POINTS ARE ADDED
            })
    }



    render() {
        const data = this.state.data;
        // When the user clicks anywhere outside of the modal, close it
        return (
            <div>
                <StudentNavigation className="navBar">
                </StudentNavigation>
                <div id="users" class="row">
                </div>

                <table class="table">

                    {data && data.map(item =>
                        <tr key={item.quizID} id='tableRow' class="spaceUnder">
                            <td className="quizTitle">Quiz {item.quizID}</td>
                            <td className="marks">Total Marks: {item.totalMarks}</td>
                            <td className="points">Total Points:{item.totalPoints}</td>

                            <td>
                                <Button onClick={() => this.isShowPopup(true, item.quizID, item.totalMarks, item.totalPoints)} type="submit" id="myBtn">Do Quiz!</Button>

                            </td>
                        </tr>
                    )}
                </table>
                <QuizPopUp
                    showModalPopup={this.state.showModalPopup}
                    onPopupClose={this.handleClose}
                    id={this.state.id}
                    quizID={this.state.quizID}

                ></QuizPopUp>
            </div>
        )
    }
}