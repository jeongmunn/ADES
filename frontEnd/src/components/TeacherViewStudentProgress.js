import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Button,Card} from 'react-bootstrap';

export default class TeacherViewStudentProgress extends React.Component {
    state = {
        data: [],
    }

    componentDidMount(){
        axios.get('http://localhost:8081/studentProgress')
        .then(res => {
            this.setState({ data : res.data });
        })
    }

    
    render() {
        const data = this.state.data ;
        return (
            <div className="viewReward">
            <h3 className="p-3 text-center">Student Progress</h3>

            <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
        
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Streaks</th>
                        <th>Maze Level</th>
                        <th>Total Points</th>
                    
                    </tr>
                </thead>
                <tbody>



                    {data && data.map(item =>
                        <tr key={item.studentID}>
                            <td>{item.name}</td>
                            <td>{item.streaks}</td>
                            <td>{item.mazeLvl}</td>
                            <td>{item.totalPts}</td>
                      

                         
                        </tr>
                    )}
                </tbody>
            </table>
          </div>
        )
    }
}
