import React from 'react';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { Link } from 'react-router-dom' ;
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import '../css/studentReward.css';

export default class viewReward extends React.Component {
  state = {
    data : [],
    currentPts: 0,
    rewardName: '',
    rewardPoints: 0,
    url: '',
    studentID: 1,
  }

  componentDidMount(){
    // Get all rewards data
    axios.get('http://localhost:8081/api/rewards')
    //axios.get('https://ades-ca1-heroku.herokuapp.com/api/rewards')
    .then(res => {
        this.setState({ data : res.data });
    })
    
    // Get student's points data
    axios.get('http://localhost:8081/api/points/' + this.state.studentID)
    //axios.get('https://ades-ca1-heroku.herokuapp.com/api/points/' + this.state.studentID)
    .then(res => {
        this.setState({ currentPts : res.data[0].redeemedPts });
    })
}

  notiRedeemSuccess(rewardName){
    store.addNotification({
      title:"Success",
      message:"Congratulations! You've successfully redeemed " + rewardName + " !",
      type:"success",
      insert:"top",
      container:"top-center",
      animationIn:["animated","fadeIn"],
      animationOut:["animated","fadeOut"],
      dismiss: {duration:2000},
      dismissable: {click:true}
    });
  }  

  notifRedeemFail(){
    store.addNotification({
      title:"Error",
      message:"You've insufficient points to redeem this reward. Work harder!",
      type:"danger",
      insert:"top",
      container:"top-center",
      animationIn:["animated","bounceIn"],
      animationOut:["animated","bounceOut"],
      dismiss: {duration:2000},
      dismissable: {click:true}
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
    if(currentPts >= ptsRequired){

      // Do the calculation
      this.setState({currentPts : (currentPts - ptsRequired)});

      // Insert reward history
      const IDs = {
        studentID : this.state.studentID,
        rewardID : rewardID
      }

      const config = {
        headers: {
          'content-type':'application/json'
        }
      }

      axios.post('http://localhost:8081/api/rewardHistory', IDs, config)
      //axios.post('https://ades-ca1-heroku.herokuapp.com/api/rewardHistory', IDs, config)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

      // Update student's current points
      const points = {
        points : currentPts
      }

      axios.put('http://localhost:8081/api/point/' + this.state.studentID, points, config )
      //axios.put('https://ades-ca1-heroku.herokuapp.com/api/point/' + this.state.studentID, points, config )
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.notiRedeemSuccess(rewardName);
      })

    // ELSE student dont have enough points
    }else{
      this.notifRedeemFail();
    }
  
  }

  render() {
      const data = this.state.data;
    return (
        <div className="StudentReward">
          <h1>Rewards</h1>
          <div className="Rewards">
          <Row xs={1} md={2} lg={3} className="g-4">
            {data && data.map(item => 
              <Col>
              <Card border="warning">
                <Card.Img className="cardPic" variant="top" src={item.url} />
                <Card.Body>
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