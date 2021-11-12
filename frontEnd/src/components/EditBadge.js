import React from 'react';
import axios from 'axios';
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

        const badge = {
            name: this.state.name,
            requirements: this.state.requirements,
            pic_url: this.state.pic_url.name,
            badgeClassID: this.state.badgeClassID
        };
        

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
            })
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
                    <br/>
                    <label class='label'>
                        Badge Requirement:
                        <input type="text" name="requirements" onChange={this.handleRequirement} />
                    </label>
                    <br/>
                    <label class='label'>
                        Pic URL:
                        <input type="file" name="pic_url" onChange={this.handleURL} />
                    </label>
                    <br/>
                    {/* Please remember to change and do JOIN table for it to not display as ID */}
                    <label class='label'>
                        Badge Class ID:
                        <input type="text" name="badgeClassID" onChange={this.handleBadgeClassID} />
                    </label>
                    <br/>
                    <button type="submit">Add</button>
                </form>
            </div>
            </div>
      </div>
        )
    }
}