import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Button from 'react-bootstrap/Button';
import $ from 'jquery';


export default class BadgeAdmin extends React.Component {
    state = {
        data: [],

    }


    componentDidMount() {

        axios.get(`http://localhost:8081/quiz`)
            .then(res => {
                console.log(res.data.length);
                this.setState({ data: res.data });
                console.log(res.data[0])
                for (var i = 0; i < res.data.length; i++) {
                    var quiz = res.data[i];
                    console.log("quizid:" + quiz.quizID);
                    console.log("total Marks:" + quiz.totalMarks);
                    console.log("toalPoints:" + quiz.totalPoints);

                    //cpmplie the data that the card needs for its creation
                    var cardInfo = {
                        "quizID": quiz.quizID,
                        "totalMarks": quiz.totalMarks,
                        "totalPoints": quiz.totalPoints

                    }
                    console.log(" -----------Card Info data pack-----------");
                    console.log(cardInfo);



                    var newCard = createCard(cardInfo);
                    $('#users').append(newCard);

                }


            });


        function createCard(cardInfo) {
            console.log(cardInfo)
            var card = `
        <div class="card" style=" width:60% ;margin-right:10px;">
        <div class="card-body">
           
           
        </div> <p class="card-text" style=" font-size:20px;margin-left:20px">Quiz ${cardInfo.quizID}</p>
        <div style="margin-left:20px "> 
        <div >
            Total Marks:${cardInfo.totalMarks}
        </div>
        <div >
            Total Points:${cardInfo.totalPoints}
        </div>
        <Link to={"/EditBadge?id=${cardInfo.quizID}"}>
                      <Button>Do quiz</Button>
                    </Link>
        
          </div>
        
         </div>
            `;

            return card;
        }




    }

    //NEED TO GET STUDENT ID!







    render() {

        const data = this.state.data;

        return (

            <div>
                <div id="users" class="row">


                </div>


            </div>
        )
    }
}