import React from 'react';
import axios from 'axios';
import { TwitterAuthProvider } from '@firebase/auth';

class UploadReward extends React.Component {
  state = {
    rewardName: '',
    rewardPoints: '',
    pictureURL: ''
  }

  handleName = event => {
    this.setState({ rewardName : event.target.value, });
  }

  handlePoints = event => {
    this.setState({ rewardPoints : event.target.value, });
  }

  handleURL = event => {
    this.setState({ pictureURL : event.target.value, });
  }

  handleSubmit = event => {
    event.preventDefault();

    const reward = {
        rewardName: this.state.rewardName,
        ptsRequired: this.state.rewardPoints,
        url: this.state.pictureURL
    };

    console.log("reward : " + JSON.stringify(reward));

    axios.post(`https://localhost:8081/api/rewards`, { reward })
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
            <input type="number" name="rewardName" onChange={this.handlePoints} />
          </label>
          <label>
            Picture URL :
            <input type="file" name="rewardName" onChange={this.handleURL} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    )
}
}
export default UploadReward;
