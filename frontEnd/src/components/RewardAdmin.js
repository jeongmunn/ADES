import React from 'react';
import axios from 'axios';
import { store } from 'react-notifications-component';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signOut } from "firebase/auth";
import { auth } from '../firebase.js';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import ModalPopup from './RewardPopup';
import '../css/rewardAdmin.css';

export default class viewReward extends React.Component {
    constructor() {
        super();
        this.state = {
            showModalPopup: false,
            data: [],
            rewardName: '',
            rewardPoints: '',
            originUrl: '',
            originName: '',
            originPoints: '',
            url: '',
            rewardID: 0,
            uid: ''
        }
    }

    componentDidMount() {
        // Auth
        auth.onAuthStateChanged((user) => {
            // IF there's user
            if (user) {
                console.log("User is Signed IN ");
                this.setState({ uid: user.uid });
                const config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                }

                // Get the user type
                axios.get(`https://ades-ca1-project.herokuapp.com/api/userType/` + this.state.uid, config)
                    .then(res => {
                        // IF is student
                        if (res.data.type === 1) {
                            window.location.replace('https://ades-ca1-project.herokuapp.com/quizment/studentDashboard');
                            // IF is teacher
                        } else if (res.data.type === 2) {
                            // GET all rewards data
                            axios.get('https://ades-ca1-project.herokuapp.com/api/rewards')
                                .then(res => {
                                    this.setState({ data: res.data });
                                })
                                .catch(error => {
                                    this.notiGetRewardFail(error);
                                })
                            // ELSE kick them out
                        } else {
                            window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
                        }
                    })
                // ELSE kick them out
            } else {
                console.log("THERE IS NO USER");
                signOut(auth);
                window.location.replace('https://ades-ca1-project.herokuapp.com/quizment');
            }
        });
    }

    notiUploadSuccess() {
        store.addNotification({
            title: "Success",
            message: "Reward uploaded successfully !",
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }

    notiUploadFail(error) {
        store.addNotification({
            title: "Error",
            message: "Reward upload failed ! Error message : " + error,
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "bounceIn"],
            animationOut: ["animated", "bounceOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }

    notiDeleteSuccess() {
        store.addNotification({
            title: "Success",
            message: "Reward deleted successfully !",
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }

    notiDeleteFail(error) {
        store.addNotification({
            title: "Error",
            message: "Reward delete failed ! Error message : " + error,
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "bounceIn"],
            animationOut: ["animated", "bounceOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }

    notiGetRewardFail(error) {
        store.addNotification({
            title: "Error",
            message: "Reward retreive failed ! Error message : " + error,
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "bounceIn"],
            animationOut: ["animated", "bounceOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }

    isShowPopup = (status, id, name, points, url) => {
        this.setState({ showModalPopup: status });
        this.setState({ rewardID: id });
        this.setState({ originName: name });
        this.setState({ originPoints: points });
        this.setState({ originUrl: url });
    }

    handleDelete = event => {
        const id = event.target.id;
        axios.delete('https://ades-ca1-project.herokuapp.com/api/rewards/' + id)
            .then(res => {
                this.notiDeleteSuccess();
                window.location.reload();
            }).catch(error => {
                this.notiDeleteFail(error);
            })
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
        if (this.state.url == '') {
            const reward = {
                rewardName: this.state.rewardName,
                ptsRequired: this.state.rewardPoints,
                url: 'https://firebasestorage.googleapis.com/v0/b/quizment-ae4a6.appspot.com/o/img%2Fdefault-image.png?alt=media&token=369e00f7-926d-4b3c-abbb-958828b303d5'
            };
            console.log("reward" + JSON.stringify(reward));

            const config = {
                headers: {
                    'content-type': 'application/json'
                }
            }

            axios.post('https://ades-ca1-project.herokuapp.com/api/rewards', reward, config)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    window.location.reload();
                    this.notiUploadSuccess();
                }).catch(error => {
                    this.notiUploadFail(error);
                })
        } else {
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
                console.log("reward" + JSON.stringify(reward))
                const config = {
                    headers: {
                        'content-type': 'application/json'
                    }
                }

                axios.post('https://ades-ca1-project.herokuapp.com/api/rewards', reward, config)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                        window.location.reload();
                        this.notiUploadSuccess();
                    }).catch(error => {
                        this.notiUploadFail(error);
                    })
            })
        }
    }

    render() {
        const data = this.state.data;
        return (
            <div className="rewardAdmin">
                <h1>Reward Administration</h1>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <Button variant="outline-info" >Add Reward</Button>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="uploadReward">
                                <Form onSubmit={this.handleSubmit} className="rewardForm">
                                    <Row>
                                        <Col xs={12} md={8} lg={4}>
                                            <Form.Control placeholder="Reward Name" onChange={this.handleName} required />
                                        </Col>
                                        <Col xs={12} md={5} lg={3}>
                                            <Form.Control type="number" placeholder="Points Required" onChange={this.handlePoints} required />
                                        </Col>
                                        <Col xs={12} md={5} lg={3}>
                                            <Form.Control type="file" onChange={this.handleURL} />
                                        </Col>
                                        <Col xs={12} md={2} lg={2}>
                                            <Button variant="primary" type="submit">Add</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div id="viewRewards">
                    <Table responsive="sm" className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Points</th>
                                <th>Picture</th>
                                <th>Edit?</th>
                                <th>Delete?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map(item =>
                                <tr key={item.rewardID}>
                                    <td>{item.rewardName}</td>
                                    <td>{item.ptsRequired}</td>
                                    <td><img src={item.url} style={{ height: 180, width: 180 }}></img></td>
                                    <td><Button type="button" variant="warning" onClick={() => this.isShowPopup(true, item.rewardID, item.rewardName, item.ptsRequired, item.url)}>Edit</Button></td>
                                    <td><Button type="button" variant="danger" id={item.rewardID} onClick={this.handleDelete}>Delete</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </div>
                <ModalPopup
                    showModalPopup={this.state.showModalPopup}
                    onPopupClose={this.isShowPopup}
                    rewardID={this.state.rewardID}
                    rewardName={this.state.originName}
                    rewardPoints={this.state.originPoints}
                    url={this.state.originUrl}
                ></ModalPopup>
            </div>
        )
    }
}