import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom' ;
import Button from 'react-bootstrap/Button';

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
    // Get rewards data
    //axios.get('https://ades-ca1-heroku.herokuapp.com/api/rewards')
    axios.get('http://localhost:8081/api/rewards')
    .then(res => {
        this.setState({ data : res.data });
    })
    
    // Get student's points data
    //axios.get('https://ades-ca1-heroku.herokuapp.com/api/points/' + studentID)
    axios.get('http://localhost:8081/api/points/' + this.state.studentID)
    .then(res => {
        this.setState({ currentPts : res.data[0].redeemedPts });
    })
}

  handleRedeem = event => {

    // Get the data
    const rewardID = event.target.getAttribute("data-index");
    const ptsRequired = event.target.getAttribute("data-points");
    console.log("rewardID = " + rewardID);
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
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

      // Update student's current points
      const points = {
        points : currentPts
      }

      axios.put('http://localhost:8081/api/point/' + this.state.studentID, points, config )
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.alert("Reward redeemed successfully");
      })

    // ELSE student dont have enough points
    }else{
      // notifications

      window.alert("Insufficient points ! Work harder and earn more points !");
    }
  
  }

  render() {
      const data = this.state.data;
    return (
        <div>
            <h1>Rewards</h1>
            <div className="viewRewards">
            {data && data.map(item =>
                        <tr key={item.rewardID}>
                            <td>{item.rewardName}</td>
                            <td>{item.ptsRequired}</td>
                            <td><img src={item.url} style={{height: 200, width: 200}}></img></td>
                            <td><Button onClick={this.handleRedeem} data-index={item.rewardID} data-points={item.ptsRequired}>Redeem</Button></td>
                        </tr>
                    )}
            </div>
      </div>
      
    )
}
}