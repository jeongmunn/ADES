import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Button from 'react-bootstrap/Button';
import '../css/rewardAdmin.css';

export default class viewReward extends React.Component {
    state = {
        data: [],
        rewardName: '',
        rewardPoints: '',
        url: ''
    }

    componentDidMount() {
        axios.get('https://ades-ca1-project.herokuapp.com/api/rewards')
            .then(res => {
                this.setState({ data: res.data });
            })
    }

    handleDelete = event => {
        const id = event.target.id;
        axios.delete('https://ades-ca1-project.herokuapp.com/api/rewards/' + id)
            .then(res => {
                window.alert("Reward deleted successfully");
                window.location.reload();
            })
    }

    handleName = event => {
        this.setState({ rewardName: event.target.value });
    }

    handlePoints = event => {
        this.setState({ rewardPoints: event.target.value });
    }

    handleURL = event => {
        this.setState({ url: event.target.files[0], });
    }

    handleSubmit = event => {
        event.preventDefault();
        // file upload
        // packing data    
        const storage = getStorage();
        const storageRef = ref(storage, 'img/' + this.state.url.name);
        var file = this.state.url;
        // Create file metadata including the content type
        /** @type {any} */
        const metadata = {
            contentType: this.state.url.type,
        };
        uploadBytes(storageRef, file, metadata);

        getDownloadURL(storageRef).then((downloadURL) => {
            console.log('File available at', downloadURL);

            const reward = {
                rewardName: this.state.rewardName,
                ptsRequired: this.state.rewardPoints,
                url: downloadURL
            };
            console.log("reward" + JSON.stringify(reward))

            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }

            //axios.post('https://ades-ca1-heroku.herokuapp.com/api/rewards', reward, config )
            axios.post('https://ades-ca1-project.herokuapp.com/api/rewards', reward, config)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    window.location.reload();
                })
        })
    }

    render() {
        const data = this.state.data;
        return (
            <div className="rewardAdmin" id="body">
                <div id="addReward">
                    <h1>Reward Administration</h1>
                    <div id="divForm">
                        {/* <h2>Add Reward</h2> */}
                        <form onSubmit={this.handleSubmit} id="form">
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
            <input type="file" name="url" onChange={this.handleURL} />
                            </label>
                            <Button type="submit">Add</Button>
                        </form>
                    </div>
                    <div id="viewRewards">
                        {/* <h2>View Rewards</h2> */}
                        <table class="table">
                            <tr>
                                <th>Name</th>
                                <th>Points</th>
                                <th>Picture</th>
                                <th>Edit?</th>
                                <th>Delete?</th>
                            </tr>
                            {data && data.map(item =>
                                <tr key={item.rewardID}>
                                    <td>{item.rewardName}</td>
                                    <td>{item.ptsRequired}</td>
                                    <td><img src={item.url} style={{ height: 230, width: 230 }}></img></td>
                                    <td><button type="button" class="btn btn-outline-warning">Edit</button></td>
                                    <td><button type="button" class="btn btn-outline-danger" id={item.rewardID} onClick={this.handleDelete}>Delete</button></td>
                                </tr>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}