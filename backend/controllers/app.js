console.log("---------------------------------------------------------");
console.log("ADES> controller >app.js");
console.log("---------------------------------------------------------");

//-------------------------------------------------------------------------
//imports
//-------------------------------------------------------------------------
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const multer = require('multer');
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
const errors = require('../lib/errors');
const errorModel = require('../lib/errorResponse');

//-------------------------------------------------------------------------
// Middleware functions
//-------------------------------------------------------------------------

function printDebugInfo(req, res, next) {
    console.log();
    console.log("-----------------[Debug Info]----------");
    console.log("Servicing" + req.url + " ..");
    console.log("req.params:" + JSON.stringify(req.params));
    console.log("req.body:" + JSON.stringify(req.body));
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

//----------------------------------------------------------endpoints------------------------------------------------------------

//----------------------------------------------------------------user------------------------------------------------------------
// GET user's id and type 
app.get('/userType/:Uid', function (req, res) {

    // storing data
    var Uid = req.params.Uid;

    user.getIdAndTypeOfUser(Uid, function (err, result) {

        // IF there's no result data
        if (!err) {
            // IF the result returns nothing
            if (result.rows == '') {
                let error = new errorModel.errorResponse(errors.not_registeration.withDetails("Error! The request has no error but there's nothing returned."));
                res.status(404).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET user type."));
            res.status(500).send(error);
        }
    })
});

// GET user's email 
app.get('/email/:Uid', function (req, res) {

    // storing data
    var Uid = req.params.Uid;

    user.getEmail(Uid, function (err, result) {
        if (!err) {
            // IF the result returns nothing
            if (result.rows == '') {
                let error = new errorModel.errorResponse(errors.not_registeration.withDetails("Error! The request has no error but there's nothing returned."));
                res.status(404).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET user email."));
            res.status(500).send(error);
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
            res.status(201).send(result.rows);
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot UPDATE user email."));
                res.status(500).send(error);
            }
        }
    });
});

// GET all students data
app.get('/students', printDebugInfo, function (req, res) {

    student.getStudents(function (err, result) {
        if (!err) {
            res.status(200).send(result.rows);
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET all students data."));
            res.status(500).send(error);
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
            res.status(201).send(result.rows);
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot CREATE new student."));
                res.status(500).send(error);
            }
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
            // IF the affected rowCount is 0
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error: invalid input for studentID"));
                res.status(422).send(error);
            } else {
                res.status(201).send(result.rows);
            }
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot UPDATE student's points"));
                res.status(500).send(error);
            }
        }
    });
});

// GET student's progress
app.get('/studentProgress', function (req, res) {

    teacher.getStudentProgress(function (err, result) {
        if (!err) {
            res.status(200).send(result.rows);
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET student's progress."));
            res.status(500).send(error);
        }
    });
});

// GET student's process
app.get('/students/process/', printDebugInfo, function (req, res) {

    student.getStudentProcess(function (err, result) {
        if (!err) {
            res.status(201).send(result.rows);
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET student's process."));
            res.status(500).send(error);
        }
    });
});

// GET student's process by id
app.get('/students/process/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var studentID = req.params.studentID;

    student.getStudentProcessByID(studentID, function (err, result) {
        if (!err) {
            // IF the result returns nothing
            if (result.rows == '') {
                let error = new errorModel.errorResponse(errors.not_registeration.withDetails("Error! The request has no error but there's nothing returned. Possible error: invalid input for studentID"));
                res.status(404).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET student's process by id."));
                res.status(500).send(error);
            }
        }
    });
});

// GET student's streaks by id
app.get('/students/streaks/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var studentID = req.params.studentID;

    student.getStudentStreakByID(studentID, function (err, result) {
        if (!err) {
            // IF the result returns nothing
            if (result.rows == '') {
                let error = new errorModel.errorResponse(errors.not_registeration.withDetails("Error! The request has no error but there's nothing returned."));
                res.status(404).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET student's streaks by id."));
                res.status(500).send(error);
            }
        }
    });
});

// GET student's points by id
app.get('/students/points/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var studentID = req.params.studentID;

    student.getStudentPointByID(studentID, function (err, result) {
        if (!err) {
            // IF the result returns nothing
            if (result.rows == '') {
                let error = new errorModel.errorResponse(errors.not_registeration.withDetails("Error! The request has no error but there's nothing returned. Possible error: invalid input for studentID"));
                res.status(404).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET student's points by id."));
                res.status(500).send(error);
            }
        }
    });
});

