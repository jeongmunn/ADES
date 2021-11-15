import React, { useState, useEffect} from 'react';
import axios from 'axios';

export default class ViewLeaderboard extends React.Component {
    state = {
        data: []
    }

    componentDidMount(){
        //axios.get('https://ades-ca1-heroku.herokuapp.com/api/leaderboard')
        axios.get('http://localhost:8081/api/leaderboard')
        .then(res => {
            this.setState({ data : res.data });
        })
    }

    render() {

        const data = this.state.data ;

        return (
            <div className="viewLeaderboard">
            <h3 className="p-3 text-center">Leaderboard</h3>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) =>
                        <tr key={item.studentID}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.totalPts}</td>
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
        )
    }
}