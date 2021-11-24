console.log("---------------------------------------------------------");
console.log("ADES > controller > app.js");
console.log("---------------------------------------------------------");

//---------------------------------------------------------------imports------------------------------------------------------------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var user = require('../model/user');
var teacher = require('../model/teacher');
var student = require('../model/student');
var points = require('../model/points');
var badge = require('../model/badge');
var maze = require('../model/maze');
var reward = require('../model/reward');
var quiz = require('../model/quiz');
var cors = require('cors');
const path = require('path');

//-------------------------------------------------------middleware functions------------------------------------------------------

function printDebugInfo(req, res, next) {
    console.log("-----------------[Debug Info]----------");
    //console.log(`Servicing ${urlPattern}...`);
    console.log("Servicing" + req.url + " ..");
    console.log("> req.params:" + JSON.stringify(req.params));
    console.log("> req.body:" + JSON.stringify(req.body));
    console.log("-----------------[Debug Info Ends]----------");
    console.log();
    next();
}

var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json(); 

//-------------------------------------------------------mf configurations------------------------------------------------------
app.use(urlEncodedParser);
app.use(jsonParser);
app.options('*', cors());
app.use(cors());

//----------------------------------------------------------endpoints------------------------------------------------------------

//-----------------------------------------------------------------user------------------------------------------------------------
// GET user's id and type
app.get('/userType/:Uid', function (req, res) {

    // storing data
    var Uid = req.params.Uid;

    user.getIdAndTypeOfUser(Uid, function (err, result) {
        
        // IF there's no result data
        if (result.length != 0) {
            res.status(200).send(result[0]);
        // IF the user does not exist
        } else if (result.length === 0) {
            res.status(404).send("Invalid! This user does not exist.")
        } else {
            res.status(500).send("Error! Cannot GET user type.");
        }
    })
});

// GET user's email
app.get('/email/:Uid', function (req, res) {

    // storing data
    var Uid = req.params.Uid;
    
    user.getEmail(Uid, function (err, result) {
        if (!err) {
            res.status(200).send(result[0]);
        } else {
            res.status(500).send("Error! Cannot GET user email.");
        }
    })
});

// UPDATE user's email
app.put('/email/:Uid', function (req, res) {

    // packing data into json object
    var Uid = req.params.Uid;
    var email = req.body.email;

    user.updateEmail(Uid, email, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Error! Cannot UPDATE user email.");
        }
    });
});

//-----------------------------------------------------------students------------------------------------------------------------
// GET all students data
app.get('/students', printDebugInfo, (req, res) => {

    student.getStudents(function (err, result) {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET all students data.");
        }
    });
});

// CREATE new student
app.post('/newStudent', function (req, res) {

    // packing data into json object
    var data = {
        name: req.body.name,
        Uid: req.body.Uid,
        streaks: req.body.streaks,
        totalPts: req.body.totalPts,
        mazeLvl: req.body.mazeLvl,
        redeemedPts: req.body.redeemedPts,
        type: req.body.type,
        lastLogin: req.body.lastLogin
    };

    student.newUser(data, function (err, result) {
        if (!err) {
            res.status(201).send('');
        } else {
            res.status(500).send("Error! Cannot CREATE new student.");
        }
    });
});

// UPDATE student's points
app.post('/studentPoints', function (req, res) {

    // packing data into json object
    var data = {
        pointsEarned: req.body.pointsEarned,
        studentID: req.body.studentID
    };

    quiz.UpdatePoints(data, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot UPDATE student's points");
        }
    });
});

// GET student's progress
app.get('/studentProgress', function (req, res) {
    
    teacher.getStudentProgress(function (err, result) {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET student's progress.");
        }
    });
});

// GET student's process
app.get('/students/process/', printDebugInfo, function (req, res) {

    student.getStudentProcess(function (err, result) {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET student's process.");
        }
    });
});

// GET student's process by id
app.get('/students/process/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var studentID = req.params.studentID;

    student.getStudentProcessByID(studentID, function (err, result) {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET student's process by id.");
        }
    });
});

// GET student's streaks by id
app.get('/students/streaks/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var studentID = req.params.studentID;

    student.getStudentStreakByID(studentID, function (err, result) {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET student's streaks by id.");
        }
    });
});

// GET student's points by id
app.get('/students/points/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var studentID = req.params.studentID;

    student.getStudentPointByID(studentID, function (err, result) {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET student's points by id.");
        }
    });
});

// GET student's last login by id
app.get('/students/lastLogin/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var studentID = req.params.studentID;

    student.getLastLoginByID(studentID, function (err, result) {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET student's last login by id.");
        }
    });
});

// GET student's badges by id
app.get('/students/badges/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var studentID = req.params.studentID;

    student.getStudentBadgesById(studentID, function (err, result) {
        if (!err) {
            res.status(200).send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET student's badge by id.");
        }
    });
});

