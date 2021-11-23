import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export default class ptsHistory extends React.Component {
    state = {
        data: [],
        id: 18
        //id: localStorage.getItem('userid')
    }

    componentDidMount() {
        axios.get('http://localhost:8081/api/ptsHistory/' + this.state.id)
            .then(res => {
                this.setState({ data: res.data });
            })
    }

    render() {

        const data = this.state.data;

        return (
            <div className="viewPointsHistory">
                <h3 className="p-3 text-center">Display Points History</h3>
                        {data && data.map(item =>
                                <Card body>You've earned {item.pointsAwarded} points from event {item.eventName}</Card>
                        )}
            </div>
        )
    }
}