// GET student's last login by id
app.get('/students/lastLogin/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var studentID = req.params.studentID;

    student.getLastLoginByID(studentID, function (err, result) {
        if (!err) {
            // IF the result returns nothing
            if (result.rows == '') {
                let error = new errorModel.errorResponse(errors.not_registeration.withDetails("Error! The request has no error but there's nothing returned. Possible error: invalid input for studentID"));
                res.status(404).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET student's last login by id."));
                res.status(500).send(error);
            }
        }
    });
});

// GET student's badges by id
app.get('/students/badges/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var studentID = req.params.studentID;

    student.getStudentBadgesById(studentID, function (err, result) {
        if (!err) {
            // IF the result returns nothing
            if (result.rows == '') {
                let error = new errorModel.errorResponse(errors.not_registeration.withDetails("Error! The request has no error but there's nothing returned. Possible error: invalid input for studentID"));
                res.status(404).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET student's badge by id."));
                res.status(500).send(error);
            }
        }
    });
});

// UPDATE student's last login by id
app.put('/students/lastLogin/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var id = req.params.studentID;
    var lastLogin = req.body.lastLogin;

    student.updateLastLogin(id, lastLogin, function (err, result) {
        if (!err) {
            // IF the affected rowCount is 0
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error: invalid studentID"));
                res.status(422).send(error);
            } else {
                res.status(201).send(result);
            }
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error ! Cannot UPDATE student's last login by id."));
                res.status(500).send(error);
            }
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
            // IF the affected rowCount is 0
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error: invalid studentID"));
                res.status(422).send(error);
            } else {
                res.status(201).send(result.rows);
            }
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET student's streak by id."));
                res.status(500).send(error);
            }
        }
    });
});

// UPDATE student's points by id
app.put('/students/updatePoints/:studentID', printDebugInfo, function (req, res) {

    // storing data
    var id = req.params.studentID

    student.upadateStudentPointsBasedOnStreaks(id, function (err, result) {
        if (!err) {
            // IF the affected rowCount is 0
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error: invalid studentID"));
                res.status(422).send(error);
            } else {
                res.status(201).send(result.rows);
            }
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot UPDATE student's points by id."));
                res.status(500).send(error);
            }
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
            // IF the affected rowCount is 0
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error : invalid studentID"));
                res.status(422).send(error);
            } else {
                res.status(201).send(result.rows);
            }
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot UPDATE student's points from quiz."));
                res.status(500).send(error);
            }
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
            // IF the affected rowCount is 0
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error : invalid studentID."));
                res.status(422).send(error);
            } else {
                res.status(201).send(result.rows);
            }
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot UPDATE student's streak by last login."));
                res.status(500).send(error);
            }
        }
    });
});

// GET all badges
app.get('/badges', printDebugInfo, function (req, res) {

    badge.getBadges(function (err, result) {
        if (!err) {
            res.status(200).send(result.rows);
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET all badges."));
            res.status(500).send(error);
        }
    });
});

// GET all badge class
app.get('/badgeClass', printDebugInfo, function (req, res) {

    badge.getBadgeClass(function (err, result) {
        if (!err) {
            res.status(200).send(result.rows);
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET all badges class."));
            res.status(500).send(error);
        }
    });
});

// CREATE new badge
app.post('/newBadge', printDebugInfo, function (req, res) {

    var badgeClassID = parseInt(req.body.badgeClassID);

    var data = {
        name: req.body.name,
        requirements: req.body.requirements,
        pic_url: req.body.pic_url,
        badgeClassID: badgeClassID,
    };
    badge.insertBadge(data, function (err, result) {
        if (!err) {
            res.status(201).send(result);
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot CREATE new badge."));
                res.status(500).send(error);
            }
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
            // IF the affected rowCount is 0
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated."));
                res.status(422).send(error);
            } else {
                res.status(201).send(result.rows);
            }
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot UPDATE badge by id."));
                res.status(500).send(error);
            }
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
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET maze content data."));
            res.status(500).send(error);
        }
    });
});

