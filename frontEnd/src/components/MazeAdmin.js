import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../css/Table&Add.css';
import ModalPopup from './EditMazeContent';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
export default class MazeAdmin extends React.Component {

    state = {
        data: [],
        mazeLvl: '',
        points: '',
        showModalPopup: false
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

                axios.get(`http://localhost:8081.com/api/userType/` + this.state.uid, config)
                    .then(res => {
                        if (res.data.type === 1) {
                            window.location.replace('http://localhost:8081.com/quizment/studentDashboard');

                        } else if (res.data.type === 2) {
                            // area to put your axios 
                        } else {
                            window.location.replace('http://localhost:8081.com/quizment');
                        }
                    })
            } else {
                console.log("THERE IS NO USER");
                signOut(auth);
                window.location.replace('http://localhost:8081.com/quizment');
            }
        });

        axios.get('http://localhost:8081.com/api/mazeContent')
            .then(res => {
                this.setState({ data: res.data });
            })
    }


    isShowPopup = (status, mazeLvl, points) => {
        this.setState({ showModalPopup: status });
        this.setState({ mazeLvl: mazeLvl });
        this.setState({ points: points });

    }

    render() {
        const data = this.state.data;
        return (
            <div id="body">
                <div id="div">
                    <div className="viewMazeLvl">
                        <h3 className="p-3 text-center">Map of Maze Content</h3>

                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Maze Level</th>
                                    <th>Points</th>

                                </tr>
                            </thead>
                            {data && data.map(item =>
                                <tr id='tableRow' class="spaceUnder">
                                    <td>{item.mazeLvl}</td>
                                    <td>{item.points}</td>
                                    <td>
                                        <Button type="button" variant="warning" onClick={() => this.isShowPopup(true, item.mazeLvl, item.points)}>Edit</Button>
                                    </td>
                                </tr>
                            )}
                        </table>
                    </div>
                </div>
                <ModalPopup
                    showModalPopup={this.state.showModalPopup}
                    onPopupClose={this.isShowPopup}
                    mazeLvl={this.state.mazeLvl}
                    points={this.state.points}
                ></ModalPopup>
            </div>
        )
    }
}