console.log("---------------------------------------------------------");
console.log("ADES > controller > app.js");
console.log("---------------------------------------------------------");

//---------------------------------- imports -----------------------------------
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require('path');
var leaderboard = require('../model/leaderboard.js');
var points = require('../model/points.js');
var reward = require('../model/reward.js');
const app = express();

//--------------------------- Middleware functions ------------------------------

function printDebugInfo(req, res, next) {
    console.log();
    console.log("-----------------[Debug Info]----------");
    console.log("Servicing" + req.url + " ..");
    console.log("> req.params:" + JSON.stringify(req.params));
    console.log("> req.body:" + JSON.stringify(req.body));
    console.log("-----------------[Debug Info Ends]----------");
    console.log();
    next();

}

//----------------------------- MF configurations ---------------------------------

var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
app.use(urlEncodedParser);
app.use(jsonParser);
app.options('*',cors());
app.use(cors());

// ---------------------------------- Rewards -------------------------------------------

// Get All Rewards
app.get('/rewards', function (req, res) {
    
    reward.getReward(function (err, result) {
        console.log("reward.getReward called");
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot get reward");
        }
    });
});

// Get Rewards By Id
app.get('/rewards/:id', function (req, res) {
    var rewardID = req.params.id;

    reward.getRewardById(rewardID,function (err, result) {
        console.log("reward.getRewardById called");
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot get reward");
        }
    });
});

// Insert New Reward
app.post('/rewards', function(req,res) {
    var data = {
        rewardName : req.body.rewardName ,
        ptsRequired : req.body.ptsRequired ,
        url : req.body.url
    };

    console.log("post data : " + JSON.stringify(data));

    reward.createReward(data,function(err,result) {
        console.log("reward.createReward called");
        if(!err){
            res.status(201).send(result);
        }else {
            res.status(500).send("Error ! Cannot post reward");
        }
    });
});

// Edit Reward By Id
app.put('/rewards/:id', function (req, res) {
    var rewardID = req.params.id;
    
    if(isNaN(rewardID)) {
        res.status(400).send();
        return;
    }

    var data = {
        rewardName : req.body.rewardName,
        ptsRequired : req.body.ptsRequired,
        url : req.body.url
    };

    reward.editReward(rewardID, data,function (err, result) {
        console.log("reward.editReward called");
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot get reward");
        }
    });
});

// Delete Reward By Id
app.delete('/rewards/:id', function (req, res) {
    var rewardID = req.params.id;
 
    reward.deleteReward(rewardID,function (err, result) {
        console.log("reward.deleteReward called");
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot get reward");
        }
    });
});

// Insert Reward History By Id
app.post('/rewardHistory', function(req,res) {
    var data = {
        rewardID : req.body.rewardID,
        studentID : req.body.studentID
    };

    console.log("post data : " + JSON.stringify(data));

    reward.insertRewardHistory(data,function(err,result) {
        console.log("reward.insertRewardHistory called");
        if(!err){
            res.status(201).send(result);
        }else {
            res.status(500).send("Error ! Cannot post reward");
        }
    });
});

// ---------------------------------- Leaderboard -------------------------------------------

// Get Leaderboard
app.get('/leaderboard', function (req,res) {

    leaderboard.getLeaderboard(function (err, result){
        console.log("leaderboard.getLeaderboard called");
        if(!err) {
            res.send(result);
        }else {
            res.status(500).send("Error ! Cannot get leaderboard");
        }
    })
    
})

// ---------------------------------- Points -------------------------------------------

// Get Points History By Id
app.get('/ptsHistory/:id', function (req,res) {
    var studentID = req.params.id ;

    points.getPtsHistory(studentID,function (err, result){
        console.log("points.getPtsHistory called");
        if(!err) {
            res.send(result);
        }else {
            res.status(500).send("Error ! Cannot get points history");
        }
    })
})

// Get Summary of Points & Marks By Quiz
app.get('/summary/:qid/:uid', function (req,res) {
    var quizID = req.params.qid ;
    var studentID = req.params.uid ;

    points.getQuizPts(studentID, quizID, function (err, result){
        console.log("points.getQuizPts called");
        if(!err) {
            res.send(result);
        }else {
            res.status(500).send("Error ! Cannot get summary of points and marks");
        }
    })    
})

// Get Current Points
app.get('/points/:id', function (req,res) {
    var studentID = req.params.id;

    points.getPts(studentID, function (err, result) { 
        console.log("points.getPts called");
        if(!err) {
            res.send(result);
        }else {
            res.status(500).send("Error ! Cannot get current points");
        }
    })
})

// Update Current Points ( redeemed rewards )
app.put('/point/:id', function (req, res) {
    var studentID = req.params.id;
    var currentPts = req.body.points;

    points.updateCurrentPts(studentID, currentPts,function (err, result) {
        console.log("points.updateCurrentPts called");
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot update points");
        }
    });
});

// Update Current and Total Points ( get points )
app.put('/points/:id', function (req, res) { 
    var studentID = req.params.id;
    var data = {
        currentPts : req.body.currentPts,
        totalPts : req.body.totalPts
    };

    points.updatePts(studentID,data, function (err, result) {
        console.log("points.updatePts called");
        if(!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot update points");
        }
    })
})

module.exports = app;
