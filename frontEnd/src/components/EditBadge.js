import React from 'react';
import axios from 'axios';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';




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
        // navigation function
        const navigate = useNavigate();
        // file upload
        const storage = getStorage();
        const storageRef = ref(storage, 'img/' + this.state.pic_url.name);
        var file = this.state.pic_url;
        // Create file metadata including the content type
        /** @type {any} */
        const metadata = {
            contentType: this.state.pic_url.type,
        };
        console.log("yes");
        uploadBytes(storageRef, file, metadata);

        getDownloadURL(storageRef).then((downloadURL) => {
            console.log('File available at', downloadURL);

            const badge = {
                name: this.state.name,
                requirements: this.state.requirements,
                pic_url: downloadURL,
                badgeClassID: this.state.badgeClassID
            };

            console.log("BADGEEEE" + JSON.stringify(badge))

            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }

            const badgeID = window.location.href.split('/')[3].slice(13);
            const baseUrl = "http://localhost:8081";
            console.log(badgeID);

            axios.put(`${baseUrl}/editBadge/${badgeID}`, badge, config)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    navigate('/badgesAdmin')
                })
        });
    }

    render() {
        return (
            <div className="editReward">
                <h1>Edit Badge</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Badge Name:
                        <input type="text" name="name" onChange={this.handleName} />
                    </label>
                    <label>
                        Badge Requirement:
                        <input type="text" name="requirements" onChange={this.handleRequirement} />
                    </label>
                    <label>
                        Pic URL:
                        <input type="file" name="pic_url" onChange={this.handleURL} />
                    </label>
                    {/* Please remember to change and do JOIN table for it to not display as ID */}
                    <label>
                        Badge Class ID:
                        <input type="text" name="badgeClassID" onChange={this.handleBadgeClassID} />
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}