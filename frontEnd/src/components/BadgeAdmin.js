import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from 'react-bootstrap/Button';
import '../css/Table&Add.css';
import ModalPopup from './EditBadge';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
export default class BadgeAdmin extends React.Component {
  state = {
    data: [],
    showModalPopup: false,
    class: [],
    name: '',
    requirements: '',
    pic_url: '',
    badgeClassID: '',
    badgeID: '',
    uid: '',
    id: 0
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is Signed IN ");
        this.setState({ uid: user.uid });
        const config = {
          headers: {
            'content-type': 'application/json'
          }
        }

        axios.get(`https://ades-ca1-project.herokuapp.com/api/userType/` + this.state.uid, config)
          .then(res => {
            if (res.data.type === 1) {
              window.location.replace('https://ades-ca1-project.herokuapp.com/quizment/studentDashboard');

            } else if (res.data.type === 2) {
              // area to put your axios 
            } else {
              window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
            }
          })
      } else {
        console.log("THERE IS NO USER");
        signOut(auth);
        window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
      }
    });


    axios.get(`https://ades-ca1-project.herokuapp.com/api/badges`)
      .then(res => {
        console.log(res.data.length);

        this.setState({ data: res.data });
      })

    axios.get(`https://ades-ca1-project.herokuapp.com/api/badgeClass`)
      .then(res => {
        console.log(res.data.length);

        this.setState({ class: res.data });
      })
  }

  isShowPopup = (status, badgeID, name, requirements, className, pic_url) => {
    this.setState({ showModalPopup: status });
    this.setState({ badgeID: badgeID });
    this.setState({ name: name });
    this.setState({ requirements: requirements });
    this.setState({ badgeClassID: className });
    this.setState({ pic_url: pic_url });
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

  handleSubmit = event => {
    event.preventDefault();
    //data extraction (combining data)
    // file upload
        if (this.state.pic_url == '') { 
          const badge = {
            name: this.state.name,
            requirements: this.state.requirements,
            badgeClassID: this.state.badgeClassID,
            pic_url: 'https://firebasestorage.googleapis.com/v0/b/quizment-ae4a6.appspot.com/o/img%2Fdefault-image.png?alt=media&token=369e00f7-926d-4b3c-abbb-958828b303d5'
        };
  

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        axios.post('https://ades-ca1-project.herokuapp.com/api/newBadge', badge, config)
        .then(res => {
          console.log(res);
          console.log(res.data);
          window.location.reload();
        })

        }else{
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
      console.log(badgeClassID + "classBADGE")
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
      axios.post('https://ades-ca1-project.herokuapp.com/api/newBadge', badge, config)
        .then(res => {
          console.log(res);
          console.log(res.data);
          window.location.reload();
        })
    });
        }
    
  }

  render() {
    const data = this.state.data;
    const data2 = this.state.class;
    return (

      <div id="body">
        <div id="div">
          <h1 className="badgeAdmin" style={{ fontFamily: "sans-serif ", color: 'blue' }}>Badges Administration</h1>
          <div className="viewBadges">
            <div id="divForm">
              <h2 id="add">Add Badge</h2>
              <form onSubmit={this.handleSubmit} id="form" >
                <label>
                  Badge Name:
                  <input type="text" name="name" onChange={this.handleName} />
                </label>
                <br />
                <label>
                  Badge Requirement:
                  <input type="text" name="requirements" onChange={this.handleRequirement} />
                </label>
                <br />
                <label>
                  Pic URL:
                  <input type="file" name="pic_url" onChange={this.handleURL} />
                </label>
                {/* Please remember to change and do JOIN table for it to not display as ID */}
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
                <button type="submit">Add</button>
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
                    <td><img src={item2.pic_url} style={{ height: 200, width: 200 }} alt=""></img></td>
                    <td><Button type="button" variant="warning" onClick={() => this.isShowPopup(true, item2.badgeID, item2.name, item2.requirements, item2.className, item2.pic_url)}>Edit</Button></td>
                  </tr>
                )}
              </table>
            </div>
            <ModalPopup
              showModalPopup={this.state.showModalPopup}
              onPopupClose={this.isShowPopup}
              badgeID={this.state.badgeID}
              name={this.state.name}
              requirements={this.state.requirements}
              className={this.state.badgeClassID}
              pic_url={this.state.pic_url}></ModalPopup>
          </div>
        </div>
      </div>
    )
  }
}