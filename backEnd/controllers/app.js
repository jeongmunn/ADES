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
;
const path = require('path');

var cors = require('cors');


var urlencodedParser = bodyParser.urlencoded({ extended: false });


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


app.get('/students/',printDebugInfo, function (req, res) {
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



app.get('/students/streaks/:studentID',printDebugInfo, function (req, res) {
    var studentID=req.params.studentID;
    console.log("ITS IN HERE")
    student.getStudentStreakByID(studentID,function (err, result) {
        console.log("OVER HERE")
        if (!err) {

            res.send(result.rows);
        } else {
            res.status(500).send("Some error");
        }
    });
});


app.get('/students/points/:studentID',printDebugInfo, function (req, res) {
    var studentID=req.params.studentID;
    console.log("ITS IN HERE")
    student.getStudentPointByID(studentID,function (err, result) {
        console.log("OVER HERE")
        if (!err) {

            res.send(result.rows);
        } else {
            res.status(500).send("Some error");
        }
    });
});


app.get('/students/topStudents/',printDebugInfo, function (req, res) {
  
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

 //---------------- to view student's process--------------
app.get('/students/process/',printDebugInfo, function (req, res) {
   
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


app.get('/students/process/:studentID',printDebugInfo, function (req, res) {
    var studentID=req.params.studentID;
    console.log("ITS IN HERE student processby id")
    student.getStudentProcessByID(studentID,function (err, result) {
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

app.post('/newBadge', printDebugInfo, function (req, res) {
    var data = {
        name: req.body.name,
        requirements: req.body.requirements,
        pic_url: req.body.pic_url,
        badgeClass: req.body.badgeClass,
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

    //you can only update your own account
    //so, we need to establish 2 things:
    //who are u?
    //   --req.decodedToken.user_id
    //Who are you trying to update?
    //              --req.userID

    if (isNaN(badgeID)) {
        console.log(badgeID)
        res.status(400).send();
        return;
    }

    var data = {
        name: req.body.name,
        requirements: req.body.requirements,
        pic_url: req.body.pic_url,
        badgeClass: req.body.badgeClass,
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

app.get('/rewards/:id', function (req, res) {
    var rewardID=req.params.id;
    reward.getRewardById(rewardID,function (err, result) {
        console.log("reward.getReward IDcalled");
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot get reward");
        }
    });
});

app.put('/rewards/:id', function (req, res) {

    var rewardID=req.params.id

    var ptsRequired = req.body.ptsRequired ;

    console.log("rewardID" + rewardID);
    console.log("ptsRequired" + ptsRequired);

    reward.editReward(rewardID, ptsRequired,function (err, result) {

        console.log("reward.getReward IDcalled");
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Error ! Cannot get reward");
        }
    });
});

app.delete('/rewards/:id', function (req, res) {
    var rewardID=req.params.id;
 
    reward.deleteReward(rewardID,function (err, result) {
        console.log("reward.getReward IDcalled");
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


//student dashboard



app.get('/students/streaks/:studentID',printDebugInfo, function (req, res) {
    var studentID=req.params.studentID;
    console.log("ITS IN HERE")
    student.getStudentStreakByID(studentID,function (err, result) {
        console.log("OVER HERE")
        if (!err) {

            res.send(result.rows);
        } else {
            res.status(500).send("Some error");
        }
    });
});


app.get('/students/points/:studentID',printDebugInfo, function (req, res) {
    var studentID=req.params.studentID;
    console.log("ITS IN HERE")
    student.getStudentPointByID(studentID,function (err, result) {
        console.log("OVER HERE")
        if (!err) {

            res.send(result);
        } else {
            res.status(500).send("Some error");
        }
    });
});



app.get('/students/topStudents/',printDebugInfo, function (req, res) {
  
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

module.exports = app;
