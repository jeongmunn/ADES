import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ReactNotification from 'react-notifications-component';
import { store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default class Notification extends React.Component {
    constructor(props) {
      super(props);
    }
  
    addNotification() {
      store.addNotification({
        title: "Awesomeness",
        message: "Awesome Notifications!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: { duration: 2000 },
        dismissable: { click: true }
      });
    }
  
    render() {
      return (
        <div className="app-content">
          <button onClick={this.addNotification} className="btn btn-primary">
            Add Awesome Notification
          </button>
        </div>
      );
    }
  }
