import React, { Fragment } from 'react';  
import ModalPopup from './QuizPopup';  
import Button from 'react-bootstrap/Button';
  
class App extends React.Component {  
  constructor() {  
    super();  
    this.state = {  
      showModalPopup: false  
    }  
  }  
  isShowPopup = (status) => {  
    this.setState({ showModalPopup: status });  
  };  
  render() {  
    return (  
      <Fragment>  
        <h3 align="center">Quiz Dummy Page</h3>  
        <header align="center">  
          <Fragment>  
            <Button onClick={() => this.isShowPopup(true)}>Submit</Button> 
          </Fragment>  
        </header>  
        <ModalPopup  
          showModalPopup={this.state.showModalPopup}  
          onPopupClose={this.isShowPopup}  
        ></ModalPopup>  
      </Fragment>  
    )  
  }  
}  
  
export default App;  