// UPDATE student's last login by id
app.put('/students/lastLogin/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var id = req.params.studentID
    var lastLogin = req.body.lastLogin;

    student.updateLastLogin(id, lastLogin, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot UPDATE student's last login by id.");
        }
    });
});

// UPDATE student's streak by id
app.put('/students/lastLoginStreak/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var id = req.params.studentID
    var lastLogin = req.body.lastLogin;

    student.updateLastLoginStreak(id, lastLogin, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot GET student's streak by id.");
        }
    });
});

// UPDATE student's points by id
app.put('/students/updatePoints/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var id = req.params.studentID

    student.upadateStudentPointsBasedOnStreaks(id, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot UPDATE student's points by id.");
        }
    });
});

// UPDATE student's points from quiz
app.put('/studentPoints', function (req, res) {

    // packing data into json object
    var data = {
        pointsEarned: req.body.pointsEarned,
        studentID: req.body.studentID
    };

    quiz.UpdatePoints(data, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot UPDATE student's points from quiz.");
        }
    });
});

// UPDATE student's streak by last login
app.put('/students/lastLoginLostStreak/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var id = req.params.studentID
    var lastLogin = req.body.lastLogin;

    student.updateLastLoginStreakLost(id, lastLogin, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot UPDATE student's streak by last login.");
        }
    });
});

//--------------------------------------------------------------badge-------------------------------------------------------------
// GET all badges
app.get('/badges', printDebugInfo, function (req, res) {

    badge.getBadges(function (err, result) {
        if (!err) {
            res.status(201).send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET all badges.");
        }
    });
});

// GET all badge class
app.get('/badgeClass', printDebugInfo, function (req, res) {

    badge.getBadgeClass(function (err, result) {
        if (!err) {
            res.status(201).send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET all badges class.");
        }
    });
});

// CREATE new badge
app.post('/newBadge', printDebugInfo, function (req, res) {

    // storing data
    var badgeClassID = parseInt(req.body.badgeClassID);

    // packing data into json object
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
            res.status(500).send("Error! Cannot CREATE new badge.");
        }
    });
});

// UPDATE badge by id
app.put('/editBadge/:badgeID', printDebugInfo, function (req, res) {

    // storing data
    var badgeID = parseInt(req.params.badgeID);

    // packing data into json object
    var data = {
        name: req.body.name,
        requirements: req.body.requirements,
        pic_url: req.body.pic_url,
        badgeClassID: req.body.badgeClassID,
    };

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

//-----------------------------------------------------------map of maze--------------------------------------------------------
// GET all maze data
app.get('/mazeContent', printDebugInfo, function (req, res) {

    maze.getMazeContent(function (err, result) {
        if (!err) {
            res.status(201).send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET maze content data.");
        }
    });
});

// GET maze points by maze lvl 
app.get('/maze/:lvl', function (req,res) {

     // storing data
    var mazeLvl = req.params.lvl ;

    maze.getMazePts(mazeLvl, function (err, result){
        if(!err) {
            res.send(result);
        }else {
            res.status(500).send("Error! Cannot GET maze points by maze level.");
        }
    })
})

// UPDATE current and total points, and maze level
app.put('/maze/:id', function (req,res) {

    // storing data
    var studentID = req.params.id ;

    // packing data into json object
    var data = {
        currentPts : req.body.currentPts,
        totalPts : req.body.totalPts,
        mazeLvl : req.body.mazeLvl
    };

    maze.updatePtsnLvl(studentID, data, function (err, result){
        if(!err) {
            res.send(result);
        }else{
            res.status(500).send("Error! Cannot UPDATE points and maze level");
        }
    })
})

// GET student's maze level by id
app.get('/mapOfMaze/:studentID', function (req, res) {
    // storing data
    var studentID = req.params.studentID;

    maze.getMazeByStudentID(studentID, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            res.status(500).send("Error! Cannot GET student's maze level by id.");
        }
    })
})

// UPDATE maze content by lvl
app.put('/mazeContent/:lvl', printDebugInfo, function (req, res) {

    // storing data
    var lvl = parseInt(req.params.lvl);

    // packing data into json object
    var data = {
        points: req.body.points,
    };

    maze.editMazeContent(lvl, data, function (err, result) {
        if (!err) {
            var output = {
                "output": result,
                "MESSAGE": "SUCESSFUL!"
            }
            res.status(201).send(output);
        } else {
            res.status(500).send("Error! Cannot UPDATE maze content by level.");
        }
    });
});

//-------------------------------------------------------------rewards------------------------------------------------------------
// GET all rewards
app.get('/rewards', function (req, res) {

    reward.getReward(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot GET all rewards");
        }
    });
});

// GET rewards by id
app.get('/rewards/:id', function (req, res) {

    // storing data
    var rewardID = req.params.id;

    reward.getRewardById(rewardID,function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot GET reward by id");
        }
    });
});

