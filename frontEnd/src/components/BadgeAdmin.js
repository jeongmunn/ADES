import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from 'react-bootstrap/Button';
import '../css/Table&Add.css';


export default class BadgeAdmin extends React.Component {
  state = {
    data: [],
    class: [],
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

    axios.get(`http://localhost:8081/badgeClass`)
      .then(res => {
        console.log(res.data.length);

        this.setState({ class: res.data });
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
    const data2 = this.state.class;
    return (

      <div id="body">
        <div id="div">
          <h1 style={{ fontFamily: "sans-serif ", color: 'blue' }}>Badges Administration</h1>
          <div className="viewBadges">
            <div id="divForm">
              <h2 id="add">Add Badge</h2>
              <form onSubmit={this.handleSubmit} id="form" >
                <label>
                  Badge Name:
                  <input type="text" name="name" onChange={this.handleName} />
                </label>
                <br/>
                <label>
                  Badge Requirement:
                  <input type="text" name="requirements" onChange={this.handleRequirement} />
                </label>
                <br/>
                <label>
                  Pic URL:
                  <input type="file" name="pic_url" onChange={this.handleURL} />
                </label>
                {/* Please remember to change and do JOIN table for it to not display as ID */}
                <br/>
                <label>
                  Badge Class ID:
                  <select name="badgeClassID" onChange={this.handleBadgeClassID} >
                    <option value="1">Air</option>
                    <option value="2">Water</option>
                    <option value="3">Fire</option>
                    <option value="4">Geo</option>
                  </select>
                  {/* <input type="text" name="badgeClassID" onChange={this.handleBadgeClassID} /> */}
                </label>
                <button  type="submit">Add</button>
              </form>
            </div>

            <div> <div>
              <h2>Badge Class</h2>
              <table class="table">
                <tr>
                  <th>Class Name</th>
                  <th>Describtion </th>

                </tr>
                {data2 && data2.map(item =>
                  <tr id='tableRow' class="spaceUnder">
                    <td>{item.className}</td>
                    <td>{item.classDescription}</td>

                  </tr>
                )}
              </table>
            </div></div>
            <div>
              <h2>View Badges</h2>
              <table class="table">
                <tr>
                  <th>Badge Name</th>
                  <th>Requirements</th>
                  <th>badgeClass</th>
                  <th>Picture</th>
                </tr>
                {data && data.map(item2 =>
                  <tr key={item2.badgeID} id='tableRow' class="spaceUnder">
                    <td>{item2.name}</td>
                    <td>{item2.requirements}</td>
                    <td>{item2.className}</td>
                    <td><img src={'../images/' + item2.pic_url} style={{ height: 200, width: 200 }} alt=""></img></td>
                    <td><Link to={`/EditBadge?id=${item2.badgeID}`}>
                      <Button>Edit</Button>
                    </Link>
                    </td>
                  </tr>
                )}
              </table>
            </div>

          </div>
        </div>
      </div>
    )
  }
}