import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from 'react-bootstrap/Button';


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
    //data extraction (combining data)
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
      axios.post('http://localhost:8081/newBadge', badge, config)
        .then(res => {
          console.log(res);
          console.log(res.data);
          window.location.reload();
        })
    });
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
              <td><img src={item.pic_url} style={{ height: 200, width: 200 }}></img></td>
              <td>
                <Link to={`/EditBadge?id=${item.badgeID}`}>
                  <Button>Edit</Button>
                </Link>
              </td>            
            </tr>
          )}
        </div>
      </div>
    )
  }
}