import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default class RewardAdmin extends React.Component {
    state = {
        data: []
    }

    componentDidMount(){
        axios.get('http://localhost:8081/api/rewards')
        .then(res => {
            this.setState({ data : res.data });
        })
    }

    
    render() {
        const data = this.state.data ;
        return (
            <div className="viewReward">
            <h3 className="p-3 text-center">React - Display a list of items</h3>
            <Link to="/uploadReward">
                <Button>Upload Reward</Button>
            </Link>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Points</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(item =>
                        <tr key={item.rewardID}>
                            <td>{item.rewardName}</td>
                            <td>{item.ptsRequired}</td>
                            <td><img src={'../images/'+ item.url} style={{height: 200, width: 200}}></img></td>
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
        )
    }
}
