import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default class BadgeAdmin extends React.Component {
    state = {
        name: [],
        requirements: [],
        pic_url: [],
        badgeClassID: []
      }
    
    componentDidMount() {
      axios.get(`http://localhost:8081/badges`)
          .then(res => {
            console.log(res.data.length);
            for(let i = 0; i < res.data.length; i++) {
              const name = res.data[i].name;
              const requirements = res.data[i].requirements;
              const pic_url = res.data[i].pic_url;
              const badgeClassID = res.data[i].badgeClassID;
              console.log(name);
              this.setState({ name });
              this.setState({ requirements });
              this.setState({ pic_url });
              this.setState({ badgeClassID });
            }
      })
    }

  //POST------------------------------------
  state = {
    name: '',
  }

  handleChange = event => {
    this.setState({ name: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      name: this.state.name
    };

    axios.post(`https://localhost:8081/newBadge`, { user })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
    <div>
      <h1>Badges Administration</h1>
      <div className="viewBadges">
          <h1>{this.state.name}</h1>
      </div>
     {/* GET
        <div>  
            <ul> { this.state.badges.map(badge => <li>{badge.name}</li>)}</ul>
        </div> */}


    {/* POST
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div> */}
      </div>
    )
  }
}