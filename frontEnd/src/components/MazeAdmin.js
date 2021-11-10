import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default class RewardAdmin extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        axios.get('http://localhost:8081/mazeContent')
            .then(res => {
                this.setState({ data: res.data });
            })
    }
   

  



    render() {
        const data = this.state.data;
        return (
            <div className="viewMazeLvl">
                <h3 className="p-3 text-center">React - Display maze content</h3>

                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Maze Level</th>
                            <th>Points</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(item =>
                            <tr >
                                <td>{item.mazeLvl}</td>
                                <td>{item.points}</td>
                                <td>
                                    <Link to={`/EditMazeContent?lvl=${item.mazeLvl}`}>
                                    <Button>Edit</Button>
                                    </Link>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}