// GET maze points by maze lvl 
app.get('/maze/:lvl', function (req, res) {

    // storing data
    var mazeLvl = req.params.lvl;

    maze.getMazePts(mazeLvl, function (err, result) {
        if (!err) {
            // IF the result returns nothing
            if (result.rows == '') {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but there's nothing returned. Possible error : invalid input for maze level."));
                res.status(422).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET maze points by maze level."));
                res.status(500).send(error);
            }
        }
    })
})

// UPDATE current and total points, and maze level ?????
app.put('/maze/:id', function (req, res) {

    // storing data
    var studentID = req.params.id;

    // packing data into json object
    var data = {
        currentPts: req.body.currentPts,
        totalPts: req.body.totalPts,
        mazeLvl: req.body.mazeLvl
    };

    maze.updatePtsnLvl(studentID, data, function (err, result) {
        if (!err) {
            // IF the affected rowCount is 0
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error : invalid input for studentID."));
                res.status(422).send(error);
            } else {
                res.status(201).send(result.rows);
            }
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot UPDATE points and maze level"));
                res.status(500).send(error);
            }
        }
    });
});

// getting mazelvl of a sertain student
app.get('/mapOfMaze/:studentID', function (req, res) {

    // storing data
    var studentID = req.params.studentID;

    var studentID = req.params.studentID;
   maze.getMazeByStudentID(studentID, function (err, result) {
        if (!err) {
            // IF the result returns nothing
            if (result.rows == '') {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but there's nothing returned. Possible error : invalid input for studentID."));
                res.status(442).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET student's maze level by id."));
                res.status(500).send(error);
            }
        }
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
            // IF the result returns nothing
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error : invalid inputs."));
                res.status(422).send(error);
            } else {
                res.status(201).send(result.rows);
            }
        } else {
            if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot UPDATE maze content by level."));
                res.status(500).send(error);
            }
        }
    });
});

// Get All Rewards
app.get('/rewards', function (req, res) {
    reward.getReward(function (err, result) {
        console.log("reward.getReward called");
        if (!err) {
            res.send(result);
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET all rewards"));
            res.status(500).send(error);
        }
    });
});

// Get Rewards By Id
app.get('/rewards/:id', function (req, res) {
    var rewardID = req.params.id;

    reward.getRewardById(rewardID, function (err, result) {
        if (!err) {
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error: invalid input for studentID."));
                res.status(422).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET reward by id"));
                res.status(500).send(error);
            }
        }
    });
});

// CREATE new reward
app.post('/rewards', function (req, res) {

    // packing data into json object
    var data = {
        rewardName: req.body.rewardName,
        ptsRequired: req.body.ptsRequired,
        url: req.body.url
    };

    reward.createReward(data, function (err, result) {
        if (!err) {
            res.status(201).send(result);
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot CREATE new reward."));
                res.status(500).send(error);
            }
        }
    });
});

// Edit Reward By Id
app.put('/rewards/:id', function (req, res) {

    // storing data
    var rewardID = req.params.id;
    
    if(isNaN(rewardID)) {
        res.status(400).send();
        return;
    }

    var data = {
        rewardName: req.body.rewardName,
        ptsRequired: req.body.ptsRequired,
        url: req.body.url
    };

    reward.editReward(rewardID, data, function (err, result) {
        if (!err) {
            // IF the result returns nothing
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error : invalid inputs."));
                res.status(422).send(error);
            } else {
                res.status(201).send(result.rows);
            }
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot UPDATE reward"));
                res.status(500).send(error);
            }
        }
    });
});

// Delete Reward By Id
app.delete('/rewards/:id', function (req, res) {
    var rewardID = req.params.id;

    reward.deleteReward(rewardID, function (err, result) {
        if (!err) {
            res.status(204).send(result.rows);
        } else {
            if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
            }
        }
    });
});

// Insert Reward History By Id
    var data = {
        rewardID: req.body.rewardID,
        studentID: req.body.studentID
    };

    console.log("post data : " + JSON.stringify(data));

    reward.insertRewardHistory(data, function (err, result) {
        console.log("reward.insertRewardHistory called");
        if (!err) {
            res.status(201).send(result);
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot CREATE reward history by id"));
                res.status(500).send(error);
            }
        }
    });
});

//-----------------------------------------------------------leaderboard--------------------------------------------------------
// GET leaderboard top 3
app.get('/students/topStudents/', printDebugInfo, function (req, res) {

    student.getTopStudents(function (err, result) {
        if (!err) {
            res.status(200).send(result.rows);
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET top 3 student leaderboard."));
            res.status(500).send(error);
        }
    });
});

