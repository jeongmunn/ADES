console.log("---------------------------------------------------------");
console.log("ADES> controller >app.js");
console.log("---------------------------------------------------------");

//-------------------------------------------------------------------------
//imports
//-------------------------------------------------------------------------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
var user = require('../model/user');
var student = require('../model/student');
var badge = require('../model/badge');
var maze = require('../model/maze');
var reward = require('../model/reward');
var quiz = require('../model/quiz');
var cors = require('cors');
const path = require('path');


const storage = multer.diskStorage({
    destination: "../public/images",
    filename: function (req, file, cb) {
        cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("myImage");


//-------------------------------------------------------------------------
// Middleware functions
//-------------------------------------------------------------------------

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

var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

//-------------------------------------------------------------------------
// MF configurations
//-------------------------------------------------------------------------
app.use(urlEncodedParser);
app.use(jsonParser);

app.options('*', cors());
app.use(cors());

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send("GET successfully");
});

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
    console.log("IS it here??" + req.body.badgeClassID);
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
            //   res.status(201).json({
            //     "row": row,
        } else {
            res.status(500).send("Some error");
        }
    });
});


app.put('/mazeContent/:lvl', printDebugInfo, function (req, res) {

    var lvl = parseInt(req.params.lvl);


    if (isNaN(lvl)) {
        console.log(lvl)
        res.status(400).send();
        return;
    }

    var data = {
        points: req.body.points,

    };
    // to extract data


    maze.editMazeContent(lvl, data, function (err, result) {
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

app.post('/rewards', upload, function (req, res) {
    var data = {
        rewardName: req.body.rewardName,
        ptsRequired: req.body.ptsRequired,
        url: req.file.filename
    };

    console.log("post rewards function called.")
    console.log("post data : " + JSON.stringify(data));
    console.log("url : " + JSON.stringify(req.file));

    reward.createReward(data, function (err, result) {
        if (!err) {
            res.status(201).send("");
        } else {
            res.status(500).send("Error ! Cannot post reward");
        }
    });
});

app.get('/leaderboard', function (req, res) {

    student.getLeaderboard(function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot get leaderboard");
        }
    })

})

app.get('/ptsHistory/:id', function (req, res) {
    var id = req.params.id;

    student.getPtsHistory(id, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot get points history");
        }
    })
})

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
        quizID: req.body.quizID,
        studentID: req.body.studentID,
        pointsEarned: req.body.pointsEarned,
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
app.post('/studentPoints', function (req, res) {
    var data = {
        pointsEarned: req.body.pointsEarned,
        studentID: req.body.studentID
    };
    console.log("student Points  function called.")
    console.log("Student Points: " + JSON.stringify(data));
    quiz.UpdatePoints(data, function (err, result) {
        console.log("quiz UpdatePoints called");
        if (!err) {
            res.send('');
        } else {
            res.status(500).send("Error ! Cannot get Quiz");
        }
    });
});


// sign up new student (CREATION)
app.post('/newStudent', function (req, res) {
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
    console.log("student Points  function called.")
    console.log("Student Points: " + JSON.stringify(data));
    student.newUser(data, function (err, result) {
        console.log("newUser called.");
        if (!err) {
            res.status(201).send('');
        } else {
            res.status(500).send("Error ! Cannot get details for new student to be created!");
        }
    });
});

// getTypeOfUser for (sign in and redirecting)
app.get('/userType/:Uid', function (req, res) {

    var Uid = req.params.Uid;
    user.getTypeOfUser(Uid, function (err, result) {
        if (!err) {
            res.status(200).send(result[0]);
        } else {
            res.status(500).send("Error ! Cannot get user type!");
        }
    })
})

module.exports = app;
