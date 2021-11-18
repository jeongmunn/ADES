console.log("---------------------------------------------------------");
console.log("ADES> controller >app.js");
console.log("---------------------------------------------------------");

//-------------------------------------------------------------------------
//imports
//-------------------------------------------------------------------------
const express = require('express');

//Create an instance of express
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
var student = require('../model/student');
var badge = require('../model/badge');
var maze = require('../model/maze');
var reward = require('../model/reward');
var quiz = require('../model/quiz');
var points = require('../model/points');
var cors = require('cors');


var urlencodedParser = bodyParser.urlencoded({ extended: false });



//-------------------------------------------------------------------------
// Middleware functions
//-------------------------------------------------------------------------

/** 
 * @param {object} req 
 *  request object
 * @param {object} res  
 *  response object 
 * @param {function} 
 *  reference to the enxt function to call
 * 
 */


function printDebugInfo(req, res, next) {
    console.log();
    console.log("-----------------[Debug Info]----------");
    //console.log(`Servicing ${urlPattern}...`);
    console.log("Servicing" + req.url + " ..");

    console.log("> req.params:" + JSON.stringify(req.params));
    console.log("> req.body:" + JSON.stringify(req.body));
    // console.log("> req.myOwnDebugIssue:"+JSON.stringify(req.myOwnDebugInfo));
    console.log("-----------------[Debug Info Ends]----------");
    console.log();

    next();

}

// from bodyParser, we want to get 2 different kinds of parsers
// who are capable of parsing some kind of data coming in
// 1.URL Encoded Parser
// 2.JSON Parser
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//-------------------------------------------------------------------------
// MF configurations
//-------------------------------------------------------------------------
app.use(urlEncodedParser);
app.use(jsonParser);

app.options('*', cors());
app.use(cors());

const storage = multer.diskStorage({
    destination: "../public/images",
    filename: function(req, file, cb){
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
}).single("myImage");


app.get('/students', printDebugInfo, function (req, res) {
    console.log("ITS IN HERE")
    student.getStudents(function (err, result) {
        console.log("OVER HERE")
        if (!err) {

            res.send(result.rows);
        } else {
            res.status(500).send("Some error");
        }
    });
});


//Getting all badges
app.get('/badges', printDebugInfo, function (req, res) {

    badge.getBadges(function (err, result) {
        console.log("OVER HERE")
        if (!err) {
            res.status(201).send(result.rows);
            //   res.status(201).json({
            //     "row": row,

        } else {
            res.status(500).send("Some error");
        }
    });
});

//Getting all badge Classes
app.get('/badgeClass', printDebugInfo, function (req, res) {

    badge.getBadgeClass(function (err, result) {
        console.log("OVER HERE")
        if (!err) {
            res.status(201).send(result.rows);
            //   res.status(201).json({
            //     "row": row,

        } else {
            res.status(500).send("Some error");
        }
    });
});


app.post('/newBadge', printDebugInfo, function (req, res) {
    console.log("IS it here??" +req.body.badgeClassID);
    console.log("OR is it here" + parseInt(req.body.badgeClassID));
    var badgeClassID = parseInt(req.body.badgeClassID);

    var data = {
        name: req.body.name,
        requirements: req.body.requirements,
        pic_url: req.body.pic_url,
        badgeClassID: badgeClassID,
    };
    badge.insertBadge(data, function (err, result) {
        if (!err) {

            var output = {
                "badgeID": result
            }
            res.status(201).send(output);

        } else {
            res.status(500).send("Some error");
        }
    });
});


app.put('/editBadge/:badgeID', printDebugInfo, function (req, res) {

    var badgeID = parseInt(req.params.badgeID);


    if (isNaN(badgeID)) {
        console.log(badgeID)
        res.status(400).send();
        return;
    }

    var data = {
        name: req.body.name,
        requirements: req.body.requirements,
        pic_url: req.body.pic_url,
        badgeClassID: req.body.badgeClassID,
    };
    // to extract data


    badge.editBadge(badgeID, data, function (err, result) {
        if (!err) {
            var output = {
                "output": result,
                "MESSAGE": "SUCESSFUL!"
            }
            res.status(201).send(output);

        } else {
            res.status(500).send("Some error");
        }
    });
});

//MAP OF MAZE CONTENT--------------

app.get('/mazeContent', printDebugInfo, function (req, res) {
    maze.getMazeContent(function (err, result) {
        console.log("OVER HERE")
        if (!err) {
            res.status(201).send(result.rows);
            //   res.status(201).json({
            //     "row": row,
        } else {
            res.status(500).send("Some error");
        }
    });
});

    
app.put('/mazeContent/:lvl',printDebugInfo, function (req, res) {
    
    var lvl = parseInt(req.params.lvl);

   
    if (isNaN(lvl)) {
        console.log(lvl)
        res.status(400).send();
        return;
      }

      var data = {
        points : req.body.points,
        
        };
     // to extract data

    
    maze.editMazeContent(lvl, data, function (err, result) {
        if (!err) {
            var output={
                "output" : result,
                "MESSAGE" : "SUCESSFUL!"
            }
            res.status(201).send(output);
            
        } else {
            res.status(500).send("Some error");
        }
    });
});

// Get Points By Maze Lvl
app.get('/maze/:lvl', function (req,res) {
    var mazeLvl = req.params.lvl ;

    maze.getMazePts(mazeLvl, function (err, result){
        console.log("points.getMazePts called");
        if(!err) {
            res.send(result);
        }else {
            res.status(500).send("Error ! Cannot get points of maze level");
        }
    })
})

// Update Current and Total Points, and Maze Level
app.put('/maze/:id', function (req,res) {
    var studentID = req.params.id ;
    var data = {
        currentPts : req.body.currentPts,
        totalPts : req.body.totalPts,
        mazeLvl : req.body.mazeLvl
    };

    maze.updatePtsnLvl(studentID, data, function (err, result){
        console.log("maze.updatePtsnLvl called");
        if(!err) {
            res.send(result);
        }else{
            res.status(500).send("Error ! Cannot update points and maze level");
        }
    })
})


// getting mazelvl of a sertain student
app.get('/mapOfMaze/:studentID', function (req, res) {

    var studentID = req.params.studentID;
   maze.getMazeByStudentID(studentID, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Error ! cannot find!");
        }
    })
})

