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
var student = require('../model/student.js');
var reward = require('../model/reward.js');
var cors = require('cors');
const path = require('path');


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

app.options('*',cors());
app.use(cors());

app.get('/',(req,res)=>{
    res.statusCode = 200;
    res.send("GET successfully");
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

app.post('/rewards',  upload, function(req,res) {
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

module.exports = app;