// CREATE new reward
app.post('/rewards', function(req,res) {

    // packing data into json object
    var data = {
        rewardName : req.body.rewardName ,
        ptsRequired : req.body.ptsRequired ,
        url : req.body.url
    };

    reward.createReward(data,function(err,result) {
        if(!err){
            res.status(201).send(result);
        }else {
            res.status(500).send("Error! Cannot CREATE new reward.");
        }
    });
});

// UPDATE reward by id
app.put('/rewards/:id', function (req, res) {
    
    // storing data
    var rewardID = req.params.id;

    // packing data into json object
    var data = {
        rewardName : req.body.rewardName,
        ptsRequired : req.body.ptsRequired,
        url : req.body.url
    };

    reward.editReward(rewardID, data,function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot UPDATE reward");
        }
    });
});

// DELETE reward by id
app.delete('/rewards/:id', function (req, res) {

    // storing data
    var rewardID = req.params.id;
 
    reward.deleteReward(rewardID,function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot DELETE reward by id");
        }
    });
});

// CREATE reward history by id
app.post('/rewardHistory', function (req, res) {

    // packing data into json object
    var data = {
        rewardID: req.body.rewardID,
        studentID: req.body.studentID
    };

    reward.insertRewardHistory(data, function (err, result) {
        if (!err) {
            res.status(201).send(result);
        } else {
            res.status(500).send("Error! Cannot CREATE reward");
        }
    });
});

//-----------------------------------------------------------leaderboard--------------------------------------------------------
// GET leaderboard top 3
app.get('/students/topStudents/', printDebugInfo, function (req, res) {

    student.getTopStudents(function (err, result) {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET top 3 student leaderboard.");
        }
    });
});

// GET leaderboard limit 10
app.get('/leaderboard', function (req, res) {

    student.getLeaderboard(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot GET leaderboard limit 10");
        }
    })
})

// GET all leaderboard
app.get('/allLeaderboard', function (req, res) {

    student.getAllLeaderboard(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot GET all leaderboard");
        }
    })
})

//-----------------------------------------------------------points history--------------------------------------------------------
// GET points history by id
app.get('/ptsHistory/:id', function (req, res) {

    // storing data
    var id = req.params.id;

    student.getPtsHistory(id, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot GET points history by studentID");
        }
    })
})

// CREATE student's points history
app.post('/ptsHistory/:id', function (req,res) {

    // packing data into json object
    var data = {
        studentID : req.params.id,
        ptsAwarded : req.body.ptsAwarded,
        eventID : req.body.eventID
    }

    points.insertPtsHistory(data, function (err, result){
        if(!err) {
            res.send(result);
        }else {
            res.status(500).send("Error! Cannot CREATE new points history");
        }
    })
})


//-----------------------------------------------------------------quiz--------------------------------------------------------------
// GET all quizzes
app.get('/quiz', function (req, res) {

    quiz.getQuiz(function (err, result) {
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Error! Cannot GET quiz");
        }
    });
});

// CREATE new quiz data
app.post('/quiz', function (req, res) {

    // packing data into json object
    var data = {
        quizID: req.body.quizID,
        studentID: req.body.studentID,
        pointsEarned: req.body.pointsEarned,
        marksEarned: req.body.marksEarned
    };

    quiz.postQuiz(data, function (err, result) {
        if (!err) {
            res.send('');
        } else {
            res.status(500).send("Error! Cannot CREATE new quiz");
        }
    });
});

//-----------------------------------------------------------------points--------------------------------------------------------------
// GET current and total points
app.get('/points/:id', function (req, res) {

    // storing data
    var studentID = req.params.id;

    points.getPts(studentID, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot GET current and total points.");
        }
    })
})

// UPDATE current points ( redeemed rewards )
app.put('/point/:id', function (req, res) {

    // storing data
    var studentID = req.params.id;
    var currentPts = req.body.points;

    points.updateCurrentPts(studentID, currentPts, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot UPDATE current & total points.");
        }
    });
});

// UPDATE current & total points
app.put('/points/:id', function (req, res) {

    // storing data
    var studentID = req.params.id;

    // packing data into json object
    var data = {
        currentPts: req.body.currentPts,
        totalPts: req.body.totalPts,
        mazeLvl: req.body.mazeLvl
    };

    points.updatePts(studentID, data, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot UPDATE current & total points.");
        }
    })
})

// GET summary of points & marks by id
app.get('/summary/:qid/:uid', function (req, res) {

    // storing data
    var quizID = req.params.qid;
    var studentID = req.params.uid;

    points.getQuizPts(studentID, quizID, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot GET summary of points and marks");
        }
    })
})

// GET points by maze level
app.get('/maze/:lvl', function (req, res) {

    // storing data
    var mazeLvl = req.params.lvl;

    points.getMazePts(mazeLvl, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error! Cannot GET points of maze level");
        }
    })
})

module.exports = app;
