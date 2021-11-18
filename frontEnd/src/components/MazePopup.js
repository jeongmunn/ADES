import React, { Component, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import axios from 'axios';


export default class ModalPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal : false,
            studentID : 3,
            currentPts : 0,
            totalPts : 0
        };
    }

    componentDidMount(){
        // Get student's points data'
        //axios.get('https://ades-ca1-heroku.herokuapp.com/api/points/' + studentID)
        axios.get('http://localhost:8081/api/points/' + this.state.studentID)
        .then(res => {
            this.setState({ currentPts : res.data[0].redeemedPts });
            this.setState({ totalPts : res.data[0].totalPts});
        })
    }

    isShowModal = (status) => {
        this.handleClose();
        this.setState({ showModal : status});
    }

    handleClose = () => {
        this.props.onPopupClose(false,this.props.level);
    }

    handleComplete = event => {
        // Store student's points
        const quizPts = this.props.point;
        const currentPoints = (this.state.currentPts + quizPts);
        const totalPoints = (this.state.totalPts + quizPts);

        // Do the calculation
        this.setState({ currentPts : currentPoints});
        this.setState({ totalPts : totalPoints});

        // Update student's table
        const data = {
            currentPts : currentPoints,
            totalPts : totalPoints
        }

        const config = {
            headers: {
                'content-type':'application/json'
            }
        }

        axios.put('http://localhost:8081/api/points/' + this.state.studentID, data, config)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })

        const points = {
            ptsAwarded : quizPts,
            eventID : 2
        }

        // Insert points history
        axios.post('http://localhost:8081/api/ptsHistory/' + this.state.studentID, points, config)
        .then(res => {
            console.log(res);
            console.log(res.data);
            window.alert("Points redeemed successfully");
            this.handleClose();
        })
    }

    render() {
             
        return (
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose} id={this.props.level} 
                    size="lg" aria-labelledby="contained-modal-title-vcenter" centered>  
                    <Modal.Header closeButton>  
                        <Modal.Title id="sign-in-title">  
                            Level {this.props.level}
                         </Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body>  
                        <hr />  
                        <div className="Quiz"> 
                        <div>Points : {this.props.point} </div>
                        <Button onClick={this.handleComplete} >Complete</Button>
                        </div>  
                    </Modal.Body>  
                </Modal >  
            </Fragment >  
        )
    }
}