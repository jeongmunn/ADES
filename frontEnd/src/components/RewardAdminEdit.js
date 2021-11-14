import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../rewardAdminEdit.css'
import { Navbar, Container, Nav, Col, Row,Button, Glyphicon, Sidebar, NavItem, Card, ListGroup } from 'react-bootstrap';
const FormData = require('form-data');
const fs = require('fs');

export default class UploadReward extends React.Component {
  state = {
    rewardName: [],
    ptsRequired: [],
    rewardPoints: '',
    redirectToReferrer: false,
  }

  componentDidMount() {
    axios.get('http://localhost:8081/rewards/' + window.location.href.split('/')[3].slice(14))
      .then(res => {
        console.log("the data  name of reward" + res.data[0].rewardName)
        const rewardName = res.data[0].rewardName;
        const ptsRequired = res.data[0].ptsRequired;

        this.setState({ rewardName });
        this.setState({ ptsRequired })

      })
  }


  handleName = event => {
    this.setState({ rewardName: event.target.value, });
  }

  handlePoints = event => {
    this.setState({ rewardPoints: event.target.value, });
  }

  handleURL = event => {
    this.setState({ file: event.target.files[0], });
  }

  handleSubmit = event => {
    event.preventDefault();
    const reward = {
      ptsRequired: this.state.rewardPoints
    }

    console.log("reward : " + JSON.stringify(reward));

    const config = {
      headers: {
        'content-type': 'application/json'
      }
    }



    axios.put('http://localhost:8081/rewards/' + window.location.href.split('/')[3].slice(14), reward, config)
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.reload()
      })
  }


  handleDelete = event => {

    this.setState({
      redirectToReferrer: true

    })


    axios.delete('http://localhost:8081/rewards/' + window.location.href.split('/')[3].slice(14))
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.replace("http://localhost:3000/rewardsAdmin");

      })



  }
  render() {
    const redirectToReferrer = this.state.redirectToReferrer;
    if (redirectToReferrer === true) {
      <Link to="/rewardsAdmin" />
    }

    return (
      <Container fluid >
        <Navbar bg="light" variant="light" fluid>
          <Container>
            <Navbar.Brand href="#home">Quizment Admin</Navbar.Brand>
            <Nav className="ml-5">
              <Nav.Link href="#home">Student </Nav.Link>
              <Nav.Link href="#features">Rewards </Nav.Link>
              <Nav.Link href="#pricing">Badges </Nav.Link>
              <Nav.Link href="#pricing">Maze </Nav.Link>
              <Nav.Link href="#pricing">Leaderboard </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Container className="toatalContainer" fluid>
       
<Row className="mainBox">
            <Col className="rewardDelBox" >

              <div className="rewardDelBoxCon"> 
            
                <tr>Reward Name: {this.state.rewardName}</tr>
                <tr>Points: {this.state.ptsRequired}</tr>
                </div>
                <form onSubmit={this.handleDelete}>

                 

                  <Button type="submit" variant="outline-secondary" className="btnDel">Delete</Button>

                 
                </form>

          </Col>
          <Col className="rewardEditBox" >
             
                
            <h6>Change the points here</h6>
            <div className="uploadReward">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Points Required :
                  <input type="number" min="0" name="ptsRequired" onChange={this.handlePoints} />
                </label>

                <Button type="submit" variant="outline-secondary" className="btnDel">Save Changes</Button>

               
              </form>
              </div>

        

            </Col>
            </Row>







        </Container>


      </Container>
    )
  }
}

