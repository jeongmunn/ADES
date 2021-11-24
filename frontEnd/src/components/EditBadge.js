import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import '../css/badgemazeEdit.css';
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
export default class EditBadge extends React.Component {

    state = {
        showModal: false,
        data: [],
        name: '',
        requirements: '',
        pic_url: '',
        badgeClassID: ''
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

    handleBadgeClassID = event => {
        this.setState({ badgeClassID: event.target.value });
    }


    handleSubmit = event => {
        event.preventDefault();
        // file upload
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

            const badgeID = parseInt(this.props.badgeID);
            const baseUrl = "https://ades-ca1-project.herokuapp.com/api";
            console.log(badgeID);

            axios.put(`${baseUrl}/editBadge/${badgeID}`, badge, config)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    window.location.replace('https://ades-ca1-project.herokuapp.com/quizment/badgesAdmin')
                })
        });
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
                                Edit Badge
            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="editBadge">
                                <Form onSubmit={this.handleSubmit} className="badgeForm">
                                    <Row>
                                        <Col xs={12} md={8} lg={4}>
                                            <Form.Control placeholder={this.props.name} onChange={this.handleName} required />
                                        </Col>
                                        <Col xs={12} md={5} lg={3}>
                                            <Form.Control type="number" placeholder={this.props.requirements} onChange={this.handleRequirement} required />
                                        </Col>
                                        <Col xs={12} md={5} lg={3}>
                                            <Form.Control type="file" onChange={this.handleURL} />
                                        </Col>
                                        <Col xs={12} md={2} lg={2}>
                                            <Button variant="primary" type="submit">Edit</Button>
                                        </Col>
                                        <select name="badgeClassID" onChange={this.handleBadgeClassID} id="dropDown">
                                            <option value="1">Air</option>
                                            <option value="2">Water</option>
                                            <option value="3">Fire</option>
                                            <option value="4">Geo</option>
                                        </select>
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