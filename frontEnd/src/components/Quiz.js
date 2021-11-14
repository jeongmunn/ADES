import React from 'react';
import axios from 'axios';

import '../css/pop-up.css';


export default class BadgeAdmin extends React.Component {
  state = {
    data: [],

  }


  componentDidMount() {

    axios.get(`http://localhost:8081/quiz`)
      .then(res => {
        console.log(res.data.length);
        this.setState({ data: res.data });

        console.log(res.data.length);

        this.setState({ data: res.data });


      });







  }
  handleButton = event => {
    event.preventDefault();
    console.log("BUTTON CLICKED");
    // Get the modal
    var modal = document.getElementById("myModal");
    const quizID = event.target.getAttribute("data-index");
    const totalMarks = event.target.getAttribute("data-mark");
    const totalPoints = event.target.getAttribute("data-points");
    // console.log(quizID);
    // console.log(totalMarks);
    // console.log(totalPoints);

    const quiz = {
      quizID: quizID,
      studentID: '1',
      pointsEarned: totalPoints,
      marksEarned: totalMarks
    };
    const studentUpdatePoint = {
      pointsEarned: totalPoints,
      studentID: '1',
    }

    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }
    axios.post('http://localhost:8081/quiz', quiz, config)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log("AXIOS POSTING")
        // window.location.reload();
      })
    axios.put(`http://localhost:8081/studentPoints`, studentUpdatePoint, config)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log("AXIOS PUTTING")
      })

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal 

    modal.style.display = "block";


    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    }
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  //NEED TO GET STUDENT ID!







  render() {

    const data = this.state.data;


    // When the user clicks anywhere outside of the modal, close it

    return (

      <div>
        <div id="users" class="row">


        </div>
        <div>




          <div id="myModal" class="modal">


            <div class="modal-content">
              <span class="close">&times;</span>
              <p>QUIZ completed!</p>
            </div>
          </div>

        </div>
        <table class="table">

          {data && data.map(item =>
            <tr key={item.quizID} id='tableRow' class="spaceUnder">
              <td>Quiz {item.quizID}</td>
              <td>Total Marks: {item.totalMarks}</td>
              <td>Total Points:{item.totalPoints}</td>

              <td>
                <button onClick={this.handleButton} data-index={item.quizID} data-mark={item.totalMarks} data-points={item.totalPoints} type="submit" id="myBtn">Open Modal</button>

              </td>
            </tr>
          )}
        </table>

      </div>
    )
  }
}