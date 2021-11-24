import React from 'react';
import axios from 'axios';
import wisp from '../img/wisp.png';
import cloud1 from '../img/cloud1.png';
import cloud2 from '../img/cloud2.png';
import cloud3 from '../img/cloud3.png';
import cloud4 from '../img/cloud4.png';
import cloud5 from '../img/cloud5.png';
import cloud6 from '../img/cloud6.png';
import cloud7 from '../img/cloud7.png';
import cloud8 from '../img/cloud8.png';
import MazePopup from './MazePopup';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/maze.css';

export default class MapOfMaze extends React.Component {



  constructor() {

    super();
    this.state = {
      showModalPopup: false,
      isNewLevel: false,
      level: 0,
      points: 0,
      maze: 0,
      currentDate: '',
      setCurrentDate: '',
      uid: '',
      id: 0
    }
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
              this.setState({ id: res.data.studentID })
              // area to put your axios with the student id
              //call maze animation
              this.mazeAnimation(false)
            } else if (res.data.type === 2) {
              window.location.replace('https://ades-ca1-project.herokuapp.com/quizment/teacherDashboard');
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




    const queryString = window.location.search;
    console.log(queryString + "QUERY STRING");
    let todayDate = moment().format('DD/MM/YYYY, hh:mm a');

    const colours = [
      ['#ffc7ae', '#f6b18a', '#fc82b2'],
      ['#4C669F', '#37528d', '#101d42'],
      ['#fffbb6', '#fffbb6', '#ffd68a'],
      ['#fffbc6', '#b0e8ff'],
      ['#dff4ff', '#9cdbff'],
    ];


    var minTimer = moment(todayDate.slice(12, 20), 'h:mm a').diff(moment().startOf('day'), 'minutes');
    var gradientColour;
    const elem = document.getElementById("container");

    //setting background colour according to time
    if (minTimer >= 1170) {
      gradientColour = colours[1]; //works
      elem.style.background = "linear-gradient(" + gradientColour + ")"
    } else if (minTimer >= 1110) {
      gradientColour = colours[0];
      elem.style.background = "linear-gradient(" + gradientColour + ")"
    } else if (minTimer >= 660) {
      gradientColour = colours[4]; //works
      elem.style.background = "linear-gradient(" + gradientColour + ")"
    } else if (minTimer >= 480) {
      gradientColour = colours[3]; //works
      elem.style.background = "linear-gradient(" + gradientColour + ")"
    } else if (minTimer >= 410) {
      gradientColour = colours[2];
      elem.style.background = "linear-gradient(" + gradientColour + ")"
    } else {
      gradientColour = colours[1]; //works
      elem.style.background = "linear-gradient(" + gradientColour + ")"
    }

  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.isNewLevel !== this.state.isNewLevel && prevState.isNewLevel === false && this.state.isNewLevel === true) {
      //THERE IS A CHANGE
      this.mazeAnimation(true);
    }
  }

  //enabling the clouds
  ableMaze = (mazeLvl) => {

    var cloudLvl = parseInt(mazeLvl);

    if ((cloudLvl > 0)) {
      document.getElementById("cloud2img").style.filter = "unset";
      document.getElementById('cloud2').style.pointerEvents = 'unset';
    }
    if ((cloudLvl > 1)) {
      document.getElementById("cloud3img").style.filter = "unset";
      document.getElementById('cloud3').style.pointerEvents = 'unset';
    }
    if ((cloudLvl > 2)) {
      document.getElementById("cloud4img").style.filter = "unset";
      document.getElementById('cloud4').style.pointerEvents = 'unset';
    }
    if ((cloudLvl > 3)) {
      document.getElementById("cloud5img").style.filter = "unset";
      document.getElementById('cloud5').style.pointerEvents = 'unset';
    }
    if ((cloudLvl > 4)) {
      document.getElementById("cloud6img").style.filter = "unset";
      document.getElementById('cloud6').style.pointerEvents = 'unset';
    }
    if ((cloudLvl > 5)) {
      document.getElementById("cloud7img").style.filter = "unset";
      document.getElementById('cloud7').style.pointerEvents = 'unset';
    }
    if ((cloudLvl > 6)) {
      document.getElementById("cloud8img").style.filter = "unset";
      document.getElementById('cloud8').style.pointerEvents = 'unset';
    }
  }

  //to get the students current Lvl
  studentLevel = (callback) => {

    axios.get(`https://ades-ca1-project.herokuapp.com/api/mapOfMaze/` + this.state.id)
      .then(res => {

        this.setState({ maze: res.data[0].mazeLvl });

        var mazeLvl = JSON.stringify(this.state.maze);
        this.ableMaze(mazeLvl);

        this.setState({ isNewLevel: false })
        callback(mazeLvl);
      }

      )
  }


  mazeAnimation = (status) => {

    if (status === false) {
      this.studentLevel(function (mazeLvl) {
        if (mazeLvl > 0) {
          lvl1(mazeLvl);

        } else {

        }
      });

    } else {
      this.studentLevel(function (mazeLvl) {

        var updated = parseInt(mazeLvl);

        if (updated === 1) {

          lvl1(mazeLvl);
        } else if (updated === 2) {

          lvl2(mazeLvl);
        }
        else if (updated === 3) {
          lvl3(mazeLvl);

        }
        else if (updated === 4) {
          lvl4(mazeLvl);

        }
        else if (updated === 5) {
          lvl5(mazeLvl);

        }
        else if (updated === 6) {

          lvl6(mazeLvl);
        }
        else if (updated === 7) {

          lvl7(mazeLvl);
        }
        else if (updated === 8) {

          lvl8(mazeLvl);
        }

      });

    }

    function lvl1(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let pos = 0;
      clearInterval(id);
      id = setInterval(frame, 50);
      function frame() {
        if (pos === 12) {
          clearInterval(id);
          if (mazeLvl > 1) {
            setTimeout(lvl2(mazeLvl), 2);
          }
        } else {
          pos++;
          elem.style.top = pos + "%";
          elem.style.left = pos + "%";
        }
      }
    }
    function lvl2(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let pos = 12;
      elem.style.left = pos + "%";
      clearInterval(id);
      id = setInterval(frame, 50);
      function frame() {
        if (pos === 50) {
          clearInterval(id);
          console.log(mazeLvl);
          if (mazeLvl > 2) {
            setTimeout(lvl3(mazeLvl), 2);
          }
        } else {
          pos++;
          elem.style.top = pos + "%";

        }
      }
    }

    function lvl3(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let posT = 50;
      let posL = 12;
      clearInterval(id);
      id = setInterval(frame, 50);
      function frame() {
        if (posL === 30) {
          clearInterval(id);
          if (mazeLvl > 3) {
            setTimeout(lvl4(mazeLvl), 2);
          }
        } else {
          posT++;
          posL++;
          elem.style.top = posT + "%";
          elem.style.left = posL + "%";

        }
      }
    }

    function lvl4(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let posT = 68;
      let posL = 30;
      clearInterval(id);
      id = setInterval(frame, 50);
      function frame() {
        if (posL === 50) {
          clearInterval(id);
          if (mazeLvl > 4) {
            setTimeout(lvl5(mazeLvl), 2);
          }
        } else {
          posT -= 3
          posL++;
          elem.style.top = posT + "%";
          elem.style.left = posL + "%";
        }
      }
    }

    function lvl5(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let posT = 8;
      let posL = 50;
      elem.style.left = posL + "%";
      clearInterval(id);
      id = setInterval(frame, 50);
      function frame() {
        if (posT === 60) {
          clearInterval(id);
          if (mazeLvl > 5) {
            setTimeout(lvl6(mazeLvl), 2);
          }
        } else {
          posT++
          posL++;
          elem.style.top = posT + "%";
        }
      }
    }

    function lvl6(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let posT = 60;
      let posL = 50;
      elem.style.top = posT + "%";
      elem.style.left = posL + "%";
      clearInterval(id);
      id = setInterval(frame, 50);
      function frame() {
        if (posT === 10) {
          clearInterval(id);
          if (mazeLvl > 6) {
            setTimeout(lvl7(mazeLvl), 2);
          }
        } else {
          posT -= 2
          posL++;
          elem.style.top = posT + "%";
          elem.style.left = posL + "%";

        }
      }
    }

    function lvl7(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let posT = 10;
      let posL = 75;
      elem.style.top = posT + "%";
      elem.style.left = posL + "%";
      clearInterval(id);
      id = setInterval(frame, 50);
      function frame() {
        if (posT === 50) {
          clearInterval(id);
          if (mazeLvl > 7) {
            setTimeout(lvl8(mazeLvl), 2);
          }
        } else {
          posT++;
          elem.style.top = posT + "%";

        }
      }
    }

    function lvl8() {
      let id = null;
      const elem = document.getElementById("animate");
      let posT = 50;
      let posL = 75;
      elem.style.top = posT + "%";
      elem.style.left = posL + "%";

      clearInterval(id);
      id = setInterval(frame, 50);
      function frame() {
        if (posL === 85) {
          clearInterval(id);

        } else {
          posT += 2;
          posL++;
          elem.style.top = posT + "%";
          elem.style.left = posL + "%";
        }
      }
    }
  }

  isShowPopup = (status, levels) => {
    if (parseInt(this.state.maze) >= levels) {
      this.setState({ showModalPopup: false });
      window.alert("Level Already completed!")
    } else {
      this.setState({ showModalPopup: status });

      this.setState({ level: levels });

      axios.get(`https://ades-ca1-project.herokuapp.com/api/maze/${levels}`)
        .then(res => {

          this.setState({ points: res.data[0].points });
        })
    }


  };
  handleNewLevel = (status) => {
    this.setState({ isNewLevel: status });
  }


  render() {
    return (

      <div id="container">
        <div className="bgclouds"></div>

        {/* add exit button here! */}
        {/* <p id="exit" >x</p> */}
        <div id="maze">
          <p id="title">Map Of Maze</p>
          <div id='cloud1' className="cloud" onClick={() => this.isShowPopup(true, 1)}>

            <img id='cloud1img' alt="" src={cloud1} />
          </div>
          <div id='cloud2' className="cloud" onClick={() => this.isShowPopup(true, 2)}  >
            <img id='cloud2img' alt="" src={cloud2} />
          </div>
          <div id='cloud3' className="cloud" onClick={() => this.isShowPopup(true, 3)} >
            <img id='cloud3img' alt="" src={cloud3} />
          </div>
          <div id='cloud4' className="cloud" onClick={() => this.isShowPopup(true, 4)} >
            <img id='cloud4img' alt="" src={cloud4} />
          </div>
          <div id='cloud5' className="cloud" onClick={() => this.isShowPopup(true, 5)}>
            <img id='cloud5img' alt="" src={cloud5} />
          </div>
          <div id='cloud6' className="cloud" onClick={() => this.isShowPopup(true, 6)}>
            <img id='cloud6img' alt="" src={cloud6} />
          </div>
          <div id='cloud7' className="cloud" onClick={() => this.isShowPopup(true, 7)} >
            <img id='cloud7img' alt="" src={cloud7} />
          </div>
          <div id='cloud8' className="cloud" onClick={() => this.isShowPopup(true, 8)} >
            <img id='cloud8img' alt="" src={cloud8} />
          </div>
          {/* the character! */}
          <div id="animate">
            <img id="imgAnimate" className="bounce" alt="" src={wisp} />

          </div>
          <div id="levelDisplay">
            <p id="level">{this.state.maze}</p>
            <p id="staticLevel">Level</p>
          </div>
          <div className="icon">
          <Link to={`/studentDashboard`} className="navlink nav-link-ltr">
          <FontAwesomeIcon icon={faTimes} />
                  </Link>
          </div>
        </div>
        <MazePopup
          showModalPopup={this.state.showModalPopup}
          onPopupClose={this.isShowPopup}
          level={this.state.level}
          point={this.state.points}
          onNewLevel={this.handleNewLevel}
          id={this.state.id}>
        </MazePopup>
      </div>

    )
  }
}