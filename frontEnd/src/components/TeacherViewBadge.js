import React from 'react';
import axios from 'axios';

export default class BadgeList extends React.Component {


    //GET-----------------------------------
    state = {
        bagdes: []
      }
    
      componentDidMount() {
        axios.get(`https://localhost:8081/badges`)
          .then(res => {
            const badges = res.data;
            this.setState({ badges });
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
     {/* GET*/}
        <div>  
            <ul> { this.state.badges.map(badge => <li>{badge.name}</li>)}</ul>
        </div>


    {/* POST*/}
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Person Name:
            <input type="text" name="name" onChange={this.handleChange} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
      </div>
    )
  }
}