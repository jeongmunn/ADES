import React from 'react';
import axios from 'axios';

export default class ptsHistory extends React.Component {
    state = {
        data: [],
        id: 1
        //id: localStorage.getItem('userid')
    }

    componentDidMount(){
        axios.get('https://ades-ca1-project.herokuapp.com/api/rewards' + this.state.id)
        .then(res => {
            this.setState({ data : res.data });
        })
    }

    render() {

        const data = this.state.data ;

        return (
            <div className="viewPointsHistory">
            <h3 className="p-3 text-center">Display Points History</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>History</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(item =>
                        <tr key={item.historyID}>
                            <td>You've earned {item.pointsAwarded} points from event {item.eventName}</td>
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
        )
    }
}