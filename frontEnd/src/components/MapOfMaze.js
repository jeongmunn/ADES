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
import ModalPopup from './MazePopup';
import '../css/maze.css';


export default class MapOfMaze extends React.Component {
  constructor() {
    super();
    this.state = {
      showModalPopup: false,
      level: 0,
      points: 0,
      data: [],
      maze: ''
    }
  }

  componentDidMount() {
    axios.get(`https://ades-ca1-heroku.herokuapp.com/api/mazeContent`)
      .then(res => {
        console.log(res.data.length);
        this.setState({ data: res.data });
        console.log(res.data.length);
        this.setState({ data: res.data });
      });

    var studentID = 1;
    //GET STUDENT ID HERE
    //maze lvl
    axios.get(`https://ades-ca1-heroku.herokuapp.com/api/mapOfMaze/` + studentID)
      .then(res => {
        this.setState({ maze: res.data[0].mazeLvl });
        console.log(JSON.stringify(this.state.maze) + "HERE");
        var mazeLvl = JSON.stringify(this.state.maze);
        disableMaze(mazeLvl);
        var lvl = parseInt(mazeLvl);
        //making sure it had a starting postition
        if (lvl === 1) {
          lvl1(mazeLvl)
        }
        else if (lvl === 2) {
          lvl2(mazeLvl);
        }
        else if (lvl === 3) {
          lvl3(mazeLvl);
        }
        else if( lvl ===4){
          lvl4(mazeLvl);
        }
        else if( lvl ===5){
          lvl5(mazeLvl);
        }
        else if( lvl ===6){
          lvl6(mazeLvl);
        }
        else if( lvl ===7){
          console.log(lvl+"HELLO")
          lvl7(mazeLvl);
        }
        else if( lvl ===8){
          lvl8(mazeLvl);
        }

      }

      )


    function disableMaze(mazeLvl) {

      var NextMazeLvl = parseInt(mazeLvl) + 1;
      var currentLvl = parseInt(mazeLvl)
      console.log(mazeLvl)

      if (!(NextMazeLvl > 7)) {
        document.getElementById("cloud8img").style.filter = "grayscale(100%)";
        document.getElementById('cloud8').style.pointerEvents = 'none';
      }
      if (!(NextMazeLvl > 6)) {
        document.getElementById("cloud7img").style.filter = "grayscale(100%)";
        document.getElementById('cloud7').style.pointerEvents = 'none';
      }
      if (!(NextMazeLvl > 5)) {
        document.getElementById("cloud6img").style.filter = "grayscale(100%)";
        document.getElementById('cloud6').style.pointerEvents = 'none';
      }
      if (!(NextMazeLvl > 4)) {
        document.getElementById("cloud5img").style.filter = "grayscale(100%)";
        document.getElementById('cloud5').style.pointerEvents = 'none';
      }
      if (!(NextMazeLvl > 3)) {
        document.getElementById("cloud4img").style.filter = "grayscale(100%)";
        document.getElementById('cloud4').style.pointerEvents = 'none';
      }
      if (!(NextMazeLvl > 2)) {
        document.getElementById("cloud3img").style.filter = "grayscale(100%)";
        document.getElementById('cloud3').style.pointerEvents = 'none';
      }
      if (!(NextMazeLvl > 1)) {
        document.getElementById("cloud2img").style.filter = "grayscale(100%)";
        document.getElementById('cloud2').style.pointerEvents = 'none';
      }
    }

    // };


    // handleButton = event => {
    //   event.preventDefault();
    // var mazeLvl = JSON.stringify(this.state.maze);

    function lvl1(mazeLvl) {

      let id = null;
      const elem = document.getElementById("animate");
      let pos = 0;
      clearInterval(id);
      id = setInterval(frame, 10);
      function frame() {
        if (pos === 70) {
          clearInterval(id);
          if (mazeLvl > 1) {
            setTimeout(lvl2(mazeLvl), 2);
          }

        } else {
          pos++; //console.log("move1 calleD" + pos);
          elem.style.top = pos + "px";
          elem.style.left = pos + "px";
        }
      }
    }
    function lvl2(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let pos = 70;
      clearInterval(id);
      id = setInterval(frame, 2);
      function frame() {
        if (pos === 260) {
          clearInterval(id);
          console.log(mazeLvl);
          if (mazeLvl > 2) {
            console.log("HERE")
            setTimeout(lvl3(mazeLvl), 2);
          }
        } else {
          pos++;// console.log("move2 calleD" + pos);
          elem.style.top = pos + "px";

        }
      }
    }

    function lvl3(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let posT = 260;
      let posL = 70;
      clearInterval(id);
      id = setInterval(frame, 6);
      function frame() {
        if (posT === 450 || posL === 240) {
          clearInterval(id);
          if (mazeLvl > 3) {
            setTimeout(lvl4(mazeLvl), 2);
          }
        } else {
          posT++;
          posL++;
          elem.style.top = posT + "px";
          elem.style.left = posL + "px"; //console.log(posT); console.log(posL)

        }
      }
    }
    function lvl4(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let posT = 430;
      let posL = 240;
      clearInterval(id);
      id = setInterval(frame, 2);
      function frame() {
        if (posT === 150 || posL === 800) {
          clearInterval(id);
          if (mazeLvl > 4) {
            setTimeout(lvl5(mazeLvl), 2);
          }
        } else {
          posT--;
          posL++;
          elem.style.top = posT + "px";
          // console.log(posT); console.log(posL)
          elem.style.left = posL + "px";
        }
      }
    }
    function lvl5(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let pos = 150;
      clearInterval(id);
      id = setInterval(frame, 2);
      function frame() {
        if (pos === 350) {
          clearInterval(id);
          if (mazeLvl > 5) {
            setTimeout(lvl6(mazeLvl), 2);
          }
        } else {
          pos++;
          // console.log("move2 calleD" + pos);
          elem.style.top = pos + "px";

        }
      }
    }

    function lvl6(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let posT = 350;
      let posL = 520;
      clearInterval(id);
      id = setInterval(frame, 2);
      function frame() {
        if (posT === 40) {
          clearInterval(id);
          if (mazeLvl > 6) {
            setTimeout(lvl7(mazeLvl), 2);
          }
        } else {
          posT--;
          posL++;
          elem.style.top = posT + "px";
          elem.style.left = posL + "px";
          console.log(posL); console.log(posT)
        }
      }
    }
    function lvl7(mazeLvl) {
      let id = null;
      const elem = document.getElementById("animate");
      let pos = 40;
      elem.style.left = 830 + "px";
      clearInterval(id);
      id = setInterval(frame, 4);
      function frame() {
        if (pos === 250) {
          clearInterval(id);
          if (mazeLvl > 7) {
            setTimeout(lvl8(mazeLvl), 2);
          }
        } else {
          pos++;
          elem.style.top = pos + "px";

        }
      }
    }
    function lvl8() {
      let id = null;
      const elem = document.getElementById("animate");
      let posT = 250;
      let posL = 830;
      clearInterval(id);
      id = setInterval(frame, 6);
      function frame() {
        if (posT > 400) {
          clearInterval(id);
        } else {
          posT++;
          posL++;
          elem.style.top = posT + "px";
          elem.style.left = posL + "px";

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
      axios.get(`https://ades-ca1-heroku.herokuapp.com/api/maze/${levels}`)
        .then(res => {
          this.setState({ points: res.data[0].points });
          console.log("points :" + JSON.stringify(res.data[0].points));
        })
    }

  };



  render() {
    return (
      <div id="container">
        <p id="title">Map Of Maze</p>
        {/* add exit button here! */}
        <p id="exit" >x</p>
        <div id="maze">
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
          <div id="animate">
            <img id="imgAnimate" alt="" src={wisp} />
          </div>
        </div>
        <ModalPopup
          showModalPopup={this.state.showModalPopup}
          onPopupClose={this.isShowPopup}
          level={this.state.level}
          point={this.state.points}
        ></ModalPopup>
      </div>
    )
  }
}