import React, { Component, Fragment} from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

export default class ModalPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal : false,
            data: [],
            quizID: 2,
            studentID: 2
        };
    }

    isShowModal = (status) => {
        this.handleClose();
        this.setState({ showModal : status});
    }

    handleClose = () => {
        this.props.onPopupClose(false);
    }

    componentDidMount(){
        //axios.get(`https://ades-ca1-heroku.herokuapp.com/api/summary/${this.state.quizID}/${this.state.studentID}`)
        axios.get(`http://localhost:8081/api/summary/${this.state.quizID}/${this.state.studentID}`)
        .then(res => {
            this.setState({ data : res.data });
        })
    }

    render() {

        const data = this.state.data ;

        return (
            <Fragment>  
                <Modal show={this.props.showModalPopup} onHide={this.handleClose}  
                    size="lg"  
                    aria-labelledby="contained-modal-title-vcenter"  
                    centered  >  
                    <Modal.Header closeButton>  
                        <Modal.Title id="sign-in-title">  
                            Summary  
                         </Modal.Title>  
                    </Modal.Header>  
                    <Modal.Body>  
                        <hr />  
                        <div className="Summary"> 
                        <h3 className="p-3 text-center">Display Summary of Points</h3>
                        <table className="table table-striped table-bordered">
                           <thead>
                           <tr>
                             <th>Marks Awarded</th>
                             <th>Points Earned</th>
                         </tr>
                           </thead>
                        <tbody>
                         {data && data.map(item =>
                             <tr key={item.quizHistoryID}>
                                 <td>{item.pointsEarned}</td>
                                 <td>{item.marksEarned}</td>
                             </tr>
                         )}
                        </tbody>
                        </table>
                        <Button onClick={() => this.isShowModal(true)}>Close</Button>  
                        </div>  
                    </Modal.Body>  
                </Modal >  
            </Fragment >  
        )
    }
}