// rewards

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

app.post('/rewards', upload, function(req,res) {
    var data = {
        rewardName : req.body.rewardName ,
        ptsRequired : req.body.ptsRequired ,
        url : req.file.filename
    };

    console.log("post rewards function called.")
    console.log("post data : " + JSON.stringify(data));
    console.log("url : " + JSON.stringify(req.file));

    reward.createReward(data,function(err,result) {
        if(!err){
            res.status(201).send("");
        }else {
            res.status(500).send("Error ! Cannot post reward");
        }
    });
});
//QUIZ------------------------------------

app.get('/quiz', function (req, res) {
    
    quiz.getQuiz(function (err, result) {
        console.log("quiz getQuiz called");
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Error ! Cannot get Quiz");
        }
    });
});

//posting to quizHistory
app.post('/quiz', function (req, res) {

    
    var data = {
        quizID : req.body.quizID ,
        studentID: req.body.studentID ,
        pointsEarned : req.body.pointsEarned,
        marksEarned: req.body.marksEarned
    };

    console.log("post quiz  function called.")
    console.log("post data : " + JSON.stringify(data));

    quiz.postQuiz(data, function (err, result) {
        console.log("quiz postQuiz called");
        if (!err) {
            res.send('');
        } else {
            res.status(500).send("Error ! Cannot get Quiz");
        }
    });





});


//updating the student table
app.put('/studentPoints', function (req, res) {
    var data = {
        pointsEarned : req.body.pointsEarned,
        studentID: req.body.studentID 
        
    };

    console.log("student Points  function called.")
    console.log("Student Points: " + JSON.stringify(data));

    

quiz.UpdatePoints(data,function (err, result) {
    console.log("quiz UpdatePoints called");
    if (!err) {
        res.send('');
    } else {
        res.status(500).send("Error ! Cannot get Quiz");
    }
});



});
// ---------------------------------- Points -------------------------------------------
//ALL JWS ONE UNDER!
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

// Insert Points History
app.post('/ptsHistory/:id', function (req,res) {
    var data = {
        studentID : req.params.id,
        ptsAwarded : req.body.ptsAwarded,
        eventID : req.body.eventID
    }

    points.insertPtsHistory(data, function (err, result){
        console.log("points.insertPtsHistory called");
        if(!err) {
            res.send(result);
        }else {
            res.status(500).send("Error ! Cannot insert points history");
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

// Get Current Points and Total Points
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
        totalPts : req.body.totalPts,
        mazeLvl: req.body.mazeLvl
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