// GET leaderboard limit 10
app.get('/leaderboard', function (req, res) {
    student.getLeaderboard(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET leaderboard limit 10."));
            res.status(500).send(error);
        }
    })
})

app.get('/allLeaderboard', function (req, res) {
    student.getAllLeaderboard(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET all leaderboard"));
            res.status(500).send(error);
        }
    })
})

app.get('/ptsHistory/:id', function (req, res) {
    var id = req.params.id;
    student.getPtsHistory(id, function (err, result) {
        if (!err) {
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error: invalid input for studentID."));
                res.status(422).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET points history by studentID"));
                res.status(500).send(error);
            }
        }
    })
})

// CREATE student's points history
app.post('/ptsHistory/:id', function (req, res) {

    // packing data into json object
    var data = {
        studentID: req.params.id,
        ptsAwarded: req.body.ptsAwarded,
        eventID: req.body.eventID
    }
<<<<<<< Updated upstream
    points.insertPtsHistory(data, function (err, result){
        console.log("points.insertPtsHistory called");
        if(!err) {
            res.send(result);
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot CREATE new points history"));
                res.status(500).send(error);
            }
>>>>>>> Stashed changes
        }
    });
})

//QUIZ------------------------------------

=======
//-----------------------------------------------------------------quiz--------------------------------------------------------------
// GET all quizzes
>>>>>>> Stashed changes
app.get('/quiz', function (req, res) {

    quiz.getQuiz(function (err, result) {
        console.log("quiz getQuiz called");
        if (!err) {
            res.send(result.rows);
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET all quizzes."));
            res.status(500).send(error);
        }
    });
});

// CREATE new quiz data 
app.post('/quizHistory', function (req, res) {

    // packing data into json object
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
            res.status(201).send(result);
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot CREATE new quiz"));
                res.status(500).send(error);
            }
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
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error: invalid input for studentID."));
                res.status(422).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET current and total points."));
                res.status(500).send(error);
            }
        }
    });
})

// UPDATE current points 
app.put('/point/:id', function (req, res) {

// Update email
app.put('/email/:Uid', function (req, res) {
    var Uid = req.params.Uid;
    var email = req.body.email;
    user.updateEmail(Uid, email, function (err, result) {
        if (!err) {
            res.status(200).send("Email is updated on backend!");
        } else {
            res.status(500).send("Error ! Cannot update points");
        }
    });
});

//teacher view student progress
app.get('/studentProgress', function (req, res) {
    
    teacher.getStudentProgress(function (err, result) {
        console.log("teacher.studentprogress called");
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Error ! Cannot get reward");
        }
    });
});

//---------------- to view student's process--------------
app.get('/students/process/', printDebugInfo, function (req, res) {

    console.log("ITS IN HERE process student")
    student.getStudentProcess(function (err, result) {
        console.log("OVER HERE")
        if (!err) {

            res.send(result.rows);
        } else {
            res.status(500).send("Some error");
        }
    });
});


app.get('/students/process/:studentID', printDebugInfo, function (req, res) {
    var studentID = req.params.studentID;
    console.log("ITS IN HERE student processby id")
    student.getStudentProcessByID(studentID, function (err, result) {
        console.log("OVER HERE")
        if (!err) {

            res.send(result.rows);
        } else {
            res.status(500).send("Some error");
        }
    });
});

app.get('/students/streaks/:studentID', printDebugInfo, function (req, res) {
    var studentID = req.params.studentID;
    console.log("ITS IN HERE")
    student.getStudentStreakByID(studentID, function (err, result) {
        console.log("OVER HERE")
        if (!err) {

            res.send(result.rows);
        } else {
            res.status(500).send("Some error");
        }
    });
});


app.get('/students/points/:studentID', printDebugInfo, function (req, res) {
    var studentID = req.params.studentID;
    console.log("ITS IN HERE")
    student.getStudentPointByID(studentID, function (err, result) {
        console.log("OVER HERE")
        if (!err) {

            res.send(result.rows);
        } else {
            res.status(500).send("Some error");
        }
    });
});


app.get('/students/lastLogin/:studentID', printDebugInfo, function (req, res) {
    var studentID = req.params.studentID;
    console.log("ITS IN HERE")
    student.getLastLoginByID(studentID, function (err, result) {
        console.log("OVER HERE")
        if (!err) {

            res.send(result.rows);
        } else {
            res.status(500).send("Some error");
        }
    });
});


app.put('/students/lastLogin/:studentID', printDebugInfo, function (req, res) {
    var id = req.params.studentID
    var lastLogin = req.body.lastLogin;

    console.log("id : " + id);
    console.log("last Login : " + lastLogin);

    student.updateLastLogin(id, lastLogin, function (err, result) {

        console.log(" student.updateLastLogin called");
        if (!err) {
            // IF the result returns nothing
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error : invalid inputs."));
                res.status(422).send(error);
            } else {
                res.status(201).send(result.rows);
            }
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P03, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot UPDATE current points by id."));
                res.status(500).send(error);
            }
        }
    });
});


