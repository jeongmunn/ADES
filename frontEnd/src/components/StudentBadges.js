import React from 'react';
import axios from 'axios';
import { store } from 'react-notifications-component';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import '../css/studentReward.css';

export default class viewReward extends React.Component {
  state = {
    data: [],
    dataAll: [],
    url: '',
    uid: '',
    id: 0
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
        axios.get(`https://ades-ca1-project.herokuapp.com/api/userType/` + this.state.uid, config)
          .then(res => {
            // IF is student
            if (res.data.type === 1) {
              this.setState({ id: res.data.studentID })
            // IF is teacher
            } else if (res.data.type === 2) {
              window.location.replace('https://ades-ca1-project.herokuapp.com/quizment/teacherDashboard');
            // ELSE kick them out
            } else {
              window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
            }
          })
      // ELSE kick them out
      } else {
        console.log("THERE IS NO USER");
        signOut(auth);
        window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
      }
    });

    // Get all the badges
    axios.get('https://ades-ca1-project.herokuapp.com/api/badges')
      .then(res => {
        this.setState({ dataAll: res.data });
      })

    // Get all the badges
    axios.get('https://ades-ca1-project.herokuapp.com/api/students/badges/' + this.state.id)
    .then(res => {
      this.setState({ data: res.data });
    })
  }

  render() {
    const data = this.state.data;
    const dataAll = this.state.dataAll;
    return (
      <div className="StudentReward">
        <h1>Badges Earned</h1>
        <div className="Rewards">
          <Row xs={1} md={2} lg={3} className="g-4">
            {data && data.map(item =>
              <Col>
                <Card border="warning">
                  <Card.Img className="cardPic" variant="top" src={item.pic_url} />
                  <Card.Body className="cardBody">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Number of times earned: {item.amount}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </div>
        <h1>Badges That You Can Get</h1>
        <div className="Rewards">
          <Row xs={1} md={2} lg={3} className="g-4">
            {dataAll && dataAll.map(item =>
              <Col>
                <Card border="warning">
                  <Card.Img className="cardPic" variant="top" src={item.pic_url} />
                  <Card.Body className="cardBody">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Requirement: {item.requirements}</Card.Text>
                    <Card.Text>Badge Class Name: {item.className}</Card.Text>
                    <Card.Text>Badge Class Description: For {item.classDescription}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </div>
      </div>

    )
  }
}