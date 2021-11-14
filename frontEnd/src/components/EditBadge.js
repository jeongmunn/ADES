import React from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../css/badgemazeEdit.css';


export default class EditBadge extends React.Component {

    state = {
        data: [],
        name: '',
        requirements: '',
        pic_url: '',
        badgeClassID: ''
    }



    handleName = event => {
        this.setState({ name: event.target.value });
    }

    handleRequirement = event => {
        this.setState({ requirements: event.target.value });
    }

    handleURL = event => {
        this.setState({ pic_url: event.target.files[0], });
    }

    handleBadgeClassID = event => {
        this.setState({ badgeClassID: event.target.value });
    }


    handleSubmit = event => {
        event.preventDefault();
        // file upload
        const storage = getStorage();
        const storageRef = ref(storage, 'img/' + this.state.pic_url.name);
        var file = this.state.pic_url;
        // Create file metadata including the content type
        /** @type {any} */
        const metadata = {
            contentType: this.state.pic_url.type,
        };
        
        uploadBytes(storageRef, file, metadata);

        getDownloadURL(storageRef).then((downloadURL) => {
            console.log('File available at', downloadURL);

            var bcID = document.getElementById("dropDown");
            var bID = bcID.value;
            var badgeClassID = parseInt(bID);

            const badge = {
                name: this.state.name,
                requirements: this.state.requirements,
                pic_url: downloadURL,
                badgeClassID: badgeClassID
            };

            console.log("BADGEEEE" + JSON.stringify(badge))

            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }

            const badgeID = window.location.href.split('/')[3].slice(13);
            const baseUrl = "http://localhost:8081/api";
            console.log(badgeID);

            axios.put(`${baseUrl}/editBadge/${badgeID}`, badge, config)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    window.location.replace('http://localhost:8081/quizment/badgesAdmin')
                })
        });
    }
    render() {
        return (
            <div id="bodyEdit">
                <div id="divEdit">
                    <div className="editReward">
                        <h1>Edit Badge</h1>
                        <form onSubmit={this.handleSubmit} id="formEdit">
                            <label class='label'>
                                Badge Name:
                                <input type="text" name="name" onChange={this.handleName} />
                            </label>
                            <br />
                            <label class='label'>
                                Badge Requirement:
                                <input type="text" name="requirements" onChange={this.handleRequirement} />
                            </label>
                            <br />
                            <label class='label'>
                                Pic URL:
                                <input type="file" name="pic_url" onChange={this.handleURL} />
                            </label>
                            <br />
                            <label>
                                Badge Class ID:
                                <select name="badgeClassID" onChange={this.handleBadgeClassID} id="dropDown">
                                    <option value="1">Air</option>
                                    <option value="2">Water</option>
                                    <option value="3">Fire</option>
                                    <option value="4">Geo</option>
                                </select>
                                {/* <input type="text" name="badgeClassID" onChange={this.handleBadgeClassID} /> */}
                            </label>
                            <br />
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}