import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const FormData = require('form-data');
const fs = require('fs');

export default class UploadReward extends React.Component {
  state = {
    rewardName: [],
    ptsRequired:[],
    rewardPoints: '',
    redirectToReferrer: false,
  }
  
  componentDidMount(){
    axios.get('http://localhost:8081/rewards/' + window.location.href.split('/')[3].slice(14))
    .then(res => {
       console.log("the data  name of reward"+res.data[0].rewardName)
       const rewardName=res.data[0].rewardName;
       const ptsRequired=res.data[0].ptsRequired;

       this.setState({rewardName});
       this.setState({ptsRequired})

    })
    
}


  handleName = event => {
    this.setState({ rewardName : event.target.value, });
  }

  handlePoints = event => {
    this.setState({ rewardPoints : event.target.value, });
  }

  handleURL = event => {
    this.setState({ file : event.target.files[0], });
  }

  handleSubmit = event => {
    event.preventDefault();
    const reward = {
        ptsRequired : this.state.rewardPoints
    }
  
    console.log("reward : " + JSON.stringify(reward));

    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }

    
    
    axios.put('http://localhost:8081/rewards/' +  window.location.href.split('/')[3].slice(14),  reward, config)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
}


handleDelete = event => {

    this.setState({
        redirectToReferrer: true

    })
  

    axios.delete('http://localhost:8081/rewards/' +  window.location.href.split('/')[3].slice(14))
    .then(res => {
      console.log(res);
      console.log(res.data);

    })



}
  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer === true) {
        <Link to="/rewardsAdmin" />
    }

  return (
      <div className="viewReward">
      <h3 className="p-3 text-center">React - Display a list of items</h3>
   
      <table className="table table-striped table-bordered">
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Points</th>
              </tr>
          </thead>
          <tbody>
                  <tr>
                      <td>{this.state.rewardName}</td>
                      <td>{this.state.ptsRequired}</td>
                  </tr>
           
          </tbody>
      </table>

      <h4>Would you like to change the points</h4>
      <div className="uploadReward">
  <form onSubmit={this.handleSubmit}>
    <label>
      Points Required :
      <input type="number" name="ptsRequired" onChange={this.handlePoints} />
    </label>

    <button type="submit">Save Changes</button>
  </form>

  <form onSubmit={this.handleDelete}>

    <button  type="submit">Delete</button>
  </form>
</div>
    </div>
  )
}
}

