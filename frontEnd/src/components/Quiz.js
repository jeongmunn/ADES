import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import '../css/quiz.css';
 import ModalPopup from './Modal';  

export default class Quiz extends React.Component {
  // state = {
  //   ,

  // }
  constructor() {  
    super();  
    this.state = {  
      showModalPopup: false ,
      data: [] ,

    }  
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
  handleClose =() =>{
    let status =false
    this.setState({ showModalPopup: status }); 
  }

  handleButton = event => {
    let status =true
    this.setState({ showModalPopup: status });  
    event.preventDefault();
    console.log("BUTTON CLICKED");
 
  
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


   }

  //NEED TO GET STUDENT ID!

//   handleClose = () => {
//     this.props.onPopupClose(false);
// }





  render() {

    const data = this.state.data;


    // When the user clicks anywhere outside of the modal, close it

    return (

      <div>
        <div id="users" class="row">


        </div>
        {/* <div>




          <div id="myModal" class="modal">


            <div class="modal-content">
              <span class="close">&times;</span>
              <p>QUIZ completed!</p>
            </div>
          </div>

        </div> */}
        <table class="table">

          {data && data.map(item =>
            <tr key={item.quizID} id='tableRow' class="spaceUnder">
              <td className="quizTitle">Quiz {item.quizID}</td>
              <td  className="marks">Total Marks: {item.totalMarks}</td>
              <td  className="points">Total Points:{item.totalPoints}</td>

              <td>
                <Button onClick={this.handleButton} data-index={item.quizID} data-mark={item.totalMarks} data-points={item.totalPoints} type="submit" id="myBtn">Do Quiz!</Button>

              </td>
            </tr>
          )}
        </table>
        <ModalPopup  
          showModalPopup={this.state.showModalPopup}  
          onPopupClose={this.handleClose}  
        ></ModalPopup>  
      </div>
    )
  }
}