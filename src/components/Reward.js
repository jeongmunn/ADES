import React from 'react';
import axios from 'axios';

export default class UploadReward extends React.Component {
    state = {
        rewardName: [],
        rewardPoints: [],
        file: [],
    }

    componentDidMount(){
        axios.get('http://localhost:8081/api/rewards')
        .then(res => {
            const rewardName = res.data.rewardName ;
            const rewardPoints = res.data.ptsRequired ;
            const file = res.data.url ;
            this.setState({ rewardName });
            this.setState({ rewardPoints });
            this.setState({ file });
        })
    }

    render() {
        return (
            <div className="viewReward">
                
          </div>
        )
    }
}