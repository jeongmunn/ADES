import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../css/badgemazeEdit.css';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export default class EditMazeContent extends React.Component {

    state = {

        points: ''

    }



    handlePoints = event => {
        this.setState({ points: event.target.value, });
    }


    handleSubmit = event => {
        event.preventDefault();

        const mazeContent = {

            points: this.state.points

        };

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        const lvl = parseInt(this.props.mazeLvl)
        const baseUrl = "http://localhost:8081.com/api/";


        axios.put(`${baseUrl}/mazeContent/${lvl}`, mazeContent, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
                window.location.reload();
            })
    }

    handleClose = () => {
        this.props.onPopupClose(false, this.props.rewardID, '', '', '');
    }
    render() {
        return (
            <div id="bodyEdit">

                <Fragment>
                    <Modal show={this.props.showModalPopup} onHide={this.handleClose}
                        size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                Edit Maze Level {this.props.mazeLvl}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="editReward">
                                <Form onSubmit={this.handleSubmit} className="editMazeForm">
                                    <Row>

                                        <Col xs={12} md={5} >
                                            <Form.Control type="number" placeholder={this.props.points} onChange={this.handlePoints} required />
                                        </Col>

                                        <Col xs={12} md={2} lg={2}>
                                            <Button variant="primary" type="submit">Edit</Button>
                                        </Col>

                                    </Row>
                                </Form>
                            </div>
                        </Modal.Body>
                    </Modal>
                </Fragment>
            </div>
        )
    }
}