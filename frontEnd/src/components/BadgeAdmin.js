import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const FormData = require('form-data');
const fs = require('fs');

export default class BadgeAdmin extends React.Component {
  state = {
    data: [],
      name: '',
    requirements: '',
    pic_url: '',
    badgeClassID: ''
  }

  componentDidMount() {
    axios.get(`http://localhost:8081/badges`)
      .then(res => {
        console.log(res.data.length);
        // for(let i = 0; i < res.data.length; i++) {
        //   const name = res.data[i].name;
        //   const requirements = res.data[i].requirements;
        //   const pic_url = res.data[i].pic_url;
        //   const badgeClassID = res.data[i].badgeClassID;
        //   console.log(name);
        //   this.setState({ name });
        //   this.setState({ requirements });
        //   this.setState({ pic_url });
        //   this.setState({ badgeClassID });
        // }
        this.setState({ data: res.data });
      })
  }

  handleName = event => {
    this.setState({ name: event.target.value });
  }

  handleRequirement = event => {
    this.setState({ requirements: event.target.value });
  }

  handleBadgeClassID = event => {
    this.setState({ badgeClassID: event.target.value });
  }

  handleURL = event => {
    this.setState({ pic_url: event.target.files[0], });
  }

  handleSubmit = event => {
    event.preventDefault();
    
    console.log("overHERERRER")
    
    // badge.push('name', this.state.name);
    // badge.push('requirements', this.state.requirements);
    // badge.push('pic_url', this.state.pic_url);
    // badge.push('badgeClassID', this.state.badgeClassID);


console.log(this.state.pic_url.name)
     //data extraction (combining data)
            const badge = {
                name:  this.state.name,
                requirements: this.state.requirements,
                pic_url: this.state.pic_url.name,
                badgeClassID: this.state.badgeClassID

            };
            console.log("BADGEEEE"+  JSON.stringify(badge))   

      const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

    axios.post('http://localhost:8081/newBadge', badge,config)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  

  render() {
    const data = this.state.data;
    return (
      <div>
        <h1>Badges Administration</h1>
        <div className="viewBadges">
          <div>

          <h2>Add Badge</h2>
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
          <h2>View Badges</h2>
          {data && data.map(item =>
            <tr key={item.badgeID}>
              <td>{item.name}</td>
              <td>{item.requirements}</td>
              <td>{item.badgeClassID}</td>
              <td><img src={'../images/' + item.pic_url} style={{ height: 200, width: 200 }}></img></td>
            </tr>
          )}
        </div>



      </div>
    )
  }
}