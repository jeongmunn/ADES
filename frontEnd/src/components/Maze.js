import React, { Fragment } from 'react';  
import ModalPopup from './MazePopup';  
import Button from 'react-bootstrap/Button';
import axios from 'axios';

  
class Maze extends React.Component {  
  constructor() {  
    super();  
    this.state = {  
      showModalPopup: false,
      level: 0,
      points : 0
    }  
  }  

  isShowPopup = (status,levels) => {  
    this.setState({ showModalPopup: status });  
    this.setState({ level  : levels});

    axios.get(`http://localhost:8081/api/maze/${levels}`)
    .then(res => {
        this.setState({ points : res.data[0].points });
        console.log("points :" + JSON.stringify(res.data[0].points));
    })
  };  

  render() {  
    return (  
      <Fragment>  
        <h3 align="center">Maze Dummy Page</h3>  
        <header align="center">  
          <Fragment>  
            <Button onClick={() => this.isShowPopup(true,1)}>Level 1</Button> 
          </Fragment>  
        </header>  
        <ModalPopup  
          showModalPopup={this.state.showModalPopup}  
          onPopupClose={this.isShowPopup}  
          level={this.state.level}
          point={this.state.points}
        ></ModalPopup>  
      </Fragment>  
    )  
  }  
}  
  
export default Maze;  