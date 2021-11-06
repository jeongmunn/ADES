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

var student = require('../model/student.js');
var reward = require('../model/reward.js');
var cors = require('cors');

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

app.post('/rewards', function (req,res) {
    var data = {
        rewardName : req.body.rewardName ,
        ptsRequired : req.body.ptsRequired ,
        url : req.body.url
    };

    reward.createReward(data,function(err,result) {
        if(!err){
            res.status(201).send("");
        }else {
            res.status(500).send("Error ! Cannot post reward");
        }
    });
});

module.exports = app;
