import React from 'react';
import axios from 'axios';
const FormData = require('form-data');
const fs = require('fs');

export default class UploadReward extends React.Component {
  state = {
    rewardName: '',
    rewardPoints: '',
    file: '',
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
    const reward = new FormData();
    reward.append('myImage', this.state.file);
    reward.append('rewardName', this.state.rewardName);
    reward.append('ptsRequired', this.state.rewardPoints)

    console.log("reward : " + reward);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    axios.post('http://localhost:8081/api/rewards',  reward, config )
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  render() {
    return (
        <div className="uploadReward">
        <form onSubmit={this.handleSubmit}>
          <label>
            Reward Name :
            <input type="text" name="rewardName" onChange={this.handleName} />
          </label>
          <label>
            Points Required :
            <input type="number" name="ptsRequired" onChange={this.handlePoints} />
          </label>
          <label>
            Picture URL :
            <input type="file" name="myImage" onChange={this.handleURL} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
}
}
