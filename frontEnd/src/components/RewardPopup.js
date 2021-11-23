import React, { Component, Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default class EditReward extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      data: [],
      rewardName: '',
      rewardPoints: '',
      url: '',
    };
  }

  notiEditSuccess(){
    store.addNotification({
      title:"Success",
      message:"Reward edited successfully !",
      type:"success",
      insert:"top",
      container:"top-center",
      animationIn:["animated","fadeIn"],
      animationOut:["animated","fadeOut"],
      dismiss: {duration:2000},
      dismissable: {click:true}
    });
  }  

  handleName = event => {
    this.setState({ rewardName: event.target.value });
  }

  handlePoints = event => {
    this.setState({ rewardPoints: event.target.value });
  }

  handleURL = event => {
    this.setState({ url: event.target.files[0], });
  }

  handleSubmit = event => {
    event.preventDefault();
    // IF there's anything replaced
    if(this.state.url == ''){
      const reward = {
        rewardName: this.state.rewardName,
        ptsRequired: this.state.rewardPoints,
        url: this.props.url
      };
      console.log("reward" + JSON.stringify(reward));

      const config = {
        headers: {
          'content-type': 'application/json'
        }
      }

      axios.put('https://ades-ca1-project.herokuapp.com/api/rewards/' + this.props.rewardID, reward, config)
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.handleClose();
          window.location.reload();
          this.notiEditSuccess();
        })

    // ELSE 
    }else{
    // file upload
    // packing data    
    const storage = getStorage();
    const storageRef = ref(storage, 'img/' + this.state.url.name);
    var file = this.state.url;
    // Create file metadata including the content type
    /** @type {any} */
    const metadata = {
      contentType: this.state.url.type,
    };
    uploadBytes(storageRef, file, metadata);

    getDownloadURL(storageRef).then((downloadURL) => {
      console.log('File available at', downloadURL);

      const reward = {
        rewardName: this.state.rewardName,
        ptsRequired: this.state.rewardPoints,
        url: downloadURL
      };
      console.log("reward" + JSON.stringify(reward));

      const config = {
        headers: {
          'content-type': 'application/json'
        }
      }

      axios.put('https://ades-ca1-project.herokuapp.com/api/rewards/' + this.props.rewardID, reward, config)
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.handleClose();
          window.location.reload();
          this.notiEditSuccess();
        })
    })
  }
  }

  handleClose = () => {
    this.props.onPopupClose(false, this.props.rewardID, '', '', '');
  }

  render() {
    return (
      <Fragment>
        <Modal show={this.props.showModalPopup} onHide={this.handleClose}
          size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Edit Reward
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="editReward">
              <Form onSubmit={this.handleSubmit} className="rewardForm">
                <Row>
                  <Col xs={12} md={8} lg={4}>
                    <Form.Control placeholder={this.props.rewardName} onChange={this.handleName} required />
                  </Col>
                  <Col xs={12} md={5} lg={3}>
                    <Form.Control type="number" placeholder={this.props.rewardPoints} onChange={this.handlePoints} required />
                  </Col>
                  <Col xs={12} md={5} lg={3}>
                    <Form.Control type="file" onChange={this.handleURL} />
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
    )
  }
}