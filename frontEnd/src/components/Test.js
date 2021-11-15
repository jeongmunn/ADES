import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default class Test extends React.Component {

    render() {

        return (
            <div className="test">
            {/* <BrowserRouter>
            <Routes>
            <Route path="/" element={<Test/>}></Route>
            <Route path="/SignIn" element={<SignIn/>}></Route>
            <Route path="/Quiz" element={<Quiz/>}></Route>
            <Route path="/RewardAdmin" element={<RewardAdmin/>}></Route>
            <Route path="/RewardAdminEdit" element={<RewardAdminEdit/>}></Route>
            <Route path="/TeacherLeaderboard" element={<TeacherLeaderboard/>}></Route>
            <Route path="/StudentPointHistory" element={<StudentPointsHistory/>}></Route>
            <Route path="/StudentReward" element={<StudentReward/>}></Route>
            </Routes>
            </BrowserRouter>
            <h3 className="p-3 text-center">Teacher</h3>
            <Link to='/RewardAdmin'><Button>View & Create Reward</Button></Link>
            <Link to='/RewardAdminEdit'><Button></Button>Edit Reward</Link>
            <Link to='/TeacherLeaderboard'><Button>View Leaderboard</Button></Link>
            <h3 className="p-3 text-center" style="margin:2em">Student</h3>
            <Link to='/Quiz'><Button>Quiz</Button></Link>
            <Link to='/StudentPointHistory'><Button>View Points History</Button></Link>
            <Link to='/StudentReward'><Button>View Reward</Button></Link> */}
            </div>
        )
    }
}