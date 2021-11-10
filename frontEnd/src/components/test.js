import React, { useState, useEffect} from 'react';
import axios from 'axios';
const FormData = require('form-data');
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';

export default class RewardAdminEdit extends React.Component {
    state = {
        rewardName: [],
        ptsRequired:[],
        rewardPoints:'',
        data: [],
    }

    handlePoints = event => {
        this.setState({ rewardPoints : event.target.value, });
      }


    handleSubmit = event => {
        event.preventDefault();
        const reward = new FormData();
      
        reward.append('ptsRequired', this.state.rewardPoints)
    
        console.log("-----------------------")
        console.log("BUTTON CLICKED")
        console.log("reward : " + reward );

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
    
        axios.put('http://localhost:8081/rewards/20',  reward, config )
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }

      componentDidMount(){
        axios.get('http://localhost:8081/rewards/20')
        .then(res => {
           console.log("the data  name of reward"+res.data[0].rewardName)

           const rewardName=res.data[0].rewardName;
           const ptsRequired=res.data[0].ptsRequired;

           this.setState({rewardName});
           this.setState({ptsRequired})

        })
    }

    render() {
          const data = this.state.data ;
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
      </div>
          </div>
        )
    }
}
