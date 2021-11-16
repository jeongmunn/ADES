import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../css/Table&Add.css';
export default class RewardAdmin extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        axios.get('https://ades-ca1-project.herokuapp.com/api/mazeContent')
            .then(res => {
                this.setState({ data: res.data });
            })
    }

    render() {
        const data = this.state.data;
        return (
            <div id="body">
                <div id="div">
                    <div className="viewMazeLvl">
                        <h3 className="p-3 text-center">Map of Maze Content</h3>

                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Maze Level</th>
                                    <th>Points</th>
                                </tr>
                            </thead>

                            {data && data.map(item =>
                                <tr id='tableRow' class="spaceUnder">
                                    <td>{item.mazeLvl}</td>
                                    <td>{item.points}</td>
                                    <td>
                                        <Link to={`/EditMazeContent?lvl=${item.mazeLvl}`}>
                                            <Button>Edit</Button>
                                        </Link>
                                    </td>

                                </tr>
                            )}

                        </table>
                    </div>
                </div>
            </div>
        )
    }
}