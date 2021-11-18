import React from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../css/rewardEdit.css';

export default class EditReward extends React.Component {

    state = {
        data : [],
        rewardName: '',
        rewardPoints: '',
        url: '',
        rewardID: 33
      }

      handleName = event => {
        this.setState({ rewardName : event.target.value });
      }
    
      handlePoints = event => {
        this.setState({ rewardPoints : event.target.value });
      }
    
      handleURL = event => {
        this.setState({ url : event.target.files[0], });
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
            rewardName : this.state.rewardName,
            ptsRequired : this.state.rewardPoints,
            url : downloadURL
        };
        console.log("reward" + JSON.stringify(reward))
        
        const config = {
        headers: {
          'content-type': 'application/json'
        }
        }

        //const rewardID = window.location.href.split('/')[3].slice(19);
        
        //axios.pit('https://ades-ca1-heroku.herokuapp.com/api/rewards' + this.state.rewardID, reward, config )
        axios.put('https://ades-ca1-heroku.herokuapp.com/api/rewards'+ this.state.rewardID, reward, config )
        .then(res => {
          console.log(res);
          console.log(res.data);
          window.location.reload();
          window.alert("Edit successfully !");
        })
    })
  }

    render() {
        return (
            <div className="rewardEdit" id="bodyEdit">
                <div id="divEdit">
                    <div className="editReward">
                        <h1>Edit Reward</h1>
                        <form onSubmit={this.handleSubmit} id="formEdit">
                            <label class='label'>
                                Reward Name:
                                <input type="text" name="rewardName" onChange={this.handleName} />
                            </label>
                            <br />
                            <label class='label'>
                                Points Required:
                                <input type="number" name="ptsRequired" onChange={this.handlePoints} />
                            </label>
                            <br />
                            <label class='label'>
                                Picture URL:
                                <input type="file" name="url" onChange={this.handleURL} />
                            </label>
                            <br />
                            <button type="submit">Edit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}