app.put('/students/lastLoginStreak/:studentID', printDebugInfo, function (req, res) {

    var id = req.params.studentID
    var lastLogin = req.body.lastLogin;
    console.log("id : " + id);
    console.log("last Login : " + lastLogin);

    student.updateLastLoginStreak(id, lastLogin, function (err, result) {

        console.log(" student.updateLastLoginStreak called");
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot get reward");
        }
    });
});


app.put('/students/updatePoints/:studentID', printDebugInfo, function (req, res) {
    var id = req.params.studentID
    console.log("id : " + id);
    student.upadateStudentPointsBasedOnStreaks(id, function (err, result) {

        console.log(" student.updateLastLoginStreak called");
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot get reward");
        }
    });
});

app.get('/students/topStudents/', printDebugInfo, function (req, res) {
    console.log("ITS IN HERE")
    student.getTopStudents(function (err, result) {
        console.log("OVER HERE")
        if (!err) {
            res.send(result.rows);
        } else {
            res.status(500).send("Some error");
        }
    });
});



//updating the student table
app.put('/studentPoints', function (req, res) {
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


// Get Summary of Points & Marks By Quiz
app.get('/summary/:qid/:uid', function (req, res) {
    var quizID = req.params.qid;
    var studentID = req.params.uid;
    points.getQuizPts(studentID, quizID, function (err, result) {
        console.log("points.getQuizPts called");
        if (!err) {
            // IF the result returns nothing
            if (result.rowCount == 0) {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but nothing has been updated. Possible error : invalid inputs."));
                res.status(422).send(error);
            } else {
                res.status(201).send(result.rows);
            }
        } else {
            // IF error code = 23502, send the details of error
            if (err.code == '23502') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code = 23503, send the details of error
            } else if (err.code == '23503') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails(err.detail));
                res.status(400).send(error);
                // IF error code - 22P02, 
            } else if (err.code == '22P02') {
                let error = new errorModel.errorResponse(errors.invalid_input.withDetails("Invalid input syntax for integer."));
                res.status(400).send(error);
            } else {
                let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot UPDATE current & total points."));
                res.status(500).send(error);
            }
        }
    })
})

// GET summary of points & marks by id * double check *
app.get('/summary/:qid/:uid', function (req, res) {

// Update Current and Total Points, and Maze Level
app.put('/maze/:id', function (req,res) {
    var studentID = req.params.id ;
    var data = {
        currentPts : req.body.currentPts,
        totalPts : req.body.totalPts,
        level : req.body.level
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

// Get Current Points and Total Points
app.get('/points/:id', function (req, res) {
    var studentID = req.params.id;
    points.getPts(studentID, function (err, result) {
        console.log("points.getPts called");
        if (!err) {
            // IF the result returns nothing
            if (result.rows == '') {
                let error = new errorModel.errorResponse(errors.invalid_request.withDetails("Error! The request has no error but there's nothing returned. Possible error : invalid input for studentID or quizID."));
                res.status(422).send(error);
            } else {
                res.status(200).send(result.rows);
            }
        } else {
            let error = new errorModel.errorResponse(errors.internal_error.withDetails("Error! Cannot GET summary of points and marks."));
            res.status(500).send(error);
        }
    })
})


app.put('/students/lastLoginLostStreak/:studentID', printDebugInfo, function (req, res) {
    var id = req.params.studentID
    var lastLogin = req.body.lastLogin;
    console.log("id : " + id);
    console.log("last Login : " + lastLogin);

    student.updateLastLoginStreakLost(id, lastLogin, function (err, result) {

        console.log(" student.updateLastLogin called");
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot get reward");
        }
    });
});

module.exports = app;
