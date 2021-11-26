import React from 'react';
import axios from 'axios';
import { store } from 'react-notifications-component';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import StudentNavigation from './StudentNavigaton';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import sample from '../logoLoading.webm';
import '../App.css';
import '../css/navigation.css';
import '../css/studentReward.css';

export default class viewReward extends React.Component {
  state = {
    data: [],
    currentPts: 0,
    rewardName: '',
    rewardPoints: 0,
    url: '',
    studentID: 1,
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
        axios.get(`https://ades-ca1-project.herokuapp.com/api/userType/` + this.state.uid, config)
          .then(res => {
            // IF is student
            if (res.data.type === 1) {
              this.setState({ id: res.data.studentID })
              
              // Get all rewards data
              axios.get('https://ades-ca1-project.herokuapp.com/api/rewards')
                .then(res => {
                  this.setState({ data: res.data });
                })

              // Get student's points data
              axios.get('https://ades-ca1-project.herokuapp.com/api/points/' + this.state.id)
                .then(res => {
                  this.setState({ currentPts: res.data[0].redeemedPts });
                })
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
  }

  notiRedeemSuccess(rewardName) {
    store.addNotification({
      title: "Success",
      message: "Congratulations! You've successfully redeemed " + rewardName + " !",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  notifRedeemFail() {
    store.addNotification({
      title: "Error",
      message: "You've insufficient points to redeem this reward. Work harder!",
      type: "danger",
      insert: "top",
      container: "top-center",
      animationIn: ["animated", "bounceIn"],
      animationOut: ["animated", "bounceOut"],
      dismiss: { duration: 2000 },
      dismissable: { click: true }
    });
  }

  handleRedeem = event => {

    // Get the data
    const rewardID = event.target.getAttribute("data-index");
    const ptsRequired = event.target.getAttribute("data-points");
    const rewardName = event.target.getAttribute("data-name");
    console.log("rewardID = " + rewardID);
    console.log("rewardName = " + rewardName);
    console.log("points = " + ptsRequired);

    // Store student's points
    const currentPts = this.state.currentPts;

    // IF student have enough points to redeem
    if (currentPts >= ptsRequired) {

      // Do the calculation
      this.setState({ currentPts: (currentPts - ptsRequired) });

      // Insert reward history
      const IDs = {
        studentID: this.state.id,
        rewardID: rewardID
      }

      const config = {
        headers: {
          'content-type': 'application/json'
        }
      }

      axios.post('https://ades-ca1-project.herokuapp.com/api/rewardHistory', IDs, config)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })

      // Update student's current points
      const points = {
        points: currentPts
      }

      axios.put('https://ades-ca1-project.herokuapp.com/api/point/' + this.state.id, points, config)
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.notiRedeemSuccess(rewardName);
        })

      // ELSE student dont have enough points
    } else {
      this.notifRedeemFail();
    }

  }

  render() {
    const data = this.state.data;
    return (
      <div className="StudentReward">
        <video style={{ display: this.state.display, width: '100%', height: 'auto' }} className='videoLoader' autoPlay loop muted>
                    <source src={sample} type='video/webm' />
                </video>
        <div style={{ display: this.state.display2 }}></div>
        <StudentNavigation  className="navBar">
      </StudentNavigation>
        <h1>Rewards</h1>
        <div className="Rewards">
          <Row xs={1} md={2} lg={3} className="g-4">
            {data && data.map(item =>
              <Col>
                <Card border="warning">
                  <Card.Img className="cardPic" variant="top" src={item.url} />
                  <Card.Body className="cardBody">
                    <Card.Title>{item.rewardName}</Card.Title>
                    <Card.Text>Points : {item.ptsRequired}</Card.Text>
                    <Button variant="warning" onClick={this.handleRedeem} data-index={item.rewardID} data-name={item.rewardName} data-points={item.ptsRequired}>Redeem</Button>
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