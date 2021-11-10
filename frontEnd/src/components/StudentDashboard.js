import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { Progress,Steps } from 'antd';

import  '../App.css';

export default class StudentDashboard extends React.Component {
    state = {
        data: [],
        streaks:[],
        totalPts:[],
        redeemedPts:[],
        email:"",
        password:"",
        address:"",
        name:"",
        progress:0
    }

    componentDidMount(){
        axios.get('http://localhost:8081/students/topStudents/')
        .then(res => {
            this.setState({ data : res.data });
        })

        axios.get('http://localhost:8081/students/streaks/' + 10)
        .then(res => {
           console.log("number of streak "+res.data[0].streaks)
           const streaks=res.data[0].streaks;

         
        
    
           this.setState({streaks});

           let progress=0;
        if(this.state.streaks === 1){
            progress+=20
            this.setState({progress:progress})
        }
        if(this.state.streaks === 2){
            progress+=40
            this.setState({progress:progress})
        }
        if(this.state.streaks === 3){
            progress+=60
            this.setState({progress:progress})
        }
        if(this.state.streaks === 4){
           progress+=80
           this.setState({progress:progress})
        }
        if(this.state.streaks === 5){
           progress+=100
           this.setState({progress:progress})
        }
       
    
        })

        axios.get('http://localhost:8081/students/points/' + 5)
        .then(res => {
           console.log("number of streak "+res.data[0].totalPts)
           console.log("number of streak "+res.data[0].redeemedPts)
           const totalPts=res.data[0].totalPts;
           const redeemedPts=res.data[0].redeemedPts;
    
           this.setState({totalPts});

           this.setState({redeemedPts});
       
    
        })


    }

  


    handleChange=(e)=>{
      this.setState({
          [e.target.id]: e.target.value
      })

    }

    
    render() {
        const data = this.state.data ;
        return (
            <div >


                <div className="progressBar" >

                <Progress
                  type="line"
                  strokeColor={{
                    '0%': '#fefb72',
                    '100%': '#f0bb31',
                  }}
                
                  percent={this.state.progress}
                  status="active"
                  >

                      </Progress>


                      </div>




            <h3 className="p-3 text-center">Student dashboard</h3>
        
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Total Points</th>
                  
                    </tr>
                </thead>
                <tbody>



                    {data && data.map(item =>
                        <tr key={item.studentID}>
                            <td>{item.name}</td>
                            <td>{item.totalPts}</td>
                     

                         
                        </tr>
                    )}
                </tbody>
            </table>



<h4>Streaks</h4>
<h5>{this.state.streaks}</h5>

<h4>Total Points</h4>
<h5>{this.state.totalPts}</h5>

<h4>Redeemable Points</h4>
<h5>{this.state.redeemedPts}</h5>



          </div>
        )
    }
}
