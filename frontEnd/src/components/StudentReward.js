import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom' ;
import {getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Button from 'react-bootstrap/Button';

export default class viewReward extends React.Component {
  state = {
    data : [],
    rewardName: '',
    rewardPoints: '',
    url: ''
  }

  componentDidMount(){
    //axios.get('https://ades-ca1-heroku.herokuapp.com/api/rewards')
    axios.get('http://localhost:8081/api/rewards')
    .then(res => {
        this.setState({ data : res.data });
    })
}

  handleRedeem = event => {
    const id = event.target.id;
    axios.delete('http://localhost:8081/api/rewards/' + id)
    .then(res => {
        window.alert("Reward redeemed successfully");
    })
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
                            {/* <td><Link to={`/RewardAdminEdit?id=${item.rewardID}`}><Button>Edit</Button></Link></td> */}
                            <td><Button id={item.rewardID} onClick={this.handleDelete}>Redeem</Button></td>
                        </tr>
                    )}
            </div>
      </div>
      
    )
}
}