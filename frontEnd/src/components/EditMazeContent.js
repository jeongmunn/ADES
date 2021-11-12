import React from 'react';
import axios from 'axios';


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
           
            points:  this.state.points
            
        };
        console.log("MAZE____"+  JSON.stringify(mazeContent))   

  const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
   const lvl= window.location.href.split('/')[3].slice(20);
    const baseUrl = "http://localhost:8081";
    
   
        axios.put(`${baseUrl}/mazeContent/${lvl}`, mazeContent, config)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    render() { const lvl= window.location.href.split('/')[3].slice(20);
        return (
            <div id="bodyEdit">
            <div id="divEdit">
            <div className="editReward">
                <h1>Edit Points on Level {lvl}</h1>
                <form onSubmit={this.handleSubmit} id="formEdit">
                    {/* <label>
                         :
            <input type="text" name="mazeLvl" onChange={this.handleLvl} />
                    </label> */}
                    <label>
                        Points Required :
            <input type="number" name="points" onChange={this.handlePoints} />
                    </label>
                   
                    <button type="submit">Update</button>
                </form>
            </div>
            </div>
      </div>
        )
    }
}